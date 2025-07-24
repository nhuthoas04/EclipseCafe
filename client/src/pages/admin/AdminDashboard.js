import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { apiConfig } from '../../utils/apiConfig';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalDrinks: 0,
    activeDrinks: 0,
    totalUsers: 0,
    todayOrders: 0,
    recentDrinks: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from analytics endpoint first
      try {
        const analyticsResponse = await axios.get(`${apiConfig.baseURL}${apiConfig.endpoints.analytics}/dashboard`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (analyticsResponse.data.success) {
          const data = analyticsResponse.data.data;
          setStats(prev => ({
            ...prev,
            totalDrinks: data.totalDrinks,
            activeDrinks: data.activeDrinks,
            totalUsers: data.totalUsers,
            todayOrders: data.todayOrders
          }));
        }
      } catch (analyticsError) {
        console.log('Analytics endpoint not available, falling back to manual calculation');
        
        // Fallback: Manual calculation
        // Fetch all drinks to get accurate stats
        const allDrinksResponse = await axios.get(`${apiConfig.baseURL}${apiConfig.endpoints.drinks}?page=1&limit=1000`);
        
        if (allDrinksResponse.data.success) {
          const allDrinks = allDrinksResponse.data.data;
          const total = allDrinksResponse.data.pagination.total;
          const active = allDrinks.filter(drink => drink.isAvailable).length;
          
          setStats(prev => ({
            ...prev,
            totalDrinks: total,
            activeDrinks: active
          }));
        }
        
        // Try to fetch users count
        try {
          const usersResponse = await axios.get('http://localhost:5000/api/users', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (usersResponse.data.success) {
            setStats(prev => ({
              ...prev,
              totalUsers: usersResponse.data.data.length
            }));
          }
        } catch (userError) {
          console.log('Users endpoint not available');
        }
        
        // Try to fetch today's orders
        try {
          const ordersResponse = await axios.get('http://localhost:5000/api/orders', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (ordersResponse.data.success) {
            const today = new Date().toISOString().split('T')[0];
            const todayOrders = ordersResponse.data.data.filter(order => {
              const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
              return orderDate === today;
            });
            setStats(prev => ({
              ...prev,
              todayOrders: todayOrders.length
            }));
          }
        } catch (orderError) {
          console.log('Orders endpoint not available');
        }
      }
      
      // Always fetch recent drinks for display
      const recentDrinksResponse = await axios.get('http://localhost:5000/api/drinks?limit=5');
      if (recentDrinksResponse.data.success) {
        setStats(prev => ({
          ...prev,
          recentDrinks: recentDrinksResponse.data.data
        }));
      }
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const categories = {
    coffee: 'Cà phê',
    tea: 'Trà',
    'milk-tea': 'Trà sữa',
    juice: 'Nước ép',
    smoothie: 'Sinh tố',
    'soft-drink': 'Nước ngọt',
    cocktail: 'Cocktail',
    water: 'Nước uống'
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="header-content">
          <div>
            <h1>🏪 Bảng Điều Khiển Quản Trị - ECLIPSE</h1>
            <p>Chào mừng, {user?.name}!</p>
          </div>
          <button 
            onClick={fetchDashboardData} 
            className="refresh-btn"
            disabled={loading}
          >
            {loading ? '🔄 Đang tải...' : '🔄 Làm mới'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <Link to="/admin/drinks" className="stat-card clickable">
          <div className="stat-icon">🥤</div>
          <div className="stat-info">
            <h3>{stats.totalDrinks}</h3>
            <p>Tổng đồ uống</p>
          </div>
        </Link>
        
        <Link to="/admin/users" className="stat-card clickable">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Người dùng</p>
          </div>
        </Link>
        
        <Link to="/admin/orders" className="stat-card clickable">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>{stats.todayOrders}</h3>
            <p>Đơn hàng hôm nay</p>
          </div>
        </Link>
      </div>

      {/* Recent Drinks */}
      <div className="recent-section">
        <div className="section-header">
          <h2>Đồ uống mới nhất</h2>
          <Link to="/admin/drinks" className="view-all-btn">
            Xem tất cả →
          </Link>
        </div>
        
        <div className="recent-drinks-grid">
          {stats.recentDrinks.map(drink => (
            <div key={drink._id} className="drink-item">
              <div className="drink-image">
                {drink.images && drink.images.length > 0 ? (
                  <img src={drink.images[0]} alt={drink.name} />
                ) : (
                  <div className="placeholder">🥤</div>
                )}
              </div>
              
              <div className="drink-info">
                <h4>{drink.name}</h4>
                <p className="category">{categories[drink.category]}</p>
                <p className="price">{formatPrice(drink.price)}</p>
                <span className={`status ${drink.isAvailable ? 'available' : 'unavailable'}`}>
                  {drink.isAvailable ? '✅ Có sẵn' : '❌ Hết hàng'}
                </span>
              </div>
              
              <div className="drink-actions">
                <Link 
                  to={`/admin/drinks/edit/${drink._id}`} 
                  className="edit-btn"
                  title="Chỉnh sửa"
                >
                  ✏️
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
