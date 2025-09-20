'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

type Message = {
  _id: string;
  content: string;
  createdAt: string;
};

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('/api/me');
        setUsername(userResponse.data.user.username);

        const messagesResponse = await axios.get('/api/get-messages');
        const sortedMessages = messagesResponse.data.messages.sort(
          (a: Message, b: Message) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setMessages(sortedMessages);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleDeleteMessage = async (messageId: string) => {
    //  the message from the screen immediately
    setMessages(messages.filter((message) => message._id !== messageId));
    toast.success('Message successfully deleted');    
    try {
      // Send the delete request to the backend in the background
      await axios.delete(`/api/delete-message/${messageId}`);
    } catch (error) {
      console.error("Error deleting message", error);
      toast.error('Failed to delete message. Please try again.');
      
    }
  };



  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-xl text-gray-800">Loading...</div>
        </div>
      </div>
    );
  }

  const profileUrl = `${window.location.origin}/u/${username}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success('Profile URL copied to clipboard!');
  };

return (
  <div className="min-h-screen p-6 relative flex items-center justify-center">
  
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

    <div className="relative z-10 w-full max-w-3xl p-8 rounded-xl 
                    bg-slate-800/50 border border-slate-700 
                    shadow-lg backdrop-blur-md space-y-6">
      
      {/* Dashboard Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]">
          My Dashboard
        </h1>
        <p className="text-gray-300">Welcome, <span className="font-semibold text-cyan-400">{username}</span></p>
      </div>

      <hr className="border-slate-700" />

      {/* Unique Link Section */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Your Unique Link</h2>
        <p className="text-gray-400">Share this link with others to receive messages:</p>
        <div className="flex items-center mt-3">
          <p className="flex-1 font-mono text-cyan-400 bg-slate-900/60 border border-slate-700 
                        p-2 rounded-l-lg truncate">
            {profileUrl}
          </p>
          <button
            onClick={copyToClipboard}
            className="bg-cyan-500 text-white px-4 py-2 rounded-r-lg 
                       hover:bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.6)] 
                       transition-all cursor-pointer"
          >
            Copy
          </button>
        </div>
      </div>

      <hr className="border-slate-700" />

      {/* Messages Section */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-3">Messages Received</h2>
        {messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((message: Message) => (
              <div key={message._id} 
                   className="bg-slate-900/70 border border-slate-700 
                              p-4 rounded-lg shadow-md relative group">
                <p className="text-gray-200">{message.content}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Received at: {new Date(message.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={() => handleDeleteMessage(message._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 
                             cursor-pointer flex items-center justify-center rounded-full 
                             opacity-0 group-hover:opacity-100 transition-opacity 
                             hover:bg-red-600"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">You have no messages yet.</p>
        )}
      </div>
    </div>
  </div>
)
}
