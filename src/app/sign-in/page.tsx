'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post('/api/sign-in', {
        email,
        password,
      });
      window.location.href = '/dashboard'
      toast.success('Log in successful, Redirecting...');
    } catch (error) {
      console.error('Error during sign-in:', error);
      const axiosError = error as AxiosError<{ message: string }>;
     
      const errorMessage = axiosError.response?.data.message || 'An unexpected error occurred.';
      toast.error(`Login failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };
return (
  <div className="flex flex-col items-center justify-center min-h-screen relative">
    {/* Overlay for dark background consistency */}
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

    <div className="relative z-10 w-full max-w-md p-8 space-y-8 
                    bg-slate-800/50 border border-slate-700 
                    rounded-xl shadow-lg backdrop-blur-md 
                     transition-transform duration-300">
      
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-white drop-shadow-[0_0_15px_rgba(56,189,248,0.7)]">
          Welcome Back to <span className="text-gray-800">Ghost</span>Drop
        </h1>
        <p className="mb-6 text-gray-300">
          Sign in to continue your secret conversations
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            className="w-full border border-slate-600 bg-slate-900/60 text-white 
                       p-2 rounded-lg focus:outline-none focus:ring-2 
                       focus:ring-cyan-400 transition-all"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            className="w-full border border-slate-600 bg-slate-900/60 text-white 
                       p-2 rounded-lg focus:outline-none focus:ring-2 
                       focus:ring-cyan-400 transition-all"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 text-lg font-bold text-white rounded-md 
                       relative overflow-hidden border border-cyan-400 
                       shadow-[0_0_15px_rgba(6,182,212,0.6)] 
                       hover:shadow-[0_0_25px_rgba(6,182,212,1)] 
                       active:scale-95 disabled:bg-slate-600 disabled:shadow-none 
                       transition-all duration-300 cursor-pointer"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-gray-400">
            New user?{' '}
            <Link href="/sign-up" className="text-cyan-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  </div>
)
}
