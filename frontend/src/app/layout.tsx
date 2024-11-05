"use client";

// app/layout.tsx
import './globals.css';
import Navbar from '../components/Navbar';
import { AuthProvider } from '../context/AuthContext';
import { MetaMaskProvider } from '../context/MetaMaskContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-background-accent to-background text-neutral-light font-sans">
        <AuthProvider>
          <MetaMaskProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar /> {/* Navbar appears on all pages with conditional rendering */}
              <main className="flex-1 flex items-center justify-center p-6">
                {children}
              </main>
            </div>
          </MetaMaskProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
