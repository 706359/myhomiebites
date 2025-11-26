import axios from 'axios';

// Get base URL from environment or use default
// Priority: Environment variable > Local development > Production
const getApiBaseURL = () => {
  // Priority 1: Check for environment variable (for production builds)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Priority 2: Check if running in development mode
  const hostname = window.location.hostname;
  const isDevelopment = hostname === 'localhost' || hostname === '127.0.0.1' || /^192\.168\./.test(hostname);
  
  if (isDevelopment) {
    // For local development, use port 5050
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5050/api';
    }
    // If accessing via local IP, use that IP with port 5050
    if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
      return `http://${hostname}:5050/api`;
    }
  }
  
  // Priority 3: Default to production API
  return 'https://api.raavito.in/api';
};

const API_BASE_URL = getApiBaseURL();
console.log('🌐 API Base URL configured:', API_BASE_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
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
    // Log error for debugging
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      console.error('⏱️ API request timeout:', error.config?.url);
    } else if (error.code === 'ERR_NETWORK' || !error.response) {
      console.error('🌐 Network error - unable to reach API:', API_BASE_URL);
      console.error('Error details:', error.message);
    } else {
      console.error('❌ API Error:', error.response?.status, error.config?.url, error.response?.data);
    }
    
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      // Only redirect if we're on an admin page
      if (window.location.hash.includes('/admin/')) {
        window.location.href = '/#/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// API helper functions
// IMPORTANT: Raavito is a PURE VEGETARIAN platform - default to vegetarian items
export const fetchMenuItems = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.kitchenId) params.append('kitchenId', filters.kitchenId);
    if (filters.category) params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);
    // Default to vegetarian items only - Raavito is pure veg
    // Only allow non-veg if explicitly set to false (for admin purposes)
    if (filters.isVeg !== undefined) {
      params.append('isVeg', filters.isVeg);
    } else {
      params.append('isVeg', 'true'); // Default to vegetarian
    }
    
    const { data } = await api.get(`/menu?${params.toString()}`);
    // Double-check: filter out any non-vegetarian items that might have slipped through
    return data.filter(item => item.isVeg !== false);
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

