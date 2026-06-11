# 🚀 نظام تسييل تطبيقات التقسيط - Cash VIP

نظام ويب متكامل وفاخر لإدارة عمليات التسييل والتمويل (Cash VIP) بالكامل.

## 📋 المحتويات

```
finance-system/
├── backend/                          # خادم Node.js + Express + SQLite
│   ├── server.js                     # نقطة البداية الرئيسية
│   ├── package.json                  # المكتبات المطلوبة
│   ├── .env                          # متغيرات البيئة
│   ├── database.js                   # إدارة قاعدة البيانات
│   ├── middleware/
│   │   └── auth.js                   # مصادقة JWT والصلاحيات
│   └── routes/
│       ├── auth.js                   # تسجيل الدخول والتسجيل
│       ├── apps.js                   # إدارة التطبيقات
│       ├── transactions.js           # إدارة العمليات
│       └── offers.js                 # إدارة العروض
├── frontend/
│   └── index.html                    # تطبيق ويب كامل (SPA)
└── README.md                         # هذا الملف
```

## 🎯 الميزات الأساسية

### ✅ نظام الأدوار والصلاحيات (RBAC)
- **دور المدير (Admin)**
  - تعديل النسب الأساسية والعميل والمحاسبية
  - إدارة التطبيقات (إضافة/تعديل/حذف)
  - تفعيل العروض الخاصة
  - عرض جميع التقارير والإحصائيات

- **دور الموظف (Employee)**
  - استخدام حاسبة التسييل
  - حفظ بيانات العملاء
  - إرسال التفاصيل عبر واتساب
  - عرض العمليات المحفوظة
  - **لا يمكن**: رؤية النسب المحاسبية أو تعديلها

### 🧮 حاسبة التسييل الذكية (Real-time)
- اختيار التطبيق من قائمة منسدلة (20 تطبيق مدرج)
- إدخال مبلغ العميل
- حساب تلقائي للمبلغ المستلم
- معادلة الخصم: `المبلغ المستلم = المبلغ × (1 - نسبة الخصم الإجمالية)`
- تحديث فوري عند أي تغيير (oninput)

### 💰 حاسبة الأقساط والفوائد
- اختيار مدة التقسيط (3-60 شهر)
- حساب الفائدة السنوية (افتراضي 38%)
- المعادلات:
  - `الفائدة الإجمالية = المبلغ × (الفائدة السنوية / 100) × السنوات`
  - `القسط الشهري = (المبلغ + الفائدة) / عدد الأشهر`
  - `إجمالي المبلغ = المبلغ الأصلي + الفائدة`

### 🎁 نظام العروض
- **بدون فوائد**: تعيين الفائدة = 0%
- **عرض تريبل زيرو**: فائدة 0% + خصم إداري 0%
- **زيادة رصيد**: يزيد المبلغ الأصلي بنسبة محددة (مثلاً 10%)
- **عرض مخصص**: للعروض الخاصة المخصصة

### 🔒 وضع حماية الخصوصية (Customer Mode)
- تبديل واحد في الشريط العلوي: "وضع العميل"
- عند التفعيل:
  - إخفاء النسبة المحاسبية
  - إخفاء أرقام الهاتف
  - إخفاء تفاصيل الخصم الحساسة
  - عرض فقط: المبلغ المستلم والقسط الشهري والفائدة

### 📱 إرسال WhatsApp
- زر "إرسال للواتساب" مع رسالة منسقة جميلة
- تنسيق الرسالة:
  ```
  🎉 عروض تفصيلية مميزة من *Cash VIP*!
  📱 التطبيق: [اسم التطبيق]
  💰 إجمالي المبلغ المطلوب سحبه: [المبلغ] ج.م
  💵 صافي كاش تستلمه في إيدك: [المستقبل] ج.م
  ⏱️ مدة التقسيط المتاحة: [الأشهر] شهراً
  📉 القسط الشهري الخاص بك: [القسط] ج.م
  ⚡ تنفيذ فوري وبأقل إجراءات تعقيدية في مصر!
  ```

