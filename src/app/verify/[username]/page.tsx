'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function VerifyAccountPage() {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code,
      });

      if (response.data.message === 'User is already verified') {
        toast.success('This account is already verified.');
      } else {
        toast.success('Account verified successfully! You can now log in.');
      }

      router.push('/sign-in');
    } catch (error) {
      console.error('Error during account verification:', error);
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message ?? 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      {/* Dark overlay for consistency */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md p-8 space-y-8 
                      bg-slate-800/50 border border-slate-700 
                      rounded-xl shadow-lg backdrop-blur-md 
                      transition-transform duration-300">

        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-white drop-shadow-[0_0_15px_rgba(56,189,248,0.7)]">
            Verify Your Account
          </h1>
          <p className="mb-6 text-gray-300">
            Enter the verification code sent to your email
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-300"
            >
              Verification Code
            </label>
            <input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border border-slate-600 bg-slate-900/60 text-white 
                         p-2 rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-cyan-400 transition-all"
              placeholder="Enter your code"
              required
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
              {isSubmitting ? 'Verifying...' : 'Verify Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
