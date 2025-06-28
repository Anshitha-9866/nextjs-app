// ✅ Fixed quiz.js
// pages/quiz.js
import { useState } from 'react';
import Link from 'next/link';

export default function Quiz() {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const generateQuiz = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic to generate a quiz.');
      return;
    }

    setLoading(true);
    setError(null);
    setQuestions([]);
    setSubmitted(false);
    setScore(0);
    setSelected({});

    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Quiz generation failed');
      }

      const data = await res.json();
      if (!Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error('Invalid quiz format returned from AI');
      }

      setQuestions(data.questions);
    } catch (err) {
      console.error("Quiz Error:", err);
      setError(err.message || 'Something went wrong generating quiz.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (qIndex, option) => {
    if (submitted) return;
    setSelected(prev => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
    if (Object.keys(selected).length < questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }
    let correct = 0;
    questions.forEach((q, i) => {
      if (selected[i] === q.answer) correct++;
    });
    setScore(correct);
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setSubmitted(false);
    setTopic('');
    setQuestions([]);
    setScore(0);
    setSelected({});
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-green-200 to-blue-200 p-6 font-sans">
      <div className="mb-4 flex gap-4">
        <Link href="/" className="text-blue-600 underline">🏠 Home</Link>
        <Link href="/dashboard" className="text-blue-600 underline">Dashboard</Link>
        <Link href="/chatbot" className="text-blue-600 underline">Chatbot</Link>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">📚 AI Quiz Generator</h1>

        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <input
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              setError(null);
            }}
            className="flex-1 border px-4 py-2 rounded-lg"
            placeholder="Enter a topic"
            onKeyDown={(e) => {
              if (e.key === 'Enter') generateQuiz();
            }}
          />
          <button
            onClick={generateQuiz}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >Generate</button>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {questions.length > 0 && (
          <div className="space-y-6">
            {questions.map((q, i) => (
              <div key={i} className="border p-4 rounded-lg">
                <p className="font-semibold mb-2">{i + 1}. {q.question}</p>
                {q.options.map((option, j) => (
                  <div
                    key={j}
                    onClick={() => handleSelect(i, option)}
                    className={`cursor-pointer p-2 rounded mb-1 ${submitted
                      ? option === q.answer
                        ? 'bg-green-100'
                        : selected[i] === option
                          ? 'bg-red-100'
                          : 'bg-gray-50'
                      : selected[i] === option
                        ? 'bg-blue-100'
                        : 'bg-gray-50'}`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            ))}

            {!submitted ? (
              <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
                Submit Quiz
              </button>
            ) : (
              <div className="text-center">
                <p className="text-xl font-bold text-purple-700">Your Score: {score} / {questions.length}</p>
                <button onClick={resetQuiz} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
                  Reset Quiz
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
