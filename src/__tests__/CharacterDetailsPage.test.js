import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CharacterDetailPage from "../app/character/[id]/page";
import { useRouter } from "next/navigation";
import { getPerson } from "../api/people";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../api/people", () => ({
  getPerson: jest.fn(),
}));

jest.mock("../components/CharacterGraph/CharacterGraph", () => {
  return function DummyCharacterGraph() {
    return <div>CharacterGraph</div>;
  };
});

describe("CharacterDetailPage", () => {
  const mockRouter = { back: jest.fn() };
  const mockPerson = {
    name: "Luke Skywalker",
    birth_year: "19BBY",
    eye_color: "blue",
    gender: "male",
    hair_color: "blond",
    height: "172",
    mass: "77",
    skin_color: "fair",
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: "",
    edited: "",
    url: "",
  };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
    getPerson.mockResolvedValue(mockPerson);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display loading state initially", () => {
    render(<CharacterDetailPage params={{ id: "1" }} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should display character details when loaded", async () => {
    render(<CharacterDetailPage params={{ id: "1" }} />);

    expect(await screen.findByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Birth Year: 19BBY/i)).toBeInTheDocument();
    expect(screen.getByText(/Eye Color: blue/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: male/i)).toBeInTheDocument();
  });

  it("should render the CharacterGraph component", async () => {
    render(<CharacterDetailPage params={{ id: "1" }} />);

    expect(await screen.findByText(/CharacterGraph/i)).toBeInTheDocument();
  });

  it("should call router.back when the back button is clicked", async () => {
    render(<CharacterDetailPage params={{ id: "1" }} />);

    const backButton = await screen.findByRole("button", {
      name: /back to list/i,
    });
    fireEvent.click(backButton);

    expect(mockRouter.back).toHaveBeenCalled();
  });
});
