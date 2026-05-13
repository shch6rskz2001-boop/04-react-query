import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <ul className={css.grid}>
      {movies.map((movie) => {

        if (!movie || !movie.id) return null;

        return (
          <li key={movie.id}>
            <div className={css.card} onClick={() => onSelect(movie)}>
              { }
              <img
                className={css.image}
                src={movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'placeholder.com'
                }
                alt={movie.title || "Movie poster"}
              />
              <h2 className={css.title}>{movie.title || "Untitled"}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
