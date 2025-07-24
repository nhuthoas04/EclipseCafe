import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BlogManagement.css';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Tất cả');
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Mock data - trong thực tế sẽ fetch từ API
  useEffect(() => {
    const mockBlogs = [
      {
        id: 1,
        slug: 'phan-hoi-su-co',
        title: 'BẤT GẤP SAI GÒN XƯA TRONG MÓN UỐNG HIỆN ĐẠI CỦA GIỚI TRẺ',
        excerpt: 'Dậu qua bao nhiều lốp sóng thời gian, người ta vẫn có thể tìm lại...',
        date: '01/11/2023',
        category: 'Coffeeholic',
        status: 'published',
        isPinned: false,
        author: 'Eclipse',
        readTime: '5 phút đọc',
        image: '/banner1.webp'
      },
      {
        id: 2,
        slug: 'xuan-len-di',
        title: 'CHỈ CHỌN CÀ PHÊ MỖI SÁNG NHƯNG CŨNG KHIẾN CUỘC SỐNG CỦA BẠN THÊM THÚ VỊ',
        excerpt: 'Thực chất, bạn không nhất thiết phải làm gì to tát để tạo nên một...',
        date: '30/10/2023',
        category: 'Coffeeholic',
        status: 'published',
        isPinned: true,
        author: 'Eclipse',
        readTime: '7 phút đọc',
        image: '/banner2.webp'
      },
      {
        id: 3,
        slug: 'ca-phe-sua-da-new-york',
        title: 'SIGNATURE - BIỂU TƯỢNG VĂN HÓA CÀ PHÊ CỦA ECLIPSE ĐÃ QUAY TRỞ LẠI',
        excerpt: 'Mới đây, các "tín đồ" cà phê đang bàn tán xôn xao về SIGNATURE -...',
        date: '12/02/2023',
        category: 'Coffeeholic',
        status: 'published',
        isPinned: false,
        author: 'Eclipse',
        readTime: '6 phút đọc',
        image: '/freeship_banner.jpg'
      },
      {
        id: 4,
        slug: 'tra-sua-moi',
        title: 'TRÀ SỮA MỚI - HƯƠNG VỊ TẠM BIỆT HÈ, CHÀO ĐÓN THU',
        excerpt: 'Khi những cơn gió mát đầu mùa thu bắt đầu thổi về...',
        date: '25/09/2023',
        category: 'Khuyến mãi',
        status: 'published',
        isPinned: false,
        author: 'Eclipse',
        readTime: '4 phút đọc',
        image: '/banner1.webp'
      },
      {
        id: 5,
        slug: 'banh-ngot-cao-cap',
        title: 'BÁNH NGỌT CAO CẤP - ĐỐI TÁC HOÀN HẢO CỦA CÀ PHÊ',
        excerpt: 'Không chỉ nổi tiếng với cà phê chất lượng...',
        date: '18/09/2023',
        category: 'Sản phẩm mới',
        status: 'published',
        isPinned: false,
        author: 'Eclipse',
        readTime: '8 phút đọc',
        image: '/banner2.webp'
      },
      {
        id: 6,
        slug: 'khong-gian-cafe-moi',
        title: 'KHÔNG GIAN CÀ PHÊ MỚI - NƠI GẶP GỠ VÀ KẾT NỐI',
        excerpt: 'Với concept mới về không gian cà phê hiện đại...',
        date: '10/09/2023',
        category: 'Không gian',
        status: 'published',
        isPinned: false,
        author: 'Eclipse',
        readTime: '6 phút đọc',
        image: '/freeship_banner.jpg'
      }
    ];

    setTimeout(() => {
      setBlogs(mockBlogs);
      setLoading(false);
    }, 500);
  }, []);

  const categories = ['Tất cả', 'Coffeeholic', 'Khuyến mãi', 'Sản phẩm mới', 'Không gian'];

  const filteredBlogs = blogs
    .filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'Tất cả' || blog.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch(sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'pinned':
          comparison = (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
          break;
        case 'date':
        default:
          comparison = new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-'));
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  const handlePin = (id) => {
    setBlogs(blogs.map(blog => 
      blog.id === id ? { ...blog, isPinned: !blog.isPinned } : blog
    ));
  };

  const handleDuplicate = (id) => {
    const blogToDuplicate = blogs.find(blog => blog.id === id);
    if (blogToDuplicate) {
      const newBlog = {
        ...blogToDuplicate,
        id: Math.max(...blogs.map(b => b.id)) + 1,
        title: `${blogToDuplicate.title} (Copy)`,
        slug: `${blogToDuplicate.slug}-copy`,
        status: 'draft',
        isPinned: false,
        date: new Date().toLocaleDateString('vi-VN')
      };
      setBlogs([...blogs, newBlog]);
    }
  };

  const handleSelectBlog = (id) => {
    setSelectedBlogs(prev => 
      prev.includes(id) 
        ? prev.filter(blogId => blogId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedBlogs([]);
    } else {
      setSelectedBlogs(filteredBlogs.map(blog => blog.id));
    }
    setSelectAll(!selectAll);
  };

  const handleBulkAction = (action) => {
    if (selectedBlogs.length === 0) {
      alert('Vui lòng chọn ít nhất một bài viết');
      return;
    }

    switch(action) {
      case 'delete':
        if (window.confirm(`Bạn có chắc chắn muốn xóa ${selectedBlogs.length} bài viết?`)) {
          setBlogs(blogs.filter(blog => !selectedBlogs.includes(blog.id)));
          setSelectedBlogs([]);
          setSelectAll(false);
        }
        break;
      case 'pin':
        setBlogs(blogs.map(blog => 
          selectedBlogs.includes(blog.id) ? { ...blog, isPinned: true } : blog
        ));
        setSelectedBlogs([]);
        setSelectAll(false);
        break;
      case 'unpin':
        setBlogs(blogs.map(blog => 
          selectedBlogs.includes(blog.id) ? { ...blog, isPinned: false } : blog
        ));
        setSelectedBlogs([]);
        setSelectAll(false);
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="drink-management-container">
        <div className="loading">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="drink-management-container">
      <div className="management-header">
        <div className="header-content">
          <h1>📝 Quản lý Blog</h1>
        </div>
        <div style={{ 
          marginTop: '1rem', 
          padding: '15px 0',
          borderTop: '1px solid #eee'
        }}>
          <Link 
            to="/admin" 
            style={{
              background: '#dc3545',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            ← Quay lại Dashboard
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="blog-stats-section">
        <div className="blog-stats-grid">
          <div className="blog-stat-card">
            <div className="blog-stat-icon">📝</div>
            <div className="blog-stat-info">
              <h3>{blogs.length}</h3>
              <p>Tổng bài viết</p>
            </div>
          </div>
          <div className="blog-stat-card">
            <div className="blog-stat-icon">📌</div>
            <div className="blog-stat-info">
              <h3>{blogs.filter(b => b.isPinned).length}</h3>
              <p>Đã ghim</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filters-row">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-group">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="date">Sắp xếp theo ngày</option>
              <option value="title">Sắp xếp theo tiêu đề</option>
              <option value="category">Sắp xếp theo danh mục</option>
              <option value="pinned">Sắp xếp theo ghim</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedBlogs.length > 0 && (
        <div className="bulk-actions">
          <div className="bulk-info">
            <span>Đã chọn {selectedBlogs.length} bài viết</span>
          </div>
          <div className="bulk-buttons">
            <button 
              onClick={() => handleBulkAction('pin')}
              className="btn btn-blue btn-sm"
            >
              📌 Ghim
            </button>
            <button 
              onClick={() => handleBulkAction('unpin')}
              className="btn btn-teal btn-sm"
            >
              📌 Bỏ ghim
            </button>
            <button 
              onClick={() => handleBulkAction('delete')}
              className="btn btn-red btn-sm"
            >
              🗑️ Xóa
            </button>
          </div>
        </div>
      )}

      {/* Blog Table */}
      <div className="table-section">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="select-checkbox"
                  />
                </th>
                <th>Hình ảnh</th>
                <th 
                  className="sortable-header"
                  onClick={() => handleSort('title')}
                >
                  Tiêu đề
                  {sortBy === 'title' && (
                    <i className={`fas ${sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                  )}
                </th>
                <th 
                  className="sortable-header"
                  onClick={() => handleSort('category')}
                >
                  Danh mục
                  {sortBy === 'category' && (
                    <i className={`fas ${sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                  )}
                </th>
                <th>Tác giả</th>
                <th 
                  className="sortable-header"
                  onClick={() => handleSort('date')}
                >
                  Ngày tạo
                  {sortBy === 'date' && (
                    <i className={`fas ${sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                  )}
                </th>
                <th 
                  className="sortable-header"
                  onClick={() => handleSort('pinned')}
                >
                  Ghim
                  {sortBy === 'pinned' && (
                    <i className={`fas ${sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                  )}
                </th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map(blog => (
                <tr key={blog.id} className={selectedBlogs.includes(blog.id) ? 'selected' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedBlogs.includes(blog.id)}
                      onChange={() => handleSelectBlog(blog.id)}
                      className="select-checkbox"
                    />
                  </td>
                  <td>
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="blog-thumbnail"
                    />
                  </td>
                  <td>
                    <div className="blog-title-cell">
                      <h4>{blog.title}</h4>
                      <p className="blog-excerpt">{blog.excerpt}</p>
                      <small className="read-time">{blog.readTime}</small>
                    </div>
                  </td>
                  <td>
                    <span className={`category-badge category-${blog.category.toLowerCase().replace(/\s+/g, '-')}`}>
                      {blog.category}
                    </span>
                  </td>
                  <td>{blog.author}</td>
                  <td>{blog.date}</td>
                  <td>
                    <button
                      onClick={() => handlePin(blog.id)}
                      className={`btn btn-pin ${blog.isPinned ? 'pinned' : ''}`}
                      title={blog.isPinned ? 'Bỏ ghim' : 'Ghim bài viết'}
                    >
                      📌
                      {blog.isPinned ? ' Đã ghim' : ''}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link 
                        to={`/blog/${blog.slug}`} 
                        className="btn btn-view btn-teal"
                        title="Xem bài viết"
                        target="_blank"
                      >
                        👁️
                      </Link>
                      <button 
                        onClick={() => handleDuplicate(blog.id)}
                        className="btn btn-duplicate btn-blue"
                        title="Nhân bản bài viết"
                      >
                        📄
                      </button>
                      <button 
                        onClick={() => handleDelete(blog.id)}
                        className="btn btn-delete btn-red"
                        title="Xóa bài viết"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBlogs.length === 0 && (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <h3>Không tìm thấy bài viết nào</h3>
            <p>Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;
