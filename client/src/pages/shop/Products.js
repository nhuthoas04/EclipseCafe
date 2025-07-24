import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { apiConfig, getImageURL } from '../../utils/apiConfig';
import '../../styles/Products.css';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    category: ''
  });
  const [searchTerm, setSearchTerm] = useState(''); // Local search state for debounce

  // Read URL parameters when component mounts
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || '';
    setFilters(prev => ({
      ...prev,
      category: categoryFromUrl
    }));
  }, [searchParams]);

  // Debounce search term
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        search: searchTerm
      }));
      setPagination(prev => ({
        ...prev,
        page: 1
      }));
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });

  const categories = [
    { value: '', label: 'Tất cả' },
    { value: 'coffee', label: 'Cà phê' },
    { value: 'a-me', label: 'A-Mê' },
    { value: 'hi-tea', label: 'Hi-Tea' },
    { value: 'matcha', label: 'Matcha' },
    { value: 'cake', label: 'Bánh mặn và ngọt' }
  ];

  useEffect(() => {
    fetchDrinks();
  }, [pagination.page, filters]);

  const fetchDrinks = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...filters
      });

      const response = await axios.get(`${apiConfig.baseURL}${apiConfig.endpoints.drinks}?${queryParams}`);
      
      if (response.data.success) {
        setDrinks(response.data.data);
        setPagination(prev => ({
          ...prev,
          total: response.data.pagination.total,
          pages: response.data.pagination.pages
        }));
      }
    } catch (error) {
      setError('Có lỗi xảy ra khi tải đồ uống');
      console.error('Error fetching drinks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'search') {
      setSearchTerm(value); // Update local search state
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
      setPagination(prev => ({
        ...prev,
        page: 1
      }));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      page: newPage
    }));
    window.scrollTo(0, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="products-container">
        <div className="loading">Đang tải thực đơn...</div>
      </div>
    );
  }

  return (
    <div className="products-container">
      {/* Hero Banner */}
      <div className="products-hero">
        <div className="hero-overlay">
          <h1>MENU</h1>
          <p>Khám phá hương vị đặc biệt từ The Coffee House</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        <div className="products-container">
          <div className="tabs-wrapper">
            {categories.map(cat => (
              <button
                key={cat.value}
                className={`category-tab ${filters.category === cat.value ? 'active' : ''}`}
                onClick={() => handleFilterChange({ target: { name: 'category', value: cat.value } })}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="filters-section">
        <div className="filters-row">
          <div className="filter-group">
            <div className="search-wrapper">
              <input
                type="text"
                name="search"
                placeholder="Tìm kiếm đồ uống..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              <div className="search-icon">🔍</div>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Drinks Grid */}
      {drinks.length === 0 ? (
        <div className="no-products">
          <p>Không tìm thấy đồ uống nào</p>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {drinks.map(drink => (
              <div key={drink._id} className={`product-card ${!drink.isAvailable ? 'sold-out' : ''}`}>
                {/* Hình ảnh sản phẩm */}
                {drink.isAvailable ? (
                  <Link to={`/products/${drink._id}`} className="product-link">
                    <div className="product-image-wrapper">


                      {drink.images && drink.images.length > 0 ? (
                        <img 
                          src={getImageURL(drink.images[0])} 
                          alt={drink.name} 
                          className="product-image"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.querySelector('.placeholder-image').style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="placeholder-image" style={{ display: (!drink.images || drink.images.length === 0) ? 'flex' : 'none' }}>
                        <span>🥤</span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="product-image-wrapper">
                    {drink.images && drink.images.length > 0 ? (
                      <img 
                        src={getImageURL(drink.images[0])} 
                        alt={drink.name} 
                        className="product-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.querySelector('.placeholder-image').style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="placeholder-image" style={{ display: (!drink.images || drink.images.length === 0) ? 'flex' : 'none' }}>
                      <span>🥤</span>
                    </div>
                    <div className="sold-out-badge">Hết hàng</div>
                  </div>
                )}
                
                {/* Thông tin sản phẩm */}
                <div className="product-info">
                  {/* Tên sản phẩm */}
                  {drink.isAvailable ? (
                    <Link to={`/products/${drink._id}`} className="product-name-link">
                      <h3 className="product-name">{drink.name}</h3>
                    </Link>
                  ) : (
                    <h3 className="product-name">{drink.name}</h3>
                  )}
                  
                  {/* Giá sản phẩm */}
                  <p className="product-price">{formatPrice(drink.price)}</p>
                  
                  {/* Nút đặt hàng */}
                  {drink.isAvailable ? (
                    <Link 
                      to={`/products/${drink._id}`} 
                      className="order-btn"
                    >
                      Đặt ngay
                    </Link>
                  ) : (
                    <button className="order-btn disabled" disabled>
                      Hết hàng
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="pagination-btn"
              >
                Trước
              </button>
              
              <span className="pagination-info">
                Trang {pagination.page} / {pagination.pages}
              </span>
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="pagination-btn"
              >
                Sau
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
