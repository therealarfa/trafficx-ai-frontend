import axios from 'axios';

// Backend ka URL
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

// Axios instance banayein
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token automatically add karne ke liye
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============ AUTH APIs ============
export const registerUser = (data) => api.post('/api/auth/register', data);
export const loginUser = (data) => api.post('/api/auth/login', data);

// ============ DASHBOARD APIs ============
export const getDashboardStats = () => api.get('/api/dashboard/stats');
export const getHourlyData = () => api.get('/api/dashboard/hourly-data');
export const getVehicleTypes = () => api.get('/api/dashboard/vehicle-types');

// ============ CAMERAS APIs ============
export const getCameras = () => api.get('/api/cameras');

// ============ AI VIDEO PROCESSING ============
export const processVideo = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/api/process-video', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export default api;