import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StartAnonymusDebate() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    person1: '',
    topic: '',
    watchers: false,
    comments: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('https://debatehub.onrender.com/set-online', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: form.person1, topic: form.topic, isOnline: true }),
});

  setIsLoading(true);

    const poll = async (retries = 10, delay = 3000) => {
      for (let i = 0; i < retries; i++) {
        const response = await fetch(
          `https://debatehub.onrender.com/online-users?requestingUser=${form.person1}&requestingUserTopic=${form.topic}`
        );
        const opponentData = await response.json();

        if (opponentData && opponentData.user) {
          const opponent = opponentData.user;
          const roomId = generateRoomId(form.person1, opponent);
          navigate(`/debate-room/${roomId}`);
          return;
        }

        // Wait before trying again
        await new Promise(res => setTimeout(res, delay));
      }

      alert("No opponent found. Try again later.");
      setIsLoading(false);
    };

    poll();
  
  };

 const generateRoomId = (a, b) => {
  const now = new Date();
  const minutes = Math.floor(now.getTime() / (1000 * 60));
  return [a.trim().toLowerCase(), b.trim().toLowerCase()]
    .sort()
    .join('-vs-') + `-${minutes}`;
};

  return (
    <form onSubmit={handleSubmit} disabled={isLoading} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{isLoading ? 'Finding opponent...' : 'Start Debate'}</h2>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Enter Name</label>
        <input
          type="text"
          name="person1"
          value={form.person1}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      

      <div>
        <label className="block text-gray-700 font-medium mb-1">Topic Preferences</label>
        <input
          type="text"
          name="topic"
          value={form.topic}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="watchers"
          checked={form.watchers}
          onChange={handleChange}
          className="mr-2"
        />
        <label className="text-gray-700">Allow Public Watchers</label>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="comments"
          checked={form.comments}
          onChange={handleChange}
          className="mr-2"
        />
        <label className="text-gray-700">Enable Comments</label>
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200"
      >
        Submit
      </button>
    </form>
  );
}
