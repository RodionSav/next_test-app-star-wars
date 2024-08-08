import { client } from "@/utils/axiosClient";
import {
  ApiResponse,
  ApiPlanetResponse,
  SpeciesResponse,
  Character,
  Film,
  Starship,
  FilmsResponse,
  StarshipsResponse,
} from "../types/peopleType";

export function getPeopleWithPagination(page: number, limit: number = 10) {
  return client.get<ApiResponse>(`/people?page=${page}&limit=${limit}`);
}

export function getPeople() {
  return client.get<ApiResponse>(`/people`);
}


export function getPerson(personId: string) {
  return client.get(`/people/${personId}`)
}

export function getPlanets() {
  return client.get<ApiPlanetResponse>("/planets");
}

export function getSpecies() {
  return client.get<SpeciesResponse>("/species");
}

export function getFilms() {
  return client.get<FilmsResponse>('/films');
}


export function getCharacterDetails(id: string) {
  return client.get<Character>(`/people/${id}`);
}

export function getFilm(id: string) {
  return client.get<Film>(`/films/${id}`);
}

export function getStarship(id: string) {
  return client.get<Starship>(`/starships/${id}`);
}

export function getStarships() {
  return client.get<StarshipsResponse>('/starships');
}


// import React, { useEffect, useState, useMemo } from "react";
// import ReactFlow, { Node, Edge } from "react-flow-renderer";
// import { getPerson, getFilms, getStarships, getStarship } from "@/api/people";
// import { Character, Film, Starship } from "@/types/peopleType";

// type Props = {
//   characterId: string;
// };

// /**
//  * Component that displays a graph of the character's connections to films and starships.
//  * Updates the graph when the character ID or related data changes.
//  */

// const CharacterGraph: React.FC<Props> = ({ characterId }) => {
//   const [person, setPerson] = useState<Character | null>(null);
//   const [films, setFilms] = useState<Film[]>([]);
//   const [starships, setStarships] = useState<Starship[]>([]);
//   const [nodes, setNodes] = useState<Node[]>([]);
//   const [edges, setEdges] = useState<Edge[]>([]);

//   const starshipPromises = person?.starships.map((starhipUrl: any) => {
//     const parts = starhipUrl.split("/");
//     const starshipId = parts[parts.length - 2];

//     return getStarship(starshipId);
//   });


//   // Fetch person, films, and starships data when the component mounts or characterId changes
//   useEffect(() => {
//     getFilms().then((response: any) => setFilms(response.results));
//     // getStarships().then((response: any) => setStarships(response.results));
//   }, []);

//   // Fetch person data when characterId changes
//   useEffect(() => {
//     getPerson(characterId).then((response: any) => {
//       setPerson(response);

//       // Fetch starships for the person
//       // if (response.starships && response.starships.length > 0) {
//       //   const starshipPromises = response.starships.map((starshipUrl: string) => {
//       //     const parts = starshipUrl.split("/");
//       //     const starshipId = parts[parts.length - 2];
//       //     return getStarship(starshipId);
//       //   });

//       //   Promise.all(starshipPromises).then((starshipData: Starship[]) => {
//       //     setStarships(starshipData);
//       //   });
//       // }
//       console.log('starshipPromises: ', starshipPromises);

//       // setStarships(starshipPromises);

//       console.log(starships);
//     });
//   }, [characterId]);
//   // Update nodes and edges for the graph based on character data
//   useEffect(() => {
//     if (person) {
//       // const selectedStarships = starships.filter((starship) => {
//       //   const parts = starship.url.split("/");
//       //   const starshipId = parseInt(parts[parts.length - 2], 10);

//       //   return person.starships.includes(starshipId);
//       // });

//       const selectedFilms = films.filter((film) => {
//         const parts = film.url.split("/");
//         const filmId = parseInt(parts[parts.length - 2], 10);

//         return person.films.includes(filmId);
//       });

//       const gridGap = 170; // Space between nodes in the grid
//       const filmNodes = selectedFilms.map((film, index) => ({
//         id: `film-${film.url}`,
//         data: { label: film.title },
//         position: { x: 100 + index * gridGap, y: 200 },
//         style: { backgroundColor: "lightblue", border: "1px solid blue" },
//       }));

//       // const starshipNodes = starships.map((starship, index) => ({
//       //   id: `starship-${starship.url}`,
//       //   data: { label: starship.name },
//       //   position: { x: 100 + index * gridGap, y: 300 },
//       //   style: { backgroundColor: "lightgreen", border: "1px solid green" },
//       // }));

//       const characterNode = {
//         id: `character-${characterId}`,
//         data: { label: person.name },
//         position: { x: 250, y: 50 },
//         style: { backgroundColor: "lightred", border: "1px solid red" },
//       };

//       const filmEdges = selectedFilms.map((film) => ({
//         id: `e-film-${film.url}-character-${characterId}`,
//         source: `film-${film.url}`,
//         target: `character-${characterId}`,
//         animated: true,
//         arrowHeadType: "arrowclosed",
//       }));

//       // const starshipEdges = selectedStarships.map((starship) => ({
//       //   id: `e-starship-${starship.url}-character-${characterId}`,
//       //   source: `starship-${starship.url}`,
//       //   target: `character-${characterId}`,
//       //   animated: true,
//       //   arrowHeadType: "arrowclosed",
//       // }));

//       setNodes([characterNode, ...filmNodes]);
//       setEdges([...filmEdges]);
//     }

//     console.log("starships: ", starships);

//     console.log("characterId: ", characterId);
//   }, [person, films, starships, characterId]);

//   const memoizedNodes = useMemo(() => nodes, [nodes]);
//   const memoizedEdges = useMemo(() => edges, [edges]);

//   return (
//     <div style={{ height: 400, width: "100%" }}>
//       <ReactFlow
//         nodes={memoizedNodes}
//         edges={memoizedEdges}
//         fitView
//       ></ReactFlow>
//     </div>
//   );
// };

// export default CharacterGraph;
