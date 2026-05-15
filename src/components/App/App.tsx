import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import Pagination from '../ReactPaginate/ReactPaginate';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import css from './App.module.css';



function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Додано isFetching для точного контролю стану завантаження
  const { data, isLoading, isError, isSuccess, isFetching } = useQuery({
    queryKey: ['movies', searchQuery, page],
    queryFn: () => fetchMovies(searchQuery, page),
    enabled: searchQuery.trim() !== '',
    placeholderData: (previousData) => previousData ?? { results: [], total_pages: 0 },
  });


  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      toast.error('Введіть текст для пошуку');
      return;
    }
    setSearchQuery(query);
    setPage(1);
  };

  const openModal = (movie: Movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  const movies = data?.results || [];
  const totalPages = data?.total_pages || 0;

 
   // Вимога ментора: toast-сповіщення, якщо фільмів не знайдено
  useEffect(() => {
    if (searchQuery.trim() !== '' && isSuccess && !isFetching && movies.length === 0) {
      toast.error('No movies found for your request.');
    }
  }, [isSuccess, isFetching, movies.length, searchQuery]);



  return (
    <div className={css.app}>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />

      {isError && <ErrorMessage />}
      {isLoading && <Loader />}

      {!isLoading && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={openModal} />
      )}

          {totalPages > 1 && (
        <Pagination 
          totalPages={totalPages > 500 ? 500 : totalPages} 
          page={page} 
          setPage={setPage} 
        />
      )}


      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;






