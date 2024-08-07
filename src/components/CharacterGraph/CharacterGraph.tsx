import React, { useEffect, useState, useMemo } from "react";
import ReactFlow, { Node, Edge } from "react-flow-renderer";
import { getPerson, getFilms, getStarships } from "@/api/people";
import { Character, Film, Starship } from "@/types/peopleType";

type Props = {
  characterId: string;
};

/**
 * Component that displays a graph of the character's connections to films and starships.
 * Updates the graph when the character ID or related data changes.
 */

const CharacterGraph: React.FC<Props> = ({ characterId }) => {
  const [person, setPerson] = useState<Character | null>(null);
  const [films, setFilms] = useState<Film[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  // Fetch person, films, and starships data when the component mounts or characterId changes
  useEffect(() => {
    getPerson(characterId).then((response: any) => setPerson(response));
    getFilms().then((response: any) => setFilms(response.results));
    getStarships().then((response: any) => setStarships(response.results));
  }, [characterId, starships]);

  // Update nodes and edges for the graph based on character data
  useEffect(() => {
    if (person) {
      const selectedStarships = starships.filter((starship) => {
        const parts = starship.url.split("/");
        const starshipId = parseInt(parts[parts.length - 2], 10);

        return person.starships.includes(starshipId);
      });

      const selectedFilms = films.filter((film) => {
        const parts = film.url.split("/");
        const filmId = parseInt(parts[parts.length - 2], 10);

        return person.films.includes(filmId);
      });

      const gridGap = 170; // Space between nodes in the grid
      const filmNodes = selectedFilms.map((film, index) => ({
        id: `film-${film.url}`,
        data: { label: film.title },
        position: { x: 100 + index * gridGap, y: 200 },
        style: { backgroundColor: "lightblue", border: "1px solid blue" },
      }));

      const starshipNodes = selectedStarships.map((starship, index) => ({
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

      const starshipEdges = selectedStarships.map((starship) => ({
        id: `e-starship-${starship.url}-character-${characterId}`,
        source: `starship-${starship.url}`,
        target: `character-${characterId}`,
        animated: true,
        arrowHeadType: "arrowclosed",
      }));

      setNodes([characterNode, ...filmNodes, ...starshipNodes]);
      setEdges([...filmEdges, ...starshipEdges]);
    }

    console.log("starships: ", starships);

    console.log("characterId: ", characterId);
  }, [characterId, person, starships, films]);

  const memoizedNodes = useMemo(() => nodes, [nodes]);
  const memoizedEdges = useMemo(() => edges, [edges]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <ReactFlow
        nodes={memoizedNodes}
        edges={memoizedEdges}
        fitView
      ></ReactFlow>
    </div>
  );
};

export default CharacterGraph;
