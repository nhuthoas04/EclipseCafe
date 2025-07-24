import React from 'react';
import { Link } from 'react-router-dom';
import './BlogPost.css';

const KhongGianCafeMoi = () => {
  return (
    <div className="blog-post-container">
      <article className="blog-post">
        {/* Header */}
        <header className="blog-post-header">
          <div className="blog-post-meta">
            <span className="blog-category">COFFEEHOLIC</span>
            <span className="blog-date">10/09/2023</span>
            <span className="read-time">6 phút đọc</span>
          </div>
          <h1 className="blog-post-title">
            KHÔNG GIAN CÀ PHÊ MỚI - NƠI GẶP GỠ VÀ KẾT NỐI
          </h1>
          <p className="blog-post-excerpt">
            Với concept mới về không gian cà phê hiện đại, The Coffee House đang từng bước thay đổi cách thức trải nghiệm cà phê của khách hàng. Không chỉ là nơi thưởng thức đồ uống, đây còn là không gian văn hóa, giao lưu và sáng tạo.
          </p>
        </header>

        {/* Featured Image */}
        <div className="blog-post-image">
          <img src="/freeship_banner.jpg" alt="Không gian cà phê mới - Nơi gặp gỡ và kết nối" />
        </div>

        {/* Content */}
        <div className="blog-post-content">
          <p>
            Trong thời đại số hóa ngày nay, nhu cầu về một không gian thực sự để gặp gỡ, kết nối và sáng tạo ngày càng trở nên quan trọng. Eclipse hiểu rõ điều này và đã phát triển concept không gian cà phê hoàn toàn mới - nơi mà cà phê không chỉ là thức uống, mà còn là cầu nối cho những kết nối ý nghĩa.
          </p>

          <h2>Thiết kế không gian mở và linh hoạt</h2>
          <p>
            Khác với mô hình cà phê truyền thống, không gian mới của Eclipse được thiết kế theo concept mở, với những khu vực chức năng riêng biệt nhưng vẫn kết nối hài hòa với nhau:
          </p>

          <h3>Khu vực làm việc cá nhân</h3>
          <p>
            Được trang bị đầy đủ ổ cắm điện, wifi tốc độ cao, ánh sáng phù hợp cho việc đọc và làm việc. Mỗi bàn được thiết kế ergonomic, đảm bảo sự thoải mái cho người sử dụng trong thời gian dài.
          </p>

          <h3>Không gian họp nhóm</h3>
          <p>
            Các bàn lớn hình tròn và vuông, phù hợp cho các cuộc họp nhóm từ 4-8 người. Khu vực này được tách biệt một phần để giảm tiếng ồn, tạo môi trường tập trung cho công việc.
          </p>

          <h3>Góc thư giãn và giao lưu</h3>
          <p>
            Với những chiếc ghế sofa êm ái, bàn trà thấp, tạo không gian thân mật cho việc trò chuyện, gặp gỡ bạn bè hay đơn giản là thư giãn với một cuốn sách.
          </p>

          <h2>Công nghệ hiện đại phục vụ khách hàng</h2>
          <p>
            Eclipse tích hợp nhiều công nghệ hiện đại để nâng cao trải nghiệm:
          </p>

          <ul>
            <li><strong>Hệ thống order qua app:</strong> Khách hàng có thể đặt trước và thanh toán qua ứng dụng</li>
            <li><strong>WiFi tốc độ cao:</strong> Kết nối internet ổn định với băng thông rộng</li>
            <li><strong>Charging station:</strong> Trạm sạc không dây và cổng USB tại mỗi bàn</li>
            <li><strong>Hệ thống âm thanh thông minh:</strong> Điều chỉnh âm lượng phù hợp từng khu vực</li>
            <li><strong>Smart lighting:</strong> Hệ thống đèn thông minh điều chỉnh theo thời gian trong ngày</li>
          </ul>

          <h2>Freeship 2025 - Chương trình giao hàng miễn phí</h2>
          <p>
            Một trong những điểm nổi bật của concept mới là chương trình "Freeship 2025" - cam kết giao hàng miễn phí cho tất cả đơn hàng trong năm 2025. Chương trình này không chỉ mang lại tiện ích cho khách hàng mà còn thể hiện cam kết của Eclipse trong việc mở rộng dịch vụ và tiếp cận khách hàng.
          </p>

          <blockquote>
            "Chúng tôi tin rằng không gian cà phê không chỉ là nơi để uống cà phê, mà còn là nơi để sống, để cảm nhận, để kết nối. Mỗi chi tiết trong thiết kế đều hướng đến việc tạo ra những trải nghiệm đáng nhớ cho khách hàng."
            <cite>- Kiến trúc sư trưởng Eclipse</cite>
          </blockquote>

          <h2>Chương trình hoạt động cộng đồng</h2>
          <p>
            Không gian mới không chỉ phục vụ việc uống cà phê mà còn là nơi tổ chức các hoạt động cộng đồng:
          </p>

          <h3>Workshop về cà phê</h3>
          <p>
            Các buổi workshop về pha chế cà phê, tìm hiểu về nguồn gốc cà phê, và nghệ thuật latte art được tổ chức hàng tuần, giúp khách hàng hiểu sâu hơn về thế giới cà phê.
          </p>

          <h3>Sự kiện âm nhạc acoustic</h3>
          <p>
        // File moved to __trash
          </p>

          <h3>Triển lãm nghệ thuật địa phương</h3>
          <p>
            Tường của cà phê thường xuyên trưng bày các tác phẩm của các nghệ sĩ địa phương, vừa trang trí không gian vừa hỗ trợ cộng đồng nghệ thuật.
          </p>

          <h2>Cam kết về môi trường</h2>
          <p>
            Trong thiết kế không gian mới, The Coffee House đặc biệt chú trọng đến yếu tố môi trường:
          </p>

          <ul>
            <li><strong>Vật liệu thân thiện:</strong> Sử dụng gỗ tái chế và vật liệu có thể phân hủy</li>
            <li><strong>Hệ thống tiết kiệm năng lượng:</strong> Đèn LED, điều hòa inverter</li>
            <li><strong>Chương trình tái chế:</strong> Thu gom và tái chế ly giấy, túi xách</li>
            <li><strong>Cây xanh trong nhà:</strong> Nhiều cây xanh giúp lọc không khí và tạo không gian tươi mát</li>
          </ul>

          <h2>Trải nghiệm khách hàng toàn diện</h2>
          <p>
            Mỗi chi tiết trong không gian đều được tính toán để tối ưu hóa trải nghiệm khách hàng:
          </p>

          <ol>
            <li><strong>Từ lúc bước vào:</strong> Hương thơm cà phê đặc trưng đón chào</li>
            <li><strong>Khi order:</strong> Quy trình nhanh chóng, thân thiện</li>
            <li><strong>Trong lúc chờ:</strong> Có thể quan sát quá trình pha chế</li>
            <li><strong>Khi thưởng thức:</strong> Không gian thoải mái, phù hợp mục đích sử dụng</li>
            <li><strong>Khi rời đi:</strong> Dịch vụ giao hàng miễn phí nếu cần</li>
          </ol>

          <h2>Tương lai của không gian cà phê</h2>
          <p>
            Eclipse không ngừng nghiên cứu và phát triển concept không gian cà phê. Trong tương lai gần, chúng tôi sẽ tiếp tục thử nghiệm những ý tưởng mới như không gian cà phê kết hợp thư viện, khu vực gaming, và không gian làm việc 24/7.
          </p>

          <p>
            Hãy đến trải nghiệm không gian cà phê mới tại Eclipse - nơi mà mỗi ly cà phê không chỉ đánh thức vị giác mà còn kết nối con tim và tâm hồn. Đây không chỉ là một quán cà phê, mà là một cộng đồng, một ngôi nhà thứ hai cho tất cả mọi người.
          </p>
        </div>

        {/* Navigation */}
        <div className="blog-post-navigation">
          <Link to="/blog" className="back-to-blog">
            ← Quay lại Blog
          </Link>
          <div className="share-buttons">
            <span>Chia sẻ:</span>
            <button className="share-btn facebook">Facebook</button>
            <button className="share-btn twitter">Twitter</button>
            <button className="share-btn linkedin">LinkedIn</button>
          </div>
        </div>

        {/* Related Posts */}
        <div className="related-posts">
          <h3>Bài viết liên quan</h3>
          <div className="related-posts-grid">
            <Link to="/blog/tra-sua-moi" className="related-post">
              <img src="/banner1.webp" alt="Trà sữa mới" />
              <h4>TRÀ SỮA MỚI - HƯƠNG VỊ TẠM BIỆT HÈ, CHÀO ĐÓN THU</h4>
            </Link>
            <Link to="/blog/banh-ngot-cao-cap" className="related-post">
              <img src="/banner2.webp" alt="Bánh ngọt cao cấp" />
              <h4>BÁNH NGỌT CAO CẤP - ĐỐI TÁC HOÀN HẢO CỦA CÀ PHÊ</h4>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default KhongGianCafeMoi;
