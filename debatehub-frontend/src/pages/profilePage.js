import { useEffect, useState } from 'react';

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const username = localStorage.getItem('username'); 
  console.log(username);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await fetch('https://debatehub.onrender.com/api/getProfileData', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username }),
        });
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error('Error fetching profile data:', err);
      }
    };

    fetchProfileData();
  }, [username]);
  if (!userData) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">User Profile</h2>
      <div className="mb-4">
        <p><strong>Name:</strong> {userData.user.name}</p>
        <p><strong>Email:</strong> {userData.user.email}</p>
      </div>

      <h3 className="text-lg font-semibold mb-2">Your Messages</h3>
      <div className="bg-gray-100 p-4 rounded-md space-y-3">
        {userData.messages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          userData.messages.map((msg, index) => (
            <div key={index} className="bg-white p-3 rounded-md shadow-sm">
              <p><strong>Room:</strong> {msg.room}</p>
              <p><strong>Content:</strong> {msg.content}</p>
              <p className="text-sm text-gray-500">{msg.time}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

