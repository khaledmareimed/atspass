# PowerShell script to start Next.js development server
Write-Host "🚀 Starting Next.js Development Server..." -ForegroundColor Green

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Check if .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "⚠️  Warning: .env.local file not found!" -ForegroundColor Red
    Write-Host "Create a .env.local file with:" -ForegroundColor Yellow
    Write-Host "SERV_URL=http://localhost:8000" -ForegroundColor Cyan
    Write-Host ""
}

# Start the development server
Write-Host "🎯 Starting server on http://localhost:3000" -ForegroundColor Green
npm run dev 