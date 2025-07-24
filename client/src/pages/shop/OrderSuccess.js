import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../../styles/OrderSuccess.css';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  // If no order data, redirect to home
  if (!order) {
    navigate('/');
    return null;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="order-success-page">
      <div className="order-success-container">
        <div className="success-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" fill="#F0FDF4"/>
            <path d="m9 12 2 2 4-4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1>Đặt hàng thành công!</h1>
        <p className="success-message">
          Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
        </p>

        <div className="order-details">
          <h2>Thông tin đơn hàng</h2>
          
          <div className="order-info">
            <div className="info-row">
              <span className="label">Mã đơn hàng:</span>
              <span className="value">#{order._id.slice(-8).toUpperCase()}</span>
            </div>
            <div className="info-row">
              <span className="label">Thời gian đặt:</span>
              <span className="value">{formatDate(order.createdAt)}</span>
            </div>
            <div className="info-row">
              <span className="label">Tổng tiền:</span>
              <span className="value total-amount">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>

          <div className="customer-info">
            <h3>Thông tin khách hàng</h3>
            <div className="info-row">
              <span className="label">Họ tên:</span>
              <span className="value">{order.customerInfo.name}</span>
            </div>
            <div className="info-row">
              <span className="label">Điện thoại:</span>
              <span className="value">{order.customerInfo.phone}</span>
            </div>
            {order.customerInfo.email && (
              <div className="info-row">
                <span className="label">Email:</span>
                <span className="value">{order.customerInfo.email}</span>
              </div>
            )}
          </div>

          <div className="delivery-info">
            <h3>Thông tin giao hàng</h3>
            <div className="info-row">
              <span className="label">Hình thức:</span>
              <span className="value">
                {order.deliveryInfo.type === 'pickup' ? 'Nhận tại cửa hàng' : 'Giao hàng tận nơi'}
              </span>
            </div>
            {order.deliveryInfo.type === 'delivery' && order.deliveryInfo.address && (
              <div className="info-row">
                <span className="label">Địa chỉ:</span>
                <span className="value">{order.deliveryInfo.address}</span>
              </div>
            )}
            {order.deliveryInfo.note && (
              <div className="info-row">
                <span className="label">Ghi chú:</span>
                <span className="value">{order.deliveryInfo.note}</span>
              </div>
            )}
          </div>

          <div className="order-items">
            <h3>Chi tiết đơn hàng</h3>
            <div className="items-list">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <div className="item-details">
                      <span>Size: {item.size}</span>
                      <span>Nhiệt độ: {item.temperature === 'hot' ? 'Nóng' : 'Lạnh'}</span>
                      <span>Độ ngọt: {item.sweetness}%</span>
                      {item.note && <span>Ghi chú: {item.note}</span>}
                    </div>
                  </div>
                  <div className="item-quantity">x{item.quantity}</div>
                  <div className="item-price">{formatPrice(item.price)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="success-actions">
          <Link to="/products" className="btn btn-primary">
            Tiếp tục mua sắm
          </Link>
          <Link to="/" className="btn btn-secondary">
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
