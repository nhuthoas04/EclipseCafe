import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Profile.css';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate passwords if provided
    if (formData.password) {
      if (formData.password !== formData.confirmPassword) {
        setError('Mật khẩu xác nhận không khớp');
        return;
      }
      if (formData.password.length < 6) {
        setError('Mật khẩu phải có ít nhất 6 ký tự');
        return;
      }
    }

    setLoading(true);

    try {
      const updateData = {
        name: formData.name,
        email: formData.email
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      const result = await updateProfile(updateData);
      
      if (result.success) {
        setSuccess('Cập nhật thông tin thành công!');
        setEditing(false);
        setFormData(prev => ({
          ...prev,
          password: '',
          confirmPassword: ''
        }));
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      confirmPassword: ''
    });
    setEditing(false);
    setError('');
    setSuccess('');
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="error-message">Vui lòng đăng nhập để xem thông tin cá nhân</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <span>{user.name?.charAt(0).toUpperCase()}</span>
          </div>
          <h2>Thông tin cá nhân</h2>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {!editing ? (
          <div className="profile-info">
            <div className="info-group">
              <label>Họ và tên</label>
              <div className="info-value">{user.name}</div>
            </div>

            <div className="info-group">
              <label>Email</label>
              <div className="info-value">{user.email}</div>
            </div>

            <div className="info-group">
              <label>Vai trò</label>
              <div className="info-value">
                <span className={`role-badge ${user.role}`}>
                  {user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                </span>
              </div>
            </div>

            <div className="info-group">
              <label>Ngày tham gia</label>
              <div className="info-value">
                {new Date(user.createdAt).toLocaleDateString('vi-VN')}
              </div>
            </div>

            <div className="profile-actions">
              <button 
                onClick={() => setEditing(true)}
                className="edit-btn"
              >
                Chỉnh sửa thông tin
              </button>
              <button 
                onClick={logout}
                className="logout-btn"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Họ và tên</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu mới (để trống nếu không đổi)</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu mới"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu mới"
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="save-btn"
                disabled={loading}
              >
                {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
              <button 
                type="button" 
                onClick={handleCancel}
                className="cancel-btn"
              >
                Hủy
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
