const express = require('express');
const {
  getDrinks,
  getDrink,
  createDrink,
  updateDrink,
  deleteDrink
} = require('../controller/drinkController');
const { protect, admin } = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.route('/')
  .get(getDrinks)
  .post(protect, createDrink);

router.route('/:id')
  .get(getDrink)
  .put(protect, updateDrink)
  .delete(protect, deleteDrink);

module.exports = router;
