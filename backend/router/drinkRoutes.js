const express = require('express');
const {
  getDrinks,
  getDrink,
  getFeaturedDrinks,
  createDrink,
  updateDrink,
  deleteDrink,
  toggleFeatured
} = require('../controller/drinkController');
const { protect, admin } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const router = express.Router();

// Public routes
router.route('/')
  .get(getDrinks)
  .post(protect, upload.array('images', 5), createDrink); // Cho phép upload tối đa 5 ảnh

// Featured drinks route
router.get('/featured', getFeaturedDrinks);

// Upload route riêng
router.post('/upload', protect, upload.array('images', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Không có file nào được tải lên'
      });
    }

    const imageUrls = req.files.map(file => {
      return `http://localhost:5000/uploads/${file.filename}`;
    });

    res.json({
      success: true,
      message: 'Upload ảnh thành công',
      data: {
        images: imageUrls
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

router.route('/:id')
  .get(getDrink)
  .put(protect, upload.array('images', 5), updateDrink)
  .delete(protect, deleteDrink);

// Featured toggle route (Admin only)
router.patch('/:id/featured', protect, admin, toggleFeatured);

module.exports = router;
