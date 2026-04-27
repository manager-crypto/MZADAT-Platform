# 🌍 MZADAT 2026 - Internationalization System

## نظام تعدد اللغات الاحترافي لمنصة مزادات العقارية السعودية

---

## 📋 Table of Contents / جدول المحتويات

1. [Overview / نظرة عامة](#overview)
2. [Quick Start / البداية السريعة](#quick-start)
3. [Architecture / الهيكلة](#architecture)
4. [Features / الميزات](#features)
5. [Typography / نظام الخطوط](#typography)
6. [RTL/LTR Support / دعم الاتجاهات](#rtlltr-support)
7. [Real Estate Terminology / المصطلحات العقارية](#real-estate-terminology)
8. [API Reference / مرجع API](#api-reference)
9. [Examples / أمثلة](#examples)
10. [Testing / الاختبار](#testing)

---

## 🎯 Overview / نظرة عامة

### English
A comprehensive internationalization (i18n) system built for the MZADAT PropTech platform, featuring:
- Full Arabic (RTL) and English (LTR) support
- Smart typography system with Noto Kufi Arabic & Helvetica
- Saudi real estate terminology integration
- Automatic layout direction switching
- Number, currency, and date formatting
- Complete accessibility compliance

### العربية
نظام تعدد لغات شامل مبني لمنصة مزادات PropTech، يتميز بـ:
- دعم كامل للعربية (RTL) والإنجليزية (LTR)
- نظام خطوط ذكي مع Noto Kufi Arabic و Helvetica
- تكامل المصطلحات العقارية السعودية
- تبديل تلقائي لاتجاه التخطيط
- تنسيق الأرقام والعملات والتواريخ
- توافق كامل مع معايير الوصولية

---

## 🚀 Quick Start / البداية السريعة

### Installation / التثبيت

```bash
# All dependencies are already included
# جميع التبعيات مضمنة بالفعل
```

### Basic Usage / الاستخدام الأساسي

```tsx
import { useTranslation } from './context/TranslationContext';

function MyComponent() {
  const { t, language, toggleLanguage } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.mzadat')}</h1>
      <button onClick={toggleLanguage}>
        {language === 'ar' ? 'English' : 'العربية'}
      </button>
    </div>
  );
}
```

---

## 🏗️ Architecture / الهيكلة

### File Structure / هيكل الملفات

```
/src
├── locales/
│   ├── ar.json                      # Arabic translations / الترجمات العربية
│   └── en.json                      # English translations / الترجمات الإنجليزية
├── app/
│   ├── context/
│   │   └── TranslationContext.tsx   # i18n Context Provider
│   ├── hooks/
│   │   └── useI18nHelpers.ts        # Helper hooks / هوكس مساعدة
│   └── components/
│       └── LanguageSwitcher.tsx     # Language toggle / مبدل اللغة
└── styles/
    ├── fonts.css                    # Typography system / نظام الخطوط
    └── rtl-support.css              # RTL/LTR utilities / أدوات الاتجاهات
```

### Core Components / المكونات الأساسية

1. **TranslationContext** - Global i18n state management
2. **LanguageSwitcher** - UI component for language switching
3. **useI18nHelpers** - Utility hooks for common tasks
4. **Translation Files** - JSON-based translation storage

---

## ✨ Features / الميزات

### ✅ Supported Languages / اللغات المدعومة

| Language | Code | Direction | Font |
|----------|------|-----------|------|
| العربية | `ar` | RTL | Noto Kufi Arabic |
| English | `en` | LTR | Helvetica Neue |

### ✅ Automatic Features / الميزات التلقائية

- 🔄 **Auto Direction Switching** / تبديل الاتجاه التلقائي
- 🎨 **Smart Typography** / خطوط ذكية
- 💾 **LocalStorage Persistence** / حفظ الإعدادات
- 📅 **Date Formatting** / تنسيق التواريخ
- 💰 **Currency Formatting** / تنسيق العملات
- 🔢 **Number Formatting** / تنسيق الأرقام
- ♿ **Accessibility Support** / دعم الوصولية

---

## 🎨 Typography / نظام الخطوط

### Arabic Typography / خطوط العربية

```css
Font Family: 'Noto Kufi Arabic', sans-serif
Weights: 300, 400, 500, 600, 700
Usage: All Arabic UI text
```

**Example / مثال:**
```tsx
<p style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
  زايد بسهولة
</p>
```

### English Typography / خطوط الإنجليزية

```css
Font Family: 'Helvetica Neue', Helvetica, Arial, sans-serif
Weights: Light (300), Regular (400), Medium (500), Semibold (600), Bold (700)
Usage: All English UI text
```

**Example / مثال:**
```tsx
<p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
  bid with ease
</p>
```

### Numeric Data / البيانات الرقمية

**Always use Helvetica for numbers** regardless of language:

```tsx
<p className="numeric" data-numeric="true">
  2,450,000 SAR
</p>

// OR

<p className="font-numeric">
  94.5%
</p>
```

### Tagline Rules / قواعد الشعار

```tsx
// English: ALWAYS lowercase
<p className="lowercase">bid with ease</p>

// Arabic: Natural style
<p>زايد بسهولة</p>
```

---

## 🔄 RTL/LTR Support / دعم الاتجاهات

### Using useDirection Hook

```tsx
import { useDirection } from './hooks/useI18nHelpers';

function MyComponent() {
  const { isRTL, textAlign, flexRow } = useDirection();
  
  return (
    <div className={`flex ${flexRow}`}>
      <p className={textAlign}>Content</p>
    </div>
  );
}
```

### Common Patterns / الأنماط الشائعة

```tsx
// Flex direction
<div className={isRTL ? 'flex-row-reverse' : 'flex-row'}>

// Text alignment
<p className={isRTL ? 'text-right' : 'text-left'}>

// Margins
<div className={isRTL ? 'mr-4' : 'ml-4'}>

// Positioning
<aside className={isRTL ? 'right-0' : 'left-0'}>
```

### Icon Handling / التعامل مع الأيقونات

**❌ DON'T Flip These / لا تعكس هذه:**
- Brand logos (شعار MZADAT)
- Universal icons (▶️ Play, ⏸️ Pause)
- Status indicators (✓ ✗)
- Numbers and statistics

**✅ DO Flip These / اعكس هذه:**
- Directional arrows (→ ←)
- Navigation chevrons (› ‹)
- Back/Forward buttons

```tsx
// Universal icons - no transform
<CheckCircle className="w-5 h-5" style={{ transform: 'none' }} />

// Directional icons - natural flip
<ChevronRight className="w-5 h-5" />
```

---

## 🏠 Real Estate Terminology / المصطلحات العقارية

### Key Saudi Terms / المصطلحات السعودية الرئيسية

```tsx
import { useAuctionTerms } from './hooks/useI18nHelpers';

function AuctionDetails() {
  const terms = useAuctionTerms();
  
  return (
    <div>
      <p>{terms.saey}</p>         {/* سعي / Saey (Listing Fee) */}
      <p>{terms.tarsiya}</p>      {/* ترسية / Tarsiya (Award) */}
      <p>{terms.mozayada}</p>     {/* مزايدة إلكترونية / Electronic Auction */}
    </div>
  );
}
```

### Complete Glossary / المسرد الكامل

| Arabic | English | Description |
|--------|---------|-------------|
| سعي | Saey | Listing fee |
| ترسية | Tarsiya | Award/Assignment |
| مزايدة إلكترونية | Mozayada | Electronic auction |
| السعر الابتدائي | Starting Price | Initial bid amount |
| السعر الأدنى | Reserve Price | Minimum acceptable price |
| المزايدة الفائزة | Winning Bid | Successful bid |
| قيمة الزيادة | Increment | Bid increment |
| رسوم التسجيل | Registration Fee | Entry fee |
| مبلغ الجدية | Earnest Money | Good faith deposit |
| العربون | Deposit | Down payment |

---

## 📚 API Reference / مرجع API

### useTranslation Hook

```tsx
const {
  language,      // 'ar' | 'en' - Current language
  direction,     // 'rtl' | 'ltr' - Current direction
  t,             // Translation function
  setLanguage,   // (lang: 'ar' | 'en') => void
  toggleLanguage // () => void - Toggle between languages
} = useTranslation();
```

### useDirection Hook

```tsx
const {
  direction,     // 'rtl' | 'ltr'
  isRTL,         // boolean
  isArabic,      // boolean
  textAlign,     // 'text-right' | 'text-left'
  flexRow,       // 'flex-row-reverse' | 'flex-row'
  start,         // 'right' | 'left'
  end,           // 'left' | 'right'
  ms,            // (size) => margin-start class
  me,            // (size) => margin-end class
  // ... more utilities
} = useDirection();
```

### useNumberFormat Hook

```tsx
const {
  formatNumber,    // (value, options?) => string
  formatCurrency,  // (value, currency?) => string
  formatPercent,   // (value, decimals?) => string
} = useNumberFormat();
```

### useDateFormat Hook

```tsx
const {
  formatDate,         // (date, options?) => string
  formatHijriDate,    // (date) => string
  formatRelativeTime, // (date) => string ('منذ 5 دقائق')
} = useDateFormat();
```

### Translation Function (t)

```tsx
// Simple translation
t('common.save')          // "حفظ" or "Save"

// Nested keys
t('navigation.overview')  // "نظرة عامة" or "Overview"

// With parameters
t('validation.minLength', { count: 8 })
// "الحد الأدنى 8 حرف" or "Minimum 8 characters"
```

---

## 💡 Examples / أمثلة

### Complete Component Example

```tsx
import { useTranslation } from '../context/TranslationContext';
import { useDirection, useNumberFormat } from '../hooks/useI18nHelpers';
import { Card, CardContent } from '../components/ui/card';
import { DollarSign } from 'lucide-react';

function AuctionCard({ price, currency = 'SAR' }) {
  const { t, language } = useTranslation();
  const { isRTL, textAlign, flexRow } = useDirection();
  const { formatCurrency } = useNumberFormat();

  return (
    <Card>
      <CardContent className={`p-6 ${textAlign}`}>
        <div className={`flex items-center gap-4 ${flexRow}`}>
          {/* Icon - Don't flip */}
          <div className="w-12 h-12 rounded-lg bg-[#5AC4BE]/20 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-[#5AC4BE]" style={{ transform: 'none' }} />
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <p className="text-sm text-gray-600">
              {t('auctions.terms.starting_price')}
            </p>
            <p className="text-2xl font-light numeric" data-numeric="true">
              {formatCurrency(price, currency)}
            </p>
          </div>
        </div>
        
        {/* Tagline */}
        <p className={`mt-4 text-sm text-gray-500 ${language === 'en' ? 'lowercase' : ''}`}>
          {t('common.tagline')}
        </p>
      </CardContent>
    </Card>
  );
}
```

### Layout Example

```tsx
function ResponsiveLayout() {
  const { isRTL, textAlign, flexRow } = useDirection();
  const { t } = useTranslation();

  return (
    <div className={`flex ${flexRow} gap-6`}>
      {/* Sidebar */}
      <aside className={`w-64 ${isRTL ? 'border-l' : 'border-r'}`}>
        <nav className="space-y-2">
          {/* Navigation items */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${textAlign}`}>
        <h1>{t('overview.title')}</h1>
        <p>{t('overview.subtitle')}</p>
      </main>
    </div>
  );
}
```

---

## 🧪 Testing / الاختبار

### Testing Checklist / قائمة الاختبار

#### Visual / البصري
- [ ] RTL layout displays correctly / تخطيط RTL يعرض بشكل صحيح
- [ ] LTR layout displays correctly / تخطيط LTR يعرض بشكل صحيح
- [ ] Icons positioned properly / الأيقونات في المكان الصحيح
- [ ] Text alignment correct / محاذاة النص صحيحة
- [ ] Spacing consistent / التباعد متسق

#### Typography / الخطوط
- [ ] Noto Kufi Arabic used for Arabic / Noto Kufi Arabic للعربية
- [ ] Helvetica used for English / Helvetica للإنجليزية
- [ ] Numbers always use Helvetica / الأرقام دائماً Helvetica
- [ ] Font weights render correctly / أوزان الخط تعرض بشكل صحيح

#### Functionality / الوظائف
- [ ] Language toggle works / مبدل اللغة يعمل
- [ ] Language persists on reload / اللغة تحفظ عند التحديث
- [ ] All pages support both languages / كل الصفحات تدعم اللغتين
- [ ] Translations complete / الترجمات كاملة

#### Content / المحتوى
- [ ] Real estate terms accurate / المصطلحات العقارية دقيقة
- [ ] Taglines follow rules / الشعارات تتبع القواعد
- [ ] Error messages translated / رسائل الخطأ مترجمة
- [ ] No missing keys / لا مفاتيح مفقودة

---

## 🎓 Best Practices / أفضل الممارسات

### ✅ DO / افعل

1. **Always use translation keys** / دائماً استخدم مفاتيح الترجمة
2. **Test both languages** / اختبر كلا اللغتين
3. **Respect typography system** / احترم نظام الخطوط
4. **Use Saudi real estate terms** / استخدم المصطلحات العقارية السعودية
5. **Apply RTL/LTR consistently** / طبق RTL/LTR بشكل متسق
6. **Keep taglines lowercase** (English) / اجعل الشعارات lowercase (إنجليزي)
7. **Preserve brand identity** / حافظ على هوية العلامة التجارية

### ❌ DON'T / لا تفعل

1. **Don't hardcode text** / لا تكتب النصوص مباشرة
2. **Don't flip universal icons** / لا تعكس الأيقونات العالمية
3. **Don't mix fonts** / لا تخلط الخطوط
4. **Don't translate brand names** / لا تترجم أسماء العلامات التجارية
5. **Don't forget numeric formatting** / لا تنسى تنسيق الأرقام
6. **Don't use generic terms** / لا تستخدم مصطلحات عامة
7. **Don't capitalize taglines** (English) / لا تكتب الشعارات بأحرف كبيرة (إنجليزي)

---

## 📞 Support / الدعم

### Documentation / التوثيق
- Full guide: `/I18N_ARCHITECTURE_GUIDE.md`
- Code examples: `/src/app/pages/I18nExample.tsx`
- Translation files: `/src/locales/`

### Resources / الموارد
- Noto Kufi Arabic: [Google Fonts](https://fonts.google.com/noto/specimen/Noto+Kufi+Arabic)
- WCAG Guidelines: [W3C](https://www.w3.org/WAI/WCAG21/quickref/)
- React i18n Best Practices: [React Docs](https://react.dev/)

---

## 📝 License / الترخيص

© 2026 MZADAT. All rights reserved.  
© 2026 مزادات. جميع الحقوق محفوظة.

---

**Version**: 1.0.0  
**Last Updated**: March 18, 2026  
**Maintained by**: MZADAT Development Team / فريق تطوير مزادات
