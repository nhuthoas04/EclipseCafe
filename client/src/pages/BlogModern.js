import React from 'react';
import blogPosts from '../data/blogPostsData';
import '../styles/BlogModern.css';

const BlogModern = () => (
  <div className="blog-modern-container">
    <div className="blog-modern-banner">
      <h1 className="blog-modern-title">Chuyện Cà Phê & Trà</h1>
      <p className="blog-modern-desc">
        Khám phá những câu chuyện, cảm hứng và kiến thức thú vị về cà phê, trà và hành trình phát triển của Eclipse Coffee Shop.
      </p>
    </div>
    <div className="blog-modern-list">
      {blogPosts.map(post => (
        <div className="blog-modern-card" key={post.id}>
          <a href={`/blog/${post.slug}`} className="blog-modern-imgbox">
            <img src={post.image} alt={post.title} className="blog-modern-img" />
          </a>
          <div className="blog-modern-content">
            <div className="blog-modern-meta">
              <span className="blog-modern-date">{post.date}</span>
              <span className="blog-modern-category">{post.category}</span>
            </div>
            <a href={`/blog/${post.slug}`} className="blog-modern-post-title">
              {post.title}
            </a>
            <p className="blog-modern-excerpt">{post.excerpt}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default BlogModern;
