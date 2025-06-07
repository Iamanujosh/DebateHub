const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  room: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  time: { type: String, required: true }, // or use Date if preferred
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
