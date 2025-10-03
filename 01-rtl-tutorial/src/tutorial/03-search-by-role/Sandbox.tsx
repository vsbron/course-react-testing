import { useEffect, useState } from "react";

const Sandbox = () => {
  // Create state values for async button and error
  const [showAsyncButton, setShowAsyncButton] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  // useEffect function that enables async button
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAsyncButton(true);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Returned JSX
  return (
    <div>
      {/* NAV */}
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>

      {/* HEADINGS */}
      <h1>Heading</h1>
      <h2>Heading</h2>
      <img src="example.jpg" alt="Example" />

      {/* REGULAR BUTTONS */}
      <button>Click</button>
      <button>Submit</button>
      <button>Cancel</button>

      {/* CONDITIONAL ERROR FOR queryByRole */}
      {showError && <button>Error</button>}

      {/* ASYNC BUTTON FOR findByRole */}
      {showAsyncButton && <button>Async button</button>}
    </div>
  );
};
export default Sandbox;
