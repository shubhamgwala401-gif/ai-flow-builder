const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === '') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const model = 'openai/gpt-3.5-turbo'; 

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model,
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiText = response.data.choices[0].message.content;
    res.json({ response: aiText });
  } catch (err) {
    res.status(500).json({ error: 'AI request failed' });
  }
});

module.exports = router;
