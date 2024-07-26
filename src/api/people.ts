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

export function getPeople() {
  return client.get<ApiResponse>(`/people`);
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

export function getStarships() {
  return client.get<StarshipsResponse>('/starships');
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