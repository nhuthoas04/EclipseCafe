import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Analytics.css';

const Analytics = () => {
  const [stats, setStats] = useState({
    totalRevenue: 850000,
    totalOrders: 127,
    avgOrderValue: 67000,
    customerGrowth: 23.5,
    topProducts: [
      { name: 'Americano', sales: 45, revenue: 1575000 },
      { name: 'Cappuccino', sales: 38, revenue: 1710000 },
      { name: 'Matcha Latte', sales: 24, revenue: 1440000 },
      { name: 'Hi-Tea Passion', sales: 20, revenue: 1100000 }
    ],
    revenueByDay: [
      { day: 'T2', revenue: 120000 },
      { day: 'T3', revenue: 95000 },
      { day: 'T4', revenue: 150000 },
      { day: 'T5', revenue: 180000 },
      { day: 'T6', revenue: 220000 },
      { day: 'T7', revenue: 85000 }
    ],
    categoryStats: [
      { category: 'Cà phê', percentage: 45, color: '#8B4513' },
      { category: 'Trá', percentage: 25, color: '#90EE90' },
      { category: 'Matcha', percentage: 15, color: '#32CD32' },
      { category: 'Hi-Tea', percentage: 10, color: '#FF6B6B' },
      { category: 'Khác', percentage: 5, color: '#DDA0DD' }
    ]
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  return (
    <div className="analytics">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <h1>📈 Thống kê & Phân tích</h1>
          <Link to="/admin" className="back-btn">← Về Dashboard</Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="stats-grid">
        <div className="stat-card revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>{formatPrice(stats.totalRevenue)}</h3>
            <p>Tổng doanh thu</p>
            <span className="growth positive">+15.2% so với tháng trước</span>
          </div>
        </div>
        
        <div className="stat-card orders">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{formatNumber(stats.totalOrders)}</h3>
            <p>Tổng đơn hàng</p>
            <span className="growth positive">+8.7% so với tháng trước</span>
          </div>
        </div>
        
        <div className="stat-card avg-order">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <h3>{formatPrice(stats.avgOrderValue)}</h3>
            <p>Giá trị đơn hàng TB</p>
            <span className="growth positive">+5.3% so với tháng trước</span>
          </div>
        </div>
        
        <div className="stat-card growth">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>{stats.customerGrowth}%</h3>
            <p>Tăng trường khách hàng</p>
            <span className="growth positive">+12.1% so với tháng trước</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Revenue Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>📈 Doanh thu theo ngày (tuần này)</h3>
          </div>
          <div className="revenue-chart">
            {stats.revenueByDay.map((item, index) => (
              <div key={index} className="chart-bar">
                <div 
                  className="bar" 
                  style={{ 
                    height: `${(item.revenue / 250000) * 100}%`,
                    background: `linear-gradient(135deg, #ff9ff3 0%, #f368e0 100%)`
                  }}
                ></div>
                <div className="bar-value">{formatPrice(item.revenue)}</div>
                <div className="bar-label">{item.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>🥤 Phân bố theo danh mục</h3>
          </div>
          <div className="category-chart">
            {stats.categoryStats.map((item, index) => (
              <div key={index} className="category-item">
                <div className="category-info">
                  <div 
                    className="category-color" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="category-name">{item.category}</span>
                </div>
                <div className="category-bar">
                  <div 
                    className="category-fill" 
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: item.color 
                    }}
                  ></div>
                </div>
                <span className="category-percentage">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="top-products-section">
        <div className="section-header">
          <h3>🏆 Sản phẩm bán chạy nhất</h3>
          <span className="period">Trong 30 ngày qua</span>
        </div>
        
        <div className="products-grid">
          {stats.topProducts.map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-rank">#{index + 1}</div>
              <div className="product-info">
                <h4>{product.name}</h4>
                <div className="product-stats">
                  <div className="stat">
                    <span className="label">Đã bán:</span>
                    <span className="value">{product.sales} ly</span>
                  </div>
                  <div className="stat">
                    <span className="label">Doanh thu:</span>
                    <span className="value">{formatPrice(product.revenue)}</span>
                  </div>
                </div>
              </div>
              <div className="product-trend">
                <span className="trend-arrow">📈</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Insights */}
      <div className="insights-section">
        <div className="section-header">
          <h3>💡 Thông tin chi tiết</h3>
        </div>
        
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon">⏰</div>
            <div className="insight-content">
              <h4>Giờ cao điểm</h4>
              <p>14:00 - 16:00 và 19:00 - 21:00 là thời gian có nhiều đơn hàng nhất</p>
            </div>
          </div>
          
          <div className="insight-card">
            <div className="insight-icon">🎯</div>
            <div className="insight-content">
              <h4>Khách hàng trung thành</h4>
              <p>65% đơn hàng đến từ khách hàng quay lại, tăng 12% so với tháng trước</p>
            </div>
          </div>
          
          <div className="insight-card">
            <div className="insight-icon">📱</div>
            <div className="insight-content">
              <h4>Đặt hàng trực tuyến</h4>
              <p>78% đơn hàng được đặt qua website, 22% đặt trực tiếp tại cửa hàng</p>
            </div>
          </div>
          
          <div className="insight-card">
            <div className="insight-icon">💳</div>
            <div className="insight-content">
              <h4>Phương thức thanh toán</h4>
              <p>Thanh toán tiền mặt: 60%, Thẻ/Chuyển khoản: 40%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
