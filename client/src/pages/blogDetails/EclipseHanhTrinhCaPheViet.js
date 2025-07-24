import React from 'react';
import '../../styles/BlogDetailCustom.css';
export default function EclipseHanhTrinhCaPheViet() {
  return (
    <div className="blog-detail-container">
      <h1>ECLIPSE COFFEE SHOP - HÀNH TRÌNH MANG CÀ PHÊ VIỆT RA THẾ GIỚI</h1>
      <div className="blog-detail-meta">
        <span>Blog</span> | <span>10/12/2024</span>
      </div>
      <img src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Eclipse Coffee Shop" className="blog-detail-image" />
      <p className="blog-detail-excerpt">Câu chuyện về hành trình đưa hương vị cà phê Việt Nam đến gần hơn với khách hàng, tạo nên không gian thưởng thức hoàn hảo...</p>
      <div className="blog-detail-content">
        <p>Eclipse Coffee Shop đã và đang mang hương vị cà phê Việt Nam ra thế giới. Từ việc chọn lọc nguyên liệu, xây dựng thương hiệu đến tạo dựng không gian thưởng thức, mỗi bước đi đều là một hành trình đầy tâm huyết và sáng tạo.</p>
        <h3>1. Sứ mệnh và tầm nhìn</h3>
        <p>Eclipse mong muốn đưa cà phê Việt lên tầm quốc tế, giữ gìn bản sắc nhưng không ngừng đổi mới sáng tạo. Mỗi sản phẩm là kết tinh của tâm huyết và niềm tự hào dân tộc.</p>
        <h3>2. Không gian và trải nghiệm</h3>
        <p>Không gian quán được thiết kế hiện đại, gần gũi, tạo cảm giác thân thiện cho khách hàng. Đội ngũ barista chuyên nghiệp luôn sẵn sàng chia sẻ kiến thức và đam mê cà phê.</p>
        <h3>3. Đưa cà phê Việt ra thế giới</h3>
        <p>Thông qua các sự kiện, hội chợ quốc tế và hợp tác với đối tác nước ngoài, Eclipse đã góp phần quảng bá thương hiệu cà phê Việt Nam đến bạn bè năm châu.</p>
      </div>
    </div>
  );
}
