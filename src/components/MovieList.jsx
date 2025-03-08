import MovieCard from "./MovieCard";
import { useMovies } from "../contexts/MovieContext";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";

const MovieList = () => {
  const { searchResults, loading, error } = useMovies();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (searchResults.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          No movies found. Try a different search term or adjust your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {searchResults.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
