import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import './App.module.css';

function App() {
  
  const [movies, setMovies] = useState<Movie[]>([]);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);


  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchMovies(query);
      setMovies(data);
    } catch (err) {
      setError('Щось пішло не так при завантаженні фільмів');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      {}
      <SearchBar onSubmit={handleSearch} />

      {}
      {error && <p className="error-message">{error}</p>}

      {}
      {isLoading ? (
        <p></p>
      ) : (
        
        <MovieGrid movies={movies} onSelect={(movie) => console.log(movie)} />
      )}
    </div>
  );
}

export default App;

