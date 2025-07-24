# 🔧 DOCKER TROUBLESHOOTING GUIDE

## ✅ VẤN ĐỀ ĐÃ ĐƯỢC GIẢI QUYẾT: MONGODB CONNECTION ERROR

### 🚨 Lỗi đã gặp phải:

```
MongoDB connection error: MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

### 🔍 Nguyên nhân:

- Backend container cố gắng kết nối tới MongoDB ở `127.0.0.1:27017` thay vì `mongo:27017`
- Environment variable `MONGO_URI` không được sử dụng đúng cách
- Fallback connection string không phù hợp với Docker network

### ✅ Giải pháp đã áp dụng:

#### 1. Sửa file `backend/config/database.js`:

```javascript
// Trước (SAI)
const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/drink_shop', {

// Sau (ĐÚNG)
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://mongo:27017/doan';
console.log('🔗 Connecting to MongoDB:', mongoUri);
const conn = await mongoose.connect(mongoUri, {
```

#### 2. Docker-compose.yml đã đúng:

```yaml
services:
  backend:
    environment:
      - MONGO_URI=mongodb://mongo:27017/doan # ✅ ĐÚNG
```

#### 3. Rebuild và restart containers:

```bash
docker-compose down
docker-compose build backend
docker-compose up -d
```

### 🎯 Kết quả:

```
✅ MongoDB connected: mongo
✅ Backend API: http://localhost:5000
✅ Frontend: http://localhost:3000
✅ MongoDB: localhost:27017
```

## 🛠️ CÁC COMMANDS HỮU ÍCH:

### Kiểm tra logs:

```bash
docker-compose logs backend
docker-compose logs -f backend  # Follow logs realtime
```

### Restart chỉ backend:

```bash
docker-compose restart backend
```

### Rebuild và restart:

```bash
docker-compose down
docker-compose build backend --no-cache
docker-compose up -d
```

### Test API:

```bash
curl http://localhost:5000/api/drinks
```

### Vào container để debug:

```bash
docker-compose exec backend sh
docker-compose exec mongo mongosh
```

## 🔧 DOCKER NETWORK TRONG CONTAINER:

| Service | Internal Hostname | External Port     |
| ------- | ----------------- | ----------------- |
| backend | `backend`         | `localhost:5000`  |
| client  | `client`          | `localhost:3000`  |
| mongo   | `mongo`           | `localhost:27017` |

### 📋 Quy tắc kết nối trong Docker:

- **Từ container → container**: Sử dụng service name (`mongo:27017`)
- **Từ host → container**: Sử dụng localhost + published port (`localhost:5000`)
- **Environment variables**: Luôn ưu tiên sử dụng Docker network hostnames

## 🚀 STATUS HIỆN TẠI: ✅ HOẠT ĐỘNG HOÀN HẢO
