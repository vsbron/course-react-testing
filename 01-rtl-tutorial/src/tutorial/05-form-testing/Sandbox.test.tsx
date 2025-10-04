import { render, screen } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import Sandbox from "./Sandbox";

// Set the form elements selector
const getFormElements = () => {
  const elements = {
    emailInput: screen.getByRole("textbox", { name: /email/i }),
    passwordInput: screen.getByLabelText("Password:"),
    confirmPasswordInput: screen.getByLabelText("Confirm password:"),
    submitButton: screen.getByRole("button", { name: /submit/i }),
  };
  return elements;
};

describe("05-form-testing", () => {
  let user: UserEvent;

  // Do before each test
  beforeEach(() => {
    // Get the user (must come first)
    user = userEvent.setup();

    // Render the sandbox
    render(<Sandbox />);
  });

  // TEST #1
  test("inputs should be initially empty", () => {
    // Get the input elements
    const { emailInput, passwordInput, confirmPasswordInput } =
      getFormElements();

    // Debug the screen
    screen.debug();

    // Get the inputs` field
    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
    expect(confirmPasswordInput).toHaveValue("");
  });

  // TEST #2
  test("should be able to type in the input", async () => {
    // Get the input elements
    const { emailInput, passwordInput, confirmPasswordInput } =
      getFormElements();

    // Test the typings
    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "123456");
    await user.type(confirmPasswordInput, "123456");

    // Test the values
    expect(emailInput).toHaveValue("test@test.com");
    expect(passwordInput).toHaveValue("123456");
    expect(confirmPasswordInput).toHaveValue("123456");
  });

  // TEST #3
  test("should show email error if email is invalid", async () => {
    // Get the input elements
    const { emailInput, submitButton } = getFormElements();

    // Check if there's no email error message
    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();

    // Type the invalid email
    await user.type(emailInput, "invalid");
    await user.click(submitButton);

    // Check if there's is email error message
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });

  // TEST #4
  test("should show password error if password is less than 5 characters", async () => {
    // Get the input elements
    const { emailInput, submitButton, passwordInput } = getFormElements();

    // Check if there's no password error message
    expect(
      screen.queryByText(/password must be at least 5 characters/i)
    ).not.toBeInTheDocument();

    // Type the invalid password
    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "1234");
    await user.click(submitButton);

    // Check if there's is password error message
    expect(
      screen.getByText(/password must be at least 5 characters/i)
    ).toBeInTheDocument();
  });

  // TEST #5
  test("should show confirm password error if passwords do not match", async () => {
    // Get the input elements
    const { emailInput, submitButton, passwordInput, confirmPasswordInput } =
      getFormElements();

    // Check if there's no confirm password error message
    expect(
      screen.queryByText(/passwords do not match/i)
    ).not.toBeInTheDocument();

    // Type the invalid confirm password
    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "123456");
    await user.type(confirmPasswordInput, "1234567");
    await user.click(submitButton);

    // Check if there's is confirm password error message
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  // TEST #6
  test("valid inputs show no errors and clears fields", async () => {
    // Get the input elements
    const { emailInput, submitButton, passwordInput, confirmPasswordInput } =
      getFormElements();

    // Type the all the confirm values
    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "123456");
    await user.type(confirmPasswordInput, "123456");
    await user.click(submitButton);

    // Check if there's no error messages
    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/password must be at least 5 characters/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/passwords do not match/i)
    ).not.toBeInTheDocument();

    // Check if all values are empty after submit
    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
    expect(confirmPasswordInput).toHaveValue("");
  });
});
