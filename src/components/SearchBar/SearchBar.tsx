import React from "react";
import { toast } from "react-hot-toast";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  // Змінюємо тип аргументу на стандартну подію форми React
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Зупиняємо перезавантаження сторінки браузером

    // Зчитуємо дані з елементів форми за допомогою FormData
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query") as string;

    if (!query || !query.trim()) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(query);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        {/* МІНЯЄМО action={handleSubmit} НА ОБОВ'ЯЗКОВИЙ onSubmit={handleSubmit} */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            name="query"
            placeholder="Search movies..."
          />
          <button type="submit" className={styles.button}>
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
