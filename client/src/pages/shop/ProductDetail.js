import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import '../../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  

  // Form state for adding to cart
  const [options, setOptions] = useState({
    size: 'M',
    temperature: 'room',
    sweetness: 'normal',
    quantity: 1,
    note: ''
  });

  // State for total price
  const [totalPrice, setTotalPrice] = useState(0);
  // Helper: get price by size
  const getSizePrice = (size) => {
    if (!size) return 0;
    if (size === 'M') return 10000;
    if (size === 'L') return 16000;
    return 0;
  };

  // Update total price when drink or size changes
  useEffect(() => {
    if (drink) {
      setTotalPrice((drink.price || 0) + getSizePrice(options.size));
    }
  }, [drink, options.size]);

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

  const temperatures = {
    hot: '🔥 Nóng',
    cold: '🧊 Lạnh',
    both: '🔥🧊 Cả hai'
  };

  useEffect(() => {
    fetchDrink();
  }, [id]);

  const fetchDrink = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/drinks/${id}`);
      
      if (response.data.success) {
        setDrink(response.data.data);
      } else {
        setError('Không tìm thấy đồ uống');
      }
    } catch (error) {
      setError('Có lỗi xảy ra khi tải đồ uống');
      console.error('Error fetching drink:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (key, value) => {
    setOptions(prev => ({
      ...prev,
      [key]: value
    }));
    // Nếu chọn size thì cập nhật luôn totalPrice
    if (key === 'size' && drink) {
      setTotalPrice((drink.price || 0) + getSizePrice(value));
    }
  };

  const handleAddToCart = () => {
    if (!drink) return;
    // Gửi giá đã cộng size vào cart
    addToCart({ ...drink, price: totalPrice }, options);
    // Show success message
    alert(`Đã thêm ${drink.name} vào giỏ hàng!`);
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
      <div className="product-detail-container">
        <div className="loading">Đang tải đồ uống...</div>
      </div>
    );
  }

  if (error || !drink) {
    return (
      <div className="product-detail-container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/products')} className="back-btn">
          Quay lại thực đơn
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate('/products')} className="back-btn">
        ← Quay lại thực đơn
      </button>

      <div className="product-detail-content">
        {/* Left side - Product Image */}
        <div className="product-image-section">
          <div className="main-image">
            {drink.images && drink.images.length > 0 ? (
              <img src={drink.images[0]} alt={drink.name} className="product-image" />
            ) : (
              <div className="placeholder-image">
                <span>🥤</span>
              </div>
            )}
            <div className="best-seller-badge">
              <span>BEST</span>
              <span>SELLER</span>
            </div>
          </div>
          
          {/* Thumbnail */}
          {drink.images && drink.images.length > 0 && (
            <div className="image-thumbnail">
              <img src={drink.images[0]} alt={drink.name} className="thumbnail-img" />
            </div>
          )}
        </div>

        {/* Right side - Product Info */}
        <div className="product-info-section">
          <div className="product-header">
            <h1 className="product-title">{drink.name}</h1>
            <div className="product-price">{formatPrice(totalPrice)}</div>
          </div>

          <div className="product-price-section">
            <div className="product-price">{formatPrice(totalPrice)}</div>
            <div className="availability-status">
              {drink.isAvailable ? (
                <span className="available">✅ Có sẵn</span>
              ) : (
                <span className="unavailable">❌ Hết hàng</span>
              )}
            </div>
          </div>

          {/* Order Options Form - Updated */}
          <div className="order-options">
            <div className="option-group">
              <label>Chọn size (bắt buộc)</label>
              <div className="size-options">
                {drink.size && drink.size.map(size => (
                  <button
                    key={size}
                    type="button"
                    className={`size-option-btn ${options.size === size ? 'active' : ''}`}
                    onClick={() => handleOptionChange('size', size)}
                  >
                    <span className="size-icon">🥤</span>
                    <span className="size-name">{size === 'S' ? 'Nhỏ' : size === 'M' ? 'Vừa' : 'Lớn'}</span>
                    <span className="size-price">+ {size === 'M' ? '10.000' : size === 'L' ? '16.000' : '0'} đ</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label>Nhiệt độ</label>
              <div className="temperature-options">
                {drink.temperature && drink.temperature.map(temp => (
                  <button
                    key={temp}
                    type="button"
                    className={`checkbox-btn ${options.temperature === temp ? 'active' : ''}`}
                    onClick={() => handleOptionChange('temperature', temp)}
                  >
                    <span className="checkbox"></span>
                    {temp === 'hot' ? 'Nóng' : temp === 'cold' ? 'Lạnh' : 'Thường'}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label>Độ ngọt</label>
              <div className="sweetness-options">
                {drink.sweetness && drink.sweetness.map(sweet => (
                  <button
                    key={sweet}
                    type="button"
                    className={`checkbox-btn ${options.sweetness === sweet ? 'active' : ''}`}
                    onClick={() => handleOptionChange('sweetness', sweet)}
                  >
                    <span className="checkbox"></span>
                    {sweet === 'none' ? 'Không đường' :
                     sweet === 'low' ? 'Ít đường' :
                     sweet === 'normal' ? 'Bình thường' : 'Nhiều đường'}
                  </button>
                ))}
              </div>
            </div>

            <div className="delivery-button">
              <button className="order-delivery-btn" onClick={handleAddToCart}>
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description at bottom */}
      <div className="product-description-section">
        <h3>Mô tả sản phẩm</h3>
        <p>{drink.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
