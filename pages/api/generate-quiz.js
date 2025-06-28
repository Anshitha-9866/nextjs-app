// pages/api/generate-quiz.js

export default async function handler(req, res) {
  const useMock = false; // ✅ Toggle this to false to use real Gemini API
  const apiKey = process.env.GOOGLE_API_KEY;

  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: 'Topic is required' });

  const prompt = `
Generate a 3-question multiple choice quiz on the topic "${topic}".
Each question should have exactly 4 options and indicate the correct answer using a "correctAnswer" field.
Return ONLY a raw JSON array like this:

[
  {
    "question": "Sample question?",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "A"
  }
]

DO NOT include markdown, explanations, or formatting. Only return raw JSON.
  `;

  let data;

  if (useMock) {
    // ✅ MOCK Gemini Response
    data = {
      candidates: [
        {
          content: {
            parts: [
              {
                text: `[
  {
    "question": "What is the capital of France?",
    "options": ["Berlin", "London", "Paris", "Rome"],
    "correctAnswer": "Paris"
  },
  {
    "question": "What planet is known as the Red Planet?",
    "options": ["Earth", "Venus", "Mars", "Jupiter"],
    "correctAnswer": "Mars"
  },
  {
    "question": "What gas do plants absorb from the atmosphere?",
    "options": ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    "correctAnswer": "Carbon Dioxide"
  }
]`
              }
            ]
          }
        }
      ]
    };
  } else {
    // ✅ REAL Gemini Request
    if (!apiKey) return res.status(500).json({ error: 'Google API key is missing' });

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      data = await response.json();
    } catch (err) {
      console.error('Gemini API error:', err);
      return res.status(500).json({ error: 'Failed to fetch from Gemini API' });
    }
  }

  // ✅ Extract and parse the response
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    return res.status(500).json({
      error: 'Empty response from Gemini',
      raw: data
    });
  }

  const jsonText = text.replace(/```(?:json)?/g, '').trim();

  let quiz;
  try {
    quiz = JSON.parse(jsonText);
  } catch (err) {
    console.error('JSON parse error:', err);
    return res.status(500).json({
      error: 'Invalid quiz format returned from AI',
      raw: jsonText
    });
  }

  if (
    !Array.isArray(quiz) ||
    quiz.some(q => !q.question || !Array.isArray(q.options) || q.options.length !== 4 || !q.correctAnswer)
  ) {
    return res.status(500).json({
      error: 'Invalid quiz structure',
      raw: quiz
    });
  }

  return res.status(200).json({ quiz });
}
