'use client';

import {useRouter} from 'next/navigation';

export default function Home() {

  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <div className="w-full max-w-2xl p-8 space-y-8 text-center bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-gray-800">
          Welcome to GhostDrop
        </h1>
        <p className="text-lg text-gray-600">
          It is an anonymous messaging app where you can share a link with your
          friends and they can send you messages without revealing their
          identity.
        </p>
        <button
          onClick={() => router.push('/sign-up')} 
          className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Lets Begin
        </button>
      </div>
    </div>
  );
}
