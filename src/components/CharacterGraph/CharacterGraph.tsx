import React, { useEffect, useState, useMemo, useCallback } from "react";
import ReactFlow, { ReactFlowProvider, Node, Edge, Background, useReactFlow } from "react-flow-renderer";
import { getFilms, getStarships, getStarship } from "@/api/people";
import { Character, Film, Starship } from "@/types/peopleType";

type Props = {
  characterId: string;
  person: Character;
};

const CharacterGraph: React.FC<Props> = ({ characterId, person }) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { fitView, setViewport, getViewport } = useReactFlow();

  // Fetch the list of all films on component mount
  useEffect(() => {
    getFilms().then((response: any) => setFilms(response.results));
  }, []);

  // Fetch the starships associated with the character
  useEffect(() => {
    Promise.all(person?.starships.map((shipId) => getStarship(shipId)))
      .then(setStarships);
  }, [person?.starships]);

  // Memoize the films and starships data to prevent unnecessary recalculations
  const memoizedFilms = useMemo(() => films, [films]);
  const memoizedStarships = useMemo(() => starships, [starships]);

  // Set up nodes and edges for the graph based on the character's films and starships
  useEffect(() => {
    if (person) {
      // Filter the films that the character appears in
      const selectedFilms = memoizedFilms.filter((film) => {
        const parts = film.url.split("/");
        const filmId = parseInt(parts[parts.length - 2], 10);
        return person.films.includes(filmId);
      });

      const gridGap = 170; // Gap between nodes in the graph

      // Create film nodes
      const filmNodes = selectedFilms.map((film, index) => ({
        id: `film-${film.url}`,
        data: { label: film.title },
        position: { x: 100 + index * gridGap, y: 200 },
        style: { backgroundColor: "lightblue", border: "1px solid blue" },
      }));

      // Create starship nodes
      const starshipNodes = memoizedStarships.map((starship, index) => ({
        id: `starship-${starship.url}`,
        data: { label: starship.name },
        position: { x: 100 + index * gridGap, y: 300 },
        style: { backgroundColor: "lightgreen", border: "1px solid green" },
      }));

      // Create the main character node
      const characterNode = {
        id: `character-${characterId}`,
        data: { label: person.name },
        position: { x: 250, y: 50 },
        style: { backgroundColor: "lightred", border: "1px solid red" },
      };

      // Create edges connecting films to the character node
      const filmEdges = selectedFilms.map((film) => ({
        id: `e-film-${film.url}-character-${characterId}`,
        source: `film-${film.url}`,
        target: `character-${characterId}`,
        animated: true,
        arrowHeadType: "arrowclosed",
      }));

      // Create edges connecting starships to the character node
      const starshipEdges = memoizedStarships.map((starship) => ({
        id: `e-starship-${starship.url}-character-${characterId}`,
        source: `starship-${starship.url}`,
        target: `character-${characterId}`,
        animated: true,
        arrowHeadType: "arrowclosed",
      }));

      // Set the nodes and edges in the state
      setNodes([characterNode, ...filmNodes, ...starshipNodes]);
      setEdges([...filmEdges, ...starshipEdges]);

      // Adjust the view to fit all nodes
      fitView();
    }
  }, [characterId, person, memoizedStarships, memoizedFilms, fitView]);

  // Center the graph in the viewport
  const centerGraph = useCallback(() => {
    const viewport = getViewport();
    const { x, y, zoom } = viewport;
    setViewport({ x, y, zoom });
  }, [getViewport, setViewport]);

  // Center the graph whenever nodes or edges change
  useEffect(() => {
    centerGraph();
  }, [nodes, edges, centerGraph]);

  // Memoize nodes and edges to avoid unnecessary re-renders
  const memoizedNodes = useMemo(() => nodes, [nodes]);
  const memoizedEdges = useMemo(() => edges, [edges]);

  return (
    <div style={{ height: 400, width: "100%", overflow: "hidden" }}>
      <ReactFlow
        nodes={memoizedNodes}
        edges={memoizedEdges}
        fitView={false}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

// Wrap the CharacterGraph component with ReactFlowProvider to handle React Flow context
const CharacterGraphWithProvider: React.FC<Props> = (props) => {
  return (
    <ReactFlowProvider>
      <CharacterGraph {...props} />
    </ReactFlowProvider>
  );
};

export default CharacterGraphWithProvider;
