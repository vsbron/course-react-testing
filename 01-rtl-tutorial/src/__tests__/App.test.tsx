import { render, screen } from "@testing-library/react";
// Note: technically already available globally
import { test, expect } from "vitest";
import App from "../App";

describe("App Component", () => {
  // Test if heading renders correctly
  test("should render heading with correct text", () => {
    // Render the App component
    render(<App />);

    // Log the DOM tree for debugging
    screen.debug();

    // // Find heading by its text content
    // const heading = screen.getByText("React Testing Library");

    // // Verify heading exists in document
    // expect(heading).toBeInTheDocument();

    // Shortened version
    expect(screen.getByText("React Testing Library")).toBeInTheDocument();
  });

  // // More examples
  // test("This empty test will pass", () => {
  //   // Empty test will pass!
  // });
  // test("This empty test will pass too", () => {
  //   const sum = 1 + 1;
  //   // throw new Error("Forced failure"); - causes test failure
  //   expect(sum).toBe(2);
  // });

  test("Should render paragraph with correct text", () => {
    render(<App />);

    expect(screen.getByText(/library and vitest/i)).toBeInTheDocument;
  });
});
