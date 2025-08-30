'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen">
      
 
      <div className="w-full max-w-2xl p-8 space-y-8 text-center bg-slate-800/50 border border-slate-700 rounded-lg shadow-lg backdrop-blur-sm">
        
     
        <h1 className="text-4xl font-extrabold ... text-white">
          Welcome to <span className="text-gray-800">Ghost</span>Drop
        </h1>
        <p className="text-lg text-gray-400">
          It is an anonymous messaging app where you can share a link with your
          friends and they can send you messages without revealing their
          identity.
        </p>
        
        
      <button
  onClick={() => router.push('/sign-up')}
  className="px-8 py-3 text-lg font-bold text-white rounded-md relative overflow-hidden 
             border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.6)] 
             hover:shadow-[0_0_25px_rgba(6,182,212,1)] transition-all cursor-pointer duration-300"
>
  Let’s Begin
</button>

      </div>
    </div>
  );
}