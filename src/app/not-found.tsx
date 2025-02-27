import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative pointer-events-auto z-50 min-h-screen flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-6xl font-bold mb-4">Stay Tuned!</h1>
      <p className="text-xl text-gray-400 mb-2">Oops! Page not found.</p>
      <p className="text-gray-400 mb-8">We might be working on it..</p>
      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300"
      >
        Go Home
      </Link>
    </div>
  );
}