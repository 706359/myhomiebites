import axios from 'axios';

// Get base URL from environment or use default
// The app uses http://192.168.1.13:5050/api/, so we should match that
// or use localhost if running locally
const getApiBaseURL = () => {
  // Check if we have an environment variable
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Try to detect the current host and use port 5050
  const hostname = window.location.hostname;
  
  // If localhost, use localhost
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5050/api';
  }
  
  // If accessing via IP (like 192.168.x.x), use that IP
  // This matches the app's configuration
  if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    return `http://${hostname}:5050/api`;
  }
  
  // Otherwise, try to use the same hostname with port 5050
  return `http://${hostname}:5050/api`;
};

const API_BASE_URL = getApiBaseURL();
console.log('🌐 API Base URL configured:', API_BASE_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/#/admin/login';
    }
    return Promise.reject(error);
  }
);

// API helper functions
export const fetchMenuItems = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.kitchenId) params.append('kitchenId', filters.kitchenId);
    if (filters.category) params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);
    if (filters.isVeg !== undefined) params.append('isVeg', filters.isVeg);
    
    const { data } = await api.get(`/menu?${params.toString()}`);
    return data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

export const fetchOffers = async () => {
  try {
    const { data } = await api.get('/offers');
    return data;
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw error;
  }
};

export const fetchDeals = async () => {
  try {
    const { data } = await api.get('/deals');
    return data;
  } catch (error) {
    console.error('Error fetching deals:', error);
    throw error;
  }
};

export const fetchKitchens = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.cuisineType) params.append('cuisineType', filters.cuisineType);
    if (filters.minRating) params.append('minRating', filters.minRating);
    if (filters.topRated) params.append('topRated', filters.topRated);
    
    const { data } = await api.get(`/kitchens?${params.toString()}`);
    return data;
  } catch (error) {
    console.error('Error fetching kitchens:', error);
    throw error;
  }
};

export default api;

