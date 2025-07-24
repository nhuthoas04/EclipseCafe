# 🔧 SCRIPT TỰ ĐỘNG SỬA TẤT CẢ HARDCODED API URLs

Write-Host "🔧 Fixing all hardcoded API URLs in React components..." -ForegroundColor Yellow

# Danh sách các files cần sửa
$filesToFix = @(
    "client\src\components\GoogleLogin.js",
    "client\src\pages\Home.js", 
    "client\src\pages\admin\DrinkManagement.js",
    "client\src\pages\admin\UserManagement.js",
    "client\src\pages\shop\Checkout.js",
    "client\src\pages\admin\OrderManagement.js",
    "client\src\pages\shop\ProductDetail.js",
    "client\src\pages\admin\AdminDashboard.js"
)

foreach ($file in $filesToFix) {
    $fullPath = "d:\Personal\NhutHoa\DOAN\$file"
    if (Test-Path $fullPath) {
        Write-Host "✅ Processing: $file" -ForegroundColor Green
        
        # Read file content
        $content = Get-Content $fullPath -Raw
        
        # Replace hardcoded URLs
        $content = $content -replace "http://localhost:5000", "`${apiConfig.baseURL}"
        $content = $content -replace "'http://localhost:5000/api/([^']+)'", "`"`${apiConfig.baseURL}/api/`$1`""
        $content = $content -replace "`"http://localhost:5000/api/([^`"]+)`"", "`"`${apiConfig.baseURL}/api/`$1`""
        $content = $content -replace "```http://localhost:5000/api/([^```]+)```", "`"`${apiConfig.baseURL}/api/`$1`""
        
        # Add import if not exists
        if ($content -notmatch "import.*apiConfig") {
            $content = $content -replace "(import React[^;]+;)", "`$1`nimport { apiConfig } from '../utils/apiConfig';"
        }
        
        # Write back to file
        Set-Content -Path $fullPath -Value $content -Encoding UTF8
        
        Write-Host "   ✅ Fixed: $file" -ForegroundColor Cyan
    } else {
        Write-Host "   ⚠️  Not found: $file" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎯 All files processed! Now rebuilding Docker containers..." -ForegroundColor Green
