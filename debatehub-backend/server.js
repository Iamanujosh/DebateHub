const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // Needed for socket.io
const { Server } = require('socket.io');
const Message = require('./Models/message.js')
require('dotenv').config();


const authRoutes = require('./Routes/auth');
const msgRoutes = require('./Routes/message.js');
const geminiRoutes = require('./Routes/geminiApi.js');
const connectRoute = require('./Routes/connect.js');
const getProfileData = require('./Routes/getProfileData.js');
const app = express();
// HTTP server + Socket.IO setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://debatehub-2.onrender.com',
    methods: ['GET', 'POST'],
  },
});

/// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_room', ({ roomId, userName }) => {
  socket.join(roomId);
  console.log(`User ${userName} joined room: ${roomId}`);
});


  socket.on('send_message', async (data) => {
  io.to(data.room).emit('receive_message', data);

  // Save to MongoDB
  try {
    const newMessage = new Message({
      room: data.room,
      author: data.author,
      content: data.content,
      time: data.time,
    });
    await newMessage.save();
  } catch (err) {
    console.error('Error saving message:', err);
  }
});

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Middleware
app.use(cors({
  origin: process.env.REACT_APP_API_URL,
  credentials: true
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/', msgRoutes);
app.use('/',geminiRoutes);
app.use('/',connectRoute);
app.use('/',getProfileData);


app.use((req, res, next) => {
  console.log('Unhandled route:', req.method, req.url);
  res.status(404).send('Route not found');
});

// Connect MongoDB
const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
