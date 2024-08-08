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

  useEffect(() => {
    getFilms().then((response: any) => setFilms(response.results));
  }, []);

  useEffect(() => {
    Promise.all(person?.starships.map((shipId) => getStarship(shipId)))
      .then(setStarships);
  }, [person?.starships]);

  const memoizedFilms = useMemo(() => films, [films]);
  const memoizedStarships = useMemo(() => starships, [starships]);

  useEffect(() => {
    if (person) {
      const selectedFilms = memoizedFilms.filter((film) => {
        const parts = film.url.split("/");
        const filmId = parseInt(parts[parts.length - 2], 10);
        return person.films.includes(filmId);
      });

      const gridGap = 170;
      const filmNodes = selectedFilms.map((film, index) => ({
        id: `film-${film.url}`,
        data: { label: film.title },
        position: { x: 100 + index * gridGap, y: 200 },
        style: { backgroundColor: "lightblue", border: "1px solid blue" },
      }));

      const starshipNodes = memoizedStarships.map((starship, index) => ({
        id: `starship-${starship.url}`,
        data: { label: starship.name },
        position: { x: 100 + index * gridGap, y: 300 },
        style: { backgroundColor: "lightgreen", border: "1px solid green" },
      }));

      const characterNode = {
        id: `character-${characterId}`,
        data: { label: person.name },
        position: { x: 250, y: 50 },
        style: { backgroundColor: "lightred", border: "1px solid red" },
      };

      const filmEdges = selectedFilms.map((film) => ({
        id: `e-film-${film.url}-character-${characterId}`,
        source: `film-${film.url}`,
        target: `character-${characterId}`,
        animated: true,
        arrowHeadType: "arrowclosed",
      }));

      const starshipEdges = memoizedStarships.map((starship) => ({
        id: `e-starship-${starship.url}-character-${characterId}`,
        source: `starship-${starship.url}`,
        target: `character-${characterId}`,
        animated: true,
        arrowHeadType: "arrowclosed",
      }));

      setNodes([characterNode, ...filmNodes, ...starshipNodes]);
      setEdges([...filmEdges, ...starshipEdges]);

      fitView();
    }
  }, [characterId, person, memoizedStarships, memoizedFilms, fitView]);

  const centerGraph = useCallback(() => {
    const viewport = getViewport();
    const { x, y, zoom } = viewport;
    setViewport({ x, y, zoom });
  }, [getViewport, setViewport]);

  useEffect(() => {
    centerGraph();
  }, [nodes, edges, centerGraph]);

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

const CharacterGraphWithProvider: React.FC<Props> = (props) => {
  return (
    <ReactFlowProvider>
      <CharacterGraph {...props} />
    </ReactFlowProvider>
  );
};

export default CharacterGraphWithProvider;
