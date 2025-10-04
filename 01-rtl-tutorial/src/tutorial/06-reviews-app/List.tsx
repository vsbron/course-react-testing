import { type Review } from "./Sandbox";

// Props type
type ListProps = {
  reviews: Review[];
};

// The component
const List = ({ reviews }: ListProps) => {
  // Returned JSX
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((review, i) => (
          <article key={i} className="border p-4 rounded mb-4">
            <div className="font-bold">{review.email}</div>
            <div className="text-yellow-500">
              {"⭐".repeat(Number(review.rating))}
            </div>
            <p className="mt-2">{review.text}</p>
          </article>
        ))
      )}
    </div>
  );
};

export default List;
