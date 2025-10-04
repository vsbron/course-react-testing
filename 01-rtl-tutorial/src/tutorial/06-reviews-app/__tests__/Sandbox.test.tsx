import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sandbox from "../Sandbox";
import { getFormElements } from "./Form.test";

describe("Reviews App", () => {
  // TEST #1
  test("renders Reviews App title", () => {
    // Render the sandbox
    render(<Sandbox />);

    // Get the header and check if it exists on the page
    const header = screen.getByRole("heading", {
      level: 1,
      name: /reviews app/i,
    });
    expect(header).toBeInTheDocument();
  });

  // TEST #2
  test("adds a new review when form is submitted", async () => {
    // Get the user
    const user = userEvent.setup();

    // Render the sandbox
    render(<Sandbox />);

    // Get the form input elements
    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();

    // Check if there's no article for now
    expect(screen.queryAllByRole("article")).toHaveLength(0);

    // Fill the values and submit the form
    await user.type(emailInput, "test@test.com");
    await user.selectOptions(ratingSelect, "5");
    await user.type(textArea, "This is a great product!");
    await user.click(submitButton);

    // Check if the review was submitted
    expect(screen.getByText("test@test.com")).toBeInTheDocument();
    expect(screen.getByText("⭐".repeat(5))).toBeInTheDocument();
    expect(screen.getByText("This is a great product!")).toBeInTheDocument();

    // Check if there's an article now
    expect(screen.getAllByRole("article")).toHaveLength(1);
  });
});
