import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReviewForm = ({ bookId, onReviewAdded }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axiosSecure.post("/reviews", {
        bookId,
        email: user.email,
        rating,
        review,
      });
      setRating(0);
      setReview("");
      if (onReviewAdded) onReviewAdded();
    } catch {
      setError("Failed to submit review.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
      <label className="font-semibold">Your Rating:</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="select select-bordered w-32"
        required
      >
        <option value={0}>Select</option>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num} Star{num > 1 ? "s" : ""}
          </option>
        ))}
      </select>
      <label className="font-semibold">Your Review:</label>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="textarea textarea-bordered"
        rows={3}
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="btn btn-primary btn-sm"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
