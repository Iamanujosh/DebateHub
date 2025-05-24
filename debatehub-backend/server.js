const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./Routes/auth');

const app = express();
app.use(cors());
app.use(express.json());
console.log("MONGO_URI from env:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDb Connected"));

    app.use('/api/auth',authRoutes);
    app.use((req, res, next) => {
  console.log('Unhandled route:', req.method, req.url);
  res.status(404).send('Route not found');
});


    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));