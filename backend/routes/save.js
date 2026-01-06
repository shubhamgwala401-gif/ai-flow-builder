const express = require('express');
const router = express.Router();
const Prompt = require('../models/Prompt');

router.post('/', async (req, res) => {
  const { prompt, response } = req.body;

  if (!prompt || !response) {
    return res.status(400).json({ error: 'Prompt and response required' });
  }

  try {
    const savedData = await Prompt.create({
      prompt,
      response,
    });

    res.json({
      message: 'Saved successfully',
      data: savedData,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save to DB' });
  }
});

module.exports = router;
