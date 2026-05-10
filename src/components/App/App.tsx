import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import css from'./App.module.css';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setError(false);
      setMovies([]);

      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast.error('Фільмів не знайдено за вашим запитом');
        return;
      }

      setMovies(data);
    } catch (err) {
      setError(true);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app} >
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage />}
      {isLoading && <Loader />}

      {!isLoading && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={openModal} />
      )}

      { }
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;




