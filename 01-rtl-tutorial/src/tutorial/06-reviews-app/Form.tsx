import { FormEvent, useState } from "react";
import { Review } from "./Sandbox";

// Props type
type FormProps = {
  onSubmit: (review: Review) => void;
};

//
const Form = ({ onSubmit }: FormProps) => {
  // Create state values for form fields and error
  const [email, setEmail] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [textError, setTextError] = useState<string>("");

  // Form submit handler
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // Prevent default behavior
    e.preventDefault();

    if (text.length >= 10) {
      // Add a review
      const newReview = { email, rating, text };
      onSubmit(newReview);

      // Reset the fields
      setEmail("");
      setRating("");
      setText("");
      setTextError("");
    } else {
      // Display error
      setTextError("Review must be at least 10 characters long");
    }
  };

  // Returned JSX
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="rating" className="block mb-2">
          Rating
        </label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select rating</option>
          {[5, 4, 3, 2, 1].map((num) => (
            <option key={num} value={num}>
              {num} star{num > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="text" className="block mb-2">
          Text
        </label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-2 rounded"
          rows={4}
          required
        />
        {textError && <p className="text-red-500 text-sm mt-1">{textError}</p>}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 self-start"
      >
        Submit Review
      </button>
    </form>
  );
};

export default Form;
