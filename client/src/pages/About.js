import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>Về chúng tôi</h1>
        <p>Câu chuyện về ECLIPSE Coffee</p>
      </div>
      
      <div className="about-content">
        <div className="container">
          <section className="about-section">
            <h2>Câu chuyện thương hiệu</h2>
            <p>
              ECLIPSE Coffee được thành lập với tầm nhìn mang đến những trải nghiệm cà phê 
              tuyệt vời nhất cho khách hàng. Chúng tôi tin rằng mỗi ly cà phê không chỉ là 
              thức uống, mà là khoảnh khắc kết nối con người với nhau.
            </p>
          </section>
          
          <section className="about-section">
            <h2>Sứ mệnh</h2>
            <p>
              Mang đến cho khách hàng những sản phẩm chất lượng cao với dịch vụ tận tâm, 
              tạo ra không gian thư giãn và kết nối cho cộng đồng.
            </p>
          </section>
          
          {/* Features Section */}
          <section className="features-highlight">
            <h2>Tại sao chọn ECLIPSE?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🌟</div>
                <h3>Chất lượng cao</h3>
                <p>
                  Chúng tôi sử dụng nguyên liệu tươi ngon nhất để tạo ra những ly đồ uống và bánh hoàn hảo
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Phục vụ nhanh chóng</h3>
                <p>
                  Thời gian chuẩn bị nhanh chóng, đảm bảo bạn luôn được phục vụ kịp thời
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💝</div>
                <h3>Giá cả hợp lý</h3>
                <p>
                  Chất lượng cao với mức giá phù hợp, mang lại giá trị tốt nhất cho bạn
                </p>
              </div>
            </div>
          </section>
          
          <section className="about-section">
            <h2>Giá trị cốt lõi</h2>
            <ul>
              <li><strong>Chất lượng:</strong> Cam kết chỉ sử dụng nguyên liệu tốt nhất</li>
              <li><strong>Tận tâm:</strong> Phục vụ khách hàng với trái tim và sự chân thành</li>
              <li><strong>Sáng tạo:</strong> Không ngừng đổi mới và phát triển</li>
              <li><strong>Cộng đồng:</strong> Xây dựng không gian kết nối mọi người</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
