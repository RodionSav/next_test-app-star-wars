export type Character = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: number[];
  species: string[];
  vehicles: string[];
  starships: number[];
  created: string;
  edited: string;
  url: string;
};

export type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
};

export type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export interface ApiPlanetResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
}

export interface Species {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string | null;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface SpeciesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Species[];
}

export interface StarshipsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Starship[];
}

export interface FilmsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
}

export interface Film {
  characters: number[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  planets: number[];
  producer: string;
  release_date: string;
  species: number[];
  starships: number[];
  title: string;
  url: string;
  vehicles: number[];
}

export interface Starship {
  id: any;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string | null;
  model: string;
  name: string;
  passengers: string;
  films: number[];
  pilots: number[];
  starship_class: string;
  url: string;
}
