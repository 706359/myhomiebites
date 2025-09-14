import { useRef, useState } from 'react';
import Modal from '../Model/Model';
import styles from './RegisterForm.module.css';

export default function RegisterForm({ onClose }) {
  const firstInput = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    console.log('Register submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Modal onClose={onClose}>
        <div className={styles.confirmBox}>
          <h2 className={styles.heading}>Success</h2>
          <p>Your account has been registered successfully.</p>
          <div className={styles.actions}>
            <button
              type='button'
              className={`${styles.button} ${styles.submitButton}`}
              onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <h2 className={styles.heading}>Register</h2>

        <div className={styles.group}>
          <label className={styles.label} htmlFor='name'>
            Name
          </label>
          <input
            id='name'
            name='name'
            ref={firstInput}
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            type='text'
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor='email'>
            Email
          </label>
          <input
            id='email'
            name='email'
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

        <div className={styles.group}>
          <label className={styles.label} htmlFor='confirmPassword'>
            Confirm Password
          </label>
          <input
            id='confirmPassword'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles.input}
            type='password'
          />
          {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
        </div>

        <div className={styles.actions}>
          <button
            type='button'
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={onClose}>
            Cancel
          </button>
          <button type='submit' className={`${styles.button} ${styles.submitButton}`}>
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}
