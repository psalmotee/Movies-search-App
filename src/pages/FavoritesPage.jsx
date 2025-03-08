"use client"

import { Link } from "react-router-dom"
import { useMovies } from "../contexts/MovieContext"
import MovieCard from "../components/MovieCard"
import { Trash2 } from "lucide-react"

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useMovies()

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all favorites?")) {
      favorites.forEach((movie) => removeFromFavorites(movie.imdbID))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Favorites</h1>

        {favorites.length > 0 && (
          <button onClick={handleClearAll} className="btn btn-secondary flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">You haven't added any favorites yet</p>
          <p className="text-gray-500 dark:text-gray-500 mb-6">
            Search for movies and click the heart icon to add them to your favorites
          </p>
          <Link to="/" className="btn btn-primary">
            Search Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesPage

