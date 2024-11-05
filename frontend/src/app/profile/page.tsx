"use client";

import { useState, useEffect } from 'react';
import ProfileSkeleton from '@/components/ProfileSkeleton';
import updateProfile from '@/services/api';

export default function ProfilePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Simulate loading (replace with actual data loading if needed)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); 
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const data = await updateProfile('/profile', { data: { email, password } });
      setMessage('Profile updated successfully');
    } catch (error) {
      setMessage('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg shadow-lg">
      {loading ? (
        <ProfileSkeleton />
      ) : (
        <>
          <h1 className="text-2xl font-semibold text-center text-neutral-light mb-6">Edit Profile</h1>
          {message && <p className="text-center mb-4 text-primary">{message}</p>}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-light">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border bg-background-accent border-neutral-light rounded-lg shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-light">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border bg-background-accent border-neutral-light rounded-lg shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-light">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border bg-background-accent border-neutral-light rounded-lg shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-2 px-4 bg-primary-dark text-white font-semibold rounded-lg shadow-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-opacity-75"
            >
              Save Changes
            </button>
          </div>
        </>
      )}
    </div>
  );
}
