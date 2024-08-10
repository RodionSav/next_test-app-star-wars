import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Node,
  Edge,
  Background,
  useReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
} from "react-flow-renderer";
import { getFilms, getStarship } from "@/api/people";
import { Character, Film, Starship } from "@/types/peopleType";
import { Box, Text } from "@chakra-ui/react";
import { FaStar, FaFilm, FaRocket } from "react-icons/fa";

type Props = {
  characterId: string;
  person: Character;
};

const CharacterGraph: React.FC<Props> = ({ characterId, person }) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { fitView } = useReactFlow();

  const prevStarshipsRef = useRef<Set<string>>(new Set());
  const prevCharacterIdRef = useRef<string | null>(null);

  useEffect(() => {
    getFilms().then((response: any) => setFilms(response.results));
  }, []);

  const loadStarships = useCallback(async () => {
    if (person?.starships && characterId !== prevCharacterIdRef.current) {
      prevCharacterIdRef.current = characterId;
      const uniqueStarships = person.starships.filter(
        (shipId) => !prevStarshipsRef.current.has(shipId)
      );

      if (uniqueStarships.length > 0) {
        for (let i = 0; i < uniqueStarships.length; i++) {
          try {
            const starship = await getStarship(uniqueStarships[i]);
            setStarships((prevStarships) => [...prevStarships, starship]);
            prevStarshipsRef.current.add(uniqueStarships[i]);
            if (uniqueStarships.length > 2) {
              await new Promise((resolve) => setTimeout(resolve, 10));
            }
          } catch (error) {
            console.error("Error loading starships:", error);
          }
        }
      }
    }
  }, [characterId, person]);

  useEffect(() => {
    loadStarships();
  }, [loadStarships]);

  const memoizedFilms = useMemo(() => films, [films]);
  const memoizedStarships = useMemo(() => starships, [starships]);

  useEffect(() => {
    if (person) {
      const selectedFilms = memoizedFilms.filter((film) => {
        return person.films.includes(film.id);
      });

      const gridGap = 170;

      // Function to create a node with a Star Wars-themed Chakra UI icon
      const createNode = (
        id: string,
        label: string,
        icon: React.ReactNode,
        x: number,
        y: number,
        bgColor: string
      ) => ({
        id,
        data: {
          label: (
            <Box display="flex" alignItems="center">
              {icon}
              <Text ml={2} fontFamily="StarJedi, Arial, sans-serif" fontSize="14px">
                {label}
              </Text>
            </Box>
          ),
        },
        position: { x, y },
        style: {
          backgroundColor: bgColor,
          border: "2px solid #ffcc00",
          color: "#ffe81f",
          fontFamily: "StarJedi, Arial, sans-serif",
          boxShadow: "0px 0px 5px #ffcc00",  // Уменьшено свечение
          borderRadius: "10px",
          padding: "8px",
        },
      });

      // Calculate varying y positions to avoid overlapping edges
      const filmNodes = selectedFilms.map((film, index) =>
        createNode(
          `film-${film.id}`,
          film.title,
          <FaFilm color="yellow.400" />,
          100 + index * gridGap,
          200 + (index % 2 === 0 ? 20 : -20), // Slightly varied y positions
          "#1c1c1c"
        )
      );

      const starshipNodes = memoizedStarships.map((starship, index) =>
        createNode(
          `starship-${starship.id}`,
          starship.name,
          <FaRocket color="yellow.400" />,
          100 + index * gridGap,
          300 + (index % 2 === 0 ? 20 : -20), // Slightly varied y positions
          "#0d3b66"
        )
      );

      const characterNode = createNode(
        `character-${characterId}`,
        person.name,
        <FaStar color="yellow.400" />,
        250,
        50,
        "#3e3e3e"
      );

      const filmEdges = selectedFilms.map((film) => ({
        id: `e-film-${film.id}-character-${characterId}`,
        source: `film-${film.id}`,
        target: `character-${characterId}`,
        type: "smoothstep",
        animated: true,
        arrowHeadType: "arrowclosed",
        style: { stroke: "#ff0000", strokeWidth: 2 },
      }));

      const starshipFilmEdges = memoizedStarships.flatMap((starship) =>
        starship.films.map((filmId) => ({
          id: `e-starship-${starship.id}-film-${filmId}`,
          source: `starship-${starship.id}`,
          target: `film-${filmId}`,
          type: "smoothstep",
          animated: true,
          arrowHeadType: "arrowclosed",
          style: { stroke: "#00aaff", strokeWidth: 2 },
        }))
      );

      setNodes([characterNode, ...filmNodes, ...starshipNodes]);
      setEdges([...filmEdges, ...starshipFilmEdges]);
      fitView();
    }
  }, [characterId, person, memoizedStarships, memoizedFilms, fitView]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <div style={{ height: 400, width: "100%", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          background: "rgba(0, 0, 0, 0.3)", // Overlay with reduced opacity
          zIndex: 1,
          opacity: 0.1
        }}
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView={false}
        style={{ position: "relative", zIndex: 2 }} // Keep nodes and edges on top
      >
        <Background 
          color="#000000"
        />
      </ReactFlow>
    </div>
  );
};

const CharacterGraphWithProvider: React.FC<Props> = (props) => {
  return (
    <ReactFlowProvider>
      <CharacterGraph {...props} />
    </ReactFlowProvider>
  );
};

export default CharacterGraphWithProvider;
