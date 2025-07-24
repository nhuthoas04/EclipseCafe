import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantity(itemId, parseInt(newQuantity));
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleCheckout = () => {
    if (!user) {
      alert('Vui lòng đăng nhập để đặt hàng');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      alert('Giỏ hàng trống');
      return;
    }

    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <h1>Giỏ hàng</h1>
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Giỏ hàng của bạn đang trống</h2>
            <p>Hãy thêm một số đồ uống ngon vào giỏ hàng của bạn!</p>
            <button 
              className="continue-shopping-btn"
              onClick={handleContinueShopping}
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Giỏ hàng ({cartItems.length} sản phẩm)</h1>
          <button 
            className="clear-cart-btn"
            onClick={clearCart}
          >
            Xóa tất cả
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img 
                    src={item.image || '/api/placeholder/100/100'} 
                    alt={item.name}
                  />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-options">
                    <span className="option">Size: {item.size}</span>
                    <span className="option">Nhiệt độ: {
                      item.temperature === 'hot' ? 'Nóng' :
                      item.temperature === 'cold' ? 'Lạnh' : 'Thường'
                    }</span>
                    <span className="option">Đường: {
                      item.sweetness === 'none' ? 'Không đường' :
                      item.sweetness === 'low' ? 'Ít đường' :
                      item.sweetness === 'normal' ? 'Bình thường' : 'Nhiều đường'
                    }</span>
                  </div>
                  {item.note && (
                    <div className="item-note">
                      <strong>Ghi chú:</strong> {item.note}
                    </div>
                  )}
                </div>

                <div className="item-quantity">
                  <label>Số lượng:</label>
                  <select 
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    className="quantity-select"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>

                <div className="item-price">
                  <div className="unit-price">{formatPrice(item.price)}</div>
                  <div className="total-price">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>

                <button 
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.id)}
                  title="Xóa sản phẩm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h2>Tổng kết đơn hàng</h2>
              
              <div className="summary-row">
                <span>Tạm tính:</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              
              <div className="summary-row">
                <span>Phí giao hàng:</span>
                <span>Miễn phí</span>
              </div>
              
              <div className="summary-row total">
                <span>Tổng cộng:</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>

              <div className="summary-actions">
                <button 
                  className="continue-shopping-btn"
                  onClick={handleContinueShopping}
                >
                  Tiếp tục mua sắm
                </button>
                
                <button 
                  className="checkout-btn"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? 'Đang xử lý...' : 'Đặt hàng'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
