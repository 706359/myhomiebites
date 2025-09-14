import { useEffect } from 'react';
import styles from './Modal.module.css';

export default function Modal({ children, onClose }) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} role='dialog' aria-modal='true' onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button type='button' className={styles.close} aria-label='Close' onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
