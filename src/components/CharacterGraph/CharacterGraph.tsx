import React, { useEffect, useState, useMemo } from "react";
import ReactFlow, { MiniMap, Controls, Background, Node, Edge } from "react-flow-renderer";
import * as peopleActions from "../features/peopleSlice";
import { useAppDispatch, useAppSelector } from "@/reduxApp/hooks";

type Props = {
  characterId: string;
};

/**
 * Component that displays a graph of the character's connections to films and starships.
 * Updates the graph when the character ID or related data changes.
 */

const CharacterGraph: React.FC<Props> = ({ characterId }) => {
  const dispatch = useAppDispatch();
  const people = useAppSelector((state) => state.people.items.results);
  const films = useAppSelector((state) => state.people.itemsFilms.results);
  const starships = useAppSelector((state) => state.people.itemsStarships.results);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  // Fetch films and starships data when the component mounts
  useEffect(() => {
    dispatch(peopleActions.filmsInit());
    dispatch(peopleActions.starshipsInit());
    dispatch(peopleActions.peopleInit());

    console.log('people: ', people);
    console.log('starships: ', starships);
    console.log('films: ', films);
  }, [films, starships, people, characterId]);

  // Update nodes and edges for the graph based on character data
  useEffect(() => {
    if (people.length) {
      const selectedPerson = people.find((person) => {
        const parts = person.url.split('/');
        const index = parseInt(parts[parts.length - 2], 10);
        return index === Number(characterId);
      });

      if (selectedPerson) {
        const selectedStarships = starships.filter((starship) => {
          const parts = starship.url.split('/');
          const starshipId = parseInt(parts[parts.length - 2], 10);

          return selectedPerson.starships.includes(starshipId);
        });

        const selectedFilms = films.filter((film) => {
          const parts = film.url.split('/');
          const filmId = parseInt(parts[parts.length - 2], 10);

          return selectedPerson.films.includes(filmId);
        });

        const gridGap = 170; // Space between nodes in the grid
        const filmNodes = selectedFilms.map((film, index) => ({
          id: `film-${film.url}`,
          data: { label: film.title },
          position: { x: 100 + index * gridGap, y: 200 },
          style: { backgroundColor: 'lightblue', border: '1px solid blue' }
        }));

        const starshipNodes = selectedStarships.map((starship, index) => ({
          id: `starship-${starship.url}`,
          data: { label: starship.name },
          position: { x: 100 + index * gridGap, y: 300 },
          style: { backgroundColor: 'lightgreen', border: '1px solid green' }
        }));

        const characterNode = {
          id: `character-${characterId}`,
          data: { label: selectedPerson.name },
          position: { x: 250, y: 50 },
          style: { backgroundColor: 'lightred', border: '1px solid red' }
        };

        const filmEdges = selectedFilms.map(film => ({
          id: `e-film-${film.url}-character-${characterId}`,
          source: `film-${film.url}`,
          target: `character-${characterId}`,
          animated: true,
          arrowHeadType: 'arrowclosed',
        }));

        const starshipEdges = selectedStarships.map(starship => ({
          id: `e-starship-${starship.url}-character-${characterId}`,
          source: `starship-${starship.url}`,
          target: `character-${characterId}`,
          animated: true,
          arrowHeadType: 'arrowclosed',
        }));

        setNodes([characterNode, ...filmNodes, ...starshipNodes]);
        setEdges([...filmEdges, ...starshipEdges]);

        console.log('Nodes:', [characterNode, ...filmNodes, ...starshipNodes]);
        console.log('Edges:', [...filmEdges, ...starshipEdges]);
      }
    }
  }, [films, starships, people, characterId]);

  const memoizedNodes = useMemo(() => nodes, [nodes]);
  const memoizedEdges = useMemo(() => edges, [edges]);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <ReactFlow
        nodes={memoizedNodes}
        edges={memoizedEdges}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default CharacterGraph;
