@echo off
REM Cash VIP Setup Script for Windows
REM يتطلب Node.js 14+ و npm

echo 🚀 نظام تسييل تطبيقات التقسيط - Cash VIP
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js غير مثبت. يرجى تثبيت Node.js 14+ أولاً
    exit /b 1
)

echo ✅ Node.js: 
node --version
echo ✅ npm: 
npm --version

REM Navigate to backend
cd backend

REM Install dependencies
echo.
echo 📦 تثبيت المكتبات...
call npm install

if %errorlevel% neq 0 (
    echo ❌ فشل التثبيت
    exit /b 1
)

echo ✅ تم تثبيت المكتبات بنجاح

REM Start development server
echo.
echo 🚀 بدء الخادم...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ✨ الخادم يعمل على: http://localhost:5000
echo 📱 الواجهة الأمامية: ../frontend/index.html
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo بيانات الاختبار:
echo   🔐 Admin: admin / admin123
echo   👤 Employee: emp / emp123
echo.

call npm run dev
