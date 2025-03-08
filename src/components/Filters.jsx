"use client"

import { useMovies } from "../contexts/MovieContext"

const Filters = () => {
  const { filters, updateFilters } = useMovies()

  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i)

  const handleYearChange = (e) => {
    updateFilters({ year: e.target.value })
  }

  const handleTypeChange = (e) => {
    updateFilters({ type: e.target.value })
  }

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-3">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="year" className="block mb-1 text-sm font-medium">
            Release Year
          </label>
          <select id="year" value={filters.year} onChange={handleYearChange} className="input">
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="type" className="block mb-1 text-sm font-medium">
            Type
          </label>
          <select id="type" value={filters.type} onChange={handleTypeChange} className="input">
            <option value="">All Types</option>
            <option value="movie">Movies</option>
            <option value="series">TV Series</option>
            <option value="game">Games</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Filters

