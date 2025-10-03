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
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();

    fireEvent.click(increaseButton);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
    fireEvent.click(decreaseButton);
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
  });

  test("should increment and decrement count with userEvent", async () => {
    // Render the sandbox
    render(<Sandbox />);

    // Get the user from userEvent
    const user = userEvent.setup();

    // Get the buttons and check for the count
    const increaseButton = screen.getByRole("button", { name: /increase/i });
    const decreaseButton = screen.getByRole("button", { name: /decrease/i });
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();

    await user.click(increaseButton);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
    await user.click(decreaseButton);
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
  });

  test("like and unlike buttons", async () => {
    // Render the sandbox
    render(<Sandbox />);

    // Get the user from userEvent
    const user = userEvent.setup();

    // Check the like/unlike buttons before the user clicks
    const unlikeButton = screen.getByRole("button", { name: "unlike button" });
    expect(unlikeButton).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "like button" })
    ).not.toBeInTheDocument();
    await user.click(unlikeButton);

    // Check the like/unlike buttons after the user clicks
    const likeButton = screen.getByRole("button", { name: "like button" });
    expect(likeButton).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "unlike button" })
    ).not.toBeInTheDocument();
  });
});
