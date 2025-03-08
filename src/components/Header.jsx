"use client";

import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { Sun, Moon, Film, Heart } from "lucide-react";

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md dark:bg-gray-800 dark:text-white z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <Film className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span>Movie Search</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/favorites"
              className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Heart className="h-5 w-5" />
              <span>Favorites</span>
            </Link>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
