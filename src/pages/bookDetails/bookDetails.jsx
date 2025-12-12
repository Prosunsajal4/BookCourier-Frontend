import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import ReviewForm from "../../components/Book/ReviewForm";

import useRole from "../../hooks/useRole";

const BookDetails = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  // removed unused canReview
  const [hasPaid, setHasPaid] = useState(false);
  const [role] = useRole();
  // All state declarations are above, remove duplicates
  // ...existing code...
  // ...existing code...

  const {
    data: book,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/books/${id}`);
      return result.data;
    },
  });

  // Check if book is wishlisted
  useEffect(() => {
    if (!user?.email || !id) return;
    axiosSecure
      .get(`/wishlist/check?email=${user.email}&bookId=${id}`)
      .then((res) => setWishlisted(res.data?.wishlisted))
      .catch(() => setWishlisted(false));
  }, [user?.email, id, axiosSecure]);

  const handleWishlist = async () => {
    if (!user?.email) return;
    setWishlistLoading(true);
    try {
      if (wishlisted) {
        await axiosSecure.delete(`/wishlist?email=${user.email}&bookId=${id}`);
        setWishlisted(false);
      } else {
        await axiosSecure.post(`/wishlist`, { email: user.email, bookId: id });
        setWishlisted(true);
      }
    } catch (err) {
      console.error("Wishlist toggle failed", err);
    }
    setWishlistLoading(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Review/rating logic
  useEffect(() => {
    if (!id) return;
    axios
      .get(`${import.meta.env.VITE_API_URL}/reviews?bookId=${id}`)
      .then((res) => setReviews(res.data || []))
      .finally(() => setReviewsLoading(false));
  }, [id]);

  // Check payment/ordering status
  useEffect(() => {
    if (!user?.email || !id) return;
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/orders/check?email=${
          user.email
        }&bookId=${id}`
      )
      .then((res) => {
        setHasPaid(res.data?.ordered && res.data?.paid);
      })
      .catch(() => {
        setHasPaid(false);
      });
  }, [user?.email, id]);

  if (isLoading) return <LoadingSpinner />;
  if (isError || !book)
    return (
      <div className="text-center text-red-500 py-10">
        Book not found or server error.
      </div>
    );
  const { image, name, description, category, quantity, price, seller } = book;

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">
        {/* Header */}
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <div className="w-full overflow-hidden rounded-xl">
              <img
                className="object-cover w-full"
                src={image}
                alt="header image"
              />
            </div>
          </div>
        </div>
        <div className="md:gap-10 flex-1">
          {/* book Info */}
          <Heading title={name} subtitle={`Category: ${category}`} />
          <hr className="my-6" />
          <div className="text-lg font-light text-neutral-500">
            {description}
          </div>
          <hr className="my-6" />
          <div className="text-xl font-semibold flex flex-row items-center gap-2">
            <div>Seller: {seller?.name}</div>
            <img
              className="rounded-full"
              height="30"
              width="30"
              alt="Avatar"
              referrerPolicy="no-referrer"
              src={seller?.image}
            />
          </div>
          <hr className="my-6" />
          <div>
            <p className="gap-4 font-light text-neutral-500">
              Quantity: {quantity} Units Left Only!
            </p>
          </div>
          <hr className="my-6" />
          <div className="flex justify-between items-center gap-2">
            <p className="font-bold text-3xl text-gray-500">Price: {price}$</p>
            <div className="flex gap-2">
              <Button onClick={() => setIsOpen(true)} label="Purchase" />
              {user?.email && (
                <button
                  className={`btn btn-outline btn-sm ${
                    wishlisted ? "btn-success" : "btn-primary"
                  }`}
                  onClick={handleWishlist}
                  disabled={wishlistLoading}
                >
                  {wishlisted ? "Wishlisted" : "Add to Wishlist"}
                </button>
              )}
            </div>
          </div>
          <hr className="my-6" />
          <PurchaseModal book={book} closeModal={closeModal} isOpen={isOpen} />
          <hr className="my-6" />
          <div>
            <h2 className="font-bold text-xl mb-2">Reviews & Ratings</h2>
            {role === "admin" ? (
              reviewsLoading ? (
                <LoadingSpinner />
              ) : (
                <div className="space-y-4">
                  {reviews.length === 0 && <p>No reviews yet.</p>}
                  {reviews.length > 0 && (
                    <div className="mb-2">
                      <span className="font-semibold">Average Rating: </span>
                      {(
                        reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
                        reviews.length
                      ).toFixed(1)}{" "}
                      / 5
                    </div>
                  )}
                  {reviews.map((r, idx) => (
                    <div key={idx} className="border rounded p-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{r.email}</span>
                        <span className="text-yellow-500">
                          {"★".repeat(r.rating)}
                        </span>
                      </div>
                      <div>{r.review}</div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <p className="text-gray-500">Only admin can see reviews.</p>
            )}
            {/* Only show review form after payment */}
            {hasPaid && (
              <ReviewForm
                bookId={id}
                onReviewAdded={() => {
                  setReviewsLoading(true);
                  axios
                    .get(`${import.meta.env.VITE_API_URL}/reviews?bookId=${id}`)
                    .then((res) => setReviews(res.data || []))
                    .finally(() => setReviewsLoading(false));
                }}
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BookDetails;
