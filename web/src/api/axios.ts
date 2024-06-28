import axios from 'axios';
import { DecodeTokenAndSetLocalStorage } from '../helpers/DecodeJWT';

const apiClient = axios.create({
  baseURL: window.location.origin + '/api', // window.location.origin + '/api' 'http://localhost:8080/api'
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/refresh-token`, {
          refresh_token: refreshToken,
        });
        await DecodeTokenAndSetLocalStorage(response.data.data);

        originalRequest.headers.Authorization = `Bearer ${response.data.data.access_token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_username');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_exp');
        
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
