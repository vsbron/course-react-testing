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
  ``;
});
