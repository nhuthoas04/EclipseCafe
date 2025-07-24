import React from 'react';
import { useParams } from 'react-router-dom';
import blogPosts from '../data/blogPostsData';
import '../styles/BlogDetail.css';

const BlogDetail = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <div>Bài viết không tồn tại.</div>;
  }

  return (
    <div className="blog-detail-container">
      <div className="blog-detail-left">
        <h1 className="blog-detail-title">{post.title}</h1>
        <div className="blog-detail-meta">
          <span>📅 {post.date}</span>
          <span>👤 {post.author}</span>
          <span>Chuyên mục: {post.category}</span>
        </div>
        <p className="blog-detail-excerpt">{post.excerpt}</p>
        <div className="blog-detail-content">
          {post.content ? <p>{post.content}</p> : <p>Đang cập nhật nội dung chi tiết...</p>}
        </div>
      </div>
      <div className="blog-detail-image-box">
        <img className="blog-detail-image" src={post.image} alt={post.title} />
      </div>
    </div>
  );
};

export default BlogDetail;
