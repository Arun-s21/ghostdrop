'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

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

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">My Dashboard</h1>
        <p className="text-gray-600">Welcome, {username}</p>
        <hr className="my-6" />
        <h2 className="text-2xl font-bold mb-3 text-gray-800">Your Unique Link</h2>
        <p className="text-gray-600">Share this link with others to receive messages:</p>
        <p className="font-bold text-blue-600 mt-2">{profileUrl}</p>
        <hr className="my-6" />
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Messages Received</h2>
        {messages.length > 0 ? (
          <div className="space-y-4">
            {/* FIX: Changed (message: any) to (message: Message) */}
            {messages.map((message: Message) => (
              <div key={message._id} className="bg-gray-50 p-4 rounded-lg shadow">
                <p className="text-gray-800">{message.content}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Received at: {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You have no messages yet.</p>
        )}
      </div>
    </div>
  );
}