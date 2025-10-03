import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Sandbox = () => {
  // Create state values for count and like
  const [count, setCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // Set state change handler functions
  const handleDecrease = () => {
    setCount((c) => c - 1);
  };
  const handleIncrease = () => {
    setCount((c) => c + 1);
  };
  const handleToggleLike = () => {
    setIsLiked((iL) => !iL);
  };

  // Returned JSX
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Count: {count}</h2>
      <button
        onClick={handleDecrease}
        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
      >
        Decrease
      </button>
      <button
        onClick={handleIncrease}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Increase
      </button>
      <div>
        {isLiked ? (
          <button
            onClick={handleToggleLike}
            className="block mx-auto text-2xl text-red-500 mt-16"
          >
            <FaHeart />
          </button>
        ) : (
          <button
            onClick={handleToggleLike}
            className="block mx-auto text-2xl text-red-500 mt-16"
          >
            <FaRegHeart />
          </button>
        )}
      </div>
    </div>
  );
};
export default Sandbox;
