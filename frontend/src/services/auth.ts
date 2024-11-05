// src/services/auth.ts
import api, { setAuthToken } from './api';

interface AuthResponse {
    token: string;
    username: string; // Add username here
  }

interface Credentials {
  email: string;
  password: string;
}

export const loginUser = async (credentials: Credentials) => {
  const response = await api.post('/auth/login', credentials);
  const { token, username } = response.data; // Ensure backend response includes `username`
  console.log('Response data:', response.data); // Debug: Log the response data

  if (token) {
    localStorage.setItem('token', token);
    setAuthToken(token); // Set the token in the axios instance
  }

  if (username) {
    localStorage.setItem('username', username); // Store the username in local storage
  }

  return response.data;
};


// Optionally add other functions like registerUser and logoutUser

// Logout function to clear both token and username
export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setAuthToken(null); // Remove token from axios instance
  };
  

  interface RegisterData {
    username: string;
    email: string;
    password: string;
  }
  
  export const registerUser = async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    return response.data; // Returning response data if needed
  };



  export async function updateProfile(email: string, password: string) {
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }