import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Random from "./Random";
import "@testing-library/jest-dom";

describe("Random Component", () => {
  test("renders correctly", () => {
    // Render the component and debug the screen
    render(<Random />);
    screen.debug();

    const element = screen.getByText(/random/i);
    expect(element).toBeInTheDocument();
  });
});
