import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BlogList.css';

const BlogList = () => {
  const blogPosts = [
    {
      id: 1,
      slug: 'ca-phe-arabica-cao-nguyen',
      title: 'KHÁM PHÁ HƯƠNG VỊ ĐẶC BIỆT CỦA CÀ PHÊ ARABICA CAO NGUYÊN',
      excerpt: 'Cà phê Arabica từ cao nguyên mang trong mình hương vị tinh tế, độ chua nhẹ và hương thơm phức tạp tạo nên dấu ấn riêng biệt...',
      date: '15/12/2024',
      category: 'Coffeeholic',
      readTime: '5 phút đọc',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Eclipse'
    },
    {
      id: 2,
      slug: 'nghe-thuat-pha-tra-oolong',
      title: 'NGHỆ THUẬT PHA CHẾ TRÀ OOLONG - BÍ QUYẾT TỪ NGƯỜI THẦY',
      excerpt: 'Trà Oolong không chỉ là thức uống mà còn là nghệ thuật. Từ cách chọn lá, nhiệt độ nước đến thời gian pha, mọi chi tiết đều quan trọng...',
      date: '12/12/2024',
      category: 'Teaholic',
      readTime: '6 phút đọc',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Eclipse'
    },
    {
      id: 3,
      slug: 'eclipse-hanh-trinh-ca-phe-viet',
      title: 'ECLIPSE COFFEE SHOP - HÀNH TRÌNH MANG CÀ PHÊ VIỆT RA THẾ GIỚI',
      excerpt: 'Câu chuyện về hành trình đưa hương vị cà phê Việt Nam đến gần hơn với khách hàng, tạo nên không gian thưởng thức hoàn hảo...',
      date: '10/12/2024',
      category: 'Blog',
      readTime: '7 phút đọc',
      image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Eclipse'
    },
    {
      id: 4,
      slug: 'ca-phe-sua-da-linh-hon-viet',
      title: 'CÀ PHÊ SỮA ĐÁ - LINH HỒN VIỆT NAM TRONG TỪNG GIỌT',
      excerpt: 'Không gì có thể thay thế được vị cà phê sữa đá trong lòng người Việt. Đây là câu chuyện về món đồ uống quốc dân...',
      date: '08/12/2024',
      category: 'Coffeeholic',
      readTime: '5 phút đọc',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Eclipse'
    },
    {
      id: 5,
      slug: 'tra-sen-vang-huong-vi-truyen-thong',
      title: 'TRÀ SEN VÀNG - HƯƠNG VỊ TRUYỀN THỐNG TỪ ĐỒNG QUÊ',
      excerpt: 'Trà sen vàng mang trong mình hương thơm dịu nhẹ của hoa sen và vị trà thanh mát, tạo nên một trải nghiệm khó quên...',
      date: '05/12/2024',
      category: 'Teaholic',
      readTime: '6 phút đọc',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Eclipse'
    },
    {
      id: 6,
      slug: 'mua-dong-am-ap-eclipse',
      title: 'MÙA ĐÔNG ẤM ÁP VỚI NHỮNG TẤM LÒNG ECLIPSE',
      excerpt: 'Trong mùa đông này, Eclipse Coffee Shop đã thực hiện nhiều hoạt động ý nghĩa để mang lại sự ấm áp cho cộng đồng...',
      date: '02/12/2024',
      category: 'Blog',
      readTime: '5 phút đọc',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Eclipse'
    }
  ];

  const categories = ['Tất cả', 'Coffeeholic', 'Teaholic', 'Blog'];
  const [selectedCategory, setSelectedCategory] = React.useState('Tất cả');

  const filteredPosts = selectedCategory === 'Tất cả' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="blog-list-container">
      <div className="blog-list-header">
        <h1>Chuyện Nhà</h1>
        <p>Eclipse Coffee Shop sẽ là nơi mọi người xích lại gần nhau, đề cao giá trị kết nối con người và sẻ chia thân tình bên những tách cà phê, ly trà đượm hương, truyền cảm hứng về lối sống hiện đại.</p>
      </div>

      {/* Category Tabs (dùng class chung như Blog) */}
      <div className="blog-categories">
        <div className="container">
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category}
                className={`category-tab${selectedCategory === category ? ' active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="blog-grid">
        {filteredPosts.map(post => (
          <article key={post.id} className="blog-card">
            <Link to={`/blog/${post.slug}`} className="blog-card-link">
              <div className="blog-card-image">
                <img src={post.image} alt={post.title} />
                <div className="blog-card-overlay">
                  <span className="read-time">{post.readTime}</span>
                </div>
              </div>
              
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span className="blog-category">{post.category}</span>
                  <span className="blog-date">{post.date}</span>
                </div>
                
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                
                <div className="blog-card-footer">
                  <span className="blog-author">Bởi {post.author}</span>
                  <span className="read-more">Đọc thêm →</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
