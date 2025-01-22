import axios from 'axios';

const API_URL = 'http://localhost:9000/';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json', accept: 'application/json' },
});

const apiFormData = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'multipart/form-data', accept: 'application/json' },
});

// Interceptor to add the token to the headers
api.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiFormData.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Function to handle response errors
const handleResponseError = async (error: any, navigate: any) => {
  if (error.response?.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
      throw error;
    }

    try {
      const refreshResponse = await api.post('authentication/token/refresh/', { refresh: refreshToken });
      const { access, refresh } = refreshResponse.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      // Retry the original request with the new token
      error.config.headers.Authorization = `Bearer ${access}`;
      return api.request(error.config);
    } catch (refreshError) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
      throw refreshError;
    }
  }
  throw error;
};

// Using interceptors to handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // navigate should be passed as a parameter
    return Promise.reject(error);
  }
);

apiFormData.interceptors.response.use(
  (response) => response,
  (error) => {
    // navigate should be passed as a parameter
    return Promise.reject(error);
  }
);

// Exporting functions for API calls
export const apiRequest = (config: any) => api(config);
export const apiFormDataRequest = (config: any) => apiFormData(config);
export const handleResponseErrorWithNavigate = handleResponseError;
