// ✅ Fixed chatbot.js
// pages/chatbot.js
import { useState } from 'react';
import Link from 'next/link';

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await fetch('/api/gemini-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Chat request failed');
      }

      const data = await res.json();
      const botMessage = { role: 'bot', content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setError('Failed to get response from AI. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="mb-4 flex gap-4">
        <Link href="/" className="text-blue-600 underline">🏠 Home</Link>
        <Link href="/dashboard" className="text-blue-600 underline">Dashboard</Link>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">🤖 Chatbot</h1>
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className={`p-2 rounded ${msg.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}>
              <span>{msg.content}</span>
            </div>
          ))}
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <textarea
          className="mt-4 w-full border p-2 rounded"
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
        ></textarea>
        <button
          onClick={sendMessage}
          disabled={loading}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </div>
    </div>
  );
}