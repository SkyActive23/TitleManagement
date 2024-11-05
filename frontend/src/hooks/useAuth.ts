import axios from 'axios';
import { AuthResponse, RegisterCredentials, LoginCredentials } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error("Failed to login. Please check your credentials.");
  }
};

export const registerUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error("Registration failed. Please try again.");
  }
};
