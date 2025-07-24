const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      
      if (!token || token === 'undefined' || token === 'null') {
        return res.status(401).json({ 
          success: false,
          message: 'Token không được cung cấp',
          tokenExpired: false
        });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token with timeout
      req.user = await User.findById(decoded.id)
        .select('-password')
        .maxTimeMS(15000);

      if (!req.user) {
        return res.status(401).json({ 
          success: false,
          message: 'Không tìm thấy người dùng',
          tokenExpired: false
        });
      }

      // Đảm bảo req.user có id
      req.user.id = req.user._id.toString();

      next();
    } catch (error) {
      console.error('🚫 JWT Error:', error.message);
      
      let message = 'Token không hợp lệ';
      let tokenExpired = false;
      
      if (error.name === 'TokenExpiredError') {
        message = 'Token đã hết hạn, vui lòng đăng nhập lại';
        tokenExpired = true;
      } else if (error.name === 'JsonWebTokenError') {
        message = 'Token không hợp lệ';
      }
      
      return res.status(401).json({ 
        success: false,
        message: message,
        tokenExpired: tokenExpired
      });
    }
  } else {
    return res.status(401).json({ 
      success: false,
      message: 'Không có token, truy cập bị từ chối',
      tokenExpired: false
    });
  }
};

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ 
      success: false,
      message: 'Chỉ admin mới có quyền truy cập' 
    });
  }
};

// Optional protect - cho phép truy cập với hoặc không có token
const optionalProtect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      
      if (token && token !== 'undefined' && token !== 'null') {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token with timeout
        req.user = await User.findById(decoded.id)
          .select('-password')
          .maxTimeMS(15000);

        if (req.user) {
          // Đảm bảo req.user có id
          req.user.id = req.user._id.toString();
        }
      }
    } catch (error) {
      console.log('Token không hợp lệ, tiếp tục như guest');
      // Không return error, chỉ log và tiếp tục
    }
  }

  next();
};

module.exports = { protect, admin, optionalProtect };
