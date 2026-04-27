# 🚀 دليل التشغيل والاختبار لمنصة مزادات

> **هذا الدليل موجّه لمبتدئ في استخدام الـ Terminal.** كل خطوة مشروحة بالكامل مع النتائج المتوقعة.

---

## 📋 جدول المحتويات

1. [متطلبات ما قبل البدء](#1-متطلبات-ما-قبل-البدء)
2. [تجهيز المشروع للمرة الأولى](#2-تجهيز-المشروع-للمرة-الأولى)
3. [تشغيل الـ Backend (قاعدة البيانات + الـ API)](#3-تشغيل-الـ-backend)
4. [التحقق أن الـ Backend يعمل](#4-التحقق-أن-الـ-backend-يعمل)
5. [تشغيل الـ Frontend (الموقع)](#5-تشغيل-الـ-frontend)
6. [اختبار الموقع كزائر عادي](#6-اختبار-الموقع-كزائر-عادي)
7. [تجربة الـ Super Admin](#7-تجربة-الـ-super-admin)
8. [اختبار التكامل Admin ↔ Website](#8-اختبار-التكامل-admin--website)
9. [استكشاف الأخطاء الشائعة](#9-استكشاف-الأخطاء-الشائعة)
10. [إيقاف كل شيء عند الانتهاء](#10-إيقاف-كل-شيء-عند-الانتهاء)

---

## 1. متطلبات ما قبل البدء

قبل أي خطوة، تأكد أن عندك هذه البرامج مثبَّتة على جهازك:

### على macOS

```bash
# تأكد من وجود Homebrew أولاً
brew --version
# لو ظهر رقم إصدار، تمام. لو لا:
# /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# ثبّت Node.js (الإصدار 18 أو أحدث)
brew install node

# ثبّت Docker Desktop (افتحه بعد التثبيت ليعمل)
brew install --cask docker

# تحقق من الإصدارات
node --version     # يجب أن يكون v18 أو أحدث
npm --version      # يجب أن يكون 9 أو أحدث
docker --version   # يجب أن يكون 24 أو أحدث
docker compose version  # يجب أن يظهر إصدار
```

### على Windows

1. حمّل وثبّت [Node.js 18+](https://nodejs.org/)
2. حمّل وثبّت [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
3. استخدم **PowerShell** أو **Git Bash** للـ Terminal

### على Linux (Ubuntu)

```bash
# Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs

# Docker
sudo apt install docker.io docker-compose-plugin
sudo usermod -aG docker $USER
# سجّل خروج ودخول بعدها ليتم تفعيل صلاحية Docker
```

### ✅ فحص نهائي

افتح الـ Terminal وشغّل:

```bash
node --version && npm --version && docker --version && docker compose version
```

**النتيجة المتوقعة:**
```
v20.10.0   (أو أعلى)
10.2.0     (أو أعلى)
Docker version 24.0.7, build...
Docker Compose version v2.23.0
```

إذا كل هذا ظهر → أنت جاهز ✅

---

## 2. تجهيز المشروع للمرة الأولى

### خطوة 2.1: فك ضغط الـ tarball

في مكان واضح على جهازك (مثلاً سطح المكتب):

```bash
# انتقل إلى سطح المكتب
cd ~/Desktop

# فك ضغط الأرشيف (استبدل المسار بمكان الملف عندك)
tar -xzf ~/Downloads/MZADAT-Fixed-v3.tar.gz

# ادخل مجلد المشروع
cd MZADAT-Fixed
```

**تحقق من المحتوى:**
```bash
ls -la
```

يجب أن ترى:
```
.env.example
.gitignore
CHANGES.md
README.md
backend/
docker-compose.yml
index.html
package.json
src/
tsconfig.json
vite.config.ts
```

### خطوة 2.2: إنشاء ملف `.env`

هذا الملف يحتوي على كلمات المرور ومتغيرات البيئة. **لا تشاركه مع أحد.**

```bash
# انسخ القالب إلى ملف فعلي
cp .env.example .env

# افتح الملف للتعديل
# على macOS/Linux:
nano .env
# على Windows (PowerShell):
notepad .env
```

**عدّل هذين السطرين فقط** (الباقي اتركه كما هو للتجربة المحلية):

```env
POSTGRES_PASSWORD=my_strong_local_password_123
ADMIN_SEED_PASSWORD=MyAdmin2026!
```

> 💡 **ملاحظة:** في nano تحفظ بـ `Ctrl+O` ثم `Enter`، وتخرج بـ `Ctrl+X`

### خطوة 2.3: تثبيت حزم الـ Frontend

```bash
npm install
```

**النتيجة المتوقعة:**
- قد يستغرق 1-3 دقائق
- في النهاية ستظهر رسالة: `added 250 packages in XXXs`
- قد ترى تحذيرات `warn` — **تجاهلها**، هي طبيعية
- لا يجب أن ترى `error` بحروف حمراء

**⚠️ لو ظهر خطأ:** انتقل إلى [قسم استكشاف الأخطاء](#9-استكشاف-الأخطاء-الشائعة)

---

## 3. تشغيل الـ Backend

الـ Backend يحتاج 3 خدمات: PostgreSQL (قاعدة البيانات) + Redis (cache) + Go API. سنشغّلها كلها بأمر واحد عبر Docker.

### خطوة 3.1: تأكد أن Docker يعمل

**على macOS/Windows:** افتح تطبيق **Docker Desktop** وانتظر حتى ترى الأيقونة خضراء.

تحقق من الـ Terminal:
```bash
docker ps
```

**النتيجة المتوقعة:** جدول فارغ بعناوين `CONTAINER ID   IMAGE   COMMAND...` (لا توجد حاويات تشتغل حالياً — هذا طبيعي).

**لو رأيت خطأ `Cannot connect to the Docker daemon`** → Docker Desktop غير مفتوح.

### خطوة 3.2: بناء وتشغيل الـ Backend

من داخل مجلد المشروع:

```bash
docker compose up -d --build
```

**شرح الأمر:**
- `up` = شغّل الخدمات
- `-d` = في الخلفية (detached)
- `--build` = أعد بناء الصورة (مهم في المرة الأولى)

**النتيجة المتوقعة (قد يستغرق 2-5 دقائق في المرة الأولى):**

```
[+] Building 120.5s (22/22) FINISHED
[+] Running 4/4
 ✔ Network mzadat-fixed_mzadat_net      Created
 ✔ Container mzadat_postgres            Started
 ✔ Container mzadat_redis               Started
 ✔ Container mzadat_backend             Started
```

### خطوة 3.3: التحقق أن الحاويات تشتغل

```bash
docker compose ps
```

**النتيجة المتوقعة:**
```
NAME              STATUS                   PORTS
mzadat_backend    Up 30 seconds (healthy)  0.0.0.0:8080->8080/tcp
mzadat_postgres   Up 35 seconds (healthy)  0.0.0.0:5432->5432/tcp
mzadat_redis      Up 35 seconds (healthy)  0.0.0.0:6379->6379/tcp
```

**المفتاح:** لازم الكل يقول `Up` و `(healthy)`.

> ⏰ لو أي منها يقول `Restarting` — انتظر دقيقة ثم أعد الأمر. أول إقلاع للـ postgres يأخذ وقتاً لتشغيل ملفات الـ migrations.

---

## 4. التحقق أن الـ Backend يعمل

### خطوة 4.1: فحص صحة السيرفر

```bash
curl http://localhost:8080/health
```

**النتيجة المتوقعة:**
```json
{"db":true,"status":"ok","timestamp":"2026-04-20T..."}
```

إذا رأيت `"status":"ok"` و `"db":true` → الـ Backend + قاعدة البيانات يعملان ✅

### خطوة 4.2: فحص endpoint للعقارات

```bash
curl http://localhost:8080/api/properties
```

**النتيجة المتوقعة:** JSON يحتوي على 4 عقارات تجريبية (تم إدراجها في ملف migration):
```json
{"data":[{"id":1,"titleAr":"فيلا فاخرة في حي النرجس",...}],"total":4,"page":1,...}
```

إذا رأيت هذا → قاعدة البيانات تم ملؤها بالبيانات التجريبية ✅

### خطوة 4.3: فحص endpoint المزادات (public sections)

```bash
curl http://localhost:8080/api/sections
```

**النتيجة المتوقعة:** 9 أقسام للصفحة الرئيسية (Hero, Quick Stats, إلخ).

### خطوة 4.4: إنشاء حساب الـ Super Admin

يوجد ملف migration (`002_create_admin_users.sql`) يُنشئ الـ admin تلقائياً عند أول تشغيل لـ postgres. لكن إذا أردت إعادة تعيين كلمة المرور أو إنشائه بقيم `.env` الجديدة، شغّل الـ seed:

```bash
docker compose exec backend /app/seed
```

**النتيجة المتوقعة:**
```
seed: ok (rows affected: 1)
seed: Super Admin ready — email=admin@mzadat.com
```

> 📧 **بيانات الدخول الآن:**
> - **Email:** `admin@mzadat.com` (القيمة الافتراضية أو ما وضعته في `.env`)
> - **Password:** القيمة التي وضعتها في `ADMIN_SEED_PASSWORD` (مثلاً `MyAdmin2026!`)

### خطوة 4.5: اختبار تسجيل دخول Admin من الـ Terminal

قبل ما نشوفه في المتصفح، نجرب الـ API مباشرة:

```bash
curl -X POST http://localhost:8080/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mzadat.com","password":"MyAdmin2026!"}'
```

> ⚠️ **استخدم كلمة المرور التي وضعتها أنت في `.env`** وليس `MyAdmin2026!` إذا اخترت غيرها.

**النتيجة المتوقعة:**
```json
{"token":"abc123...def456","role":"SUPER_ADMIN","full_name":"Super Admin","email":"admin@mzadat.com"}
```

إذا رأيت `token` → الـ admin يعمل ✅

**لو ظهرت `invalid credentials`:** راجع كلمة المرور في `.env`، ثم أعد تشغيل الـ seed (خطوة 4.4).

---

## 5. تشغيل الـ Frontend

الـ Backend الآن يعمل في الخلفية. الآن نشغّل الموقع نفسه.

### خطوة 5.1: في نفس المجلد

**افتح نافذة Terminal جديدة** (لا تغلق الأولى) في نفس المجلد:

```bash
cd ~/Desktop/MZADAT-Fixed
npm run dev
```

**النتيجة المتوقعة:**
```
  VITE v6.3.5  ready in 450 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.x:3000/
  ➜  press h + enter to show help
```

### خطوة 5.2: افتح المتصفح

في متصفحك اذهب إلى:

```
http://localhost:3000
```

**النتيجة المتوقعة:** الصفحة الرئيسية لـ مزادات تفتح بالكامل باللغة العربية مع:
- شعار "مزادات" في الـ Header
- قسم Hero بصورة رئيسية
- أقسام: المزادات المميزة، الخدمات، أكاديمية مزادات، إلخ

---

## 6. اختبار الموقع كزائر عادي

### ✅ قائمة اختبار سريعة

افتح `http://localhost:3000` ثم جرّب بالترتيب:

| # | الاختبار | المتوقع | ✓/✗ |
|---|---|---|---|
| 1 | الصفحة الرئيسية تفتح | ترى Hero + أقسام | |
| 2 | تبديل اللغة (أعلى يمين) | كل النصوص تتغير إلى English/عربي | |
| 3 | اتجاه الصفحة | RTL للعربي، LTR للإنجليزي | |
| 4 | اضغط على "المزادات" من القائمة | صفحة قائمة المزادات تفتح | |
| 5 | اضغط على مزاد معين | تفاصيل المزاد تظهر |  |
| 6 | افتح `/auctions` مباشرة في URL | تعمل بدون إعادة تحميل للصفحة | |
| 7 | Responsive: صغّر نافذة المتصفح | التخطيط يتكيف (mobile layout) | |

### 🔍 اختبار الاتصال بالـ Backend

افتح **DevTools** في المتصفح (`F12` أو `Cmd+Option+I`) واذهب إلى تبويب **Network**.

أعد تحميل الصفحة (`Cmd+R`/`Ctrl+R`) وابحث عن طلب مثل:
```
GET http://localhost:8080/api/sections
Status: 200 OK
```

إذا رأيت هذا → الـ Frontend يتواصل مع الـ Backend ✅

**لو رأيت `(failed) net::ERR_CONNECTION_REFUSED`:**
- الـ Backend غير مشتغل. عد لـ Terminal الأول وشغّل `docker compose ps`

**لو رأيت `CORS error`:**
- تأكد أن `ALLOWED_ORIGINS` في `.env` يحتوي `http://localhost:3000`
- أعد تشغيل الـ backend: `docker compose restart backend`

---

## 7. تجربة الـ Super Admin

### خطوة 7.1: افتح صفحة الأدمن

في المتصفح:

```
http://localhost:3000/admin/login
```

**ستشاهد:** شاشة سوداء/رمادية داكنة مع نموذج تسجيل دخول بعنوان "مزادات أدمن".

### خطوة 7.2: سجّل الدخول

أدخل:
- **Email:** `admin@mzadat.com`
- **Password:** القيمة من `ADMIN_SEED_PASSWORD` في `.env`

اضغط **"تسجيل الدخول"**.

**النتيجة المتوقعة:** تنتقل إلى لوحة التحكم `/admin`.

### خطوة 7.3: استكشف صفحات الأدمن

من القائمة الجانبية للأدمن، جرّب الصفحات التالية:

| الصفحة | الرابط | ما يجب أن ترى |
|---|---|---|
| الرئيسية | `/admin` | نظرة عامة / dashboard |
| المستخدمون | `/admin/users` | قائمة users |
| المزادات | `/admin/auctions` | العقارات الأربعة من قاعدة البيانات |
| KYC | `/admin/kyc` | قائمة الموافقات |
| المالية | `/admin/finance` | بيانات مالية |
| الوسائط | `/admin/media` | الصور المرفوعة |
| الأقسام | `/admin/sections` | 9 أقسام للصفحة الرئيسية |
| صحة النظام | `/admin/system-health` | حالة الخدمات |

### ✅ الاختبارات الحرجة للـ Admin

#### اختبار 1: التحقق من التكامل مع الـ Backend
1. افتح `/admin/auctions`
2. **المتوقع:** ترى 4 عقارات (من قاعدة البيانات، وليس mock data)
3. **افتح DevTools → Network:** يجب أن ترى طلب `GET /api/admin/auctions` مع `Authorization: Bearer <token>`

#### اختبار 2: موافقة على مزاد
1. في `/admin/auctions`، ابحث عن عقار حالته "pending"
2. اضغط زر "موافقة" (✓)
3. **المتوقع:** تحديث فوري لحالة العقار إلى "auction"
4. افتح `http://localhost:3000/auctions` في تبويب جديد → العقار يظهر في المزادات

#### اختبار 3: إخفاء قسم من الصفحة الرئيسية
1. افتح `/admin/sections`
2. **المتوقع:** 9 أقسام (Hero, Quick Stats, إلخ)
3. اضغط زر التبديل (toggle) بجانب "المزادات المميزة" لإخفائه
4. افتح `http://localhost:3000` في تبويب جديد → قسم المزادات المميزة اختفى

---

## 8. اختبار التكامل Admin ↔ Website

هذا أهم اختبار — يؤكد أن التحكم من الأدمن يظهر فعلاً على الموقع.

### 🧪 سيناريو تجربة كامل

افتح تبويبين في المتصفح:
- **تبويب A:** `http://localhost:3000` (الموقع الرئيسي كزائر)
- **تبويب B:** `http://localhost:3000/admin` (لوحة التحكم)

#### المرحلة 1: قسم جديد

1. في تبويب B: اذهب `/admin/sections` وعطّل (toggle OFF) قسم "شركاؤنا"
2. في تبويب A: أعد التحميل (`Cmd+R`)
3. ✅ **المتوقع:** قسم "شركاؤنا" اختفى من الصفحة

#### المرحلة 2: إعادة التفعيل

4. في تبويب B: فعّل (toggle ON) نفس القسم
5. في تبويب A: أعد التحميل
6. ✅ **المتوقع:** القسم عاد

#### المرحلة 3: إعادة ترتيب

7. في تبويب B: اسحب قسم "أكاديمية مزادات" إلى الأعلى (لو كانت الواجهة تدعم drag-and-drop)
8. في تبويب A: أعد التحميل
9. ✅ **المتوقع:** ترتيب الأقسام تغيَّر

#### المرحلة 4: فحص عبر API مباشرة

من الـ Terminal:

```bash
# احفظ الـ token في متغير
TOKEN=$(curl -s -X POST http://localhost:8080/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mzadat.com","password":"MyAdmin2026!"}' | \
  grep -o '"token":"[^"]*' | cut -d'"' -f4)

echo "Token: $TOKEN"

# اجلب كل الأقسام (admin view)
curl -H "Authorization: Bearer $TOKEN" http://localhost:8080/api/admin/sections

# اجلب الأقسام الظاهرة فقط (public view)
curl http://localhost:8080/api/sections
```

**المقارنة:** القائمة الأولى ترى كل الأقسام (9)، الثانية ترى المرئية فقط حسب ما ضبطت.

---

## 9. استكشاف الأخطاء الشائعة

### ❌ `npm install` يفشل بخطأ `EACCES`

```bash
sudo chown -R $(whoami) ~/.npm
npm install
```

### ❌ `docker compose up` يفشل بـ `port is already allocated`

البورت مستخدم من برنامج آخر. غيّر الـ ports في `.env`:

```env
POSTGRES_PORT=5433
BACKEND_PORT=8081
REDIS_PORT=6380
```

ثم:
```bash
docker compose down
docker compose up -d --build
```

تذكر تحديث `VITE_API_URL` في `.env` إلى `http://localhost:8081`.

### ❌ الـ Frontend يفتح لكن يبقى شاشة بيضاء

1. افتح **DevTools → Console**
2. ابحث عن رسالة خطأ حمراء
3. أكثر الأسباب: خطأ TypeScript في ملف معين. راجع `CHANGES.md` للـ 60 خطأ المعروفة.
4. جرّب `npm run build` من Terminal لترى الخطأ بوضوح.

### ❌ Admin login يرد `invalid credentials`

```bash
# أعد تعيين كلمة المرور:
docker compose exec backend /app/seed
# اقرأ الـ output — ستعرف الإيميل وكلمة المرور الجديدة
```

### ❌ `curl: command not found` (على Windows قديم)

استخدم PowerShell بدلاً منه:

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/health"
```

### ❌ قاعدة البيانات فارغة ولا توجد migrations

قد تكون شغّلت docker قبل ما تحفظ الـ migrations. احذف الـ volume:

```bash
docker compose down -v  # -v يحذف volumes كمان!
docker compose up -d --build
```

> ⚠️ `-v` يحذف **كل** البيانات — استخدمه فقط لإعادة بدء نظيف.

### ❌ `CORS policy blocked`

1. افتح `.env`
2. تأكد: `ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000`
3. أعد تشغيل الـ backend: `docker compose restart backend`

---

## 10. إيقاف كل شيء عند الانتهاء

### إيقاف الـ Frontend

في Terminal الذي شغّل `npm run dev`:
```
Ctrl+C
```

### إيقاف الـ Backend (Docker)

```bash
docker compose stop
```

**لإعادة التشغيل لاحقاً (بسرعة، بدون إعادة بناء):**
```bash
docker compose start
```

### إيقاف ومسح كل شيء (reset كامل)

```bash
docker compose down
```

**لمسح حتى قاعدة البيانات** (تفقد كل البيانات):
```bash
docker compose down -v
```

---

## 🎯 سيناريو اختبار قبولي (Acceptance Test) كامل

جرّب هذا السيناريو من البداية للنهاية للتأكد من أن كل شيء يعمل:

```bash
# 1. تشغيل كامل
cd ~/Desktop/MZADAT-Fixed
docker compose up -d --build
sleep 30  # انتظر حتى يقلع كل شيء

# 2. فحص الصحة
curl http://localhost:8080/health
# يجب أن ترى: {"db":true,"status":"ok",...}

# 3. زرع الـ admin
docker compose exec backend /app/seed

# 4. تسجيل دخول admin واستخراج token
TOKEN=$(curl -s -X POST http://localhost:8080/api/admin/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@mzadat.com\",\"password\":\"$(grep ADMIN_SEED_PASSWORD .env | cut -d= -f2)\"}" \
  | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo "Got token: ${TOKEN:0:20}..."

# 5. جلب قائمة المزادات كـ admin
curl -H "Authorization: Bearer $TOKEN" http://localhost:8080/api/admin/auctions | head -c 200

# 6. إخفاء قسم (مثال على الـ UUID، يلزم جلب الـ IDs الحقيقية أولاً)
SECTION_ID=$(curl -s -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/admin/sections | \
  grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)

curl -X PATCH -H "Authorization: Bearer $TOKEN" \
  "http://localhost:8080/api/admin/sections/$SECTION_ID/toggle-visibility"

# 7. تشغيل الـ frontend (في terminal ثاني)
# npm run dev
```

---

## 📚 خطوات متقدمة (لاحقاً)

عندما تتقن الأساسيات أعلاه:

1. **إضافة بيانات تجريبية جديدة:** ادخل قاعدة البيانات مباشرة:
   ```bash
   docker compose exec postgres psql -U mzadat -d mzadat_db
   # ثم أوامر SQL مثل:
   # INSERT INTO properties (...) VALUES (...);
   # \q للخروج
   ```

2. **مراقبة الـ logs في الوقت الحقيقي:**
   ```bash
   docker compose logs -f backend
   # Ctrl+C للإيقاف
   ```

3. **النشر على الإنتاج:** هذا يحتاج دليل منفصل. أهم نقاط:
   - غيّر كل الـ passwords في `.env`
   - فعّل SSL على PostgreSQL
   - استخدم reverse proxy (nginx/Caddy)
   - أضف rate limiting
   - فعّل HTTPS

---

## ❓ إذا واجهت مشكلة غير مذكورة

1. **اقرأ الـ logs بعناية:**
   ```bash
   docker compose logs backend   # الـ backend
   docker compose logs postgres  # قاعدة البيانات
   ```

2. **تحقق من `.env`:** معظم المشاكل من متغيرات خاطئة.

3. **جرّب reset كامل:**
   ```bash
   docker compose down -v
   rm -rf node_modules
   npm install
   docker compose up -d --build
   ```

4. **ارجع لـ `CHANGES.md`:** يحتوي تفاصيل كل الإصلاحات والمشاكل المعروفة.

---

**بالتوفيق! 🚀**
