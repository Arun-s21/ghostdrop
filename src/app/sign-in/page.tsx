'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post('/api/sign-in', {
        email,
        password,
      });
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Error during sign-in:', error);
      // FIX: Added a specific type for the error
      const axiosError = error as AxiosError<{ message: string }>;
      // FIX: Changed 'let' to 'const'
      const errorMessage = axiosError.response?.data.message || 'An unexpected error occurred.';
      alert(`Login failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-gray-800">
            Welcome Back to GhostDrop
          </h1>
          <p className="mb-4 text-gray-600">Sign in to continue your secret conversations</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              className="w-full border border-gray-800 p-2 rounded-lg"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              className="w-full border border-gray-800 p-2 rounded-lg"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-500"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
          <div className="text-center mt-4">
  <p className='text-gray-800'>
    New user?{' '}
    <Link href="/sign-up" className="text-blue-600 hover:underline">
      Sign up
    </Link>
  </p>
</div>
        </form>
      </div>
    </div>
  );
}