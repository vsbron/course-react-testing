import { render, screen, logRoles } from "@testing-library/react";
import Sandbox from "./Sandbox";

describe("03-search-by-role", () => {
  test("renders nav and navigation links", () => {
    // Render the sandbox
    const { container } = render(<Sandbox />);
    logRoles(container); // Lists all available roles

    // Check the navigation
    expect(screen.getByRole("navigation")).toBeInTheDocument();

    // Check the links
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  });

  test("renders headings with correct hierarchy", () => {
    // Render the sandbox
    render(<Sandbox />);

    // Check the headings by level
    expect(screen.getByRole("heading", { name: "Heading", level: 1 }));
    expect(screen.getByRole("heading", { name: "Heading", level: 2 }));
  });

  test("renders image with alt text", () => {
    // Render the sandbox
    render(<Sandbox />);

    // Check the image
    expect(screen.getByRole("img", { name: "Example" })).toBeInTheDocument();
  });

  test("renders initial buttons", () => {
    // Render the sandbox
    render(<Sandbox />);

    // Check the buttons
    expect(screen.getByRole("button", { name: "Click" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getAllByRole("button"));
  });

  test("error button is not visible", () => {
    // Render the sandbox
    render(<Sandbox />);

    // Check the button
    expect(
      screen.queryByRole("button", { name: "Error" })
    ).not.toBeInTheDocument();
  });

  test("async button is not initially visible", async () => {
    // Render the sandbox
    render(<Sandbox />);

    // Check whether async button is visible initially and later
    const btnName = /async button/i;
    expect(
      screen.queryByRole("button", { name: btnName })
    ).not.toBeInTheDocument();

    const asyncButton = await screen.findByRole("button", {
      name: btnName,
    });
    expect(asyncButton).toBeInTheDocument();
  });
});
