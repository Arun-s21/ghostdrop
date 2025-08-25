'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post('/api/sign-up', {
        username,
        email,
        password,
      });
      
      toast.success('Registration successful! Please check your email to verify.');
      router.push(`/verify/${username}`);

    } catch (error) {
      console.error('Error in sign up of user', error);
      // FIX: Added a specific type for the error
      const axiosError = error as AxiosError<{ message: string }>;
      // FIX: Changed 'let' to 'const'
      const errorMessage = axiosError.response?.data.message || 'An unexpected error occurred.';
      toast.error(`Sign-up failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-gray-800">
            Join GhostDrop
          </h1>
          <p className="mb-4 text-gray-600">Sign up to start receiving anonymous messages</p>
        </div>
        {/* Attach the onSubmit function to the form */}
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              className="w-full border border-gray-300 p-2 rounded-lg"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
              className="w-full border border-gray-300 p-2 rounded-lg"
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
              className="w-full border border-gray-300 p-2 rounded-lg"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            {/* Disable the button and change text during submission */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-blue-600 text-white cursor-pointer rounded-md hover:bg-blue-700 disabled:bg-gray-500"
            >
              {isSubmitting ? 'Signing You Up...(Anonymously)' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}