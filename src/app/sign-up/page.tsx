'use client';

import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useDebounceCallback } from 'usehooks-ts';

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [usernameMessage,setUsernameMessage] = useState('');        //message to display the user 
  const[isCheckingUsername,setIsCheckingUsername] = useState(false);

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
      
      const axiosError = error as AxiosError<{ message: string }>;
      // FIX: Changed 'let' to 'const'
      const errorMessage = axiosError.response?.data.message || 'An unexpected error occurred.';
      toast.error(`Sign-up failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

const debouncedCheckUsername = useDebounceCallback(async (username:string)=>{
  if(username){         //if user has finished typing the username
    setIsCheckingUsername(true);
    setUsernameMessage('');
  }

  try{
    const response = await axios.post('/api/check-username-unique',{username:username});
    setUsernameMessage(response.data.message);
  }
  catch(err){
    const error = err as AxiosError<{message:string}>;
    setUsernameMessage(error.response?.data.message ?? 'Error checking username');

  }
  finally{
    setIsCheckingUsername(false);
  }
},500);           //500ms delay


  useEffect(()=>{
    debouncedCheckUsername(username);


  },[username]);           //this useEffect acts as a watcher for the username, everytime it changes, it calls the debouncedCheckUsername function




 return (
  <div className="flex flex-col items-center justify-center min-h-screen relative">
    {/* Dark overlay for consistency with landing */}
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

    <div className="relative z-10 w-full max-w-md p-8 space-y-8 
                    bg-slate-800/50 border border-slate-700 
                    rounded-xl shadow-lg backdrop-blur-md 
                     transition-transform duration-300">
      
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-white drop-shadow-[0_0_15px_rgba(56,189,248,0.7)]">
          Join <span className="text-gray-800">Ghost</span>Drop
        </h1>
        <p className="mb-6 text-gray-300">
          Sign up to start receiving anonymous messages
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-300"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={username}
            className="w-full border border-slate-600 bg-slate-900/60 text-white 
                       p-2 rounded-lg focus:outline-none focus:ring-2 
                       focus:ring-cyan-400 transition-all"
            onChange={(e) => setUsername(e.target.value)}
          />
          {isCheckingUsername && <p className="text-sm text-gray-400 mt-1">Checking...</p>}
          <p className="text-sm text-cyan-400">{usernameMessage}</p>
        </div>

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
            {isSubmitting ? 'Signing You Up...(Anonymously)' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  </div>
)
}
