import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiConfig, getImageURL } from '../utils/apiConfig';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

import { blogDetailsData } from './blogDetails/blogDetailsData';

const Home = () => {
  const { user } = useAuth();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [popularDrinks, setPopularDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const banners = [
    '/banner2.webp',
    '/freeship_banner.jpg',
    '/banner1.webp'
   
  ];

  // Fetch popular drinks
  useEffect(() => {
    const fetchPopularDrinks = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${apiUrl}/api/drinks/featured`, {
          params: {
            limit: 3
          }
        });
        setPopularDrinks(response.data.data || []);
      } catch (error) {
        console.error('Error fetching featured drinks:', error);
        // Fallback to regular drinks if featured API fails
        try {
          const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
          const fallbackResponse = await axios.get(`${apiUrl}/api/drinks`, {
            params: {
              limit: 3,
              page: 1
            }
          });
          setPopularDrinks(fallbackResponse.data.drinks || []);
        } catch (fallbackError) {
          console.error('Error fetching fallback drinks:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPopularDrinks();
  }, []);

  // Helper function to format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000); // Change banner every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section with Banner Images */}
      <section className="hero-section">
        <div className="banner-container">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`banner-slide ${index === currentBanner ? 'active' : ''}`}
            >
              <img src={banner} alt={`Banner ${index + 1}`} />
            </div>
          ))}
          
          {/* Banner Navigation Dots */}
          <div className="banner-dots">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentBanner ? 'active' : ''}`}
                onClick={() => setCurrentBanner(index)}
              />
            ))}
          </div>
          
          {/* Overlay Content */}
          <div className="banner-overlay">
            <div className={`hero-buttons ${user ? 'single-button' : ''}`}>
              <Link to="/products" className="btn-primary">
                Xem thực đơn
              </Link>
              {!user && (
                <Link to="/register" className="btn-secondary">
                  Đăng ký ngay
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="home-container-section">
          <h2>Tại sao chọn ECLIPSE?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌟</div>
              <h3>Chất lượng cao</h3>
              <p>Chúng tôi sử dụng nguyên liệu tươi ngon nhất để tạo ra những ly đồ uống và bánh hoàn hảo</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Phục vụ nhanh chóng</h3>
              <p>Thời gian chuẩn bị nhanh chóng, đảm bảo bạn luôn được phục vụ kịp thời</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💝</div>
              <h3>Giá cả hợp lý</h3>
              <p>Chất lượng cao với mức giá phù hợp, mang lại giá trị tốt nhất cho bạn</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Drinks Section */}
      <section className="popular-section">
        <div className="home-container-section">
          <h2>Đồ uống phổ biến</h2>
          <div className="home-drinks-preview">
            {loading ? (
              // Loading state
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="drink-item loading">
                  <div className="drink-image loading-placeholder">⏳</div>
                  <h3>Đang tải...</h3>
                  <p>---</p>
                </div>
              ))
            ) : popularDrinks.length > 0 ? (
              // Display actual popular drinks
              popularDrinks.map((drink) => (
                <Link key={drink._id} to={`/products/${drink._id}`} className="drink-item-link">
                  <div className="drink-item">
                    <div className="drink-image">
                      {drink.images && drink.images.length > 0 ? (
                        <img 
                          src={getImageURL(drink.images[0])} 
                          alt={drink.name}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="placeholder-icon" style={{ display: (!drink.images || drink.images.length === 0) ? 'flex' : 'none' }}>
                        🥤
                      </div>
                    </div>
                    <div className="drink-content">
                      <h3>{drink.name}</h3>
                      <p>{formatPrice(drink.price)}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              // Fallback if no drinks available
              <div className="no-drinks">
                <p>Không có sản phẩm nào để hiển thị</p>
              </div>
            )}
          </div>
          <div className="home-view-all">
            <Link to="/products" className="home-btn-primary">
              Xem tất cả sản phẩm
            </Link>
          </div>
        </div>
      </section>



      {/* Blog Preview Section */}
      <section className="home-blog-preview-section">
        <div className="home-container-section">
          <h2 className="home-blog-preview-title-centered">☕ Chuyện Nhà</h2>
          <div className="home-blog-preview-list">
            {blogDetailsData
              .slice() // copy array
              .sort((a, b) => {
                // Sort by date descending (dd/mm/yyyy)
                const [da, ma, ya] = a.date.split('/').map(Number);
                const [db, mb, yb] = b.date.split('/').map(Number);
                const dateA = new Date(ya, ma - 1, da);
                const dateB = new Date(yb, mb - 1, db);
                return dateB - dateA;
              })
              .slice(0, 3)
              .map(post => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="home-blog-preview-item">
                  <div className="home-blog-preview-image">
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className="home-blog-preview-content">
                    <div className="home-blog-preview-date">{post.date}</div>
                    <div className="home-blog-preview-title">{post.title}</div>
                    <div className="home-blog-preview-excerpt">{post.excerpt}</div>
                  </div>
                </Link>
              ))}
          </div>
          <div className="home-view-all">
            <Link to="/blog" className="home-btn-primary">Xem tất cả bài viết</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
