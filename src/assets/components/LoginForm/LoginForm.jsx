import { useEffect, useRef, useState } from 'react';
import Modal from '../Model/Model';
import styles from './LoginForm.module.css';

export default function LoginForm({ onClose }) {
  const firstInput = useRef(null);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes('@')) newErrors.email = 'Valid email required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    console.log('Login submitted:', formData);
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        onClose?.();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [submitted, onClose]);

  if (submitted) {
    return (
      <Modal onClose={onClose}>
        <div className={styles.confirmBox}>
          <h2 className={styles.heading}>Success</h2>
          <p>You have logged in successfully.</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <h2 className={styles.heading}>Login</h2>

        <div className={styles.group}>
          <label className={styles.label} htmlFor='email'>
            Email
          </label>
          <input
            id='email'
            name='email'
            ref={firstInput}
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            type='email'
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor='password'>
            Password
          </label>
          <input
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            type='password'
          />
          {errors.password && <span className={styles.error}>{errors.password}</span>}
        </div>

        <div className={styles.actions}>
          <button
            type='button'
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={onClose}>
            Cancel
          </button>
          <button type='submit' className={`${styles.button} ${styles.submitButton}`}>
            Login
          </button>
        </div>
      </form>
    </Modal>
  );
}
