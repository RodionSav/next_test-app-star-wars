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

  // Refs to keep track of previous starships and character ID
  const prevStarshipsRef = useRef<Set<string>>(new Set());
  const prevCharacterIdRef = useRef<string | null>(null);

  // Fetch films data on component mount
  useEffect(() => {
    getFilms().then((response: any) => setFilms(response.results));
  }, []);

  // Function to load starships associated with the character
  const loadStarships = useCallback(async () => {
    if (person?.starships && characterId !== prevCharacterIdRef.current) {
      prevCharacterIdRef.current = characterId;
      const uniqueStarships = person.starships.filter(
        (shipId) => !prevStarshipsRef.current.has(shipId)
      );

      if (uniqueStarships.length > 0) {
        let index = 0;
        while (index < uniqueStarships.length) {
          try {
            const starship = await getStarship(uniqueStarships[index]);
            setStarships((prevStarships) => [...prevStarships, starship]);
            prevStarshipsRef.current.add(uniqueStarships[index]);

            index += 1;

            // Adding a small delay between requests to avoid hitting API rate limits
            if (uniqueStarships.length > 2) {
              await new Promise((resolve) => setTimeout(resolve, 10));
            }
          } catch (error) {
            console.error("Error loading starships:", error);
            index += 1;
          }
        }
      }
    }
  }, [characterId, person]);

  // Load starships whenever the character changes
  useEffect(() => {
    loadStarships();
  }, [loadStarships]);

  // Memoize the films and starships to avoid unnecessary re-renders
  const memoizedFilms = useMemo(() => films, [films]);
  const memoizedStarships = useMemo(() => starships, [starships]);

  // Function to determine edge color based on its type
  const getEdgeColor = (edgeType: string, index: number = 0) => {
    switch (edgeType) {
      case 'film':
        return '#ff0000';
      case 'starship':
        const starshipColors = ['#00aaff', '#ff00aa', '#aaff00', '#aa00ff', '#ffaa00'];
        return starshipColors[index % starshipColors.length];
      default:
        return '#888';
    }
  };

  // Effect to create nodes and edges whenever person, films, or starships change
  useEffect(() => {
    if (person) {
      const selectedFilms = memoizedFilms.filter((film) => {
        return person.films.includes(film.id);
      });

      const gridGap = 170;

      // Function to create a node for the graph
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
          boxShadow: "0px 0px 5px #ffcc00",
          borderRadius: "10px",
          padding: "8px",
        },
      });

      // Create film nodes
      const filmNodes = selectedFilms.map((film, index) =>
        createNode(
          `film-${film.id}`,
          film.title,
          <FaFilm color="yellow.400" />,
          100 + index * gridGap,
          170,
          "#1c1c1c"
        )
      );

      // Create starship nodes
      const starshipNodes = memoizedStarships.map((starship, index) =>
        createNode(
          `starship-${starship.id}`,
          starship.name,
          <FaRocket color="yellow.400" />,
          100 + index * (gridGap + 50),
          300 + (index % 2 === 0 ? 30 : -20),
          "#0d3b66"
        )
      );

      // Create the character node
      const characterNode = createNode(
        `character-${characterId}`,
        person.name,
        <FaStar color="yellow.400" />,
        250,
        50,
        "#3e3e3e"
      );

      // Create edges between films and the character
      const filmEdges = selectedFilms.map((film) => ({
        id: `e-film-${film.id}-character-${characterId}`,
        source: `film-${film.id}`,
        target: `character-${characterId}`,
        type: "smoothstep",
        animated: true,
        arrowHeadType: "arrowclosed",
        style: { stroke: getEdgeColor('film'), strokeWidth: 2 },
      }));

      // Create edges between starships and their associated films
      const starshipFilmEdges = memoizedStarships.flatMap((starship, index) =>
        starship.films.map((filmId) => ({
          id: `e-starship-${starship.id}-film-${filmId}`,
          source: `starship-${starship.id}`,
          target: `film-${filmId}`,
          type: "smoothstep",
          animated: true,
          arrowHeadType: "arrowclosed",
          style: { stroke: getEdgeColor('starship', index), strokeWidth: 2 },
        }))
      );

      // Set the nodes and edges for the graph
      setNodes([characterNode, ...filmNodes, ...starshipNodes]);
      setEdges([...filmEdges, ...starshipFilmEdges]);
      fitView(); // Adjust the view to fit the nodes
    }
  }, [characterId, person, memoizedStarships, memoizedFilms, fitView]);

  // Handlers for node and edge changes (e.g., drag, delete)
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
      {/* Overlay background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          background: "rgba(0, 0, 0, 0.3)",
          zIndex: 1,
          opacity: 0.1
        }}
      />
      {/* React Flow graph */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView={false}
        style={{ position: "relative", zIndex: 2 }}
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
