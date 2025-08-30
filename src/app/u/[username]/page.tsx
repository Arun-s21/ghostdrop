'use client';

import {useParams} from 'next/navigation';
import {useState} from 'react';
import axios , {AxiosError} from 'axios';
import toast from 'react-hot-toast';

export default function SendMessagePage(){

    const params = useParams();
    const [content,setContent] = useState('');
    const[isSubmitting,setIsSubmitting]  = useState(false);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post('/api/send-message', {
        username: params.username,
        content,
      });

      toast.success('Message sent successfully!');
      setContent('');
    } catch (error) {
      console.error('Error sending message:', error);
      // FIX: Added a specific type for the error
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message ?? 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };





    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-black/60">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white/10 border border-slate-700 rounded-2xl shadow-xl backdrop-blur-md">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Public Message for <span className="text-cyan-400">{params.username}</span>
          </h1>
          <p className="text-gray-300">
            Send an anonymous message to {params.username}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Your Message
            </label>
            <textarea
              id="content"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-slate-600 bg-slate-900/50 text-gray-100 p-3 rounded-lg resize-none focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
              placeholder="Write a message here..."
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
              {isSubmitting ? 'Sending... Please wait' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}