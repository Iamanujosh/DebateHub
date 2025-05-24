const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./Routes/auth');

const app = express();
app.use(cors({
  origin: 'https://debatehub-2.onrender.com', // your frontend URL
  credentials: true // if using cookies or auth headers
}));
app.use(express.json());


const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      socketTimeoutMS: 45000, // 45 second socket timeout
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1); // Exit with failure
  }
};

connectDB();

    app.use('/api/auth',authRoutes);
    app.use((req, res, next) => {
  console.log('Unhandled route:', req.method, req.url);
  res.status(404).send('Route not found');
});


    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));