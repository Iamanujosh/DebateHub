import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ResultPage() {
  const { roomId } = useParams();
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetch('https://debatehub.onrender.com/api/debate/result', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ roomId }),
        });
        console.log("roomid",roomId)
        const data = await res.json();
        setResult(data.result);
      } catch (error) {
        console.error('Failed to fetch result:', error);
        setResult('Error fetching result');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [roomId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="result-room w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-semibold mb-4">Debate Over</h1>
        <p className="text-gray-600 mb-2">Room: {roomId}</p>
        {loading ? (
          <p>Analyzing debate...</p>
        ) : (
          <p className="text-lg font-medium">{result}</p>
        )}
      </div>
    </div>
  );
}
