"use client";

import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useMovies } from "../contexts/MovieContext";

const MovieCard = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, isMovieFavorite } = useMovies();
  const isFavorite = isMovieFavorite(movie.imdbID);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  // Use a placeholder image if poster is not available
  const posterUrl =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "/placeholder.svg?height=450&width=300";

  return (
    <div className="card">
      <Link
        to={`/movie/${movie.imdbID}`}
        className="block relative"
        onClick={(e) => {
          // Prevent default if the favorite button was clicked
          if (e.target.closest("button")) {
            e.preventDefault();
          }
        }}
      >
        <img
          src={posterUrl || "/placeholder.svg"}
          alt={`${movie.Title} poster`}
          className="w-full h-64 object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src = "/placeholder.svg?height=450&width=300";
          }}
        />
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-gray-800/70 text-white hover:bg-red-500"
          }`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
        </button>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">
            {movie.Title}
          </h3>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{movie.Year}</span>
            <span>{movie.Type}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
