# 🚀 ECLIPSE Coffee Shop - Khởi động nhanh

## Bước 1: Chuẩn bị môi trường

### 1.1 Khởi động MongoDB
1. Mở **MongoDB Compass**
2. Kết nối đến: `localhost:27017`
3. Đảm bảo database `drink_shop` tồn tại

### 1.2 Cài đặt dependencies
```bash
# Backend
cd backend
npm install

# Frontend  
cd ../client
npm install
```

## Bước 2: Khởi động hệ thống

### 2.1 Khởi động Backend (Terminal 1)
```bash
cd d:\congnghephanme\DOAN\backend
node app.js
```

**Chờ thấy thông báo:**
```
Server running on port 5000
MongoDB connected successfully
```

### 2.2 Khởi động Frontend (Terminal 2 - mới)
```bash
cd d:\congnghephanme\DOAN\client
npm start
```

**Trình duyệt sẽ tự mở:** `http://localhost:3000`

## Bước 3: Truy cập ứng dụng

### 🌐 Khách hàng
- **Trang chủ**: http://localhost:3000
- **Sản phẩm**: http://localhost:3000/products
- **Đăng nhập**: http://localhost:3000/login

### 👨‍💼 Admin
- **Admin Panel**: http://localhost:3000/admin
- **Quản lý sản phẩm**: http://localhost:3000/admin/drinks
- **Thêm sản phẩm**: http://localhost:3000/admin/drinks/add

### 🔧 API
- **Tất cả sản phẩm**: http://localhost:5000/api/drinks
- **Sản phẩm nổi bật**: http://localhost:5000/api/drinks/featured

## 🚨 Khắc phục sự cố

### Backend không khởi động được
1. Kiểm tra MongoDB đang chạy
2. Kiểm tra port 5000: `netstat -ano | findstr :5000`
3. Xóa process cũ: `taskkill /PID [PID] /F`

### Frontend báo lỗi "Route not found"
1. Đảm bảo backend đã khởi động
2. Kiểm tra: http://localhost:5000/api/drinks
3. Restart frontend nếu cần

### Database lỗi
1. Restart MongoDB service
2. Kiểm tra connection string trong .env
3. Xem logs trong MongoDB Compass

## 📚 Tài liệu thêm

- [Hướng dẫn Admin](docs/ADMIN_GUIDE.md)
- [Cài đặt Admin](docs/ADMIN_SETUP.md)
- [MongoDB Setup](docs/MONGODB_COMPASS_GUIDE.md)