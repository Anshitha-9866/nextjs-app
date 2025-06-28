// pages/api/gemini-chat.js
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST requests allowed' });

  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!prompt || !apiKey) {
    return res.status(400).json({ error: 'Missing prompt or Gemini API key' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ reply: text });
  } catch (err) {
    console.error('Gemini API Error:', err);
    res.status(500).json({ error: 'Failed to get response from Gemini' });
  }
}
