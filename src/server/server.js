import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = "2ed29062aa4c031e44c68d49f46d7280";
export const fetchMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
