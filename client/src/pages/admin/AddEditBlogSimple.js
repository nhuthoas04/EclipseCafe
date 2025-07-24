import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const AddEditBlogSimple = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Coffeeholic',
    image: '',
    readTime: '',
    author: 'Eclipse'
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
      
      setFormData(prev => ({
        ...prev,
        slug: slug
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Vui lòng nhập tiêu đề!');
      return;
    }

    setLoading(true);

    try {
      // Mock save
      console.log('Saving blog:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(isEdit ? 'Cập nhật thành công!' : 'Thêm bài viết thành công!');
      navigate('/admin/blogs');
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{isEdit ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}</h1>
        <Link 
          to="/admin/blogs" 
          style={{ 
            background: '#6c757d', 
            color: 'white', 
            padding: '10px 15px', 
            borderRadius: '5px', 
            textDecoration: 'none' 
          }}
        >
          Quay lại
        </Link>
      </div>

      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Tiêu đề *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Nhập tiêu đề bài viết..."
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              fontSize: '16px'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Slug
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            placeholder="slug-bai-viet"
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
          <small style={{ color: '#666' }}>URL: /blog/{formData.slug}</small>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Danh mục
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              fontSize: '16px'
            }}
          >
            <option value="Coffeeholic">Coffeeholic</option>
            <option value="Khuyến mãi">Khuyến mãi</option>
            <option value="Sản phẩm mới">Sản phẩm mới</option>
            <option value="Không gian">Không gian</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Mô tả ngắn
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            placeholder="Mô tả ngắn gọn về bài viết..."
            rows="3"
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              fontSize: '16px',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            URL Hình ảnh
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
          {formData.image && (
            <div style={{ marginTop: '10px' }}>
              <img 
                src={formData.image} 
                alt="Preview" 
                style={{ maxWidth: '200px', height: 'auto', borderRadius: '4px' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Thời gian đọc
          </label>
          <input
            type="text"
            name="readTime"
            value={formData.readTime}
            onChange={handleInputChange}
            placeholder="5 phút đọc"
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Nội dung
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Nội dung chi tiết của bài viết..."
            rows="10"
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              fontSize: '16px',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              background: loading ? '#ccc' : '#28a745', 
              color: 'white', 
              padding: '12px 24px', 
              border: 'none', 
              borderRadius: '5px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Đang lưu...' : (isEdit ? 'Cập nhật' : 'Thêm bài viết')}
          </button>
          
          <Link 
            to="/admin/blogs"
            style={{ 
              background: '#6c757d', 
              color: 'white', 
              padding: '12px 24px', 
              borderRadius: '5px', 
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Hủy
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddEditBlogSimple;