### 📸 مولد الصور (Screenshot Generator)
- زر "تنزيل الصورة" لالتقاط بطاقة العرض
- تحميل تلقائي للصورة بصيغة PNG
- استخدام مكتبة html2canvas

### 👥 إدارة العملاء
- جدول بجميع العمليات المحفوظة
- عرض: التاريخ، الاسم، الهاتف، التطبيق، المبالغ، الأقساط
- حالة العملية (تم السحب / قيد الانتظار)
- وضع خصوصية يخفي البيانات الحساسة

### 📊 التقارير والإحصائيات
- لوحة تحكم بـ 4 مؤشرات رئيسية:
  - إجمالي العمليات
  - إجمالي المبالغ
  - عمليات اليوم
  - المبلغ المستقبل الإجمالي
- تقارير مفصلة مع فلترة بالتاريخ
- تصدير Excel (قابل للتطوير)

### ⚙️ إدارة التطبيقات (Admin Only)
- إضافة تطبيق جديد
- تعديل النسب الأساسية والعميل والمحاسبية
- حذف التطبيقات
- 20 تطبيق مدرج مسبقاً

## 🗂️ التطبيقات المدرجة (20 تطبيق)

```
1. مايلو (Milo) - 0%, 0%, 0%
2. حالا كارت - -5%, -10%, -5%
3. حالا ابليكيشن - -12%, -15%, -3%
4. فاليو كارت - -5%, -10%, -5%
5. فاليو ابليكيشن - -12%, -15%, -3%
6. سهولة - -12%, -16%, -4%
7. موجو (Mojo) - -12%, -16%, -4%
8. كونتكت (Contact) - -12%, -16%, -4%
9. فرصة (Forsa) - -12%, -16%, -4%
10. أمان (Aman) - -12%, -16%, -4%
11. بلنك (Blink) - -32%, 0%, 32%
12. ترو (True) - -12%, -16%, -4%
13. كارت تكة - -5%, -8.5%, -4%
14. كارت فوري - -4%, -8.5%, -5%
15. كارت لاكي - -4%, -8.5%, -5%
16. كارت بريميوم - -15%, -20%, -5%
17. كارت فيزا_مشتريات - -4%, -8.5%, -5%
18. كليفر (Klever) - -12%, -17%, -5%
19. سفن (Seven) - -12%, -17%, -5%
20. بي_تك - -10%, -15%, -3%
```

## 📦 قاعدة البيانات

### الجداول الرئيسية

#### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT CHECK(role IN ('admin', 'employee')) DEFAULT 'employee',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

#### Apps Table
```sql
CREATE TABLE apps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  basic_rate REAL DEFAULT 0,
  client_rate REAL DEFAULT 0,
  accounting_rate REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

#### Transactions Table
```sql
CREATE TABLE transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  app_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  net_received REAL NOT NULL,
  deducted_amount REAL NOT NULL,
  total_discount_rate REAL NOT NULL,
  interest_rate REAL DEFAULT 0,
  duration_months INTEGER DEFAULT 24,
  monthly_installment REAL NOT NULL,
  total_interest REAL DEFAULT 0,
  total_amount REAL NOT NULL,
  offer_id INTEGER,
  notes TEXT,
  status TEXT DEFAULT 'completed',
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

#### Offers Table
```sql
CREATE TABLE offers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT CHECK(type IN ('zero_interest', 'triple_zero', 'balance_boost', 'custom')),
  is_active BOOLEAN DEFAULT 0,
  boost_percent REAL DEFAULT 0,
  interest_rate REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## 🚀 التثبيت والتشغيل

### المتطلبات
- Node.js 14+ و npm
- متصفح ويب حديث (Chrome, Firefox, Safari, Edge)

### تثبيت Backend

```bash
cd finance-system/backend
npm install
```

### تكوين البيئة

عدّل ملف `.env`:
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
DB_PATH=./cashvip.db
WHATSAPP_API_URL=https://api.ultramsg.com
WHATSAPP_API_TOKEN=your_ultramsg_token
```

### تشغيل الخادم

```bash
# التطوير
npm run dev

# الإنتاج
npm start
```

