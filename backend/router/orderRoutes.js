const express = require('express');
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder
} = require('../controller/orderController');
const { protect, admin, optionalProtect } = require('../middlewares/auth');

const router = express.Router();

// Routes
router.route('/')
  .get(protect, admin, getOrders)
  .post(optionalProtect, createOrder);

router.route('/:id')
  .get(protect, getOrder)
  .put(protect, updateOrder)
  .delete(protect, admin, deleteOrder);

module.exports = router;
