const Order = require('../models/Order');
const Drink = require('../models/Drink');
const User = require('../models/User');
const { sendOrderNotification, sendOrderConfirmation } = require('../services/emailService');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    // Migration cho status cũ - chỉ chạy một lần
    await Order.updateMany(
      { status: 'pending' }, 
      { status: 'processing' }
    );
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    
    // Filter by status
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    // Filter by date range
    if (req.query.fromDate || req.query.toDate) {
      filter.createdAt = {};
      if (req.query.fromDate) {
        filter.createdAt.$gte = new Date(req.query.fromDate);
      }
      if (req.query.toDate) {
        filter.createdAt.$lte = new Date(req.query.toDate);
      }
    }

    const orders = await Order.find(filter)
      .populate('user', 'name email')
      .populate('items.drink', 'name images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      data: orders,
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

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('items.drink', 'name images price');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const orderData = {
      ...req.body
    };

    // Nếu có user đăng nhập thì gán, nếu không thì tạo đơn hàng guest
    if (req.user) {
      orderData.user = req.user.id;
    }

    // Validate items and calculate total
    let totalAmount = 0;
    for (let item of orderData.items) {
      const drink = await Drink.findById(item.drink);
      if (!drink) {
        return res.status(404).json({
          success: false,
          message: `Không tìm thấy đồ uống với ID: ${item.drink}`
        });
      }
      
      if (!drink.isAvailable) {
        return res.status(400).json({
          success: false,
          message: `Đồ uống ${drink.name} hiện không có sẵn`
        });
      }

      item.name = drink.name;
      item.price = drink.price;
      totalAmount += item.price * item.quantity;
    }

    // Apply discount
    if (orderData.discount > 0) {
      totalAmount -= (totalAmount * orderData.discount / 100);
    }

    orderData.totalAmount = totalAmount;

    const order = await Order.create(orderData);
    
    // Populate the created order
    const populatedOrder = await Order.findById(order._id)
      .populate('user', 'name email')
      .populate('items.drink', 'name images');

    // Prepare email data
    const emailData = {
      orderId: populatedOrder.orderNumber,
      totalAmount: populatedOrder.totalAmount,
      status: populatedOrder.status,
      customerInfo: {
        name: populatedOrder.customerInfo.name,
        email: populatedOrder.customerInfo.email || (populatedOrder.user ? populatedOrder.user.email : ''),
        phone: populatedOrder.customerInfo.phone,
        address: populatedOrder.deliveryInfo.address || 'Lấy tại cửa hàng'
      },
      items: populatedOrder.items.map(item => ({
        name: item.name,
        size: item.size,
        temperature: item.temperature === 'hot' ? 'Nóng' : item.temperature === 'cold' ? 'Lạnh' : 'Thường',
        sweetness: item.sweetness === 'none' ? 'Không đường' : 
                  item.sweetness === 'low' ? 'Ít đường' : 
                  item.sweetness === 'normal' ? 'Bình thường' : 'Nhiều đường',
        quantity: item.quantity,
        price: item.price,
        note: item.note || ''
      }))
    };

    // Send notification email to admin
    try {
      await sendOrderNotification(emailData);
      console.log('✅ Email thông báo đã gửi cho admin');
    } catch (emailError) {
      console.error('❌ Lỗi gửi email cho admin:', emailError);
    }

    // Send confirmation email to customer if email exists
    if (emailData.customerInfo.email) {
      try {
        await sendOrderConfirmation(emailData);
        console.log('✅ Email xác nhận đã gửi cho khách hàng');
      } catch (emailError) {
        console.error('❌ Lỗi gửi email cho khách hàng:', emailError);
      }
    }

    res.status(201).json({
      success: true,
      data: populatedOrder
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update order
// @route   PUT /api/orders/:id
// @access  Private/Admin
const updateOrder = async (req, res) => {
  try {
    console.log('Update order request:', req.params.id, req.body);
    
    const order = await Order.findById(req.params.id);

    if (!order) {
      console.log('Order not found:', req.params.id);
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng'
      });
    }

    console.log('Current order:', order.toObject());

    // Only admin or order owner can update
    if (req.user.role !== 'admin' && order.user && order.user.toString() !== req.user.id) {
      console.log('Permission denied for user:', req.user.id, 'order user:', order.user);
      return res.status(403).json({
        success: false,
        message: 'Không có quyền cập nhật đơn hàng này'
      });
    }

    // Migration cho status cũ
    const updateData = { ...req.body };
    if (updateData.status === 'pending') {
      updateData.status = 'processing';
    }

    console.log('Updating with data:', updateData);

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('user', 'name email')
     .populate('items.drink', 'name images');

    res.json({
      success: true,
      data: updatedOrder
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng'
      });
    }

    await order.deleteOne();

    res.json({
      success: true,
      message: 'Đã xóa đơn hàng thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder
};
