import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import peopleReducer from "../components/features/peopleSlice";
import favouriteReducer from "../components/features/favouriteSlice";
import { David_Libre } from "next/font/google";
import { handleClientScriptLoad } from "next/script";
import characterSlice from "@/components/features/characterSlice";

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    favourite: favouriteReducer,
    character: characterSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
