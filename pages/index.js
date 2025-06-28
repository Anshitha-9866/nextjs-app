import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-400 via-pink-300 to-yellow-200 p-6 space-y-10">
      <div className="bg-white shadow-2xl border-4 border-purple-300 rounded-2xl p-10 w-full max-w-xl text-center">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">🚀 Welcome to EduMentor</h1>
        <p className="text-purple-600 text-lg">Your AI-powered learning companion</p>
      </div>

      <div className="space-y-3 text-center">
        <p className="text-lg text-purple-900 font-semibold">Explore the app:</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/dashboard" className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded shadow transition">Dashboard</Link>
          <Link href="/quiz" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded shadow transition">Quiz</Link>
          <Link href="/chatbot" className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded shadow transition">Chatbot</Link>
          <Link href="/login" className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded shadow transition">Login</Link>
          <Link href="/signup" className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded shadow transition">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
