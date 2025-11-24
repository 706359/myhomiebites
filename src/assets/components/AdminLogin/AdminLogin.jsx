import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import styles from './AdminLogin.module.css';

export default function AdminLogin({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ mobile: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors({});
    setErrorMessage('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.mobile || formData.mobile.length < 10) {
      newErrors.mobile = 'Valid mobile number required';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      console.log('Attempting login with:', { mobile: formData.mobile });
      
      // Use the same login endpoint as the app: /api/users/login
      const response = await api.post('/users/login', {
        mobile: formData.mobile,
        password: formData.password,
      });

      console.log('Login response:', response.data);

      const data = response.data || {};
      
      // Extract token and user data (same format as app)
      const token = data.token || data?.data?.token;
      const userFromServer = data.user || data?.data?.user || data;

      console.log('Extracted token:', token ? 'Present' : 'Missing');
      console.log('User data:', userFromServer);

      if (!token) {
        console.error('No token in response:', data);
        setErrorMessage(data.message || 'Invalid credentials - No token received');
        setLoading(false);
        return;
      }

      const role = userFromServer?.role || 'user';
      console.log('User role:', role);

      // Check if user is admin
      if (role !== 'admin') {
        console.warn('User is not admin, role is:', role);
        setErrorMessage(`Access denied. Admin privileges required. Current role: ${role}`);
        setLoading(false);
        return;
      }

      // Store token and user info (same format as app)
      const userData = {
        _id: userFromServer?._id || userFromServer?.id,
        id: userFromServer?.id || userFromServer?._id,
        firstName: userFromServer?.firstName || '',
        lastName: userFromServer?.lastName || '',
        mobile: userFromServer?.mobile || formData.mobile,
        role: role,
      };
      
      console.log('Storing user data:', userData);
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(userData));

      // Call onLoginSuccess callback to update state immediately
      if (onLoginSuccess) {
        console.log('Calling onLoginSuccess callback');
        onLoginSuccess();
      }

      console.log('Redirecting to dashboard...');
      // Redirect to dashboard - use window.location to force full reload and state check
      // This ensures the App component's useEffect runs and checks localStorage
      window.location.href = '/#/admindashboard';
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      const errorMsg = error.response?.data?.error || 
                      error.response?.data?.message || 
                      error.message || 
                      'Login failed. Please check your credentials.';
      
      setErrorMessage(errorMsg);
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logoSection}>
          <img src='/images/logo2.png' alt='Raavito' className={styles.logo} />
          <h1 className={styles.title}>Admin Login</h1>
          <p className={styles.subtitle}>Enter your credentials to access the admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {errorMessage && <div className={styles.errorAlert}>{errorMessage}</div>}

          <div className={styles.formGroup}>
            <label htmlFor='mobile' className={styles.label}>
              Mobile Number
            </label>
            <input
              id='mobile'
              name='mobile'
              type='tel'
              value={formData.mobile}
              onChange={handleChange}
              className={`${styles.input} ${errors.mobile ? styles.inputError : ''}`}
              placeholder='Enter your mobile number'
              disabled={loading}
            />
            {errors.mobile && <span className={styles.errorText}>{errors.mobile}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='password' className={styles.label}>
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              placeholder='Enter your password'
              disabled={loading}
            />
            {errors.password && <span className={styles.errorText}>{errors.password}</span>}
          </div>

          <button type='submit' className={styles.submitButton} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className={styles.footer}>
          <p>© 2024 Raavito. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

