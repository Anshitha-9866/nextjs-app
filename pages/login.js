import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { auth } from '../firebase-config';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl border-4 border-purple-300 rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-5">
          <input className="w-full p-2 border rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full p-2 border rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded" type="submit">Sign In</button>
        </form>
        <p className="text-center text-sm mt-4">Don't have an account? <Link href="/signup" className="text-purple-700">Sign Up</Link></p>
      </motion.div>
    </div>
  );
}
