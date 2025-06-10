const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const imageRoutes = require('./routes/imageRoutes');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/imageUploadDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('✅ Server is running.');
});

// Routes
app.use('/', imageRoutes);

// Start server
app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
