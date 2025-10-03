import { render, screen, logRoles, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sandbox from "./Sandbox";

describe("04-user-interactions", () => {
  test("Screen debug", () => {
    // Render the sandbox
    const { container } = render(<Sandbox />);
    logRoles(container); // Log the roles

    // Debug the screen
    screen.debug();
  });

  test("should increment and decrement count with fireEvent", () => {
    // Render the sandbox
    render(<Sandbox />);

    // Get the buttons and check for the count
    const increaseButton = screen.getByRole("button", { name: /increase/i });
    const decreaseButton = screen.getByRole("button", { name: /decrease/i });
    expect(screen.getByText(/count: 0/i));
  });
});
