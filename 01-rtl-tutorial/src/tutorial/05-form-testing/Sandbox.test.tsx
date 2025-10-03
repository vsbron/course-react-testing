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
});
