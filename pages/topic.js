import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [topic, setTopic] = useState('');
  const router = useRouter();

  const handleStart = () => {
    if (topic.trim()) {
      router.push(`/quiz?topic=${encodeURIComponent(topic)}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-purple-700">🧠 Start Your AI Quiz</h1>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g., Space)"
          className="w-full border border-purple-300 rounded px-4 py-2 mb-4"
        />
        <button
          onClick={handleStart}
          disabled={!topic.trim()}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded disabled:opacity-50"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
