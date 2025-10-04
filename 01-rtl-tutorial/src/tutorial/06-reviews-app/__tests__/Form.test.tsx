import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../Form";
import { type Review } from "../Sandbox";

// Helper function to get all form values
export const getFormElements = () => {
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const ratingSelect = screen.getByRole("combobox", { name: /rating/i });
  const textArea = screen.getByRole("textbox", { name: /text/i });
  const submitButton = screen.getByRole("button", { name: /submit review/i });
  // Return the inputs
  return { emailInput, ratingSelect, textArea, submitButton };
};

describe("Review Form", () => {
  // Mock onsubmit function
  const mockOnSubmit = vi.fn();

  // Clear mock function before every test
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  // TEST #1
  test("renders form elements correctly", () => {
    // render the form component
    render(<Form onSubmit={mockOnSubmit} />);

    // Get the input elements
    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();

    // Check the initial value of the inputs
    expect(emailInput).toHaveValue("");
    expect(ratingSelect).toHaveValue("");
    expect(textArea).toHaveValue("");
    expect(submitButton).toBeInTheDocument();
  });

  // TEST #2
  test("shows error message when review is too short", async () => {
    // Get the user
    const user = userEvent.setup();

    // render the form component
    render(<Form onSubmit={mockOnSubmit} />);

    // Get the input elements
    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();

    // Fill the inputs with short review and submit it
    await user.type(emailInput, "test@test.com");
    await user.selectOptions(ratingSelect, "5");
    await user.type(textArea, "short");
    await user.click(submitButton);

    // Check for error message
    expect(screen.getByText(/review must be at least 10 characters long/i));

    // Check whether onsubmit wasn't called
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  // TEST #3
  test("submits form with valid data", async () => {
    // Get the user
    const user = userEvent.setup();

    // render the form component
    render(<Form onSubmit={mockOnSubmit} />);

    // Get the input elements
    const { emailInput, ratingSelect, textArea, submitButton } =
      getFormElements();

    // Fill the inputs with valid data
    await user.type(emailInput, "test@test.com");
    await user.selectOptions(ratingSelect, "5");
    await user.type(textArea, "Great service indeed");
    await user.click(submitButton);

    // Check whether onsubmit was called once with correct data
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: "test@test.com",
      rating: "5",
      text: "Great service indeed",
    });
  });
});
