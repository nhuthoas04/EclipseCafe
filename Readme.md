# ☕ ECLIPSE Coffee Shop

Hệ thống quản lý cửa hàng cà phê với React.js frontend và Node.js backend.

## 🚀 Khởi động nhanh

### 1. Cài đặt dependencies
```bash
# Backend
cd backend
npm install

# Frontend  
cd ../client
npm install
```

### 2. Cấu hình môi trường
```bash
# Backend: Tạo file .env trong /backend
MONGODB_URI=mongodb://localhost:27017/drink_shop
JWT_SECRET=your_jwt_secret
PORT=5000

# Frontend: Tạo file .env trong /client
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

### 3. Khởi động ứng dụng

**Bước 1: Khởi động MongoDB**
- Mở MongoDB Compass
- Kết nối đến localhost:27017

**Bước 2: Khởi động Backend**
```bash
cd backend
npm start
# hoặc: node app.js
```

**Bước 3: Khởi động Frontend**
```bash
cd client
npm start
```

## 📱 Truy cập ứng dụng

- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **API Documentation**: http://localhost:5000/api

## 📂 Cấu trúc dự án

```
DOAN/
├── backend/           # Node.js API server
│   ├── config/        # Database config
│   ├── controllers/   # Business logic
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   ├── middlewares/   # Auth & validation
│   └── uploads/       # File uploads
├── client/            # React frontend
│   ├── public/        # Static files
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       └── utils/
├── docs/              # Documentation
└── README.md
```

## ✨ Tính năng chính

- 🛍️ **Khách hàng**: Xem sản phẩm, đặt hàng, thanh toán
- 👨‍💼 **Admin**: Quản lý sản phẩm, đơn hàng, thống kê
- ⭐ **Sản phẩm nổi bật**: Hiển thị ưu tiên trên trang chủ
- 🔐 **Xác thực**: JWT + Google OAuth
- 📊 **Dashboard**: Thống kê doanh thu và đơn hàng

## 📚 Tài liệu

- [Hướng dẫn Admin](docs/ADMIN_GUIDE.md)
- [Cài đặt Admin](docs/ADMIN_SETUP.md) 
- [MongoDB Setup](docs/MONGODB_COMPASS_GUIDE.md)

## 🛠️ Công nghệ sử dụng

**Frontend:**
- React.js 18
- React Router DOM
- Axios
- CSS3

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (File upload)

**Database:**
- MongoDB

## 📞 Hỗ trợ

Nếu gặp vấn đề, hãy kiểm tra:
1. MongoDB đang chạy
2. Cổng 3000 và 5000 không bị chiếm
3. File .env đã cấu hình đúng
4. Dependencies đã được cài đặt
