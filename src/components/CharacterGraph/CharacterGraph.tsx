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

type Props = {
  characterId: string;
  person: Character;
};

const CharacterGraph: React.FC<Props> = ({ characterId, person }) => {
  const [films, setFilms] = useState<Film[]>([]); // State to store films
  const [starships, setStarships] = useState<Starship[]>([]); // State to store starships
  const [nodes, setNodes] = useState<Node[]>([]); // State to store graph nodes
  const [edges, setEdges] = useState<Edge[]>([]); // State to store graph edges
  const { fitView } = useReactFlow(); // Hook to fit the view of the graph

  const prevStarshipsRef = useRef<Set<string>>(new Set()); // Tracks previously loaded starships
  const prevCharacterIdRef = useRef<string | null>(null); // Tracks the previous character ID

  useEffect(() => {
    // Fetches all films on component mount
    getFilms().then((response: any) => setFilms(response.results));
  }, []);

  const loadStarships = useCallback(async () => {
    // Only load starships if character ID has changed
    if (person?.starships && characterId !== prevCharacterIdRef.current) {
      prevCharacterIdRef.current = characterId;

      // Filter out starships that have already been loaded
      const uniqueStarships = person.starships.filter(
        (shipId) => !prevStarshipsRef.current.has(shipId)
      );

      if (uniqueStarships.length > 0) {
        for (let i = 0; i < uniqueStarships.length; i++) {
          try {
            const starship = await getStarship(uniqueStarships[i]);
            setStarships((prevStarships) => [...prevStarships, starship]);
            prevStarshipsRef.current.add(uniqueStarships[i]);

            // Optional delay between requests (removed timer)
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
      // Filter films based on the character's film list
      const selectedFilms = memoizedFilms.filter((film) => {
        const parts = film.url.split("/");
        const filmId = parseInt(parts[parts.length - 2], 10);
        return person.films.includes(filmId);
      });

      const gridGap = 170; // Set gap between nodes in the grid

      // Create nodes for films
      const filmNodes = selectedFilms.map((film, index) => ({
        id: `film-${film.url}`,
        data: { label: film.title },
        position: { x: 100 + index * gridGap, y: 200 },
        style: { backgroundColor: "lightblue", border: "1px solid blue" },
      }));

      // Create nodes for starships
      const starshipNodes = memoizedStarships.map((starship, index) => ({
        id: `starship-${starship.url}`,
        data: { label: starship.name },
        position: { x: 100 + index * gridGap, y: 300 },
        style: { backgroundColor: "lightgreen", border: "1px solid green" },
      }));

      // Create the character node
      const characterNode = {
        id: `character-${characterId}`,
        data: { label: person.name },
        position: { x: 250, y: 50 },
        style: { backgroundColor: "lightred", border: "1px solid red" },
      };

      // Create edges connecting films to the character
      const filmEdges = selectedFilms.map((film) => ({
        id: `e-film-${film.url}-character-${characterId}`,
        source: `film-${film.url}`,
        target: `character-${characterId}`,
        animated: true,
        arrowHeadType: "arrowclosed",
      }));

      // Create edges connecting starships to the character
      const starshipEdges = memoizedStarships.map((starship) => ({
        id: `e-starship-${starship.url}-character-${characterId}`,
        source: `starship-${starship.url}`,
        target: `character-${characterId}`,
        animated: true,
        arrowHeadType: "arrowclosed",
      }));

      setNodes([characterNode, ...filmNodes, ...starshipNodes]); // Set all nodes
      setEdges([...filmEdges, ...starshipEdges]); // Set all edges

      fitView(); // Fit the graph view to the nodes
    }
  }, [characterId, person, memoizedStarships, memoizedFilms, fitView]);

  // Handlers for node and edge changes
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <div style={{ height: 400, width: "100%", overflow: "hidden" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView={false}
      >
        <Background />
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
