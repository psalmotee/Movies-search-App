import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import MovieDetailsPage from "./pages/MovieDetailsPage"
import FavoritesPage from "./pages/FavoritesPage"
import { ThemeProvider } from "./contexts/ThemeContext"
import { MovieProvider } from "./contexts/MovieContext"

function App() {
  return (
    <ThemeProvider>
      <MovieProvider>
        <Router>
          <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 dark:text-white">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movie/:id" element={<MovieDetailsPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </MovieProvider>
    </ThemeProvider>
  )
}

export default App

