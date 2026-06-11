#!/bin/bash
# Cash VIP Setup Script for Linux/Mac
# يتطلب Node.js 14+ و npm

echo "🚀 نظام تسييل تطبيقات التقسيط - Cash VIP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js غير مثبت. يرجى تثبيت Node.js 14+ أولاً"
    exit 1
fi

echo "✅ Node.js: $(node --version)"
echo "✅ npm: $(npm --version)"

# Navigate to backend
cd backend

# Install dependencies
echo ""
echo "📦 تثبيت المكتبات..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ تم تثبيت المكتبات بنجاح"
else
    echo "❌ فشل التثبيت"
    exit 1
fi

# Start development server
echo ""
echo "🚀 بدء الخادم..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ الخادم يعمل على: http://localhost:5000"
echo "📱 الواجهة الأمامية: ../frontend/index.html"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "بيانات الاختبار:"
echo "  🔐 Admin: admin / admin123"
echo "  👤 Employee: emp / emp123"
echo ""

npm run dev
