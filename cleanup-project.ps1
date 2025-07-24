# ECLIPSE Coffee Shop - Project Cleanup Script

Write-Host "Starting ECLIPSE Coffee Shop cleanup..." -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan

# Clean root directory
Write-Host "Cleaning root directory..." -ForegroundColor Yellow
Remove-Item "test-*.js", "cleanup-*.bat", "*.log" -Force -ErrorAction SilentlyContinue

# Clean backend
Write-Host "Cleaning Backend..." -ForegroundColor Yellow
Set-Location "backend"
Remove-Item "create-admin*.js", "test-*.js", "diagnose.js", "simple-admin.js", "start-*.bat" -Force -ErrorAction SilentlyContinue

# Back to root
Set-Location ".."

# Clean client
Write-Host "Cleaning Frontend..." -ForegroundColor Yellow
Remove-Item "client\.git" -Recurse -Force -ErrorAction SilentlyContinue

# Clean uploads folder - COMMENTED OUT to preserve product images
# Write-Host "Cleaning uploads folder..." -ForegroundColor Yellow
# Get-ChildItem "backend\uploads\*.webp", "backend\uploads\*.png" | Select-Object -Skip 5 | Remove-Item -Force -ErrorAction SilentlyContinue
Write-Host "Preserving all upload files for product images..." -ForegroundColor Green

# Show final structure
Write-Host "Project structure after cleanup:" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Get-ChildItem -Name | Sort-Object

Write-Host "`nCleanup completed!" -ForegroundColor Green
Write-Host "Project is now clean and organized." -ForegroundColor White
