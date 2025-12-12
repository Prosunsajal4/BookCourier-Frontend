import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Books = () => {
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

  let filtered = books.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );
  if (sort === "low")
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "high")
    filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <Container>
      <Heading title="All Books" />
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
        {filtered.map((book) => (
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
              View Details
            </button>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default Books;
