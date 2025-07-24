# Backend - ECLIPSE Coffee Shop API

Node.js backend API server cho hệ thống quản lý cửa hàng cà phê.

## 📂 Cấu trúc thư mục

```
backend/
├── config/              # 🔧 Cấu hình
│   └── database.js      # Kết nối MongoDB
├── controller/          # 🎛️ Business Logic
│   ├── analyticsController.js    # Thống kê
│   ├── drinkController.js        # Quản lý đồ uống
│   ├── orderController.js        # Quản lý đơn hàng  
│   └── userController.js         # Quản lý người dùng
├── middlewares/         # 🛡️ Middleware
│   ├── auth.js          # Xác thực JWT
│   └── upload.js        # Upload file
├── models/             # 🗃️ Database Models
│   ├── Drink.js         # Model đồ uống
│   ├── Order.js         # Model đơn hàng
│   └── User.js          # Model người dùng
├── router/             # 🛣️ API Routes
│   ├── analyticsRoutes.js        # /api/analytics
│   ├── drinkRoutes.js           # /api/drinks
│   ├── googleAuthRoutes.js      # /api/auth/google
│   ├── orderRoutes.js           # /api/orders
│   └── userRoutes.js            # /api/users
├── services/           # 🔧 Services
│   └── emailService.js  # Email service
├── uploads/            # 📁 File uploads
│   └── .gitkeep        # Giữ thư mục
├── .env                # 🔒 Environment variables
├── app.js              # 🚀 Main application
└── package.json        # 📦 Dependencies
```

## 🚀 Khởi động

```bash
cd backend
npm install
npm start
# hoặc: node app.js
```

## 🔧 Environment Variables (.env)

```bash
MONGODB_URI=mongodb://localhost:27017/drink_shop
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=30d
NODE_ENV=development
PORT=5000
```

## 📡 API Endpoints

### 🥤 Drinks
- `GET /api/drinks` - Lấy danh sách đồ uống
- `GET /api/drinks/featured` - Lấy đồ uống nổi bật
- `GET /api/drinks/:id` - Lấy chi tiết đồ uống
- `POST /api/drinks` - Thêm đồ uống mới (Admin)
- `PUT /api/drinks/:id` - Cập nhật đồ uống (Admin)
- `DELETE /api/drinks/:id` - Xóa đồ uống (Admin)
- `PATCH /api/drinks/:id/featured` - Toggle nổi bật (Admin)

### 👤 Users
- `POST /api/users/register` - Đăng ký
- `POST /api/users/login` - Đăng nhập
- `GET /api/users/profile` - Lấy thông tin cá nhân
- `PUT /api/users/profile` - Cập nhật thông tin

### 📋 Orders
- `GET /api/orders` - Lấy đơn hàng (Admin)
- `POST /api/orders` - Tạo đơn hàng mới
- `GET /api/orders/:id` - Chi tiết đơn hàng

### 📊 Analytics
- `GET /api/analytics/dashboard` - Thống kê tổng quan (Admin)

## 🛡️ Authentication

- **JWT Token**: Sử dụng cho xác thực
- **Admin Role**: Cần quyền admin cho các API quản lý
- **Protected Routes**: Có middleware `protect` và `admin`

## 📦 Dependencies

```json
{
  "express": "Server framework",
  "mongoose": "MongoDB ODM", 
  "bcryptjs": "Password hashing",
  "jsonwebtoken": "JWT authentication",
  "cors": "Cross-origin requests",
  "dotenv": "Environment variables",
  "multer": "File upload",
  "nodemailer": "Email service"
}
```
