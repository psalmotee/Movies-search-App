"use client";

import { useMovies } from "../contexts/MovieContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
  const { totalResults, currentPage, changePage } = useMovies();

  const totalPages = Math.ceil(totalResults / 10); // OMDB API returns 10 results per page

  if (totalPages <= 1) return null;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  };

  // Create an array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are fewer than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Calculate start and end of page range
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        end = Math.min(totalPages - 1, maxPagesToShow - 1);
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - maxPagesToShow + 2);
      }

      // Add ellipsis if needed
      if (start > 2) {
        pageNumbers.push("...");
      }

      // Add page numbers
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always show last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center mt-8 gap-2">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-3 py-1">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => changePage(page)}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;
