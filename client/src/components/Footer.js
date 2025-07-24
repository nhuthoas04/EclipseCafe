import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Giới thiệu */}
          <div className="footer-section">
            <h3>GIỚI THIỆU</h3>
            <ul>
              <li><a href="/about">Về chúng tôi</a></li>
              <li><a href="/menu">Menu</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div className="footer-section">
            <h3>LIÊN HỆ</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <strong>Liên Hệ:</strong><br />
                  0912534571
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <strong>Địa chỉ:</strong><br />
                  Đường D5, phường 5,<br />
                  TP Trà Vinh
                </div>
              </div>
            </div>
          </div>

          {/* Theo dõi chúng tôi */}
          <div className="footer-section">
            <h3>THEO DÕI CHÚNG TÔI</h3>
            <div className="social-links">
              <a href="https://www.instagram.com/nhhoas_/" className="social-link instagram" aria-label="Instagram">
                <img src="/instagram.png" alt="Instagram" width="24" height="24" />
              </a>
              <a href="https://www.facebook.com/nhathoa.nguyen.2711" className="social-link facebook" aria-label="Facebook">
                <img src="/facebook.png" alt="Facebook" width="24" height="24" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-info">
            <p>Công ty cổ phần thương mại dịch vụ Trà Cà Phê VN</p>
            <p>Người đại diện: NGUYEN NHUT HOA</p>
            <p>Email: nhuthoa04@gmail.com</p>
            <p>©2023-2025 Công ty cổ phần thương mại dịch vụ Trà Cà Phê VN</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
