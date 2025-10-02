import { render, screen } from "@testing-library/react";
// Note: technically already available globally
import { test, expect } from "vitest";
import Sandbox from "./Sandbox";

describe("Sandbox 01 tests", () => {
  test("Sandbox tests", async () => {
    // Render the component
    render(<Sandbox />);

    // Debug the component
    screen.debug();

    // 1. getByText
    // const heading = screen.getByText("React Testing Library examples");
    // expect(heading).toBeInTheDocument();
    expect(screen.getByText(/react/i)).toBeInTheDocument();

    // Get the phone by regular expression
    const phoneRegex = /\d{3}-\d{3}-\d{4}/;
    const phoneText = screen.getByText(phoneRegex);
    expect(phoneText).toBeInTheDocument();

    // 2. queryByText
    const errorMsg = screen.queryByText("Error message");
    expect(errorMsg).not.toBeInTheDocument();

    // 3. getAllByText
    const items = screen.getAllByText("Item 1");
    expect(items).toHaveLength(4);
  });
});
