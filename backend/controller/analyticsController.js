const Order = require('../models/Order');
const Drink = require('../models/Drink');
const User = require('../models/User');

// @desc    Get dashboard statistics
// @route   GET /api/analytics/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setHours(23, 59, 59, 999));
    
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31);

    // Parallel queries for better performance
    const [
      totalOrders,
      totalUsers,
      totalDrinks,
      todayOrders,
      todayRevenue,
      monthlyRevenue,
      yearlyRevenue,
      pendingOrders,
      completedOrders,
      cancelledOrders,
      popularDrinks,
      recentOrders
    ] = await Promise.all([
      // Total counts
      Order.countDocuments({ isActive: true }),
      User.countDocuments({ isActive: true }),
      Drink.countDocuments({ isActive: true }),
      
      // Today's stats
      Order.countDocuments({
        createdAt: { $gte: startOfToday, $lte: endOfToday }
      }),
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfToday, $lte: endOfToday },
            paymentStatus: 'paid'
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$totalAmount' }
          }
        }
      ]),
      
      // Monthly revenue
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfMonth, $lte: endOfMonth },
            paymentStatus: 'paid'
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$totalAmount' }
          }
        }
      ]),
      
      // Yearly revenue
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfYear, $lte: endOfYear },
            paymentStatus: 'paid'
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$totalAmount' }
          }
        }
      ]),
      
      // Order status counts
      Order.countDocuments({ status: 'pending' }),
      Order.countDocuments({ status: 'completed' }),
      Order.countDocuments({ status: 'cancelled' }),
      
      // Popular drinks
      Order.aggregate([
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.drink',
            name: { $first: '$items.name' },
            totalQuantity: { $sum: '$items.quantity' },
            totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
          }
        },
        { $sort: { totalQuantity: -1 } },
        { $limit: 5 }
      ]),
      
      // Recent orders
      Order.find()
        .populate('user', 'name email')
        .sort({ createdAt: -1 })
        .limit(5)
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          totalOrders,
          totalUsers,
          totalDrinks,
          todayOrders,
          todayRevenue: todayRevenue[0]?.total || 0,
          monthlyRevenue: monthlyRevenue[0]?.total || 0,
          yearlyRevenue: yearlyRevenue[0]?.total || 0
        },
        orderStatus: {
          pending: pendingOrders,
          completed: completedOrders,
          cancelled: cancelledOrders
        },
        popularDrinks,
        recentOrders
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get sales analytics
// @route   GET /api/analytics/sales
// @access  Private/Admin
const getSalesAnalytics = async (req, res) => {
  try {
    const { period = 'month', year = new Date().getFullYear() } = req.query;
    
    let groupBy, dateRange;
    
    if (period === 'day') {
      // Last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      groupBy = {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' }
        },
        date: { $first: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } } }
      };
      
      dateRange = {
        createdAt: { $gte: thirtyDaysAgo },
        paymentStatus: 'paid'
      };
    } else if (period === 'week') {
      // Last 12 weeks
      const twelveWeeksAgo = new Date();
      twelveWeeksAgo.setDate(twelveWeeksAgo.getDate() - 84);
      
      groupBy = {
        _id: {
          year: { $year: '$createdAt' },
          week: { $week: '$createdAt' }
        },
        date: { $first: { $dateToString: { format: '%Y-W%U', date: '$createdAt' } } }
      };
      
      dateRange = {
        createdAt: { $gte: twelveWeeksAgo },
        paymentStatus: 'paid'
      };
    } else {
      // Monthly data for the year
      groupBy = {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        },
        date: { $first: { $dateToString: { format: '%Y-%m', date: '$createdAt' } } }
      };
      
      dateRange = {
        createdAt: {
          $gte: new Date(year, 0, 1),
          $lte: new Date(year, 11, 31)
        },
        paymentStatus: 'paid'
      };
    }

    const salesData = await Order.aggregate([
      { $match: dateRange },
      {
        $group: {
          ...groupBy,
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 },
          avgOrderValue: { $avg: '$totalAmount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1, '_id.week': 1 } }
    ]);

    res.json({
      success: true,
      data: salesData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get product analytics
// @route   GET /api/analytics/products
// @access  Private/Admin
const getProductAnalytics = async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(period));

    const productStats = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: daysAgo },
          paymentStatus: 'paid'
        }
      },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.drink',
          name: { $first: '$items.name' },
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
          avgPrice: { $avg: '$items.price' },
          orderCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'drinks',
          localField: '_id',
          foreignField: '_id',
          as: 'drinkInfo'
        }
      },
      {
        $addFields: {
          category: { $arrayElemAt: ['$drinkInfo.category', 0] },
          images: { $arrayElemAt: ['$drinkInfo.images', 0] }
        }
      },
      { $sort: { totalQuantity: -1 } }
    ]);

    // Category performance
    const categoryStats = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: daysAgo },
          paymentStatus: 'paid'
        }
      },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'drinks',
          localField: 'items.drink',
          foreignField: '_id',
          as: 'drinkInfo'
        }
      },
      {
        $group: {
          _id: { $arrayElemAt: ['$drinkInfo.category', 0] },
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
          productCount: { $addToSet: '$items.drink' }
        }
      },
      {
        $addFields: {
          uniqueProducts: { $size: '$productCount' }
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        products: productStats,
        categories: categoryStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user analytics
// @route   GET /api/analytics/users
// @access  Private/Admin
const getUserAnalytics = async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(period));

    const [
      newUsers,
      activeUsers,
      topCustomers,
      userGrowth
    ] = await Promise.all([
      // New users in period
      User.countDocuments({
        createdAt: { $gte: daysAgo }
      }),
      
      // Active users (users who made orders)
      Order.distinct('user', {
        createdAt: { $gte: daysAgo }
      }),
      
      // Top customers by orders
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: daysAgo },
            paymentStatus: 'paid'
          }
        },
        {
          $group: {
            _id: '$user',
            totalOrders: { $sum: 1 },
            totalSpent: { $sum: '$totalAmount' },
            avgOrderValue: { $avg: '$totalAmount' }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'userInfo'
          }
        },
        {
          $addFields: {
            name: { $arrayElemAt: ['$userInfo.name', 0] },
            email: { $arrayElemAt: ['$userInfo.email', 0] }
          }
        },
        { $sort: { totalSpent: -1 } },
        { $limit: 10 }
      ]),
      
      // User growth over time
      User.aggregate([
        {
          $match: {
            createdAt: { $gte: daysAgo }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
              day: { $dayOfMonth: '$createdAt' }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
      ])
    ]);

    res.json({
      success: true,
      data: {
        newUsers,
        activeUsers: activeUsers.length,
        topCustomers,
        userGrowth
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getDashboardStats,
  getSalesAnalytics,
  getProductAnalytics,
  getUserAnalytics
};
