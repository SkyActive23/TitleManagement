// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1', // or your backend URL
});

// Function to set the Authorization header for axios requests
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = token;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Only access localStorage if running in the client environment
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  if (token) setAuthToken(token); // Set token in axios instance if it exists
}




export default api;
