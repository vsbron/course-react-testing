import { render, screen } from "@testing-library/react";
import List from "../List";
import { type Review } from "../Sandbox";

// Dummy reviews for testing
const mockReviews: Review[] = [
  {
    email: "test@example.com",
    rating: "4",
    text: "Great product",
  },
  {
    email: "user@example.com",
    rating: "5",
    text: "Excellent service",
  },
];

// TESTS
describe("List component", () => {
  // TEST #1
  test("renders heading", () => {
    // Render the empty List
    render(<List reviews={[]} />);

    // Check the header
    expect(
      screen.getByRole("heading", { level: 2, name: /reviews/i })
    ).toBeInTheDocument();
  });

  // TEST #2
  test("displays No reviews yet when reviews array is empty", () => {
    // Render the empty List
    render(<List reviews={[]} />);

    // Check the header
    expect(screen.getByText("No reviews yet")).toBeInTheDocument();
  });

  // TEST #3
  test("renders reviews correctly when provided", () => {
    // Render the List with mock data
    render(<List reviews={mockReviews} />);

    // Go through reviews, locate each on the page
    mockReviews.forEach((review) => {
      expect(screen.getByText(review.email)).toBeInTheDocument();
      expect(screen.getByText(review.text)).toBeInTheDocument();
      const stars = "⭐".repeat(Number(review.rating));
      expect(screen.getByText(stars)).toBeInTheDocument();
    });
  });
});
