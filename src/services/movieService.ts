import axios from "axios";
import type { Movie } from "../types/movie";

// 1. Оновлюємо інтерфейс, щоб він включав total_pages
export interface MoviesResponse {
  results: Movie[];
  total_pages: number;
}

const BASE_URL = "https://api.themoviedb.org/3";

// 2. Додаємо параметр page і змінюємо Promise на MoviesResponse
export const fetchMovies = async (query: string, page: number = 1): Promise<MoviesResponse> => {
  const response = await axios.get<MoviesResponse>(
    `${BASE_URL}/search/movie`,
    {
      params: {
        query,
        page // Передаємо номер сторінки в API
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );

  // 3. Повертаємо весь об'єкт response.data
  return response.data;
};
