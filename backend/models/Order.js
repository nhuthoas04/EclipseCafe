const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Cho phép đặt hàng guest
  },
  items: [{
    drink: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Drink',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    size: {
      type: String,
      enum: ['S', 'M', 'L', 'XL'],
      required: true
    },
    temperature: {
      type: String,
      enum: ['hot', 'cold', 'room'],
      default: 'room'
    },
    sweetness: {
      type: String,
      enum: ['none', 'low', 'normal', 'high'],
      default: 'normal'
    },
    note: String
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['processing', 'completed', 'cancelled'],
    default: 'processing'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'momo', 'zalopay'],
    default: 'cash'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  customerInfo: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: String
  },
  deliveryInfo: {
    type: {
      type: String,
      enum: ['pickup', 'delivery'],
      default: 'pickup'
    },
    address: String,
    note: String
  },
  estimatedTime: {
    type: Number, // minutes
    default: 15
  },
  actualTime: Number, // minutes
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  notes: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Generate order number
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    
    // Count orders today
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
    const count = await this.constructor.countDocuments({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });
    
    this.orderNumber = `DH${dateStr}${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

// Create index for search
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ user: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);
