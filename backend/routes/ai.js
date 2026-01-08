const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://ai-flow-builder.onrender.com',
          'X-Title': 'AI Flow Builder'
        }
      }
    );

    res.json({
      response: response.data.choices[0].message.content
    });

  } catch (err) {
    console.error('OPENROUTER ERROR:', err.response?.data || err.message);
    res.status(500).json({ error: 'AI request failed' });
  }
});

module.exports = router;
