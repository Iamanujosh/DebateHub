import React from 'react';

export default function HowItWorks() {
  return (
    <div className=" mt-20 flex items-center justify-center px-4">
      <div className="max-w-4xl bg-white p-10 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          How Debate Hub Works
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-purple-700">1. Arrange a Debate</h3>
            <p className="text-gray-700">
              Fill in the form with both participants' names, preferred topics, and choose whether to allow public watchers or comments.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-purple-700">2. Start the Debate</h3>
            <p className="text-gray-700">
              Launch your debate session instantly with or without watchers and real-time commenting enabled.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-purple-700">3. Engage & Discuss</h3>
            <p className="text-gray-700">
              Participants present their views while viewers observe or interact through comments based on your settings.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-purple-700">4. Wrap It Up</h3>
            <p className="text-gray-700">
              Once the debate ends, the summary or key takeaways can be saved or shared for others to learn from.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
