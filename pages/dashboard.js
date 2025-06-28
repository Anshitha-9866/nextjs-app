import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 p-6">
      {/* Navigation Links */}
      <div className="mb-4 flex gap-4">
        <Link href="/" className="text-blue-700 underline">🏠 Home</Link>
        <Link href="/login" className="text-blue-700 underline">Login</Link>
        <Link href="/signup" className="text-blue-700 underline">Sign Up</Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-3xl border-4 border-indigo-200 p-10 max-w-2xl w-full text-center"
      >
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">🎉 Dashboard</h1>

        {user ? (
          <p className="text-lg text-indigo-800 mb-6">
            Welcome back, <strong>{user.email}</strong>!
          </p>
        ) : (
          <p className="text-lg text-gray-700 mb-6">
            You are visiting as a guest. Login to personalize your experience.
          </p>
        )}

        <div className="space-y-4">
          <Link href="/quiz" className="block bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded shadow transition">
            Go to Quiz
          </Link>
          <Link href="/chatbot" className="block bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded shadow transition">
            Talk to Chatbot
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
