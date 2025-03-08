import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";
// import ApiKeyWarning from "../components/ApiKeyWarning";
import { useMovies } from "../contexts/MovieContext";

const HomePage = () => {
  const { searchResults, apiKeyValid } = useMovies();

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">
        Find Your Favorite Movies
      </h1>

      {/* {!apiKeyValid && <ApiKeyWarning />} */}

      <SearchBar />

      {searchResults.length > 0 && (
        <>
          <Filters />
          <MovieList />
          <Pagination />
        </>
      )}

      {apiKeyValid && searchResults.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            Search for movies, TV shows, and series
          </p>
          <p className="text-gray-500 dark:text-gray-500">
            Enter a title in the search bar above to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
