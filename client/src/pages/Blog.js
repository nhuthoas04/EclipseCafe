import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Danh sách bài viết blog (cục bộ)
import '../styles/Blog.css';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  
  const blogPosts = [
    {
      id: 1,
      title: "KHÁM PHÁ HƯƠNG VỊ ĐẶC BIỆT CỦA CÀ PHÊ ARABICA CAO NGUYÊN",
      excerpt: "Cà phê Arabica từ cao nguyên mang trong mình hương vị tinh tế, độ chua nhẹ và hương thơm phức tạp tạo nên dấu ấn riêng biệt...",
      category: "Coffeeholic",
      date: "15/12/2024",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "ca-phe-arabica-cao-nguyen",
      content: `Cà phê Arabica là một trong những loại cà phê nổi tiếng nhất thế giới, đặc biệt khi được trồng ở cao nguyên Việt Nam. Hương vị tinh tế, độ chua nhẹ và hương thơm phức tạp tạo nên dấu ấn riêng biệt cho từng tách cà phê. Arabica cao nguyên không chỉ là thức uống mà còn là trải nghiệm văn hóa, là niềm tự hào của người trồng cà phê Việt.`
    },
    {
      id: 2,
      title: "NGHỆ THUẬT PHA CHẾ TRÀ OOLONG - BÍ QUYẾT TỪ NGƯỜI THẦY",
      excerpt: "Trà Oolong không chỉ là thức uống mà còn là nghệ thuật. Từ cách chọn lá, nhiệt độ nước đến thời gian pha, mọi chi tiết đều quan trọng...",
      category: "Teaholic", 
      date: "12/12/2024",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "nghe-thuat-pha-tra-oolong",
      content: `Nghệ thuật pha trà Oolong đòi hỏi sự tỉ mỉ từ khâu chọn lá, nhiệt độ nước đến thời gian pha. Mỗi bước đều ảnh hưởng đến hương vị cuối cùng. Người thầy pha trà truyền cảm hứng cho học trò bằng sự kiên nhẫn và đam mê, giúp mỗi tách trà trở thành một tác phẩm nghệ thuật.`
    },
    {
      id: 3,
      title: "ECLIPSE COFFEE SHOP - HÀNH TRÌNH MANG CÀ PHÊ VIỆT RA THẾ GIỚI",
      excerpt: "Câu chuyện về hành trình đưa hương vị cà phê Việt Nam đến gần hơn với khách hàng, tạo nên không gian thưởng thức hoàn hảo...",
      category: "Blog",
      date: "10/12/2024", 
      image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "eclipse-hanh-trinh-ca-phe-viet",
      content: `Eclipse Coffee Shop đã và đang mang hương vị cà phê Việt Nam ra thế giới. Từ việc chọn lọc nguyên liệu, xây dựng thương hiệu đến tạo dựng không gian thưởng thức, mỗi bước đi đều là một hành trình đầy tâm huyết và sáng tạo.`
    },
    {
      id: 4,
      title: "CÀ PHÊ SỮA ĐÁ - LINH HỒN VIỆT NAM TRONG TỪNG GIỌT",
      excerpt: "Không gì có thể thay thế được vị cà phê sữa đá trong lòng người Việt. Đây là câu chuyện về món đồ uống quốc dân...",
      category: "Coffeeholic",
      date: "08/12/2024",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "ca-phe-sua-da-linh-hon-viet",
      content: `Cà phê sữa đá là biểu tượng của văn hóa cà phê Việt Nam. Vị đắng của cà phê hòa quyện cùng vị ngọt béo của sữa đặc tạo nên một thức uống không thể thiếu trong đời sống hàng ngày của người Việt.`
    },
    {
      id: 5,
      title: "TRÀ SEN VÀNG - HƯƠNG VỊ TRUYỀN THỐNG TỪ ĐỒNG QUÊ",
      excerpt: "Trà sen vàng mang trong mình hương thơm dịu nhẹ của hoa sen và vị trà thanh mát, tạo nên một trải nghiệm khó quên...",
      category: "Teaholic",
      date: "05/12/2024",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "tra-sen-vang-huong-vi-truyen-thong",
      content: `Trà sen vàng là sự kết hợp tinh tế giữa hương thơm dịu nhẹ của hoa sen và vị trà thanh mát. Đây là thức uống truyền thống mang đậm dấu ấn đồng quê Việt Nam, gợi nhớ về những ký ức tuổi thơ yên bình.`
    },
    {
      id: 6,
      title: "MÙA ĐÔNG ẤM ÁP VỚI NHỮNG TẤM LÒNG ECLIPSE",
      excerpt: "Trong mùa đông này, Eclipse Coffee Shop đã thực hiện nhiều hoạt động ý nghĩa để mang lại sự ấm áp cho cộng đồng...",
      category: "Blog",
      date: "02/12/2024",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "mua-dong-am-ap-eclipse",
      content: `Mùa đông năm nay, Eclipse Coffee Shop đã tổ chức nhiều hoạt động thiện nguyện, mang lại sự ấm áp cho cộng đồng. Những tấm lòng sẻ chia đã góp phần lan tỏa yêu thương và gắn kết mọi người lại gần nhau hơn.`
    }
  ];

  const categories = ['Tất cả', 'Coffeeholic', 'Teaholic', 'Blog'];

  const filteredPosts = activeCategory === 'Tất cả' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="blog-container">
      {/* Hero Section */}
      <div className="blog-hero">
        <div className="hero-content">
          <h1>Chuyện Nhà</h1>
          <p>Eclipse Coffee Shop sẽ là nơi mọi người xích lại gần nhau, đề cao giá trị kết nối con người và sẻ chia thân tình bên những tách cà phê, ly trà đượm hương, truyền cảm hứng về lối sống hiện đại.</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="blog-categories">
        <div className="container">
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category}
                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Content by Category */}
      <div className="blog-content">
        <div className="container">
          {(activeCategory === 'Tất cả' || activeCategory === 'Coffeeholic') && (
            <div className="category-section coffeeholic-section">
              <div className="section-title-flex">
                <span className="orange-bar"></span>
                <h2 className="category-title">Coffeeholic</h2>
              </div>
              <div className="category-layout">
                <div className="posts-list">
                  {blogPosts.filter(post => post.category === 'Coffeeholic').map(post => (
                    <article key={post.id} className="post-item">
                      <Link to={`/blog/${post.slug}`} className="post-link">
                        <div className="post-image">
                          <img src={post.image} alt={post.title} />
                        </div>
                        <div className="post-content">
                          <h3 className="post-title">{post.title}</h3>
                          <p className="post-date">{post.date}</p>
                          <p className="post-excerpt">{post.excerpt}</p>
                        </div>
                      </Link>
                    </article>
                  ))}
                  <div className="more-btn-container">
                    <Link to="/blog-list" className="more-btn">Tìm hiểu thêm</Link>
                  </div>
                </div>
                <div className="featured-image-large">
                  <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Coffee" />
                </div>
              </div>
            </div>
          )}

          {(activeCategory === 'Tất cả' || activeCategory === 'Teaholic') && (
            <div className="category-section teaholic-section">
              <div className="section-title-flex">
                <span className="orange-bar"></span>
                <h2 className="category-title">Teaholic</h2>
              </div>
              <div className="category-layout">
                <div className="posts-list">
                  {blogPosts.filter(post => post.category === 'Teaholic').map(post => (
                    <article key={post.id} className="post-item">
                      <Link to={`/blog/${post.slug}`} className="post-link">
                        <div className="post-image">
                          <img src={post.image} alt={post.title} />
                        </div>
                        <div className="post-content">
                          <h3 className="post-title">{post.title}</h3>
                          <p className="post-date">{post.date}</p>
                          <p className="post-excerpt">{post.excerpt}</p>
                        </div>
                      </Link>
                    </article>
                  ))}
                  <div className="more-btn-container">
                    <Link to="/blog-list" className="more-btn">Tìm hiểu thêm</Link>
                  </div>s
                </div>
                <div className="featured-image-large">
                  <img src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tea" />
                </div>
              </div>
            </div>
          )}

          {(activeCategory === 'Tất cả' || activeCategory === 'Blog') && (
            <div className="category-section blog-section">
              <div className="section-title-flex">
                <span className="orange-bar"></span>
                <h2 className="category-title">Blog</h2>
              </div>
              <div className="category-layout">
                <div className="posts-list">
                  {blogPosts.filter(post => post.category === 'Blog').map(post => (
                    <article key={post.id} className="post-item">
                      <Link to={`/blog/${post.slug}`} className="post-link">
                        <div className="post-image">
                          <img src={post.image} alt={post.title} />
                        </div>
                        <div className="post-content">
                          <h3 className="post-title">{post.title}</h3>
                          <p className="post-date">{post.date}</p>
                          <p className="post-excerpt">{post.excerpt}</p>
                        </div>
                      </Link>
                    </article>
                  ))}
                  <div className="more-btn-container">
                    <Link to="/blog-list" className="more-btn">Tìm hiểu thêm</Link>
                  </div>
                </div>
                <div className="featured-image-large">
                  <img src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Blog" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Featured Section */}
      <div className="featured-section">
        <div className="container">
          <div className="featured-content">
            <div className="featured-text">
              <h2>Coffeeholic</h2>
              <h3>Khám phá thế giới cà phê cùng Eclipse</h3>
              <p>Từ những hạt cà phê được chọn lọc kỹ càng đến nghệ thuật pha chế hoàn hảo, chúng tôi mang đến cho bạn những trải nghiệm cà phê tuyệt vời nhất.</p>
              <Link to="/products" className="featured-btn">Tìm hiểu thêm</Link>
            </div>
            <div className="featured-image">
              <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Coffee" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
