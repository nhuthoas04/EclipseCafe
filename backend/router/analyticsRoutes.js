const express = require('express');
const {
  getDashboardStats,
  getSalesAnalytics,
  getProductAnalytics,
  getUserAnalytics
} = require('../controller/analyticsController');
const { protect, admin } = require('../middlewares/auth');

const router = express.Router();

// All analytics routes require admin access
router.use(protect);
router.use(admin);

// Routes
router.get('/dashboard', getDashboardStats);
router.get('/sales', getSalesAnalytics);
router.get('/products', getProductAnalytics);
router.get('/users', getUserAnalytics);

module.exports = router;
