# 🚀 HƯỚNG DẪN DEPLOY DOCKER

## 📋 Trạng thái hiện tại

✅ **CẤU HÌNH DOCKER ĐÃ SẴN SÀNG!**

## 🔧 Các lệnh deploy cơ bản

### 1. Build và chạy tất cả services

```bash
docker-compose up -d
```

### 2. Build lại images (nếu có thay đổi code)

```bash
docker-compose build --no-cache
docker-compose up -d
```

### 3. Chỉ chạy backend và mongo (không chạy client)

```bash
docker-compose up -d backend mongo
```

### 4. Xem logs

```bash
# Xem tất cả logs
docker-compose logs -f

# Xem logs của một service cụ thể
docker-compose logs -f backend
docker-compose logs -f client
docker-compose logs -f mongo
```

### 5. Dừng và xóa containers

```bash
# Dừng services
docker-compose down

# Dừng và xóa volumes
docker-compose down -v
```

## 🌐 Các URLs sau khi deploy

- **Frontend (React)**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

## 📊 Cấu trúc Services

1. **doan-mongo**: MongoDB 6.0

   - Port: 27017
   - Data volume: mongo-data

2. **doan-backend**: Node.js API

   - Port: 5000
   - Environment: production
   - MongoDB URI: mongodb://mongo:27017/doan
   - Uploads volume mapped

3. **doan-client**: React + Nginx
   - Port: 3000 (maps to container port 80)
   - Depends on backend

## 🔧 Troubleshooting

### Kiểm tra container status

```bash
docker-compose ps
```

### Vào container để debug

```bash
# Vào backend container
docker-compose exec backend sh

# Vào mongo container
docker-compose exec mongo mongosh
```

### Reset hoàn toàn

```bash
docker-compose down -v
docker system prune -f
docker-compose up -d
```

## 🎯 Production Checklist

- ✅ Docker config đã được kiểm tra
- ✅ All services build thành công
- ✅ Multi-stage build để tối ưu size
- ✅ Environment variables đã setup
- ✅ Volume mapping cho data persistence
- ✅ Network configuration đúng
- ⚠️ Cần setup SSL cho production
- ⚠️ Cần setup environment variables cho production
