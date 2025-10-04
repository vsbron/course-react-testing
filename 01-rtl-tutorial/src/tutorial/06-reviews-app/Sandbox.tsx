import { useState } from "react";
import Form from "./Form";
import List from "./List";

// Review type
export type Review = {
  email: string;
  rating: string;
  text: string;
};

const Sandbox = () => {
  // Create state value for reviews
  const [reviews, setReviews] = useState<Review[]>([]);

  // Add review handler function
  const addReview = (review: Review) => {
    setReviews((revs) => [...revs, review]);
  };

  // Returned JSX
  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Reviews App</h1>
      <Form onSubmit={addReview} />
      <List reviews={reviews} />
    </div>
  );
};
export default Sandbox;
