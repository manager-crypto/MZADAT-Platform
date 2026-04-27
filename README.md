# 🏗️ منصة مزادات — Platform Bundle

منصة مزادات الكاملة: **الموقع الرئيسي** + **Super Admin Dashboard** + **Go Backend**.

## 📂 البنية

```
MZADAT-Platform/
├── website/              # الموقع الرئيسي + Go Backend
│   ├── backend/          # Go API Gateway + PostgreSQL migrations
│   ├── src/              # React frontend (الموقع العام)
│   ├── docker-compose.yml
│   └── .env.example
└── super-admin/          # Super Admin Dashboard (React منفصل)
    ├── src/
    ├── package.json
    └── .env.example
```

## 🚀 التشغيل السريع

```bash
# 1. تشغيل Backend + الموقع الرئيسي
cd website
cp .env.example .env      # عدّل الـ passwords
docker-compose up -d --build
npm install && npm run dev

# 2. تشغيل Super Admin (في terminal منفصل)
cd ../super-admin
cp .env.example .env      # اضبط VITE_API_URL
npm install && npm run dev
```

| الخدمة | المنفذ | الـ URL |
|---|---|---|
| Go Backend | 8080 | http://localhost:8080 |
| الموقع الرئيسي | 3000 | http://localhost:3000 |
| Super Admin | 5173 | http://localhost:5173 |

## 🔑 بيانات الدخول الافتراضية (Super Admin)

- Email: `admin@mzadat.com`
- Password: قيمة `ADMIN_SEED_PASSWORD` في `website/.env`

## 📚 الوثائق

راجع الملفات التالية لكل التفاصيل:

- `website/CHANGES.md` — كل إصلاحات الموقع الرئيسي
- `website/RUNNING_GUIDE.md` — دليل التشغيل خطوة بخطوة
- `super-admin/CHANGES.md` — كل إصلاحات Super Admin (في الملف التالي)

## ⚙️ CORS

بما أن Super Admin يعمل على منفذ 5173، يجب إضافته لـ `ALLOWED_ORIGINS` في ملف `website/.env`:

```env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```
