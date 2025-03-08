"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useMovies } from "../contexts/MovieContext";

const SearchBar = () => {
  const { search } = useMovies();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      search(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies, series, or TV Shows..."
          className="input pr-12"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
