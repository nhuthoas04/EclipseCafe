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
      const searchTerm = req.query.search.trim();
      // Try text search first, fallback to regex search
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { ingredients: { $regex: searchTerm, $options: 'i' } }
      ];
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

    // Available filter
    if (req.query.available === 'true') {
      query.isAvailable = true;
    } else if (req.query.available === 'false') {
      query.isAvailable = false;
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

// @desc    Get featured drinks
// @route   GET /api/drinks/featured
// @access  Public
const getFeaturedDrinks = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    
    const drinks = await Drink.find({ 
      isActive: true, 
      isFeatured: true,
      isAvailable: true 
    })
    .sort({ updatedAt: -1 })
    .limit(limit)
    .populate('createdBy', 'name email');

    res.json({
      success: true,
      data: drinks
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
    };

    // Loại bỏ trường createdBy nếu có trong req.body để tránh conflict
    delete drinkData.createdBy;
    drinkData.createdBy = req.user._id || req.user.id;

    // Xử lý ảnh upload
    if (req.files && req.files.length > 0) {
      drinkData.images = req.files.map(file => 
        `http://localhost:5000/uploads/${file.filename}`
      );
    }

    // Xử lý arrays từ form
    if (typeof drinkData.size === 'string') {
      drinkData.size = drinkData.size.split(',').map(s => s.trim());
    }
    if (typeof drinkData.temperature === 'string') {
      drinkData.temperature = drinkData.temperature.split(',').map(t => t.trim());
    }
    if (typeof drinkData.sweetness === 'string') {
      drinkData.sweetness = drinkData.sweetness.split(',').map(s => s.trim());
    }
    if (typeof drinkData.ingredients === 'string') {
      drinkData.ingredients = drinkData.ingredients.split(',').map(i => i.trim());
    }

    // Đảm bảo mô tả không để trống
    if (!drinkData.description || drinkData.description.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Mô tả đồ uống không được để trống'
      });
    }

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

    const drinkData = { ...req.body };
    
    // Loại bỏ trường createdBy để tránh conflict
    delete drinkData.createdBy;

    // Xử lý ảnh upload mới
    let allImages = [];
    
    // Thêm ảnh cũ nếu có
    if (req.body.existingImages) {
      if (Array.isArray(req.body.existingImages)) {
        allImages = [...req.body.existingImages];
      } else {
        allImages = [req.body.existingImages];
      }
    }
    
    // Thêm ảnh mới nếu có
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => 
        `http://localhost:5000/uploads/${file.filename}`
      );
      allImages = [...allImages, ...newImages];
    }
    
    drinkData.images = allImages;

    // Xử lý arrays từ form (có thể là JSON string)
    if (typeof drinkData.size === 'string') {
      try {
        drinkData.size = JSON.parse(drinkData.size);
      } catch {
        drinkData.size = drinkData.size.split(',').map(s => s.trim());
      }
    }
    if (typeof drinkData.temperature === 'string') {
      try {
        drinkData.temperature = JSON.parse(drinkData.temperature);
      } catch {
        drinkData.temperature = drinkData.temperature.split(',').map(t => t.trim());
      }
    }
    if (typeof drinkData.sweetness === 'string') {
      try {
        drinkData.sweetness = JSON.parse(drinkData.sweetness);
      } catch {
        drinkData.sweetness = drinkData.sweetness.split(',').map(s => s.trim());
      }
    }
    if (typeof drinkData.ingredients === 'string') {
      try {
        drinkData.ingredients = JSON.parse(drinkData.ingredients);
      } catch {
        drinkData.ingredients = drinkData.ingredients.split(',').map(i => i.trim());
      }
    }

    // Đảm bảo mô tả không để trống
    if (!drinkData.description || drinkData.description.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Mô tả đồ uống không được để trống'
      });
    }

    drink = await Drink.findByIdAndUpdate(
      req.params.id,
      drinkData,
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

// @desc    Toggle featured status
// @route   PATCH /api/drinks/:id/featured
// @access  Private (Admin only)
const toggleFeatured = async (req, res) => {
  try {
    const drink = await Drink.findById(req.params.id);

    if (!drink) {
      return res.status(404).json({ 
        success: false,
        message: 'Không tìm thấy đồ uống' 
      });
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(401).json({ 
        success: false,
        message: 'Chỉ admin mới có quyền ghim sản phẩm' 
      });
    }

    // Toggle featured status
    drink.isFeatured = !drink.isFeatured;
    await drink.save();

    res.json({
      success: true,
      message: drink.isFeatured ? 'Đã ghim sản phẩm vào trang chủ' : 'Đã bỏ ghim sản phẩm',
      data: drink
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
  getFeaturedDrinks,
  createDrink,
  updateDrink,
  deleteDrink,
  toggleFeatured
};
