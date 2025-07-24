import React from 'react';
import { Link } from 'react-router-dom';
import blogPosts from '../data/blogPostsData';
import './Blog.css';

const Blog = () => {
  // Khi ở trang /blog, hiển thị tất cả bài viết
  const displayedPosts = blogPosts;

  return (
    <div className="blog-container">
      {/* Hero Section */}
      <div className="blog-hero">
        <div className="blog-hero-content">
          <h1>☕ Coffee Blog</h1>
          <p>Khám phá thế giới cà phê qua những câu chuyện độc đáo, 
             từ hạt cà phê nguyên chất đến những ly cà phê nghệ thuật</p>
          <div className="blog-hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">{blogPosts.length}</span>
              <span className="hero-stat-label">Bài viết</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">2</span>
              <span className="hero-stat-label">Chủ đề</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">1K+</span>
              <span className="hero-stat-label">Lượt đọc</span>
            </div>
          </div>
        </div>
      </div>

      <div className="blog-layout">
        {/* Main Content */}
        <div className="blog-main">
          {/* Featured Post */}
          {displayedPosts.length > 0 && (
            <div className="featured-post" style={{ cursor: 'pointer' }} onClick={() => {
              const el = document.getElementById('all-blog-posts');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              <div className="featured-image">
                <img src={displayedPosts[0].image} alt={displayedPosts[0].title} />
              </div>
              <div className="featured-overlay">
                <span className="featured-category">{displayedPosts[0].category}</span>
                <h2 className="featured-title">{displayedPosts[0].title}</h2>
                <p className="featured-excerpt">{displayedPosts[0].excerpt}</p>
                <div className="featured-meta">
                  <span>📅 {displayedPosts[0].date}</span>
                  <span>👤 {displayedPosts[0].author}</span>
                  <span>⏱️ 5 phút đọc</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="blog-sidebar-container" id="all-blog-posts">
          <div className="blog-sidebar">
            <div className="sidebar-section">
              <h2 className="sidebar-title">Coffeeholic</h2>
              <div className="sidebar-posts">
                {displayedPosts.filter(post => post.category === 'Coffeeholic').map(post => (
                  <article key={post.id} className="sidebar-post">
                    <Link to={`/blog/${post.slug}`} className="sidebar-post-link">
                      <div className="sidebar-post-image">
                        <img src={post.image} alt={post.title} />
                      </div>
                      <div className="sidebar-post-content">
                        <h3 className="sidebar-post-title">{post.title}</h3>
                        <div className="sidebar-post-meta">
                          <span className="sidebar-post-date">{post.date}</span>
                          <span className="sidebar-post-category">{post.category}</span>
                        </div>
                        <p className="sidebar-post-excerpt">{post.excerpt}</p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
              <div className="sidebar-more">
                <button className="more-button">Tìm hiểu thêm</button>
              </div>
            </div>
          </div>

          {/* Teaholic Section */}
          <div className="blog-sidebar teaholic-section">
            <div className="teaholic-title-bar" style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
              <div style={{width:'6px',height:'36px',background:'#FF9800',borderRadius:'3px'}}></div>
              <h2 style={{margin:0}}>Teaholic</h2>
            </div>
            
            <div className="teaholic-content">
              <div className="teaholic-posts">
                <article className="teaholic-post">
                  <Link to="#" className="teaholic-post-link">
                    <div className="teaholic-post-image">
                      <img src="/banner1.webp" alt="Trung thu này, sao bạn không..." />
                    </div>
                    
                    <div className="teaholic-post-content">
                      <h3 className="teaholic-post-title">TRUNG THU NÀY, SAO BẠN KHÔNG...</h3>
                      <p className="teaholic-post-excerpt">Bạn có từng nghe...</p>
                    </div>
                  </Link>
                </article>

                <article className="teaholic-post">
                  <Link to="#" className="teaholic-post-link">
                    <div className="teaholic-post-image">
                      <img src="/banner2.webp" alt="Bộ sưu tập câu toàn kèo thơm..." />
                    </div>
                    
                    <div className="teaholic-post-content">
                      <h3 className="teaholic-post-title">BỘ SƯU TẬP CÂU TOÀN KÈO THƠM...</h3>
                      <p className="teaholic-post-excerpt">Tết này vẫn giống Tết xưa, không hề mai một...</p>
                    </div>
                  </Link>
                </article>

                <article className="teaholic-post">
                  <Link to="#" className="teaholic-post-link">
                    <div className="teaholic-post-image">
                      <img src="/freeship_banner.jpg" alt="Khuấy để thấy trăng..." />
                    </div>
                    
                    <div className="teaholic-post-content">
                      <h3 className="teaholic-post-title">"KHUẤY ĐỂ THẤY TRĂNG"...</h3>
                      <p className="teaholic-post-excerpt">Năm 2022 là năm để...</p>
                    </div>
                  </Link>
                </article>
              </div>
              
              <div className="teaholic-featured-image">
                <img src="https://images.unsplash.com/photo-1563822249548-4928b4b6c1bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Teaholic Featured" />
              </div>
            </div>
            
            <div className="sidebar-footer">
              <Link to="/blog" className="view-more-btn">Tìm hiểu thêm</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
