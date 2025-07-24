const Drink = require('../models/Drink');

// @desc    Get all drinks
// @route   GET /api/drinks
// @access  Public
const getDrinks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = { isActive: true };
    
    // Search functionality
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }
    
    // Category filter
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Size filter
    if (req.query.size) {
      query.size = req.query.size;
    }

    // Temperature filter
    if (req.query.temperature) {
      if (req.query.temperature !== 'both') {
        query.$or = [
          { temperature: req.query.temperature },
          { temperature: 'both' }
        ];
      }
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice);
    }

    // Available only filter
    if (req.query.available === 'true') {
      query.isAvailable = true;
    }

    const drinks = await Drink.find(query)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Drink.countDocuments(query);

    res.json({
      success: true,
      data: drinks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Get single drink
// @route   GET /api/drinks/:id
// @access  Public
const getDrink = async (req, res) => {
  try {
    const drink = await Drink.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!drink) {
      return res.status(404).json({ 
        success: false,
        message: 'Không tìm thấy đồ uống' 
      });
    }

    res.json({
      success: true,
      data: drink
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Create drink
// @route   POST /api/drinks
// @access  Private
const createDrink = async (req, res) => {
  try {
    const drinkData = {
      ...req.body,
      createdBy: req.user.id
    };

    const drink = await Drink.create(drinkData);

    res.status(201).json({
      success: true,
      data: drink
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Update drink
// @route   PUT /api/drinks/:id
// @access  Private
const updateDrink = async (req, res) => {
  try {
    let drink = await Drink.findById(req.params.id);

    if (!drink) {
      return res.status(404).json({ 
        success: false,
        message: 'Không tìm thấy đồ uống' 
      });
    }

    // Check if user owns drink or is admin
    if (drink.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ 
        success: false,
        message: 'Không có quyền cập nhật đồ uống này' 
      });
    }

    drink = await Drink.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: drink
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: error.message 
    });
  }
};

// @desc    Delete drink
// @route   DELETE /api/drinks/:id
// @access  Private
const deleteDrink = async (req, res) => {
  try {
    const drink = await Drink.findById(req.params.id);

    if (!drink) {
      return res.status(404).json({ 
        success: false,
        message: 'Không tìm thấy đồ uống' 
      });
    }

    // Check if user owns drink or is admin
    if (drink.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ 
        success: false,
        message: 'Không có quyền xóa đồ uống này' 
      });
    }

    await Drink.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Đã xóa đồ uống thành công'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

module.exports = {
  getDrinks,
  getDrink,
  createDrink,
  updateDrink,
  deleteDrink
};
