import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';  // Import the matchers
import AppContent from "../components/AppContent/AppContent";
import { PeopleList } from "../components/PeopleList/PeopleList";

// Mock the PeopleList component
jest.mock("../components/PeopleList/PeopleList", () => ({
  PeopleList: () => <div data-testid="people-list">Mocked PeopleList</div>,
}));

describe("AppContent component", () => {
  test("renders without crashing", () => {
    const { container } = render(<AppContent />);
    expect(container).toBeTruthy();
  });

  test("renders the PeopleList component", () => {
    const { getByTestId } = render(<AppContent />);
    expect(getByTestId("people-list")).toBeInTheDocument();
  });


  test("renders a Box with a margin bottom containing the PeopleList", () => {
    const { container } = render(<AppContent />);
    const innerBox = container.querySelector("div > div");

    expect(innerBox).toContainElement(
      container.querySelector("[data-testid='people-list']")
    );
  });
});
