import axios from "axios";

// This should be replaced with your actual OMDB API key
const API_KEY = "afd74dab";
const BASE_URL = "https://www.omdbapi.com/";

// Check if API key is valid (not the placeholder)
export const isValidApiKey = () => {
  return API_KEY !== "YOUR_OMDB_API_KEY" && API_KEY.length > 5;
};

// Create axios instance with common configuration
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
});

export const searchMovies = async (searchTerm, page = 1, filters = {}) => {
  if (!isValidApiKey()) {
    return { Response: "False", Error: "Invalid API Key" };
  }

  const { year, type } = filters;

  try {
    const response = await api.get("", {
      params: {
        apikey: API_KEY,
        s: searchTerm,
        page,
        y: year || undefined,
        type: type || undefined,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      return {
        Response: "False",
        Error: `API Error: ${error.response.status}`,
      };
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      return { Response: "False", Error: "No response from server" };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
      return { Response: "False", Error: "Failed to fetch movies" };
    }
  }
};

export const getMovieDetails = async (imdbID) => {
  if (!isValidApiKey()) {
    return { Response: "False", Error: "Invalid API Key" };
  }

  if (!imdbID) {
    console.error("No IMDB ID provided");
    return { Response: "False", Error: "Movie ID is required" };
  }

  try {
    console.log(`Fetching details for movie ID: ${imdbID}`);

    const response = await api.get("", {
      params: {
        apikey: API_KEY,
        i: imdbID,
        plot: "full",
      },
    });

    console.log("Movie details response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);

    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      return {
        Response: "False",
        Error: `API Error: ${error.response.status}`,
      };
    } else if (error.request) {
      console.error("No response received:", error.request);
      return { Response: "False", Error: "No response from server" };
    } else {
      console.error("Error message:", error.message);
      return { Response: "False", Error: "Failed to fetch movie details" };
    }
  }
};
