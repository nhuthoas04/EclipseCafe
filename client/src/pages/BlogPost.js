import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './BlogPost.css';

const blogPosts = {
  'cafe-hoan-hao': {
    title: 'Bí quyết pha chế cà phê hoàn hảo',
    date: '15 Tháng 7, 2025',
    icon: '☕',
    category: 'Cà phê',
    readTime: '5 phút đọc',
    content: `
      <h2>Giới thiệu</h2>
      <p>Pha chế một ly cà phê hoàn hảo không chỉ là nghệ thuật mà còn là khoa học. Từ việc chọn hạt cà phê đến kỹ thuật pha chế, mọi chi tiết đều quan trọng để tạo ra một ly cà phê thơm ngon.</p>
      
      <h2>1. Chọn hạt cà phê chất lượng</h2>
      <p>Hạt cà phê tốt là nền tảng của một ly cà phê ngon. Nên chọn hạt cà phê được rang trong vòng 2-4 tuần và bảo quản trong túi có van thoát khí.</p>
      <ul>
        <li>Arabica: Hương vị tinh tế, ít caffeine</li>
        <li>Robusta: Đậm đà, nhiều caffeine</li>
        <li>Blend: Kết hợp ưu điểm của cả hai</li>
      </ul>
      
      <h2>2. Tỷ lệ cà phê và nước</h2>
      <p>Tỷ lệ vàng là 1:15 đến 1:17 (1g cà phê : 15-17ml nước). Điều chỉnh theo sở thích cá nhân.</p>
      
      <h2>3. Nhiệt độ nước</h2>
      <p>Nhiệt độ lý tưởng là 90-96°C. Nước quá nóng sẽ làm cháy cà phê, nước quá lạnh sẽ không chiết xuất đủ hương vị.</p>
      
      <h2>4. Thời gian pha</h2>
      <p>Thời gian pha khác nhau tùy theo phương pháp:</p>
      <ul>
        <li>Espresso: 25-30 giây</li>
        <li>Pour over: 3-4 phút</li>
        <li>French Press: 4 phút</li>
        <li>Aeropress: 1-2 phút</li>
      </ul>
      
      <h2>5. Kỹ thuật rót nước</h2>
      <p>Với pour over, rót nước từ từ theo chuyển động tròn, bắt đầu từ giữa và mở rộng ra ngoài. Điều này giúp chiết xuất đều các hợp chất trong cà phê.</p>
      
      <h2>Kết luận</h2>
      <p>Pha chế cà phê hoàn hảo cần sự kiên nhẫn và thực hành. Hãy thử nghiệm với các tỷ lệ và kỹ thuật khác nhau để tìm ra hương vị yêu thích của bạn.</p>
    `,
    tags: ['Cà phê', 'Pha chế', 'Hướng dẫn']
  },
  'latte-art-co-ban': {
    title: 'Hướng dẫn Latte Art cơ bản',
    date: '8 Tháng 7, 2025',
    icon: '🎨',
    category: 'Kỹ thuật',
    readTime: '8 phút đọc',
    content: `
      <h2>Latte Art - Nghệ thuật trên ly cà phê</h2>
      <p>Latte Art là nghệ thuật tạo ra những họa tiết đẹp mắt trên bề mặt ly cà phê bằng cách rót sữa tươi đã được đánh bọt một cách khéo léo.</p>
      
      <h2>1. Chuẩn bị dụng cụ</h2>
      <ul>
        <li>Máy pha espresso có vòi đánh sữa</li>
        <li>Bình đánh sữa (steaming pitcher)</li>
        <li>Sữa tươi nguyên kem (3.5% chất béo)</li>
        <li>Cà phê espresso chất lượng cao</li>
      </ul>
      
      <h2>2. Kỹ thuật đánh sữa</h2>
      <p>Đánh sữa đúng cách là yếu tố quan trọng nhất:</p>
      <ul>
        <li>Nhiệt độ sữa: 60-65°C</li>
        <li>Tạo microfoam mịn và bóng</li>
        <li>Không có bọt to, không bị phân tách</li>
      </ul>
      
      <h2>3. Các mẫu cơ bản</h2>
      <h3>Heart (Trái tim)</h3>
      <p>Rót sữa từ độ cao vừa phải, khi gần đầy thì hạ thấp bình và tạo một đường thẳng qua giữa.</p>
      
      <h3>Rosetta (Lá cây)</h3>
      <p>Di chuyển bình sữa qua lại tạo các tầng, cuối cùng kéo một đường thẳng về phía trước.</p>
      
      <h3>Tulip (Hoa tulip)</h3>
      <p>Tạo nhiều trái tim liên tiếp từ dưới lên, cuối cùng kéo một đường thẳng qua tất cả.</p>
      
      <h2>4. Mẹo thành công</h2>
      <ul>
        <li>Luyện tập thường xuyên</li>
        <li>Kiểm soát tốc độ rót</li>
        <li>Giữ tay vững</li>
        <li>Quan sát và điều chỉnh</li>
      </ul>
      
      <h2>Kết luận</h2>
      <p>Latte Art cần thời gian để thành thạo. Hãy kiên nhẫn luyện tập và bạn sẽ tạo ra những tác phẩm nghệ thuật tuyệt đẹp trên ly cà phê của mình.</p>
    `,
    tags: ['Latte Art', 'Kỹ thuật', 'Cà phê', 'Nghệ thuật']
  },
  'do-uong-giai-nhiet': {
    title: 'Top 10 đồ uống giải nhiệt hiệu quả',
    date: '5 Tháng 7, 2025',
    icon: '🌊',
    category: 'Mùa hè',
    readTime: '4 phút đọc',
    content: `
      <h2>Những đồ uống tuyệt vời cho mùa hè</h2>
      <p>Mùa hè nóng bức đòi hỏi những thức uống giải nhiệt hiệu quả. Dưới đây là top 10 đồ uống được yêu thích nhất:</p>
      
      <h2>1. Trà đá chanh</h2>
      <p>Kết hợp hoàn hảo giữa trà xanh, chanh tươi và đá viên. Giàu vitamin C và chất chống oxi hóa.</p>
      
      <h2>2. Nước dừa tươi</h2>
      <p>Bổ sung điện giải tự nhiên, giúp cơ thể phục hồi nhanh chóng sau khi ra ngoài nắng.</p>
      
      <h2>3. Smoothie dưa hấu</h2>
      <p>91% là nước, giàu lycopene, giúp bảo vệ da khỏi tia UV có hại.</p>
      
      <h2>4. Trà xanh lạnh</h2>
      <p>Chứa catechin, giúp tăng cường trao đổi chất và làm mát cơ thể từ bên trong.</p>
      
      <h2>5. Nước chanh muối</h2>
      <p>Bổ sung natri và khoáng chất bị mất qua mồ hôi, giúp cân bằng điện giải.</p>
      
      <h2>6. Sinh tố dứa</h2>
      <p>Chứa enzyme bromelain, hỗ trợ tiêu hóa và có tác dụng chống viêm tự nhiên.</p>
      
      <h2>7. Trà bạc hà lạnh</h2>
      <p>Menthol trong bạc hà tạo cảm giác mát lạnh tức thì và thư giãn tinh thần.</p>
      
      <h2>8. Nước cam tươi</h2>
      <p>Vitamin C tăng cường miễn dịch, đường tự nhiên cung cấp năng lượng nhanh chóng.</p>
      
      <h2>9. Trà hoa cúc lạnh</h2>
      <p>Có tính mát, giúp giảm stress và cải thiện chất lượng giấc ngủ trong đêm hè.</p>
      
      <h2>10. Matcha latte đá</h2>
      <p>Caffeine từ matcha giúp tỉnh táo, L-theanine mang lại sự thư thái và tập trung.</p>
      
      <h2>Lời khuyên</h2>
      <p>Uống nhiều nước trong ngày, tránh đồ uống có nhiều đường và caffeine. Kết hợp với trái cây tươi để tăng hiệu quả giải nhiệt.</p>
    `,
    tags: ['Mùa hè', 'Giải nhiệt', 'Sức khỏe', 'Nước uống']
  },
  'ca-phe-viet-nam': {
    title: 'Văn hóa cà phê Việt Nam',
    date: '2 Tháng 7, 2025',
    icon: '🇻🇳',
    category: 'Văn hóa',
    readTime: '10 phút đọc',
    content: `
      <h2>Lịch sử cà phê Việt Nam</h2>
      <p>Cà phê được du nhập vào Việt Nam từ thời Pháp thuộc vào năm 1857. Từ một loại cây trồng ngoại lai, cà phê đã trở thành một phần không thể thiếu trong văn hóa Việt Nam.</p>
      
      <h2>1. Sự phát triển qua các thời kỳ</h2>
      <h3>Thời Pháp thuộc (1857-1945)</h3>
      <p>Người Pháp đưa giống cà phê Arabica từ châu Phi vào trồng tại Đà Lạt và các vùng cao nguyên.</p>
      
      <h3>Thời kỳ chiến tranh (1945-1975)</h3>
      <p>Ngành cà phê gặp nhiều khó khăn, sản lượng giảm mạnh do ảnh hưởng của chiến tranh.</p>
      
      <h3>Thời đổi mới (1986 - nay)</h3>
      <p>Việt Nam đã trở thành nước xuất khẩu cà phê lớn thứ 2 thế giới, chủ yếu là giống Robusta.</p>
      
      <h2>2. Các vùng trồng cà phê nổi tiếng</h2>
      <h3>Đắk Lắk - Buôn Ma Thuột</h3>
      <p>Thủ đô cà phê của Việt Nam, chiếm 30% tổng sản lượng cả nước.</p>
      
      <h3>Lâm Đồng - Đà Lạt</h3>
      <p>Chuyên trồng Arabica chất lượng cao nhờ khí hậu mát mẻ quanh năm.</p>
      
      <h3>Gia Lai - Pleiku</h3>
      <p>Vùng đất đỏ bazan màu mỡ, thích hợp cho cà phê Robusta chất lượng.</p>
      
      <h2>3. Văn hóa thưởng thức cà phê</h2>
      <h3>Cà phê phin</h3>
      <p>Phương pháp pha độc đáo của Việt Nam, tạo ra ly cà phê đậm đà, thơm ngon.</p>
      
      <h3>Cà phê sữa đá</h3>
      <p>Sự kết hợp hoàn hảo giữa cà phê đen đậm và sữa đặc ngọt, phù hợp với khí hậu nhiệt đới.</p>
      
      <h3>Cà phê vỉa hè</h3>
      <p>Không gian thưởng thức cà phê đặc trưng, nơi mọi người gặp gỡ, trò chuyện và thư giãn.</p>
      
      <h2>4. Ý nghĩa văn hóa xã hội</h2>
      <ul>
        <li>Nơi gặp gỡ, giao lưu của mọi tầng lớp xã hội</li>
        <li>Không gian thư giãn sau những giờ làm việc căng thẳng</li>
        <li>Biểu tượng của sự chậm rãi, thưởng thức cuộc sống</li>
        <li>Phản ánh tính cách con người Việt Nam: bình dị, gần gũi</li>
      </ul>
      
      <h2>5. Cà phê đặc sản các vùng</h2>
      <h3>Cà phê chồn Đà Lạt</h3>
      <p>Loại cà phê đắt tiền nhất, được lên men tự nhiên trong dạ dày chồn.</p>
      
      <h3>Cà phê Moka Cầu Đất</h3>
      <p>Giống Arabica cao cấp, hương vị tinh tế, được trồng ở độ cao trên 1.500m.</p>
      
      <h3>Cà phê Cherry Đắk Lắk</h3>
      <p>Được thu hoạch từ quả cà phê chín đỏ, tạo ra hương vị ngọt ngào tự nhiên.</p>
      
      <h2>Kết luận</h2>
      <p>Cà phê không chỉ là thức uống mà đã trở thành một phần của văn hóa, lối sống người Việt. Từ những quán cà phê vỉa hè đến những chuỗi cà phê hiện đại, cà phê luôn giữ vai trò quan trọng trong đời sống tinh thần của người dân.</p>
    `,
    tags: ['Văn hóa', 'Cà phê Việt Nam', 'Lịch sử', 'Truyền thống']
  },
  'xu-huong-mua-he': {
    title: 'Xu hướng đồ uống mùa hè 2025',
    date: '12 Tháng 7, 2025',
    icon: '🧊',
    content: `
      <h2>Những xu hướng hot nhất mùa hè 2025</h2>
      <p>Mùa hè 2025 mang đến nhiều xu hướng đồ uống mới lạ và thú vị. Từ các loại trà sữa tươi mát đến smoothie bổ dưỡng, hãy cùng khám phá những gì đang "làm mưa làm gió" trong thế giới đồ uống.</p>
      
      <h2>1. Cold Brew Coffee</h2>
      <p>Cà phê pha lạnh tiếp tục là xu hướng hàng đầu với hương vị êm dịu, ít chua và có thể kết hợp với nhiều topping khác nhau.</p>
      <ul>
        <li>Cold brew truyền thống</li>
        <li>Nitro cold brew</li>
        <li>Cold brew với sữa oat</li>
        <li>Cold brew cocktail</li>
      </ul>
      
      <h2>2. Bubble Tea Evolution</h2>
      <p>Trà sữa không ngừng đổi mới với những hương vị và topping sáng tạo:</p>
      <ul>
        <li>Trà sữa cheese foam</li>
        <li>Brown sugar milk tea</li>
        <li>Trà sữa matcha</li>
        <li>Crystal boba</li>
      </ul>
      
      <h2>3. Functional Beverages</h2>
      <p>Đồ uống có lợi ích cho sức khỏe ngày càng được ưa chuộng:</p>
      <ul>
        <li>Kombucha</li>
        <li>Adaptogenic drinks</li>
        <li>Probiotic smoothies</li>
        <li>Collagen drinks</li>
      </ul>
      
      <h2>4. Plant-Based Alternatives</h2>
      <p>Sữa thực vật tiếp tục phát triển mạnh mẽ:</p>
      <ul>
        <li>Sữa yến mạch (Oat milk)</li>
        <li>Sữa hạnh nhân</li>
        <li>Sữa dừa</li>
        <li>Sữa đậu nành</li>
      </ul>
      
      <h2>5. Instagram-Worthy Drinks</h2>
      <p>Đồ uống đẹp mắt cho social media:</p>
      <ul>
        <li>Galaxy drinks với màu sắc gradient</li>
        <li>Layered drinks</li>
        <li>Edible flowers topping</li>
        <li>Glow-in-the-dark beverages</li>
      </ul>
      
      <h2>Dự đoán xu hướng</h2>
      <p>Trong thời gian tới, chúng ta sẽ thấy sự kết hợp giữa công nghệ và đồ uống, như đồ uống cá nhân hóa theo DNA, đồ uống thông minh và trải nghiệm AR/VR khi thưởng thức.</p>
    `,
    tags: ['Xu hướng', 'Mùa hè', 'Đồ uống', 'Cold brew']
  },
  'loi-ich-tra-xanh': {
    title: 'Lợi ích sức khỏe từ trà xanh',
    date: '10 Tháng 7, 2025',
    icon: '🌱',
    content: `
      <h2>Trà xanh - Thần dược từ thiên nhiên</h2>
      <p>Trà xanh đã được sử dụng hàng nghìn năm không chỉ như một thức uống thơm ngon mà còn như một loại thuốc quý. Với hàm lượng chất chống oxy hóa cao và nhiều hợp chất có lợi, trà xanh mang lại vô số lợi ích cho sức khỏe.</p>
      
      <h2>1. Chống oxy hóa mạnh mẽ</h2>
      <p>Trà xanh chứa polyphenol, đặc biệt là EGCG (Epigallocatechin gallate), một chất chống oxy hóa mạnh gấp 100 lần vitamin C.</p>
      <ul>
        <li>Bảo vệ tế bào khỏi tổn thương</li>
        <li>Chống lão hóa</li>
        <li>Giảm viêm nhiễm</li>
        <li>Tăng cường miễn dịch</li>
      </ul>
      
      <h2>2. Hỗ trợ giảm cân</h2>
      <p>Trà xanh có thể giúp tăng cường quá trình đốt cháy chất béo và tăng tốc độ trao đổi chất:</p>
      <ul>
        <li>Tăng nhiệt sinh trong cơ thể</li>
        <li>Ức chế hấp thụ chất béo</li>
        <li>Giảm cảm giác thèm ăn</li>
        <li>Hỗ trợ đốt cháy mỡ bụng</li>
      </ul>
      
      <h2>3. Bảo vệ tim mạch</h2>
      <p>Nghiên cứu cho thấy uống trà xanh thường xuyên có thể:</p>
      <ul>
        <li>Giảm cholesterol xấu (LDL)</li>
        <li>Tăng cholesterol tốt (HDL)</li>
        <li>Giảm huyết áp</li>
        <li>Cải thiện chức năng động mạch</li>
      </ul>
      
      <h2>4. Tăng cường trí não</h2>
      <p>Caffeine và L-theanine trong trà xanh có tác động tích cực đến não bộ:</p>
      <ul>
        <li>Cải thiện sự tập trung</li>
        <li>Tăng khả năng ghi nhớ</li>
        <li>Giảm stress và lo âu</li>
        <li>Bảo vệ khỏi các bệnh thoái hóa thần kinh</li>
      </ul>
      
      <h2>5. Phòng chống ung thư</h2>
      <p>Các hợp chất trong trà xanh có thể giúp:</p>
      <ul>
        <li>Ức chế sự phát triển của tế bào ung thư</li>
        <li>Giảm nguy cơ ung thư vú, tuyến tiền liệt, đại tràng</li>
        <li>Bảo vệ DNA khỏi tổn thương</li>
      </ul>
      
      <h2>6. Chăm sóc da</h2>
      <p>Trà xanh có tác dụng tuyệt vời cho làn da:</p>
      <ul>
        <li>Chống lão hóa da</li>
        <li>Giảm mụn trứng cá</li>
        <li>Bảo vệ da khỏi tia UV</li>
        <li>Làm sáng da tự nhiên</li>
      </ul>
      
      <h2>Cách thưởng thức trà xanh đúng cách</h2>
      <ul>
        <li><strong>Nhiệt độ nước:</strong> 70-80°C (không nên dùng nước sôi)</li>
        <li><strong>Thời gian pha:</strong> 2-3 phút</li>
        <li><strong>Lượng trà:</strong> 2-3g cho 200ml nước</li>
        <li><strong>Thời điểm uống:</strong> Giữa các bữa ăn, tránh uống khi đói</li>
        <li><strong>Liều lượng:</strong> 2-3 tách/ngày</li>
      </ul>
      
      <h2>Lưu ý quan trọng</h2>
      <p>Mặc dù trà xanh có nhiều lợi ích, nhưng cần lưu ý:</p>
      <ul>
        <li>Không uống quá nhiều (tối đa 3-4 tách/ngày)</li>
        <li>Tránh uống khi đói hoặc trước khi ngủ</li>
        <li>Người có vấn đề về dạ dày nên hạn chế</li>
        <li>Phụ nữ mang thai nên tham khảo ý kiến bác sĩ</li>
      </ul>
    `,
    tags: ['Trà xanh', 'Sức khỏe', 'Chống oxy hóa', 'Giảm cân']
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="blog-post-container">
        <div className="container">
          <div className="blog-not-found">
            <h1>Bài viết không tồn tại</h1>
            <p>Xin lỗi, bài viết bạn đang tìm kiếm không tồn tại.</p>
            <Link to="/" className="back-home-btn">
              Quay về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span> / </span>
          <span>Blog</span>
          <span> / </span>
          <span>{post.title}</span>
        </nav>

        {/* Blog Header */}
        <header className="blog-header">
          <div className="blog-icon">{post.icon}</div>
          <h1 className="blog-title">{post.title}</h1>
          <div className="blog-meta">
            <span className="blog-date">📅 {post.date}</span>
            <div className="blog-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="blog-tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Blog Content */}
        <article className="blog-content">
          <div 
            className="blog-text"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Navigation */}
        <div className="blog-navigation">
          <Link to="/" className="back-home-btn">
            ← Quay về trang chủ
          </Link>
          
          <div className="related-posts">
            <h3>Bài viết khác</h3>
            <div className="related-links">
              {Object.keys(blogPosts)
                .filter(key => key !== slug)
                .slice(0, 2)
                .map(key => (
                  <Link key={key} to={`/blog/${key}`} className="related-link">
                    {blogPosts[key].icon} {blogPosts[key].title}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
