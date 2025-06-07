import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function DebateRoom() {
  const loggedInUser = localStorage.getItem('username');
  const { roomId } = useParams();
  const userName = loggedInUser;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(50); // 5 minutes = 300 seconds
  const navigate = useNavigate();
  useEffect(() => {
    
    const newSocket = io('https://debatehub.onrender.com', {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
      newSocket.emit('join_room', { roomId, userName });
    });

    newSocket.on('disconnect', async () => {
      setIsConnected(false);
      try{
         await fetch('https://debatehub.onrender.com/set-online', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: userName, topic: null, isOnline: false}),
          });
      }
      catch (error){
        console.log(error);
      }
  });
    newSocket.on('connect_error', (err) => console.error('Connection error:', err));

    newSocket.on('receive_message', (data) => {
      if (data && data.content) { 
        setMessages((prev) => [...prev, {
          author: data.author || userName,  
          content: data.content,
          time: data.time || new Date().toLocaleTimeString(),
        }]);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, userName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  

useEffect(() => {
  if (timeLeft <= 0) {
    navigate(`/result/${roomId}`);
    return;
  }

  const interval = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [timeLeft, navigate, roomId]);

  const sendMessage = () => {
    if (!message.trim() || !socket) return;

    const msgData = {
      room :roomId,
      author: userName,  
      content: message,
      time: new Date().toLocaleTimeString(),
    };
    
  socket.emit('send_message', msgData);
  setMessage(''); 
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

 return (
  <div className="flex items-center justify-center ">
    <div className="debate-room w-full max-w-2xl bg-gray-300 shadow-lg rounded-xl p-4">
      <h2 className="text-xl font-semibold text-center mb-2">
        Debate Room: {roomId}
      </h2>
      <div className="timer">Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>
      <div className="connection-status text-center mb-4">
        <span className={`text-sm font-medium ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
          Status: {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      <div className="chat-box h-96 overflow-y-auto p-3 bg-gray-50 rounded-md">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message mb-3 max-w-[70%] px-4 py-2 rounded-2xl shadow-sm ${
              msg.author === userName
                ? 'ml-auto bg-blue-100 text-right'
                : 'mr-auto bg-gray-200 text-left'
            }`}
          >
            <div className="message-header text-sm text-gray-600 font-medium">
              {msg.author} <span className="text-xs float-right">{msg.time}</span>
            </div>
            <div className="message-content text-base">{msg.content}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="message-input mt-4 flex gap-2">
        <input
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message"
          disabled={!isConnected}
        />
        <button
          className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 disabled:opacity-50"
          onClick={sendMessage}
          disabled={!message.trim() || !isConnected}
        >
          Send
        </button>
      </div>
    </div>
  </div>
);

}