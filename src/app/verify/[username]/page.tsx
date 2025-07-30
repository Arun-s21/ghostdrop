'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';

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
        alert('This account is already verified.');
      } else {
        alert('Account verified successfully! You can now log in.');
      }
      
      // Redirect to sign-in in both success cases
      router.push('/sign-in');
    } catch (error) {
      console.error('Error during account verification:', error);
      const axiosError = error as AxiosError<any>;
      alert(axiosError.response?.data.message ?? 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-gray-800">
            Verify Your Account
          </h1>
          <p className="mb-4 text-gray-600">Enter the verification code sent to your email</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Verification Code
            </label>
            <input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-500"
            >
              {isSubmitting ? 'Verifying...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}