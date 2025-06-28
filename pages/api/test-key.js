// pages/api/test-key.js

export default function handler(req, res) {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing API key' });
  }

  res.status(200).json({ message: 'API key is set!' });
}