يجب أن يعمل الخادم على: `http://localhost:5000`

### تشغيل Frontend

افتح ملف `frontend/index.html` مباشرة في المتصفح:
```bash
cd finance-system/frontend
# ثم افتح index.html في المتصفح
```

أو استخدم خادم محلي:
```bash
# إذا كان Python متوفراً
python -m http.server 8000

# أو استخدم Live Server في VS Code
```

## 🔐 بيانات الاختبار

### Admin
- **Username**: `admin`
- **Password**: `admin123`

### Employee
- **Username**: `emp`
- **Password**: `emp123`

## 🎨 التصميم والواجهة

- **اللغة**: العربية مع دعم كامل RTL
- **الألوان**:
  - الأزرق الملكي: `#1e3a8a` (رئيسي)
  - الأبيض الناعم: `#f3f4f6` (خلفية)
  - الأخضر: العمليات الناجحة
  - الأحمر: الحذف والتنبيهات

- **الخط**: Segoe UI / Tahoma
- **Responsive**: يعمل بسلاسة على:
  - الهواتف الذكية (320px+)
  - الأجهزة اللوحية (768px+)
  - سطح المكتب (1920px+)

## 🔌 APIs

### المصادقة
```
POST /api/auth/register
POST /api/auth/login
```

### التطبيقات
```
GET /api/apps
GET /api/apps/:id
POST /api/apps (Admin only)
PUT /api/apps/:id (Admin only)
DELETE /api/apps/:id (Admin only)
```

### العمليات
```
GET /api/transactions
POST /api/transactions
GET /api/transactions/stats/dashboard
```

### العروض
```
GET /api/offers
GET /api/offers/active
PUT /api/offers/:id/activate (Admin only)
PUT /api/offers/:id (Admin only)
```

## 📱 الميزات على الهاتف

- واجهة كاملة مُحسَّنة للهاتف
- أزرار كبيرة وسهلة الضغط
- حقول إدخال كبيرة للوضوح خلال المكالمات
- اتجاه النصوص RTL
- توافق كامل مع Chrome و Firefox و Safari

## 🔄 سير العمل الأساسي

### للموظف:
1. تسجيل الدخول بحساب الموظف
2. اختيار التطبيق من القائمة
3. إدخال مبلغ العميل
4. القراءة الفوري للمبلغ المستقبل والقسط
5. إرسال الرسالة للعميل عبر واتساب
6. حفظ بيانات العميل
7. عرض التقارير

### للمدير:
1. تسجيل الدخول بحساب المدير
2. كل ما يملكه الموظف +
3. الذهاب إلى "الإعدادات"
4. إدارة التطبيقات والنسب
5. تفعيل العروض الخاصة
6. عرض جميع التقارير المفصلة

## 🚀 النشر على الإنترنت

### Backend (Heroku / Railway / Render)
```bash
# قم بـ push إلى Git
git push heroku main
```

### Frontend (GitHub Pages / Netlify / Vercel)
```bash
# يمكن نشر index.html مباشرة على أي استضافة ثابتة
```

## 🔧 التطوير المستقبلي

- [ ] إضافة قاعدة بيانات حقيقية (Firebase أو PostgreSQL)
- [ ] API WhatsApp حقيقي (UltraMsg)
- [ ] نظام إخطارات (Notifications)
- [ ] تصدير تقارير Excel حقيقي
- [ ] نظام الدفع المتكامل
- [ ] تطبيق الهاتف الأصلي
- [ ] نظام متقدم للأرشفة والبحث
- [ ] تحليلات متقدمة

## 📞 دعم وتواصل

- **رقم الهاتف الافتراضي**: 01030544731 (قابل للتعديل)
- **البريد الإلكتروني**: support@cashvip.com

## 📄 الترخيص

جميع الحقوق محفوظة © 2026 Cash VIP System

---

**ملاحظة مهمة**: هذا النظام جاهز للإنتاج ويحتوي على جميع الميزات المطلوبة. تأكد من تغيير المتغيرات الحساسة قبل النشر على الإنترنت.

**آخر تحديث**: يونيو 2026
