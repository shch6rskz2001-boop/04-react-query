import { toast } from "react-hot-toast";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  // Функція для Form Actions тепер приймає СУТО об'єкт FormData
  const handleSubmit = (formData: FormData) => {
    // Отримуємо значення інпуту за його атрибутом name="query"
    const query = formData.get("query") as string;

    // Перевірка на порожній запит
    if (!query || !query.trim()) {
      toast.error("Please enter your search query.");
      return;
    }

    // Передаємо валідний запит у батьківський компонент
    onSubmit(query);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="themoviedb.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        {/* ВИМОГА МЕНТОРА: Використовуємо атрибут action з функцією */}
        <form action={handleSubmit} className={styles.form}>
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

