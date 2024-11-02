// movieApi.jsx
const API_KEY = "2ed29062aa4c031e44c68d49f46d7280";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results; // Returns the list of movies
};

// Function to fetch movie details
export const fetchMovieDetails = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data; // Returns the movie details
};

// Function to fetch movie trailers
export const fetchMovieTrailers = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results; // Returns the list of trailers
};
