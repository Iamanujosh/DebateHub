import React, { useState } from 'react';

export default function StartDebate() {
  const [form, setForm] = useState({
    person1: '',
    person2: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted:', form);
    // Add your form logic here (e.g., send to backend)
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Arrange a Debate</h2>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Person 1 Name</label>
        <input
          type="text"
          name="person1"
          value={form.person1}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Person 2 Name</label>
        <input
          type="text"
          name="person2"
          value={form.person2}
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
