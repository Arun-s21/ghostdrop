'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

// Define a type for our message objects for better type safety
type Message = {
  _id: string;
  content: string;
  createdAt: string;
};

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {    // it is used so that fetchMessages is only called once and not everytime setMessages is called
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/get-messages');
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Failed to fetch messages. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []); // The empty array means this effect runs only once when the component mounts

  if (isLoading) {
    return <div className="text-center p-4">Loading messages...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Dashboard</h1>
      {messages.length > 0 ? (
        <div>
          {messages.map((message) => (
            <div key={message._id} className="bg-white p-4 rounded-lg shadow mb-4">
              <p>{message.content}</p>
              <p className="text-xs text-gray-500 mt-2">
                Received: {new Date(message.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no messages yet.</p>
      )}
    </div>
  );
}