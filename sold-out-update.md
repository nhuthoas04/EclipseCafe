## ✅ Cập nhật hiển thị sản phẩm hết hàng

### 🔄 Những thay đổi đã thực hiện:

**1. CSS (.product-card.sold-out):**
- ❌ Xóa `display: none` cho ảnh sản phẩm
- ✅ Thêm `opacity: 0.6` và `filter: grayscale(30%)` cho ảnh
- ✅ Thêm overlay mờ `rgba(255, 255, 255, 0.4)` 
- ✅ Tăng `z-index` của sold-out-badge lên 5

**2. JavaScript (Products.js):**
- ❌ Xóa `<div className="sold-out-overlay"></div>`
- ✅ Giữ nguyên logic hiển thị ảnh cho sản phẩm hết hàng

### 🎯 Kết quả:

**Trước:**
- ❌ Sản phẩm hết hàng: Không có ảnh, chỉ hiển thị background xám
- ❌ Khó nhận biết sản phẩm

**Sau:**
- ✅ Sản phẩm hết hàng: Vẫn hiển thị ảnh nhưng mờ và xám
- ✅ Badge "Hết hàng" nổi bật trên ảnh
- ✅ Button "Hết hàng" disabled
- ✅ Dễ nhận biết sản phẩm và trạng thái

### 🚀 Để kiểm tra:

1. **Refresh trang web** (Ctrl + F5)
2. **Vào trang sản phẩm**: http://localhost:3000/products
3. **Kiểm tra sản phẩm hết hàng**: Ảnh vẫn hiển thị nhưng mờ với badge đỏ

### 💡 Tính năng mới:
- Khách hàng vẫn thấy được sản phẩm hết hàng
- Dễ dàng nhận biết và có thể quay lại mua sau
- Trải nghiệm người dùng tốt hơn
