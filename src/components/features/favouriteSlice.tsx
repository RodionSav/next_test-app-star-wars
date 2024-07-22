import { createSlice } from "@reduxjs/toolkit";

type FavoriteState = {
  maleFavorites: number;
  femaleFavorites: number;
  otherFavorites: number;
};

const initialState: FavoriteState = {
  maleFavorites: 0,
  femaleFavorites: 0,
  otherFavorites: 0,
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    /**
     * Increment the count of male favorites.
     */
    incrementMaleFavorites: (state) => {
      state.maleFavorites += 1;
    },
    /**
     * Increment the count of female favorites.
     */
    incrementFemaleFavorites: (state) => {
      state.femaleFavorites += 1;
    },
    /**
     * Increment the count of other gender favorites.
     */
    incrementOtherFavorites: (state) => {
      state.otherFavorites += 1;
    },
    /**
     * Decrement the count of male favorites.
     */
    decrementMaleFavorites: (state) => {
      state.maleFavorites -= 1;
    },
    /**
     * Decrement the count of female favorites.
     */
    decrementFemaleFavorites: (state) => {
      state.femaleFavorites -= 1;
    },
    /**
     * Decrement the count of other gender favorites.
     */
    decrementOtherFavorites: (state) => {
      state.otherFavorites -= 1;
    },
    /**
     * Reset all favorite counts to zero.
     */
    resetFavorites: (state) => {
      state.maleFavorites = 0;
      state.femaleFavorites = 0;
      state.otherFavorites = 0;
    }
  }
});

export const {
  incrementMaleFavorites,
  incrementFemaleFavorites,
  incrementOtherFavorites,
  decrementMaleFavorites,
  decrementFemaleFavorites,
  decrementOtherFavorites,
  resetFavorites
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
