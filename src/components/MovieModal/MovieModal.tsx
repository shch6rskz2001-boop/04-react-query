import Modal from 'react-modal';
// 1. Виправлено імпорт типу
import type { Movie } from '../../types/movie';

Modal.setAppElement('#root');

interface MovieModalProps {
  isOpen: boolean;
  movie: Movie | null;
  onClose: () => void;
}

const MovieModal = ({ isOpen, movie, onClose }: MovieModalProps) => {
  if (!movie) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 1200 },
        content: {
          top: '50%', left: '50%', right: 'auto', bottom: 'auto',
          transform: 'translate(-50%, -50%)', padding: '0', border: 'none',
        },
      }}
    >
      <div>
        {/* 2. Використовуємо властивості, які точно є у вашому типі Movie */}
        {/* Якщо картинка не poster, спробуйте movie.poster_path або movie.image */}
        <img
          src={(movie as any).poster || (movie as any).poster_path || (movie as any).urls?.regular}
          alt={(movie as any).title}
          style={{ maxWidth: '100%', maxHeight: '80vh', display: 'block' }}
        />
        <div style={{ padding: '15px', backgroundColor: 'white' }}>
          <h2>{(movie as any).title}</h2>
          <p>{(movie as any).overview || (movie as any).description || "No description"}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </Modal>
  );
};

export default MovieModal;


