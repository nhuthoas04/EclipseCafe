# 🔧 SCRIPT TỰ ĐỘNG GIẢI QUYẾT PORT CONFLICTS VÀ CHẠY DOCKER

Write-Host "🔧 Checking for port conflicts before starting Docker..." -ForegroundColor Yellow

# Function to stop process on port
function Stop-ProcessOnPort {
    param([int]$Port)
    
    $connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    if ($connections) {
        Write-Host "⚠️  Port $Port is in use! Attempting to free it..." -ForegroundColor Red
        foreach ($connection in $connections) {
            $processId = $connection.OwningProcess
            $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
            if ($process) {
                Write-Host "🛑 Killing process: $($process.ProcessName) (PID: $processId)" -ForegroundColor Red
                Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
            }
        }
        Start-Sleep -Seconds 2
    } else {
        Write-Host "✅ Port $Port is available" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "📋 Checking ports..." -ForegroundColor Cyan

# Check and free ports
Stop-ProcessOnPort -Port 5000  # Backend
Stop-ProcessOnPort -Port 3000  # Frontend  
Stop-ProcessOnPort -Port 27017 # MongoDB

Write-Host ""
Write-Host "🐳 Starting Docker containers..." -ForegroundColor Green
docker-compose up -d

Write-Host ""
Write-Host "📊 Container status:" -ForegroundColor Cyan
docker-compose ps

Write-Host ""
Write-Host "🌐 Your application is running at:" -ForegroundColor Green
Write-Host "  Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "  Backend:  http://localhost:5000" -ForegroundColor White  
Write-Host "  MongoDB:  localhost:27017" -ForegroundColor White
Write-Host ""
Write-Host "📋 Useful commands:" -ForegroundColor Cyan
Write-Host "  View logs: docker-compose logs -f" -ForegroundColor White
Write-Host "  Stop containers: docker-compose down" -ForegroundColor White
Write-Host "  Rebuild: docker-compose build --no-cache" -ForegroundColor White
