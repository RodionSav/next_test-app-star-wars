import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import PersonItem from "../components/PersonItem/PersonItem";
import {
  increaseMenItems,
  decreaseMenItems,
} from "../components/features/favouriteSlice";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  people: {
    itemsPlanets: {
      results: [{ name: "Tatooine", url: "https://swapi.dev/api/planets/1/" }],
    },
  },
  favourite: { MenItems: 5, WomenItems: 3, OtherItems: 2 },
};

describe("PersonItem", () => {
  let store;
  const person = {
    name: "Luke Skywalker",
    url: "https://swapi.dev/api/people/1/",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/",
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("renders PersonItem component", () => {
    render(
      <Provider store={store}>
        <PersonItem person={person} />
      </Provider>
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("male")).toBeInTheDocument();
    expect(screen.getByText("Tatooine")).toBeInTheDocument();
  });

  // it("toggles favourite status", () => {
  //   render(
  //     <Provider store={store}>
  //       <PersonItem person={person} />
  //     </Provider>
  //   );

  //   const button = screen.getByRole("button");
  //   fireEvent.click(button);
  //   expect(store.getActions()).toEqual([increaseMenItems()]);

  //   fireEvent.click(button);
  //   expect(store.getActions()).toEqual([
  //     increaseMenItems(),
  //     decreaseMenItems(),
  //   ]);
  // });

  // it("shows CharacterGraph when clicked", () => {
  //   render(
  //     <Provider store={store}>
  //       <PersonItem person={person} />
  //     </Provider>
  //   );

  //   const name = screen.getByText("Luke Skywalker");
  //   fireEvent.click(name);
  //   expect(screen.getByText("Close information")).toBeInTheDocument();
  // });
});
