import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './AddEditBlog.css';

const AddEditBlog = () => {
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
  const [errors, setErrors] = useState({});

  const categories = ['Coffeeholic', 'Khuyến mãi', 'Sản phẩm mới', 'Không gian'];

  useEffect(() => {
    if (isEdit) {
      // Mock data for editing - trong thực tế sẽ fetch từ API
      const mockBlog = {
        id: 1,
        title: 'BẤT GẤP SAI GÒN XƯA TRONG MÓN UỐNG HIỆN ĐẠI CỦA GIỚI TRẺ',
        slug: 'phan-hoi-su-co',
        excerpt: 'Dậu qua bao nhiều lốp sóng thời gian, người ta vẫn có thể tìm lại những dấu ấn đặc biệt...',
        content: `<p>Dậu qua bao nhiều lốp sóng thời gian, người ta vẫn có thể tìm lại những dấu ấn đặc biệt của Sài Gòn xưa qua từng ngụm cà phê thơm nồng.</p>

<h2>Hương vị truyền thống</h2>
<p>Những quán cà phê cổ kính với kiến trúc độc đáo, hương vị truyền thống đã trở thành nơi giao thoa giữa quá khứ và hiện tại.</p>

<h2>Không gian nostalgic</h2>
<p>Mỗi góc phố Sài Gòn đều ẩn chứa những câu chuyện thú vị, và cà phê chính là cầu nối để chúng ta khám phá những câu chuyện ấy.</p>`,
        category: 'Coffeeholic',
        image: '/banner1.webp',
        readTime: '5 phút đọc',
        author: 'Eclipse'
      };
      setFormData(mockBlog);
    }
  }, [isEdit, id]);

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

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề là bắt buộc';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug là bắt buộc';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang';
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Mô tả ngắn là bắt buộc';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Nội dung là bắt buộc';
    }

    if (!formData.readTime.trim()) {
      newErrors.readTime = 'Thời gian đọc là bắt buộc';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Hình ảnh là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Mock API call - trong thực tế sẽ gọi API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Automatically set status to published when saving
      const blogData = {
        ...formData,
        status: 'published'
      };
      
      console.log(isEdit ? 'Updating blog:' : 'Creating blog:', blogData);
      
      // Show success message
      alert(isEdit ? 'Cập nhật bài viết thành công!' : 'Thêm bài viết thành công!');
      
      // Redirect to blog management
      navigate('/admin/blogs');
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Có lỗi xảy ra khi lưu bài viết!');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Mock image upload - trong thực tế sẽ upload lên server
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        image: imageUrl
      }));
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>{isEdit ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}</h1>
        <Link to="/admin/blogs" className="btn btn-secondary">
          <i className="fas fa-arrow-left"></i>
          Quay lại
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-grid">
          {/* Left Column - Main Content */}
          <div className="form-main">
            <div className="form-group">
              <label htmlFor="title">Tiêu đề *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={errors.title ? 'error' : ''}
                placeholder="Nhập tiêu đề bài viết..."
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="slug">Slug *</label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className={errors.slug ? 'error' : ''}
                placeholder="slug-bai-viet"
              />
              <small>URL của bài viết sẽ là: /blog/{formData.slug}</small>
              {errors.slug && <span className="error-message">{errors.slug}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="excerpt">Mô tả ngắn *</label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                className={errors.excerpt ? 'error' : ''}
                placeholder="Mô tả ngắn gọn về bài viết..."
                rows="3"
              />
              {errors.excerpt && <span className="error-message">{errors.excerpt}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="content">Nội dung *</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                className={`content-editor ${errors.content ? 'error' : ''}`}
                placeholder="Nội dung chi tiết của bài viết... (Hỗ trợ HTML)"
                rows="15"
              />
              <small>Có thể sử dụng HTML tags: &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;</small>
              {errors.content && <span className="error-message">{errors.content}</span>}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="form-sidebar">
            <div className="form-card">
              <div className="form-actions">
                <button type="submit" disabled={loading} className="btn btn-primary">
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      {isEdit ? 'Đang cập nhật...' : 'Đang lưu...'}
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save"></i>
                      {isEdit ? 'Cập nhật' : 'Lưu bài'}
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="form-card">
              <h3>Thông tin</h3>
              
              <div className="form-group">
                <label htmlFor="category">Danh mục</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="readTime">Thời gian đọc *</label>
                <input
                  type="text"
                  id="readTime"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleInputChange}
                  className={errors.readTime ? 'error' : ''}
                  placeholder="5 phút đọc"
                />
                {errors.readTime && <span className="error-message">{errors.readTime}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="author">Tác giả</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Tên tác giả"
                />
              </div>
            </div>

            <div className="form-card">
              <h3>Hình ảnh đại diện</h3>
              
              <div className="form-group">
                <label htmlFor="image">Upload hình ảnh</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                />
              </div>

              {formData.image && (
                <div className="image-preview">
                  <img src={formData.image} alt="Preview" />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="imageUrl">Hoặc nhập URL *</label>
                <input
                  type="url"
                  id="imageUrl"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className={errors.image ? 'error' : ''}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.image && <span className="error-message">{errors.image}</span>}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEditBlog;
