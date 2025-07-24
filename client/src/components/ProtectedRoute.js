import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Đang kiểm tra quyền truy cập...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return (
      <div className="access-denied">
        <h2>Không có quyền truy cập</h2>
        <p>Bạn không có quyền truy cập vào trang này.</p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
