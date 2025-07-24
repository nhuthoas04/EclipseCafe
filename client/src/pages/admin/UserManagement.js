import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    admin: 0,
    today: 0
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Get auth token
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No auth token found');
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.get('http://localhost:5000/api/users', config);
      
      if (response.data.success) {
        const usersData = response.data.data;
        setUsers(usersData);
        
        // Calculate stats
        const today = new Date().toDateString();
        setStats({
          total: usersData.length,
          active: usersData.filter(user => user.isActive !== false).length, // Default to active if not specified
          admin: usersData.filter(user => user.role === 'admin').length,
          today: usersData.filter(user => 
            new Date(user.createdAt).toDateString() === today
          ).length
        });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      
      if (error.response) {
        if (error.response.status === 401) {
          alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else if (error.response.status === 403) {
          alert('Bạn không có quyền truy cập trang này.');
        } else {
          alert(`Lỗi: ${error.response.data?.message || 'Không thể tải dữ liệu người dùng'}`);
        }
      } else {
        alert('Lỗi kết nối. Vui lòng kiểm tra backend server.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const newStatus = !currentStatus;
      await axios.put(
        `http://localhost:5000/api/users/${userId}/status`,
        { isActive: newStatus },
        config
      );

      // Refresh user list
      fetchUsers();
      alert(`Đã ${newStatus ? 'kích hoạt' : 'vô hiệu hóa'} người dùng`);
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Lỗi khi cập nhật trạng thái người dùng');
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa người dùng "${userName}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      await axios.delete(`http://localhost:5000/api/users/${userId}`, config);
      
      // Refresh user list
      fetchUsers();
      alert('Đã xóa người dùng thành công');
    } catch (error) {
      console.error('Error deleting user:', error);
      if (error.response?.data?.message) {
        alert(`Lỗi: ${error.response.data.message}`);
      } else {
        alert('Lỗi khi xóa người dùng');
      }
    }
  };

  // Filter and sort users
  const filteredUsers = users
    .filter(user => {
      // Search by name or email
      const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by role
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'name-desc':
          return (b.name || '').localeCompare(a.name || '');
        case 'email':
          return (a.email || '').localeCompare(b.email || '');
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="user-management">
        <div className="loading">Đang tải dữ liệu người dùng...</div>
      </div>
    );
  }

  return (
    <div className="drink-management-container">
      {/* Header */}
      <div className="management-header">
        <div className="header-content">
          <h1>👥 Quản lý người dùng</h1>
          {/* Đã xoá nút Thêm người dùng */}
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
          <div className="stat-icon">👤</div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>Tổng người dùng</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{stats.active}</h3>
            <p>Hoạt động</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-info">
            <h3>{stats.admin}</h3>
            <p>Quản trị viên</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{stats.today}</h3>
            <p>Đăng ký hôm nay</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filters-row">
          <div className="filter-group">
            <input 
              type="text" 
              placeholder="Tìm kiếm người dùng..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <select 
              className="filter-select"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">Tất cả vai trò</option>
              <option value="admin">Quản trị viên</option>
              <option value="user">Người dùng</option>
            </select>
          </div>
          <div className="filter-group">
            <select 
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">A-Z</option>
              <option value="name-desc">Z-A</option>
              <option value="email">Theo email</option>
              <option value="date">Mới nhất</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="users-section">
        <div className="section-header">
          <h2>Danh sách người dùng</h2>
        </div>
        
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Ngày tham gia</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id}>
                  <td>
                    <div className="user-avatar">
                      {user.profilePicture ? (
                        <img src={user.profilePicture} alt={user.name} />
                      ) : (
                        <div className="avatar-placeholder">
                          {user.name?.charAt(0).toUpperCase() || '?'}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="user-name">
                      <strong>{user.name || 'Chưa có tên'}</strong>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.isActive !== false ? 'active' : 'inactive'}`}>
                      {user.isActive !== false ? '🟢 Hoạt động' : '🔴 Không hoạt động'}
                    </span>
                  </td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-toggle" 
                        title={user.isActive !== false ? 'Vô hiệu hóa' : 'Kích hoạt'}
                        onClick={() => handleToggleUserStatus(user._id, user.isActive !== false)}
                      >
                        {user.isActive !== false ? '🔴' : '🟢'}
                      </button>
                      <button 
                        className="btn-delete" 
                        title="Xóa"
                        onClick={() => handleDeleteUser(user._id, user.name || user.email)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {users.length === 0 && (
            <div className="empty-state">
              <p>Chưa có người dùng nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
