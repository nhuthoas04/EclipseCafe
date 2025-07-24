import React from 'react';
import { Link } from 'react-router-dom';
import './BlogPost.css';

const TraSuaMoi = () => {
  return (
    <div className="blog-post-container">
      <article className="blog-post">
        {/* Header */}
        <header className="blog-post-header">
          <div className="blog-post-meta">
            <span className="blog-category">COFFEEHOLIC</span>
            <span className="blog-date">25/09/2023</span>
            <span className="read-time">4 phút đọc</span>
          </div>
          <h1 className="blog-post-title">
            TRÀ SỮA MỚI - HƯƠNG VỊ TẠM BIỆT HÈ, CHÀO ĐÓN THU
          </h1>
          <p className="blog-post-excerpt">
            Khi những cơn gió mát đầu mùa thu bắt đầu thổi về, đó cũng là lúc The Coffee House giới thiệu bộ sưu tập trà sữa mới với hương vị ấm áp, phù hợp với tiết trời se lạnh sắp tới.
          </p>
            // File moved to __trash

        {/* Featured Image */}
        <div className="blog-post-image">
          <img src="/banner1.webp" alt="Trà sữa mới - Hương vị tạm biệt hè, chào đón thu" />
        </div>

        {/* Content */}
        <div className="blog-post-content">
          <p>
            Mùa thu đang đến gần với những cơn gió se lạnh đầu mùa, và đây chính là thời điểm hoàn hảo để Eclipse ra mắt bộ sưu tập trà sữa mới - một sự kết hợp tinh tế giữa hương vị truyền thống và sự sáng tạo hiện đại.
          </p>

          <h2>Giảm 50% - Ưu đãi đặc biệt mùa thu</h2>
          <p>
            Để chào đón mùa thu và giới thiệu dòng sản phẩm mới, Eclipse dành tặng khách hàng ưu đãi giảm giá 50% cho tất cả các loại trà sữa trong bộ sưu tập mới. Đây là cơ hội tuyệt vời để bạn thử nghiệm những hương vị mới mẻ với mức giá hấp dẫn.
          </p>

          <h2>Bộ sưu tập trà sữa mùa thu đa dạng</h2>
          <p>
            Bộ sưu tập trà sữa mới của The Coffee House bao gồm nhiều hương vị đặc biệt:
          </p>

          <ul>
            <li><strong>Trà sữa khoai môn:</strong> Hương vị ngọt ngào, béo ngậy của khoai môn kết hợp với trà đen thơm nồng</li>
            <li><strong>Trà sữa matcha:</strong> Vị đắng nhẹ của matcha Nhật Bản cao cấp, cân bằng với độ ngọt của sữa tươi</li>
            <li><strong>Trà sữa socola:</strong> Sự hòa quyện giữa trà đen và socola đen, tạo nên hương vị độc đáo</li>
            <li><strong>Trà sữa dâu:</strong> Hương thơm tự nhiên của dâu tây tươi, mang lại cảm giác tươi mát</li>
          </ul>

          <h2>Chất lượng nguyên liệu cao cấp</h2>
          <p>
            Eclipse luôn chú trọng đến chất lượng nguyên liệu. Tất cả các loại trà đều được nhập khẩu từ những vùng trồng trà nổi tiếng, kết hợp với sữa tươi cao cấp và các nguyên liệu tự nhiên khác để tạo nên những ly trà sữa hoàn hảo.
          </p>

          <blockquote>
            "Mỗi ly trà sữa không chỉ là một thức uống, mà còn là một trải nghiệm về hương vị và cảm xúc. Chúng tôi muốn mang đến cho khách hàng những giây phút thư giãn tuyệt vời trong không gian ấm cúng của Eclipse."
            <cite>- Đại diện Eclipse</cite>
          </blockquote>

          <h2>Không gian thưởng thức lý tưởng</h2>
          <p>
            Với thiết kế nội thất ấm cúng và hiện đại, các cửa hàng Eclipse là nơi lý tưởng để bạn thưởng thức những ly trà sữa mới. Không gian được thiết kế để tạo cảm giác thoải mái, phù hợp cho việc làm việc, gặp gỡ bạn bè hay đơn giản là thư giãn sau một ngày dài.
          </p>

          <h2>Cam kết về chất lượng</h2>
          <p>
            Eclipse cam kết mang đến những sản phẩm chất lượng cao nhất. Mỗi ly trà sữa đều được pha chế theo quy trình nghiêm ngặt, đảm bảo hương vị đặc trưng và an toàn vệ sinh thực phẩm.
          </p>

          <p>
            Hãy đến Eclipse để trải nghiệm bộ sưu tập trà sữa mới và cảm nhận sự thay đổi của mùa thu qua từng ngụm trà thơm ngon. Ưu đãi giảm 50% có thời hạn, đừng bỏ lỡ cơ hội này!
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
            <Link to="/blog/banh-ngot-cao-cap" className="related-post">
              <img src="/banner2.webp" alt="Bánh ngọt cao cấp" />
              <h4>BÁNH NGỌT CAO CẤP - ĐỐI TÁC HOÀN HẢO CỦA CÀ PHÊ</h4>
            </Link>
            <Link to="/blog/khong-gian-cafe-moi" className="related-post">
              <img src="/freeship_banner.jpg" alt="Không gian cà phê mới" />
              <h4>KHÔNG GIAN CÀ PHÊ MỚI - NƠI GẶP GỠ VÀ KẾT NỐI</h4>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default TraSuaMoi;
