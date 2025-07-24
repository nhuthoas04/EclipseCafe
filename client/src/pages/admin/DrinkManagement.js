import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../styles/DrinkManagement.css';

const DrinkManagement = () => {
  const location = useLocation();
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    outOfStock: 0
  });
  
  // Get filter from URL params
  const urlParams = new URLSearchParams(location.search);
  const filterParam = urlParams.get('filter');
  
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    isAvailable: filterParam === 'available' ? 'true' : ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  const categories = {
    '': 'Tất cả',
    coffee: 'Cà phê',
    'a-me': 'A-Mê',
    'hi-tea': 'Hi-Tea',
    matcha: 'Matcha',
    cake: 'Bánh mặn và ngọt'
  };

  // Check user role on component mount
  useEffect(() => {
    const checkUserRole = () => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      console.log('Token exists:', !!token);
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          console.log('User role:', user.role);
          if (user.role !== 'admin') {
            alert('Bạn không có quyền truy cập trang này. Vui lòng đăng nhập với tài khoản admin.');
          }
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      } else {
        console.log('No user data found');
      }
    };
    
    checkUserRole();
  }, []);

  // Update filters when URL changes
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const filterParam = urlParams.get('filter');
    
    if (filterParam === 'available') {
      setFilters(prev => ({
        ...prev,
        isAvailable: 'true'
      }));
    }
  }, [location.search]);

  useEffect(() => {
    fetchDrinks();
  }, [pagination.page, filters.category, filters.isAvailable]);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchDrinks();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters.search]);

  const fetchDrinks = async () => {
    try {
      setLoading(true);
      
      // Prepare query parameters
      const queryParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString()
      });

      // Add search parameter
      if (filters.search.trim()) {
        queryParams.append('search', filters.search.trim());
      }

      // Add category filter
      if (filters.category) {
        queryParams.append('category', filters.category);
      }

      // Add availability filter (convert isAvailable to available)
      if (filters.isAvailable) {
        queryParams.append('available', filters.isAvailable);
      }

      console.log('Fetching drinks with params:', queryParams.toString());
      const response = await axios.get(`http://localhost:5000/api/drinks?${queryParams}`);
      
      if (response.data.success) {
        const drinksData = response.data.data;
        setDrinks(drinksData);
        setPagination(prev => ({
          ...prev,
          total: response.data.pagination.total,
          pages: response.data.pagination.pages
        }));

        // Calculate stats
        setStats({
          total: drinksData.length,
          available: drinksData.filter(drink => drink.isAvailable !== false).length,
          outOfStock: drinksData.filter(drink => drink.isAvailable === false).length
        });
      }
    } catch (error) {
      console.error('Error fetching drinks:', error);
      
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        setError('❌ Không thể kết nối với server backend. Vui lòng kiểm tra backend server có đang chạy trên port 5000?');
      } else if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.message || 'Unknown error';
        setError(`❌ Lỗi server (${status}): ${message}`);
      } else {
        setError('❌ Có lỗi xảy ra khi tải danh sách đồ uống. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPagination(prev => ({
      ...prev,
      page: 1
    }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const handleDeleteDrink = async (drinkId, drinkName) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa đồ uống "${drinkName}"?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/drinks/${drinkId}`);
        fetchDrinks(); // Reload list
        alert('Xóa đồ uống thành công!');
      } catch (error) {
        alert('Có lỗi xảy ra khi xóa đồ uống');
        console.error('Error deleting drink:', error);
      }
    }
  };

  const toggleAvailability = async (drinkId, currentStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/drinks/${drinkId}`, {
        isAvailable: !currentStatus
      });
      fetchDrinks(); // Reload list
    } catch (error) {
      alert('Có lỗi xảy ra khi cập nhật trạng thái');
      console.error('Error updating availability:', error);
    }
  };

  const toggleFeatured = async (drinkId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Vui lòng đăng nhập để thực hiện thao tác này');
        return;
      }
      
      const response = await axios.patch(`http://localhost:5000/api/drinks/${drinkId}/featured`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchDrinks(); // Reload list
      alert(response.data.message || (currentStatus ? 'Đã bỏ ghim sản phẩm' : 'Đã ghim sản phẩm vào trang chủ'));
    } catch (error) {
      console.error('Error updating featured status:', error);
      const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật trạng thái ghim';
      alert(errorMessage);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN');
  };

  if (loading) {
    return (
      <div className="drink-management-container">
        <div className="loading">Đang tải danh sách đồ uống...</div>
      </div>
    );
  }

  return (
    <div className="drink-management-container">
      <div className="management-header">
        <div className="header-content">
          <h1>🥤 Quản lý đồ uống</h1>
          <div className="header-actions">
            <Link to="/admin/drinks/add" className="add-btn">
              ➕ Thêm đồ uống mới
            </Link>
          </div>
        </div>
        <div style={{ 
          marginTop: '1rem', 
          padding: '15px 0',
          borderTop: '1px solid #eee'
        }}>
          <Link 
            to="/admin" 
            style={{
              background: '#dc3545',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            ← Quay lại Dashboard
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🥤</div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>Tổng đồ uống</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{stats.available}</h3>
            <p>Có sẵn</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">❌</div>
          <div className="stat-info">
            <h3>{stats.outOfStock}</h3>
            <p>Hết hàng</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filters-row">
          <div className="filter-group">
            <input
              type="text"
              name="search"
              placeholder="Tìm tên đồ uống..."
              value={filters.search}
              onChange={handleFilterChange}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="filter-select"
            >
              {Object.entries(categories).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              name="isAvailable"
              value={filters.isAvailable}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="true">Có sẵn</option>
              <option value="false">Hết hàng</option>
            </select>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Drinks Table */}
      <div className="drinks-table-container">
        <table className="drinks-table">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên đồ uống</th>
              <th>Loại</th>
              <th>Giá</th>
              <th>Size</th>
              <th>Thời gian pha</th>
              <th>Trạng thái</th>
              <th>Trang chủ</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {drinks.map(drink => (
              <tr key={drink._id}>
                <td>
                  <div className="drink-image-cell">
                    {drink.images && drink.images.length > 0 ? (
                      <img src={drink.images[0]} alt={drink.name} />
                    ) : (
                      <div className="placeholder">🥤</div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="drink-name-cell">
                    <strong>{drink.name}</strong>
                    <p>{drink.description.substring(0, 50)}...</p>
                  </div>
                </td>
                <td>{categories[drink.category]}</td>
                <td className="price-cell">{formatPrice(drink.price)}</td>
                <td>
                  <span className="size-badge">{drink.size}</span>
                </td>
                <td>{drink.preparationTime} phút</td>
                <td>
                  <button
                    onClick={() => toggleAvailability(drink._id, drink.isAvailable)}
                    className={`status-btn ${drink.isAvailable ? 'available' : 'unavailable'}`}
                  >
                    {drink.isAvailable ? '✅ Có sẵn' : '❌ Hết hàng'}
                  </button>
                </td>
                <td>
                  <span className={`featured-badge ${drink.isFeatured ? 'featured' : 'not-featured'}`}>
                    {drink.isFeatured ? '📌 Đã ghim' : '📍 Chưa ghim'}
                  </span>
                </td>
                <td>{formatDate(drink.createdAt)}</td>
                <td>
                  <div className="action-buttons">
                    <Link
                      to={`/products/${drink._id}`}
                      className="action-btn view"
                      title="Xem chi tiết"
                      target="_blank"
                    >
                      👁️
                    </Link>
                    <button
                      onClick={() => toggleFeatured(drink._id, drink.isFeatured)}
                      className={`action-btn featured ${drink.isFeatured ? 'featured-active' : ''}`}
                      title={drink.isFeatured ? "Bỏ ghim khỏi trang chủ" : "Ghim vào trang chủ"}
                    >
                      {drink.isFeatured ? '📌' : '📍'}
                    </button>
                    <Link
                      to={`/admin/drinks/edit/${drink._id}`}
                      className="action-btn edit"
                      title="Chỉnh sửa"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDeleteDrink(drink._id, drink.name)}
                      className="action-btn delete"
                      title="Xóa"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {drinks.length === 0 && !loading && (
        <div className="no-drinks">
          <p>Không có đồ uống nào</p>
          <Link to="/admin/drinks/add" className="add-first-btn">
            Thêm đồ uống đầu tiên
          </Link>
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="pagination-btn"
          >
            ← Trước
          </button>
          
          <span className="pagination-info">
            Trang {pagination.page} / {pagination.pages} 
            (Tổng: {pagination.total} đồ uống)
          </span>
          
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
            className="pagination-btn"
          >
            Sau →
          </button>
        </div>
      )}
    </div>
  );
};

export default DrinkManagement;
