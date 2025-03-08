"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { searchMovies, getMovieDetails, isValidApiKey } from "../services/api";

const MovieContext = createContext();

export const useMovies = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [apiKeyValid, setApiKeyValid] = useState(isValidApiKey());
  const [filters, setFilters] = useState({
    year: "",
    type: "",
  });

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Error parsing favorites from localStorage:", e);
        localStorage.removeItem("favorites");
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const search = async (term, page = 1, filters = {}) => {
    if (!term) return;
    if (!apiKeyValid) {
      setError("Invalid API Key. Please set a valid OMDB API key.");
      return;
    }

    setLoading(true);
    setError(null);
    setSearchTerm(term);
    setCurrentPage(page);

    try {
      const data = await searchMovies(term, page, filters);

      if (data.Response === "True") {
        setSearchResults(data.Search);
        setTotalResults(Number.parseInt(data.totalResults, 10));
      } else {
        setSearchResults([]);
        setTotalResults(0);
        setError(data.Error || "No results found");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch movies. Please try again later.");
      setSearchResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const getMovieById = async (id) => {
    if (!apiKeyValid) {
      setError("Invalid API Key. Please set a valid OMDB API key.");
      setLoading(false);
      return;
    }

    if (!id) {
      setError("Movie ID is required");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log(`Fetching movie with ID: ${id}`);
      const data = await getMovieDetails(id);

      if (data.Response === "True") {
        console.log("Successfully fetched movie details:", data.Title);
        setSelectedMovie(data);
      } else {
        console.error("API returned error:", data.Error);
        setError(data.Error || "Failed to fetch movie details");
        setSelectedMovie(null);
      }
    } catch (err) {
      console.error("Error in getMovieById:", err);
      setError("Failed to fetch movie details. Please try again later.");
      setSelectedMovie(null);
    } finally {
      setLoading(false);
    }
  };

  const resetSelectedMovie = () => {
    setSelectedMovie(null);
  };

  const addToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((movie) => movie.imdbID !== id));
  };

  const isMovieFavorite = (id) => {
    return favorites.some((movie) => movie.imdbID === id);
  };

  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
    search(searchTerm, 1, { ...filters, ...newFilters });
  };

  const changePage = (page) => {
    search(searchTerm, page, filters);
  };

  return (
    <MovieContext.Provider
      value={{
        searchResults,
        selectedMovie,
        favorites,
        loading,
        error,
        totalResults,
        currentPage,
        filters,
        apiKeyValid,
        search,
        getMovieById,
        resetSelectedMovie,
        addToFavorites,
        removeFromFavorites,
        isMovieFavorite,
        updateFilters,
        changePage,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
