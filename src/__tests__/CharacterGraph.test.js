import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import CharacterGraphWithProvider from "../components/CharacterGraph/CharacterGraph";
import { getFilms, getStarships } from "../api/people";

// Mock the API calls
jest.mock("../api/people");

const mockPerson = {
  name: "Luke Skywalker",
  films: [1, 2],
  starships: [
    "https://swapi.dev/api/starships/1/",
    "https://swapi.dev/api/starships/2/",
  ],
};

// Mock ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("CharacterGraph component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("handles no films or starships gracefully", async () => {
    getFilms.mockResolvedValueOnce({ results: [] });
    getStarships.mockResolvedValueOnce({ results: [] });

    await act(async () => {
      render(
        <CharacterGraphWithProvider
          characterId="1"
          person={{ ...mockPerson, films: [], starships: [] }}
        />
      );
    });

    expect(screen.queryByText("A New Hope")).not.toBeInTheDocument();
    expect(screen.queryByText("X-Wing")).not.toBeInTheDocument();
  });
});
