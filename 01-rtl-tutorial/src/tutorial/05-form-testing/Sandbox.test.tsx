import { render, screen, logRoles, fireEvent } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import Sandbox from "./Sandbox";

describe("05-form-testing", () => {
  test("inputs should be initially empty", () => {
    // Render the sandbox
    const { container } = render(<Sandbox />);
    logRoles(container); //Log the roles

    // Debug the screen
    screen.debug();

    // Get the email input field
    const emailInputElement = screen.getByRole("textbox", { name: /email/i });
    expect(emailInputElement).toHaveValue("");

    // Get the passwords input field
    const passwordInput = screen.getByLabelText("Password:");
    expect(passwordInput).toHaveValue("");
    const confirmPasswordInput = screen.getByLabelText("Confirm password:");
    expect(confirmPasswordInput).toHaveValue("");
  });

  test("should be able to type in the input", async () => {
    render(<Sandbox />);
    // Get the user
    const user = userEvent.setup();

    // Get the input fields
    const emailInputElement = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText("Password:");
    const confirmPasswordInput = screen.getByLabelText("Confirm password:");

    // Test the typings
    await user.type(emailInputElement, "test@test.com");
    await user.type(passwordInput, "123456");
    await user.type(confirmPasswordInput, "123456");

    // Test the values
    expect(emailInputElement).toHaveValue("test@test.com");
    expect(passwordInput).toHaveValue("123456");
    expect(confirmPasswordInput).toHaveValue("123456");
  });
});
