"use client";

// components/RegisterForm.tsx
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { registerUser } from '../services/auth';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ username, email, password }); // Send data to the registerUser function
      router.push('/login'); // Redirect to login page on successful registration
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to register, please try again');
      } else {
        setError('Failed to register, please try again');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center text-neutral-light mb-6">Register</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-light">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-background-accent border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm"
            placeholder="Create a username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-light">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-background-accent border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-light">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-background-accent border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm"
            placeholder="Create a password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary-dark text-white font-semibold rounded-lg shadow-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-opacity-75"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <a href="/login" className="text-primary hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
}
