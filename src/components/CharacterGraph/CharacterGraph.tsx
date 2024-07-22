import React, { useEffect, useState } from "react";
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

    console.log(people, films, starships);
  }, [dispatch]);

    // Update nodes and edges for the graph based on character data

  useEffect(() => {
    if (people.length && films.length && starships.length) {
      const selectedPerson = people.find((person) => {
        const parts = person.url.split('/');
        const index = parseInt(parts[parts.length - 2], 10);
        return index === Number(characterId);
      });

      if (selectedPerson) {
        const selectedStarships = starships.filter((starship) => {
          const parts = starship.url.split('/');
          const starshipId = parseInt(parts[parts.length - 2], 10);
          return selectedPerson.starships.includes(String(starshipId));
        });

        const selectedFilms = films.filter((film) => {
          const parts = film.url.split('/');
          const filmId = parseInt(parts[parts.length - 2], 10);
          return selectedPerson.films.includes(String(filmId));
        });

        const filmNodes = selectedFilms.map(film => ({
          id: `film-${film.url}`,
          data: { label: film.title },
          position: { x: Math.random() * 400, y: Math.random() * 400 },
        }));

        const starshipNodes = selectedStarships.map(starship => ({
          id: `starship-${starship.url}`,
          data: { label: starship.name },
          position: { x: Math.random() * 400, y: Math.random() * 400 },
        }));

        const characterNode = {
          id: `character-${characterId}`,
          data: { label: selectedPerson.name },
          position: { x: 250, y: 50 },
        };

        const newEdges = selectedFilms.flatMap(film =>
          film.starships.map(starshipUrl => ({
            id: `e${film.url}-${starshipUrl}`,
            source: `film-${film.url}`,
            target: `starship-${starshipUrl}`,
            animated: true,
          }))
        );

        setNodes([characterNode, ...filmNodes, ...starshipNodes]);
        setEdges(newEdges);

        console.log('Nodes:', [...filmNodes, ...starshipNodes]);
        // console.log('Edges:', newEdges);
      }
    }
  }, [films, starships, people, characterId]);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
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
