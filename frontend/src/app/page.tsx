"use client";

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
      setLoading(false);
    }
  }, [user, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return null;
}
