const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vui lòng nhập tên đồ uống'],
    trim: true,
    maxlength: [100, 'Tên đồ uống không được quá 100 ký tự']
  },
  description: {
    type: String,
    required: [true, 'Vui lòng nhập mô tả đồ uống'],
    maxlength: [1000, 'Mô tả không được quá 1000 ký tự']
  },
  price: {
    type: Number,
    required: [true, 'Vui lòng nhập giá đồ uống'],
    min: [0, 'Giá không được âm']
  },
  category: {
    type: String,
    required: [true, 'Vui lòng chọn loại đồ uống'],
    enum: ['coffee', 'a-me', 'hi-tea', 'matcha', 'cake', 'tea', 'juice', 'smoothie', 'soft-drink', 'milk-tea', 'cocktail', 'water']
  },
  size: [{
    type: String,
    enum: ['S', 'M', 'L', 'XL']
  }],
  temperature: [{
    type: String,
    enum: ['hot', 'cold', 'room']
  }],
  sweetness: [{
    type: String,
    enum: ['none', 'low', 'normal', 'high']
  }],
  ingredients: [{
    type: String
  }],
  images: [{
    type: String
  }],
  stock: {
    type: Number,
    required: [true, 'Vui lòng nhập số lượng'],
    min: [0, 'Số lượng không được âm'],
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number, // minutes
    default: 5,
    min: [1, 'Thời gian pha chế tối thiểu 1 phút']
  },
  calories: {
    type: Number,
    min: [0, 'Calories không được âm'],
    default: 0
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: [0, 'Rating không được nhỏ hơn 0'],
      max: [5, 'Rating không được lớn hơn 5']
    },
    count: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Create index for search
drinkSchema.index({ name: 'text', description: 'text', ingredients: 'text' });

module.exports = mongoose.model('Drink', drinkSchema);
