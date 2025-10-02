import { useEffect, useState } from "react";

const Sandbox = () => {
  // Create state values for message and error
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  // useEffect function that changes showMessage state
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <h1>React Testing Library examples</h1>
      <p>You can search me with regular expression: 123-456-7890</p>
      {showError && <p>Error message</p>}
      <ul>
        <li>Item 1</li>
        <li>Item 1</li>
        <li>Item 1</li>
        <li>Item 1</li>
      </ul>
      {showMessage && <p>Async message</p>}
    </div>
  );
};
export default Sandbox;
