"use client";

// components/LoginForm.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../services/auth'; // Assumes an API service for login
import axios from 'axios';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const { token } = await loginUser({ email, password }); // Directly access token from the returned data
      localStorage.setItem('token', token); // Store the token locally
      router.push('/dashboard'); // Redirect to dashboard on success
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Use error message from server if available
        setError(err.response?.data?.message || 'Invalid credentials, please try again');
      } else {
        setError('Invalid credentials, please try again');
      }
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center text-neutral-light mb-6">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-light">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-background-accent border border-neutral-light rounded-lg shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-light">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border bg-background-accent border-neutral-light rounded-lg shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary-dark text-white font-semibold rounded-lg shadow-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-opacity-75"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        New to our site?{' '}
        <a href="/register" className="text-primary hover:underline">
          Register an account
        </a>
      </p>
    </div>
  );
}
