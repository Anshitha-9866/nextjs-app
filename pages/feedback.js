import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

export default function Feedback() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [feedback, setFeedback] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
      }
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Feedback submitted: ' + feedback);
    setFeedback('');
  };

  if (checkingAuth) return <div className="text-center p-6">Checking authentication...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-200">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-purple-700">💬 Submit Feedback</h1>
        <textarea
          rows={5}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback here..."
          className="w-full p-3 border rounded mb-4"
          required
        />
        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
          Submit
        </button>
      </form>
    </div>
  );
}
