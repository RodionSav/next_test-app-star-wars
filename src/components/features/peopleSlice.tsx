import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPeople, getPlanets, getSpecies, getFilms, getStarships } from "../../api/people";
import {
  ApiResponse,
  ApiPlanetResponse,
  SpeciesResponse,
  FilmsResponse,
  StarshipsResponse,
} from "../../types/peopleType";

type PeopleState = {
  items: ApiResponse;
  itemsPlanets: ApiPlanetResponse;
  itemsSpecies: SpeciesResponse;
  itemsFilms: FilmsResponse;
  itemsStarships: StarshipsResponse;
  loaded: boolean;
  hasError: string | null;
};

const initialState: PeopleState = {
  items: { count: 0, next: null, previous: null, results: [] },
  itemsPlanets: { count: 0, next: null, previous: null, results: [] },
  itemsSpecies: { count: 0, next: null, previous: null, results: [] },
  itemsFilms: { count: 0, next: null, previous: null, results: [] },
  itemsStarships: { count: 0, next: null, previous: null, results: [] },
  loaded: true,
  hasError: null,
};

/**
 * Thunks for fetching different types of data.
 */
export const peopleInit = createAsyncThunk("people/fetch", getPeople);
export const planetInit = createAsyncThunk("planets/fetch", getPlanets);
export const speciesInit = createAsyncThunk("species/fetch", getSpecies);
export const filmsInit = createAsyncThunk("films/fetch", getFilms);
export const starshipsInit = createAsyncThunk("starships/fetch", getStarships);

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(peopleInit.pending, (state) => {
        state.loaded = true;
      })
      .addCase(peopleInit.fulfilled, (state, action) => {
        state.items.results = [
          ...state.items.results,
          ...action.payload.results,
        ];
        state.items.next = action.payload.next;
        state.loaded = false;
      })
      .addCase(peopleInit.rejected, (state) => {
        state.hasError = "Error";
      })
      .addCase(planetInit.pending, (state) => {
        state.loaded = true;
      })
      .addCase(planetInit.fulfilled, (state, action) => {
        state.itemsPlanets = action.payload;
        state.loaded = false;
      })
      .addCase(planetInit.rejected, (state) => {
        state.hasError = "Error";
      })
      .addCase(speciesInit.pending, (state) => {
        state.loaded = true;
      })
      .addCase(speciesInit.fulfilled, (state, action) => {
        state.itemsSpecies = action.payload;
        state.loaded = false;
      })
      .addCase(speciesInit.rejected, (state) => {
        state.hasError = "Error";
      })
      .addCase(filmsInit.pending, (state) => {
        state.loaded = true;
      })
      .addCase(filmsInit.fulfilled, (state, action) => {
        state.itemsFilms = action.payload;
        state.loaded = false;
      })
      .addCase(filmsInit.rejected, (state) => {
        state.hasError = "Error";
      })
      .addCase(starshipsInit.pending, (state) => {
        state.loaded = true;
      })
      .addCase(starshipsInit.fulfilled, (state, action) => {
        state.itemsStarships = action.payload;
        state.loaded = false;
      })
      .addCase(starshipsInit.rejected, (state) => {
        state.hasError = "Error";
      });
  },
});

export default peopleSlice.reducer;
