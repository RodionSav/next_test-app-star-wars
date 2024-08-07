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
