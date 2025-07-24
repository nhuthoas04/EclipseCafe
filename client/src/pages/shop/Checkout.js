import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import '../../styles/Checkout.css';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerInfo: {
      name: user?.name || '',
      phone: '',
      email: user?.email || ''
    },
    deliveryInfo: {
      type: 'pickup',
      address: '',
      note: ''
    },
    paymentMethod: 'cash'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      setError('Giỏ hàng trống');
      return;
    }

    if (!formData.customerInfo.name || !formData.customerInfo.phone) {
      setError('Vui lòng điền đầy đủ thông tin liên hệ');
      return;
    }

    if (formData.deliveryInfo.type === 'delivery' && !formData.deliveryInfo.address) {
      setError('Vui lòng nhập địa chỉ giao hàng');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const orderData = {
        items: cartItems.map(item => ({
          drink: item.drinkId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          temperature: item.temperature,
          sweetness: item.sweetness,
          note: item.note
        })),
        customerInfo: {
          name: formData.customerInfo.name,
          phone: formData.customerInfo.phone,
          email: formData.customerInfo.email
        },
        deliveryInfo: formData.deliveryInfo,
        paymentMethod: formData.paymentMethod,
        paymentStatus: 'paid' // Assuming cash payment is immediate
      };

      // Setup headers for request
      const config = {};
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = {
          'Authorization': `Bearer ${token}`
        };
      }

      const response = await axios.post('http://localhost:5000/api/orders', orderData, config);

      if (response.data.success) {
        // Clear cart and redirect to success page
        clearCart();
        navigate('/order-success', { 
          state: { 
            order: response.data.data 
          }
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Có lỗi xảy ra khi đặt hàng');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Đặt hàng</h1>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="checkout-content">
            <div className="checkout-info">
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              {/* Customer Info */}
              <div className="info-section">
                <h2>Thông tin liên hệ</h2>
                <div className="form-group">
                  <label>Họ và tên *</label>
                  <input
                    type="text"
                    value={formData.customerInfo.name}
                    onChange={(e) => handleInputChange('customerInfo', 'name', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại *</label>
                  <input
                    type="tel"
                    value={formData.customerInfo.phone}
                    onChange={(e) => handleInputChange('customerInfo', 'phone', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.customerInfo.email}
                    onChange={(e) => handleInputChange('customerInfo', 'email', e.target.value)}
                  />
                </div>
              </div>

              {/* Delivery Info */}
              <div className="info-section">
                <h2>Thông tin giao hàng</h2>
                <div className="form-group">
                  <label>Hình thức</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        value="pickup"
                        checked={formData.deliveryInfo.type === 'pickup'}
                        onChange={(e) => handleInputChange('deliveryInfo', 'type', e.target.value)}
                      />
                      Tự đến lấy
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        value="delivery"
                        checked={formData.deliveryInfo.type === 'delivery'}
                        onChange={(e) => handleInputChange('deliveryInfo', 'type', e.target.value)}
                      />
                      Giao hàng
                    </label>
                  </div>
                </div>

                {formData.deliveryInfo.type === 'delivery' && (
                  <div className="form-group">
                    <label>Địa chỉ giao hàng *</label>
                    <textarea
                      value={formData.deliveryInfo.address}
                      onChange={(e) => handleInputChange('deliveryInfo', 'address', e.target.value)}
                      rows="3"
                      placeholder="Nhập địa chỉ chi tiết..."
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>Ghi chú</label>
                  <textarea
                    value={formData.deliveryInfo.note}
                    onChange={(e) => handleInputChange('deliveryInfo', 'note', e.target.value)}
                    rows="2"
                    placeholder="Ghi chú thêm cho đơn hàng..."
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="info-section">
                <h2>Phương thức thanh toán</h2>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={(e) => setFormData(prev => ({...prev, paymentMethod: e.target.value}))}
                    />
                    Tiền mặt
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={(e) => setFormData(prev => ({...prev, paymentMethod: e.target.value}))}
                    />
                    Thẻ tín dụng
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      value="momo"
                      checked={formData.paymentMethod === 'momo'}
                      onChange={(e) => setFormData(prev => ({...prev, paymentMethod: e.target.value}))}
                    />
                    MoMo
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h2>Đơn hàng của bạn</h2>
              
              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>
                        {item.size} • {
                          item.temperature === 'hot' ? 'Nóng' :
                          item.temperature === 'cold' ? 'Lạnh' : 'Thường'
                        } • {
                          item.sweetness === 'none' ? 'Không đường' :
                          item.sweetness === 'low' ? 'Ít đường' :
                          item.sweetness === 'normal' ? 'Bình thường' : 'Nhiều đường'
                        }
                      </p>
                      <p>Số lượng: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <div className="total-row">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                <div className="total-row">
                  <span>Phí giao hàng:</span>
                  <span>Miễn phí</span>
                </div>
                <div className="total-row final">
                  <span>Tổng cộng:</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
              </div>

              <button 
                type="submit"
                className="place-order-btn"
                disabled={loading}
              >
                {loading ? 'Đang xử lý...' : 'Đặt hàng'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
