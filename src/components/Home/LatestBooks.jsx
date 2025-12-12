import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Container from "../Shared/Container";
import Heading from "../Shared/Heading";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

const LatestBooks = () => {
  const navigate = useNavigate();
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/books`);
      return result.data;
    },
  });

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  if (isLoading) return <LoadingSpinner />;

  // Filter books by search
  let filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort books by price
  if (sort === "low") {
    filteredBooks = [...filteredBooks].sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filteredBooks = [...filteredBooks].sort((a, b) => b.price - a.price);
  }

  // Take last 6 items assuming API returns chronological list
  const latestSix = filteredBooks.slice(-6).reverse();

  return (
    <Container>
      <Heading title="Latest Books" />
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered w-full md:w-1/4"
        >
          <option value="">Sort by price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {latestSix.map((book) => (
          <Link
            key={book._id}
            to={`/book/${book._id}`}
            className="card bg-base-100 rounded shadow p-4 flex flex-col items-center hover:bg-base-200 hover:border-primary hover:shadow-lg transition-all duration-200 cursor-pointer border border-base-300"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img
              src={book.image}
              alt={book.name}
              className="h-40 w-32 object-cover mb-2 rounded"
            />
            <h3 className="font-bold text-base-content text-lg mb-1">
              {book.name}
            </h3>
            <p className="text-sm text-base-content/70 mb-1">{book.category}</p>
            <p className="text-sm text-base-content/70 mb-2">
              {book.description}
            </p>
            <span className="font-semibold text-primary mb-2">
              ${book.price}
            </span>
            <button
              className="mt-2 px-4 py-2 btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/book/${book._id}`);
              }}
            >
              Buy Now
            </button>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link to="/books" className="btn btn-outline btn-primary">
          View All Books
        </Link>
      </div>
    </Container>
  );
};

export default LatestBooks;
