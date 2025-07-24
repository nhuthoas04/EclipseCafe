const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const connectDB = require('./config/database');

// Load env variables
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Drink Shop API',
    status: 'Server is running successfully'
  });
});

// API Routes
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

// User routes
app.use('/api/users', require('./router/userRoutes'));

// Google Auth routes
app.use('/api/auth/google', require('./router/googleAuthRoutes'));

// Drink routes  
app.use('/api/drinks', require('./router/drinkRoutes'));

// Order routes
app.use('/api/orders', require('./router/orderRoutes'));

// Analytics routes
app.use('/api/analytics', require('./router/analyticsRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log('================================');
  console.log('🚀 ECLIPSE Backend Server Started!');
  console.log('================================');
  console.log(`📡 Server running on: http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  Database: MongoDB`);
  console.log('📋 Available Routes:');
  console.log(`   🍹 Products: http://localhost:${PORT}/api/drinks`);
  console.log(`   ⭐ Featured: http://localhost:${PORT}/api/drinks/featured`);
  console.log(`   👥 Users: http://localhost:${PORT}/api/users`);
  console.log(`   📦 Orders: http://localhost:${PORT}/api/orders`);
  console.log('================================');
  console.log('💡 Press Ctrl+C to stop server');
  console.log('');
});

const swaggerDocs = require('./swagger');
swaggerDocs(app);
