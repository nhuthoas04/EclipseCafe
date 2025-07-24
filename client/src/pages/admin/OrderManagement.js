import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    processing: 0,
    completed: 0,
    revenue: 0
  });
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('orderDate');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await axios.get('http://localhost:5000/api/orders', config);
      
      if (response.data.success) {
        const ordersData = response.data.data;
        setOrders(ordersData);
        
        // Calculate stats
        const totalRevenue = ordersData
          .filter(order => order.status === 'completed')
          .reduce((sum, order) => sum + order.totalAmount, 0);
          
        setStats({
          total: ordersData.length,
          processing: ordersData.filter(order => order.status === 'processing').length,
          completed: ordersData.filter(order => order.status === 'completed').length,
          revenue: totalRevenue
        });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Tạo dữ liệu giả để demo
      const mockOrders = [
        {
          _id: '1',
          customerName: 'Nguyễn Văn A',
          customerEmail: 'user1@example.com',
          customerPhone: '0123456789',
          items: [
            { name: 'Americano', quantity: 2, price: 35000 },
            { name: 'Cappuccino', quantity: 1, price: 45000 }
          ],
          totalAmount: 115000,
          status: 'pending',
          paymentMethod: 'cash',
          orderDate: new Date(),
          notes: 'Giao hàng tận nơi'
        },
        {
          _id: '2',
          customerName: 'Trần Thị B',
          customerEmail: 'user2@example.com',
          customerPhone: '0987654321',
          items: [
            { name: 'Matcha Latte', quantity: 1, price: 60000 }
          ],
          totalAmount: 60000,
          status: 'completed',
          paymentMethod: 'card',
          orderDate: new Date(Date.now() - 86400000), // 1 day ago
          notes: ''
        },
        {
          _id: '3',
          customerName: 'Lê Văn C',
          customerEmail: 'user3@example.com',
          customerPhone: '0369852147',
          items: [
            { name: 'Hi-Tea Passion', quantity: 2, price: 55000 },
            { name: 'Bánh Tiramisu', quantity: 1, price: 65000 }
          ],
          totalAmount: 175000,
          status: 'processing',
          paymentMethod: 'cash',
          orderDate: new Date(Date.now() - 3600000), // 1 hour ago
          notes: 'Ít đường'
        }
      ];
      
      setOrders(mockOrders);
      setStats({
        total: 3,
        pending: 1,
        completed: 1,
        revenue: 60000
      });
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      
      console.log('Updating order:', orderId, 'to status:', newStatus);
      
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}`, {
        status: newStatus
      }, config);
      
      if (response.data.success) {
        // Cập nhật lại danh sách đơn hàng
        await fetchOrders();
        alert('Cập nhật trạng thái đơn hàng thành công!');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      console.error('Error response:', error.response?.data);
      const errorMessage = error.response?.data?.message || error.message || 'Có lỗi xảy ra khi cập nhật đơn hàng!';
      alert(`Lỗi: ${errorMessage}`);
    }
  };

  const deleteOrder = async (orderId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        
        const response = await axios.delete(`http://localhost:5000/api/orders/${orderId}`, config);
        
        if (response.data.success) {
          // Cập nhật lại danh sách đơn hàng
          await fetchOrders();
          alert('Xóa đơn hàng thành công!');
        }
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Có lỗi xảy ra khi xóa đơn hàng!');
      }
    }
  };

  const viewOrderDetails = (order) => {
    const name = order.customerInfo?.name || order.customerName || 'Ẩn';
    const email = order.customerInfo?.email || order.customerEmail || 'Ẩn';
    const phone = order.customerInfo?.phone || order.customerPhone || 'Ẩn';
    alert(`Chi tiết đơn hàng #${order._id.slice(-6)}:
    
Khách hàng: ${name}
Email: ${email}
Điện thoại: ${phone}
Trạng thái: ${order.status}
Tổng tiền: ${formatPrice(order.totalAmount)}
Ngày đặt: ${formatDate(order.orderDate || order.createdAt)}

Sản phẩm:
${order.items.map(item => `- ${item.name} x${item.quantity} - ${formatPrice(item.price)}`).join('\n')}
${order.notes ? '\nGhi chú: ' + order.notes : ''}`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      processing: { label: '🔄 Đang xử lý', class: 'processing' },
      completed: { label: '✅ Hoàn thành', class: 'completed' },
      cancelled: { label: '❌ Đã hủy', class: 'cancelled' }
    };
    
    const config = statusConfig[status] || statusConfig.processing;
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredOrders = (filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter))
    .filter(order => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      // Tìm theo tên, SĐT, email, mã đơn, sản phẩm
      const name = order.customerInfo?.name || order.customerName || '';
      const phone = order.customerInfo?.phone || order.customerPhone || '';
      const email = order.customerInfo?.email || order.customerEmail || '';
      const orderId = order.orderNumber || order._id || '';
      const items = order.items?.map(i => i.name).join(' ') || '';
      return (
        name.toLowerCase().includes(term) ||
        phone.toLowerCase().includes(term) ||
        email.toLowerCase().includes(term) ||
        orderId.toLowerCase().includes(term) ||
        items.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      let comparison = 0;
      switch(sortBy) {
        case 'customerName':
          comparison = (a.customerInfo?.name || a.customerName || '').localeCompare(b.customerInfo?.name || b.customerName || '');
          break;
        case 'customerPhone':
          comparison = (a.customerInfo?.phone || a.customerPhone || '').localeCompare(b.customerInfo?.phone || b.customerPhone || '');
          break;
        case 'totalAmount':
          comparison = a.totalAmount - b.totalAmount;
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'orderDate':
        default:
          comparison = new Date(b.orderDate || b.createdAt) - new Date(a.orderDate || a.createdAt);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  if (loading) {
    return (
      <div className="order-management">
        <div className="loading">Đang tải dữ liệu đơn hàng...</div>
      </div>
    );
  }

  return (
    <div className="drink-management-container">
      {/* Header */}
      <div className="management-header">
        <div className="header-content">
          <h1>📦 Quản lý đơn hàng</h1>
          {/* Đã xoá nút Thêm đơn hàng */}
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
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>Tổng đơn hàng</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-info">
            <h3>{stats.processing}</h3>
            <p>Đang xử lý</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{stats.completed}</h3>
            <p>Hoàn thành</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>{formatPrice(stats.revenue)}</h3>
            <p>Doanh thu</p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="filters-section">
        <div className="filters-row">
          <div className="filter-group">
            <input 
              type="text" 
              placeholder="Tìm kiếm đơn hàng..." 
              className="search-input"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="processing">Đang xử lý</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã huỷ</option>
            </select>
          </div>
          <div className="filter-group">
            <select 
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
              className="filter-select"
            >
              <option value="orderDate-desc">Ngày mới nhất</option>
              <option value="orderDate-asc">Ngày cũ nhất</option>
              <option value="totalAmount-desc">Giá cao nhất</option>
              <option value="totalAmount-asc">Giá thấp nhất</option>
              <option value="status-asc">Trạng thái A-Z</option>
              <option value="status-desc">Trạng thái Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="orders-section">
        <div className="section-header">
          <h2>Danh sách đơn hàng</h2>
          <div className="header-actions">
            <span className="total-count">{filteredOrders.length} đơn hàng</span>
            <div className="sort-buttons">
              <button 
                className={`sort-btn ${sortBy === 'orderDate' ? 'active' : ''}`}
                onClick={() => handleSort('orderDate')}
              >
                Ngày {sortBy === 'orderDate' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button 
                className={`sort-btn ${sortBy === 'totalAmount' ? 'active' : ''}`}
                onClick={() => handleSort('totalAmount')}
              >
                Giá {sortBy === 'totalAmount' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button 
                className={`sort-btn ${sortBy === 'status' ? 'active' : ''}`}
                onClick={() => handleSort('status')}
              >
                Trạng thái {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>
        </div>
        
        <div className="orders-grid">
          {filteredOrders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-id">#{order._id.slice(-6)}</div>
                {getStatusBadge(order.status)}
              </div>
              
              <div className="customer-info">
                <h4>👤 {order.customerInfo?.name || order.customerName || 'Ẩn'}</h4>
                <p>📧 {order.customerInfo?.email || order.customerEmail || 'Ẩn'}</p>
                <p>📞 {order.customerInfo?.phone || order.customerPhone || 'Ẩn'}</p>
                <p>🗓️ {formatDate(order.orderDate || order.createdAt)}</p>
              </div>
              
              <div className="order-items">
                <h5>📋 Sản phẩm:</h5>
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span>{item.name}</span>
                    <span>x{item.quantity}</span>
                    <span>{formatPrice(item.price)}</span>
                  </div>
                ))}
              </div>
              
              <div className="order-footer">
                <div className="order-total">
                  <strong>Tổng: {formatPrice(order.totalAmount)}</strong>
                </div>
                <div className="order-date">
                  {formatDate(order.orderDate)}
                </div>
              </div>
              
              {order.notes && (
                <div className="order-notes">
                  <strong>Ghi chú:</strong> {order.notes}
                </div>
              )}
              
              {/* Status Update */}
              <div className="status-controls">
                <label>Cập nhật trạng thái:</label>
                <select 
                  value={order.status} 
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  className="status-select"
                >
                  <option value="processing">🔄 Đang xử lý</option>
                  <option value="completed">✅ Hoàn thành</option>
                  <option value="cancelled">❌ Đã huỷ</option>
                  <option value="cancelled">❌ Đã hủy</option>
                </select>
              </div>
              
              <div className="order-actions">
                <button 
                  className="btn-view"
                  onClick={() => viewOrderDetails(order)}
                >
                  👁️ Xem chi tiết
                </button>
                <button 
                  className="btn-edit"
                  onClick={() => updateOrderStatus(order._id, order.status === 'completed' ? 'processing' : 'completed')}
                >
                  {order.status === 'completed' ? '↩️ Hoàn tác' : '✅ Hoàn thành'}
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => deleteOrder(order._id)}
                >
                  🗑️ Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredOrders.length === 0 && (
          <div className="empty-state">
            <p>Không có đơn hàng nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
