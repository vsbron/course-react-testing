import { useState } from "react";
import validator from "validator";

const labelStyles = "block text-grey-700 font-medium mb-2";
const inputStyles = "w-full px-3 py-2 border border-gray-300 rounded-md";
const buttonStyles =
  "w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600";
const defaultFormState = {
  email: "",
  password: "",
  confirmPassword: "",
};

const Sandbox = () => {
  // Create state values for inputs and error
  const [signUpInput, setSignUpInput] = useState(defaultFormState);
  const [error, setError] = useState<string>("");

  // Create handler functions
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignUpInput((prevInputs) => ({ ...prevInputs, [id]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    if (!validator.isEmail(signUpInput.email)) {
      return setError("Invalid email");
    }
    if (!validator.isLength(signUpInput.password, { min: 5 })) {
      return setError("Password must be at least 5 characters");
    }
    if (signUpInput.confirmPassword !== signUpInput.password) {
      return setError("Passwords do not match");
    }
    setError("");
    setSignUpInput(defaultFormState);
  };

  // Returned JSX
  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded-lg shadow-mg">
      <form className="space-y-4">
        <div className="mb-3">
          {/* Email input */}
          <label htmlFor="email" className={labelStyles}>
            Email address:
          </label>
          <input
            type="email"
            id="email"
            value={signUpInput.email}
            onChange={handleChange}
            className={inputStyles}
          />

          {/* Password input */}
          <label htmlFor="password" className={labelStyles}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={signUpInput.password}
            onChange={handleChange}
            className={inputStyles}
          />

          {/* Confirm password input */}
          <label htmlFor="confirmPassword" className={labelStyles}>
            Confirm password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={signUpInput.confirmPassword}
            onChange={handleChange}
            className={inputStyles}
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit button */}
        <button type="button" onClick={handleSubmit} className={buttonStyles}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default Sandbox;
