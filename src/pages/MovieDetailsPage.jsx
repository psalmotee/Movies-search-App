"use client";

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovies } from "../contexts/MovieContext";
import { Heart, ArrowLeft, Star } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import ApiKeyWarning from "../components/ApiKeyWarning";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    selectedMovie,
    loading,
    error,
    getMovieById,
    resetSelectedMovie,
    addToFavorites,
    removeFromFavorites,
    isMovieFavorite,
    apiKeyValid,
  } = useMovies();

  useEffect(() => {
    console.log("MovieDetailsPage mounted with ID:", id);

    if (id) {
      getMovieById(id);
    }

    // Clean up function to reset selectedMovie when component unmounts
    return () => {
      console.log("MovieDetailsPage unmounting, resetting selectedMovie");
      resetSelectedMovie();
    };
  }, [id, getMovieById, resetSelectedMovie]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const isFavorite = selectedMovie
    ? isMovieFavorite(selectedMovie.imdbID)
    : false;

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(selectedMovie.imdbID);
    } else {
      addToFavorites(selectedMovie);
    }
  };

  // Back button that's always shown
  const BackButton = () => (
    <button
      onClick={handleGoBack}
      className="flex items-center gap-1 mb-6 hover:text-blue-600 dark:hover:text-blue-400"
    >
      <ArrowLeft className="h-5 w-5" />
      <span>Back</span>
    </button>
  );

  if (!apiKeyValid) {
    return (
      <div>
        <BackButton />
        <ApiKeyWarning />
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <BackButton />
        <div className="py-12">
          <LoadingSpinner />
          <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
            Loading movie details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <BackButton />
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!selectedMovie) {
    return (
      <div>
        <BackButton />
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            No movie details found. Please try again or select a different
            movie.
          </p>
        </div>
      </div>
    );
  }

  // Use a placeholder image if poster is not available
  const posterUrl =
    selectedMovie.Poster && selectedMovie.Poster !== "N/A"
      ? selectedMovie.Poster
      : "/placeholder.svg?height=600&width=400";

  return (
    <div>
      <BackButton />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={posterUrl || "/placeholder.svg"}
              alt={`${selectedMovie.Title} poster`}
              className="w-full object-cover"
              onError={(e) => {
                e.target.src = "/placeholder.svg?height=600&width=400";
              }}
            />
          </div>

          <button
            onClick={handleFavoriteClick}
            className={`mt-4 w-full btn flex items-center justify-center gap-2 ${
              isFavorite
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "btn-primary"
            }`}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            <span>
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </span>
          </button>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{selectedMovie.Title}</h1>

          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
            <span>{selectedMovie.Year}</span>
            <span>•</span>
            <span>{selectedMovie.Rated}</span>
            <span>•</span>
            <span>{selectedMovie.Runtime}</span>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
            <span className="font-semibold">{selectedMovie.imdbRating}</span>
            <span className="text-gray-600 dark:text-gray-400">/ 10</span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Plot</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {selectedMovie.Plot}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Details</h2>
              <ul className="space-y-2">
                <li>
                  <span className="font-medium">Genre: </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedMovie.Genre}
                  </span>
                </li>
                <li>
                  <span className="font-medium">Director: </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedMovie.Director}
                  </span>
                </li>
                <li>
                  <span className="font-medium">Writer: </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedMovie.Writer}
                  </span>
                </li>
                <li>
                  <span className="font-medium">Actors: </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedMovie.Actors}
                  </span>
                </li>
                <li>
                  <span className="font-medium">Language: </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedMovie.Language}
                  </span>
                </li>
                <li>
                  <span className="font-medium">Country: </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedMovie.Country}
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Awards & Ratings</h2>
              <ul className="space-y-2">
                <li>
                  <span className="font-medium">Awards: </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedMovie.Awards}
                  </span>
                </li>
                <li>
                  <span className="font-medium">Metascore: </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedMovie.Metascore}
                  </span>
                </li>
                <li>
                  <span className="font-medium">IMDb Votes: </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedMovie.imdbVotes}
                  </span>
                </li>
                <li>
                  <span className="font-medium">Box Office: </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedMovie.BoxOffice || "N/A"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
