import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import AppContent from "../AppContent";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  people: {
    items: { results: [] },
    itemsPlanets: { results: [] },
    itemsSpecies: { results: [] },
  },
  favourite: { MenItems: 5, WomenItems: 3, OtherItems: 2 },
};

describe("AppContent", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("renders AppContent component", () => {
    render(
      <Provider store={store}>
        <AppContent />
      </Provider>
    );

    expect(screen.getByText("5 Male fans")).toBeInTheDocument();
    expect(screen.getByText("3 Female fans")).toBeInTheDocument();
    expect(screen.getByText("2 Other fans")).toBeInTheDocument();
  });
});
