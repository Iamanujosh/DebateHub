const express = require('express');
const { GoogleGenAI } = require('@google/genai');
const  Message = require('../Models/message'); 

const router = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/api/debate/result', async (req, res) => {
  const { roomId } = req.body;

  try {
    // 🧠 1. Fetch messages from MongoDB using roomId
    const messages = await Message.find({ room: roomId }).sort({ createdAt: 1 });

    if (!messages.length) {
      return res.status(404).json({ error: 'No messages found for this room' });
    }

    // 📝 2. Format messages into a debate transcript
    const formattedMessages = messages.map(
      msg => `${msg.author}: ${msg.content}`
    ).join('\n');

    // 💡 3. Prepare prompt
    const contents = [
      {
        role: 'user',
        parts: [{
          text: `
Here is a debate between two participants. Based on the arguments and reasoning, determine who made a stronger case and why.

${formattedMessages}

Respond clearly with the winner's name and two lines reason.
          `
        }],
      },
    ];

    // 🧠 4. Call Gemini API
    const response = await ai.models.generateContentStream({
      model: 'gemini-2.0-flash',
      config: { responseMimeType: 'text/plain' },
      contents,
    });

    let result = '';
    for await (const chunk of response) {
      result += chunk.text;
    }

    // ✅ 5. Return the result
    res.json({ result });

  } catch (err) {
    console.error('Error in debate analysis:', err);
    res.status(500).json({ error: 'Failed to analyze debate' });
  }
});

module.exports = router;