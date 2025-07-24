import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-logo">
            <span className="brand-text">ECLIPSE</span>
          </div>
        </Link>
        
        <div className="navbar-menu">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Trang chủ</Link>
            </li>
            <li className="nav-item dropdown">
              <Link to="/products" className="nav-link">Menu<span className="dropdown-arrow">▼</span></Link>
              <div className="dropdown-menu">
                <Link to="/products" className="dropdown-item">Tất cả</Link>
                <Link to="/products?category=coffee" className="dropdown-item">Cà phê</Link>
                <Link to="/products?category=a-me" className="dropdown-item">A-Mê</Link>
                <Link to="/products?category=hi-tea" className="dropdown-item">Hi-Tea</Link>
                <Link to="/products?category=matcha" className="dropdown-item">Matcha</Link>
                <Link to="/products?category=cake" className="dropdown-item">Bánh mặn và ngọt</Link>
              </div>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link">Blog</Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link cart-link">
                <span className="cart-icon">🛒</span>
                <span>Giỏ hàng</span>
                {getCartItemCount() > 0 && (
                  <span className="cart-badge">{getCartItemCount()}</span>
                )}
              </Link>
            </li>
            
        
            {user ? (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    Xin chào, {user.name}
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="nav-link logout-btn">
                    Đăng xuất
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Đăng nhập</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Đăng ký</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
