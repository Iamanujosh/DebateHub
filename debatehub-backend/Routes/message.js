const express = require('express');
const Message = require('../Models/message');
const router = express.Router();

// GET messages for a specific room
router.get('/api/messages/:roomId', async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.roomId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
