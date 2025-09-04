'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple demo check
    if (username === 'admin' && password === 'admin') {
      router.push('/admin'); // Redirect to admin page
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96 border border-red-600">
        <h1 className="text-2xl font-bold mb-6 text-red-500 text-center">Login</h1>
        {error && (
          <p className="text-red-500 mb-4 text-center font-semibold">{error}</p>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-red-500 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-red-500 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

