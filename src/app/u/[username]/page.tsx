'use client';

import {useParams} from 'next/navigation';
import {useState} from 'react';
import axios , {AxiosError} from 'axios';

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

      alert('Message sent successfully!');
      setContent('');
    } catch (error) {
      console.error('Error sending message:', error);
      // FIX: Added a specific type for the error
      const axiosError = error as AxiosError<{ message: string }>;
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
            Public Message for {params.username}
          </h1>
          <p className="mb-4 text-gray-600">
            Send an anonymous message to {params.username}
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Your Message:
            </label>
            <textarea
              id="content"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg mt-1"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-500"
            >
              {isSubmitting ? 'Sending...please wait' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>



    )



};