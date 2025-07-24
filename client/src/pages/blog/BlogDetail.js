import React from 'react';
import blogPosts from '../../data/blogPostsData';
import '../../styles/BlogDetail.css';

const BlogDetail = ({ match }) => {
  const slug = match?.params?.slug;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <div>Bài viết không tồn tại.</div>;

  return (
    <div className="blog-detail-container">
      <h1>{post.title}</h1>
      <div className="blog-detail-meta">
        <span>{post.category}</span> | <span>{post.date}</span>
      </div>
      <img src={post.image} alt={post.title} className="blog-detail-image" />
      <p className="blog-detail-excerpt">{post.excerpt}</p>
      {/* Nội dung chi tiết có thể thêm ở đây */}
    </div>
  );
};

export default BlogDetail;
