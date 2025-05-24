// client/src/components/ChatWithTimer.js
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://debatehub-1.onrender.com');

export default function ChatWithTimer() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [timer, setTimer] = useState(60); // 60 seconds for each turn

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, { type: 'opponent', text: data }]);
      setTimer(60); // reset timer for next person
    });

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          // Auto-skip or block typing here
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdown);
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('send_message', message);
    setChat((prev) => [...prev, { type: 'you', text: message }]);
    setMessage('');
    setTimer(60); // reset timer after sending
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-2">Timer Chat</h2>
      <div className="h-40 overflow-y-auto border p-2 mb-2">
        {chat.map((msg, index) => (
          <div key={index} className={msg.type === 'you' ? 'text-right' : 'text-left'}>
            <span className="block bg-gray-200 rounded p-1 m-1">{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="mb-2 text-red-600">⏳ Time left: {timer}s</div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 rounded w-full mb-2"
        disabled={timer <= 0}
      />
      <button onClick={sendMessage} disabled={!message || timer <= 0} className="w-full bg-purple-600 text-white p-2 rounded">
        Send
      </button>
    </div>
  );
}
