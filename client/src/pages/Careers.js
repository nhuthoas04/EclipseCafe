import React from 'react';
import '../styles/Careers.css';

const Careers = () => {
  return (
    <div className="careers-container">
      <div className="careers-header">
        <h1>Tuyển dụng</h1>
        <p>Gia nhập đội ngũ ECLIPSE Coffee</p>
      </div>
      
      <div className="careers-content">
        <div className="container">
          <section className="careers-intro">
            <h2>Tại sao chọn ECLIPSE?</h2>
            <p>
              Chúng tôi luôn tìm kiếm những người tài năng, đam mê và muốn phát triển 
              sự nghiệp trong ngành F&B. Tại ECLIPSE, bạn sẽ được làm việc trong môi trường 
              chuyên nghiệp, năng động và có nhiều cơ hội thăng tiến.
            </p>
          </section>
          
          <section className="job-listings">
            <h2>Vị trí đang tuyển</h2>
            
            <div className="job-card">
              <h3>Nhân viên pha chế (Barista)</h3>
              <div className="job-details">
                <p><strong>Địa điểm:</strong> TP Trà Vinh</p>
                <p><strong>Kinh nghiệm:</strong> Không yêu cầu (có đào tạo)</p>
                <p><strong>Lương:</strong> 8-12 triệu/tháng</p>
              </div>
              <div className="job-requirements">
                <h4>Yêu cầu:</h4>
                <ul>
                  <li>Yêu thích cà phê và dịch vụ khách hàng</li>
                  <li>Giao tiếp tốt, thái độ tích cực</li>
                  <li>Có thể làm theo ca</li>
                </ul>
              </div>
            </div>
            
            <div className="job-card">
              <h3>Nhân viên phục vụ</h3>
              <div className="job-details">
                <p><strong>Địa điểm:</strong> TP Trà Vinh</p>
                <p><strong>Kinh nghiệm:</strong> Không yêu cầu</p>
                <p><strong>Lương:</strong> 7-10 triệu/tháng</p>
              </div>
              <div className="job-requirements">
                <h4>Yêu cầu:</h4>
                <ul>
                  <li>Nhanh nhẹn, chăm chỉ</li>
                  <li>Có kinh nghiệm làm F&B là lợi thế</li>
                  <li>Làm việc nhóm tốt</li>
                </ul>
              </div>
            </div>
            
            <div className="job-card">
              <h3>Quản lý ca (Shift Leader)</h3>
              <div className="job-details">
                <p><strong>Địa điểm:</strong> TP Trà Vinh</p>
                <p><strong>Kinh nghiệm:</strong> 1-2 năm quản lý</p>
                <p><strong>Lương:</strong> 12-15 triệu/tháng</p>
              </div>
              <div className="job-requirements">
                <h4>Yêu cầu:</h4>
                <ul>
                  <li>Có kinh nghiệm quản lý nhóm</li>
                  <li>Kỹ năng lãnh đạo và giải quyết vấn đề</li>
                  <li>Kiến thức về F&B</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="apply-section">
            <h2>Cách ứng tuyển</h2>
            <p>
              Gửi CV và thư xin việc về email: <strong>nhuthoa04@gmail.com</strong><br />
              Hoặc liên hệ trực tiếp: <strong>0912534571</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Careers;
