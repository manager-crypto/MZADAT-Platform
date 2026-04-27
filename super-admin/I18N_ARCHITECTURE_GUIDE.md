# MZADAT 2026 - Internationalization (i18n) Architecture Guide

## 🌍 Overview

This document outlines the complete i18n architecture for the MZADAT PropTech platform, supporting Arabic and English languages with proper RTL/LTR handling, typography management, and real estate terminology.

---

## 📁 File Structure

```
/src
├── locales/
│   ├── ar.json          # Arabic translations
│   └── en.json          # English translations
├── app/
│   ├── context/
│   │   └── TranslationContext.tsx   # i18n Context Provider
│   └── components/
│       └── LanguageSwitcher.tsx     # Language toggle component
└── styles/
    └── fonts.css        # Typography system
```

---

## 🎯 Core Features

### ✅ **1. Supported Languages**
- **Arabic (ar)**: Primary language, RTL layout
- **English (en)**: Secondary language, LTR layout

### ✅ **2. Automatic Features**
- Direction switching (RTL ↔ LTR)
- Font family switching (Noto Kufi Arabic ↔ Helvetica)
- LocalStorage persistence
- Document-level language attribute (`lang="ar"` / `lang="en"`)

### ✅ **3. Typography System**

#### **Arabic (ar)**
```css
Font Family: 'Noto Kufi Arabic', sans-serif
Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
```

#### **English (en)**
```css
Font Family: 'Helvetica Neue', Helvetica, Arial, sans-serif
Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
```

#### **Numeric Data** (Always Helvetica)
```css
Font Family: 'Helvetica Neue', Helvetica, Arial, sans-serif
Usage: Numbers, statistics, financial data
Classes: .numeric, .font-numeric, [data-numeric="true"]
```

---

## 🔧 Implementation Guide

### **1. Setup Translation Context**

Wrap your app with `TranslationProvider`:

```tsx
import { TranslationProvider } from './context/TranslationContext';

function App() {
  return (
    <TranslationProvider>
      <YourApp />
    </TranslationProvider>
  );
}
```

### **2. Use Translation Hook**

```tsx
import { useTranslation } from '../context/TranslationContext';

function MyComponent() {
  const { t, language, direction, toggleLanguage } = useTranslation();
  
  return (
    <div dir={direction}>
      <h1>{t('common.mzadat')}</h1>
      <p>{t('overview.title')}</p>
    </div>
  );
}
```

### **3. Translation Keys**

Use dot notation to access nested translations:

```tsx
t('common.save')              // "حفظ" (AR) / "Save" (EN)
t('navigation.overview')      // "نظرة عامة" (AR) / "Overview" (EN)
t('auctions.terms.saey')      // "سعي" (AR) / "Saey (Listing Fee)" (EN)
```

### **4. Dynamic Parameters**

```tsx
t('validation.minLength', { count: 8 })
// Arabic: "الحد الأدنى 8 حرف"
// English: "Minimum 8 characters"
```

---

## 🎨 RTL/LTR Handling

### **Layout Direction**

```tsx
const { direction } = useTranslation();
const isRTL = direction === 'rtl';

// Flex direction
<div className={isRTL ? 'flex-row-reverse' : 'flex-row'}>

// Text alignment
<p className={isRTL ? 'text-right' : 'text-left'}>

// Spacing
<div className={isRTL ? 'mr-4' : 'ml-4'}>

// Sidebar position
<aside className={isRTL ? 'right-0' : 'left-0'}>
```

### **Icon Handling**

**❌ DON'T** flip these icons:
- Brand logos (MZADAT "D" logo)
- Universal icons (Play, Pause, Music notes)
- Numeric indicators
- Status icons (Check, Cross, Info)

**✅ DO** flip these icons:
- Directional arrows (→ becomes ←)
- Navigation chevrons
- Back/Forward buttons
- Menu icons

```tsx
// Universal icons - no transform
<CheckCircle className="w-5 h-5" style={{ transform: 'none' }} />

// Directional icons - natural flip with RTL
<ChevronRight className="w-5 h-5" />
```

---

## 📝 Typography Usage

### **For Arabic Labels**
```tsx
<p style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
  زايد بسهولة
</p>
```

### **For Numeric Data**
```tsx
<p className="numeric" data-numeric="true">
  2,450,000 SAR
</p>

// OR

<p className="font-numeric">
  94.5%
</p>
```

### **Tagline Rules**
```tsx
// English: Always lowercase
<p className="lowercase">bid with ease</p>

// Arabic: Natural Arabic style
<p>زايد بسهولة</p>
```

---

## 🏠 Real Estate Terminology

### **Key Saudi Real Estate Terms**

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

**Usage Example:**
```tsx
// In translation files
"auctions": {
  "terms": {
    "saey": "سعي",
    "tarsiya": "ترسية",
    "mozayada": "مزايدة إلكترونية"
  }
}

// In components
<p>{t('auctions.terms.saey')}</p>
```

---

## 🔄 Language Switcher Component

### **Three Variants**

#### **1. Default (Full)**
```tsx
<LanguageSwitcher variant="default" />
// Shows: Globe icon + "English" or "العربية"
```

#### **2. Compact**
```tsx
<LanguageSwitcher variant="compact" />
// Shows: "EN" or "عربي"
```

#### **3. Icon Only**
```tsx
<LanguageSwitcher variant="icon" />
// Shows: Globe icon only
```

---

## 📊 Translation File Structure

### **Common Pattern**

```json
{
  "section": {
    "title": "English Title",
    "subtitle": "عنوان فرعي",
    "nested": {
      "key": "Value"
    }
  }
}
```

### **Available Sections**

- `common` - Global terms (save, cancel, etc.)
- `auth` - Authentication
- `navigation` - Menu items
- `overview` - Dashboard overview
- `compliance` - Licensing & compliance
- `auctions` - Auction management
- `analytics` - Analytics & KPIs
- `financial` - Financial oversight
- `support` - Customer support
- `users` - User management
- `ai` - AI & ML features
- `services` - Add-on services
- `settings` - Settings & preferences
- `propertyTypes` - Property classifications
- `timeAgo` - Relative time formats
- `validation` - Form validation messages

---

## 🎯 Best Practices

### ✅ **DO**

1. **Always use translation keys** - Never hardcode text
2. **Use Noto Kufi Arabic** for all Arabic labels
3. **Use Helvetica** for all English text and numeric data
4. **Apply RTL/LTR** to flex containers and text alignment
5. **Keep taglines lowercase** in English ("bid with ease")
6. **Use Saudi real estate terms** from the glossary
7. **Test both languages** before deployment
8. **Preserve brand identity** (MZADAT logo, colors)

### ❌ **DON'T**

1. **Don't hardcode** Arabic or English text in components
2. **Don't flip** universal icons or brand assets
3. **Don't mix fonts** - respect the typography system
4. **Don't translate** brand names (MZADAT, REGA, Infath, SADAD)
5. **Don't use** generic Arabic terms for Saudi-specific concepts
6. **Don't forget** numeric data should always use Helvetica
7. **Don't capitalize** English taglines

---

## 🔍 Testing Checklist

### **Visual Testing**
- [ ] RTL layout correct in Arabic
- [ ] LTR layout correct in English
- [ ] Icons positioned correctly
- [ ] Text alignment proper for each language
- [ ] Spacing consistent in both directions

### **Typography Testing**
- [ ] Noto Kufi Arabic used for Arabic text
- [ ] Helvetica used for English text
- [ ] Numeric data uses Helvetica in both languages
- [ ] Font weights render correctly

### **Functional Testing**
- [ ] Language toggle works smoothly
- [ ] Language persists on page reload
- [ ] All pages support both languages
- [ ] Date formats correct for each locale
- [ ] Currency formats appropriate (SAR)

### **Content Testing**
- [ ] All UI elements translated
- [ ] No missing translation keys
- [ ] Real estate terms accurate
- [ ] Taglines follow branding rules
- [ ] Error messages translated

---

## 📚 API Reference

### **useTranslation Hook**

```tsx
const {
  language,      // Current language: 'ar' | 'en'
  direction,     // Current direction: 'rtl' | 'ltr'
  t,             // Translation function
  setLanguage,   // Set language: (lang: 'ar' | 'en') => void
  toggleLanguage // Toggle between languages
} = useTranslation();
```

### **Translation Function (t)**

```tsx
// Simple translation
t('common.save')

// With parameters
t('validation.minLength', { count: 8 })

// Nested keys
t('auctions.terms.saey')
```

---

## 🌐 Locale Settings

### **Arabic (ar)**
- **Locale Code**: `ar-SA`
- **Direction**: RTL
- **Font**: Noto Kufi Arabic
- **Date Format**: Islamic (Hijri) + Gregorian
- **Number Format**: Arabic numerals (١٢٣) or Western (123)

### **English (en)**
- **Locale Code**: `en-US`
- **Direction**: LTR
- **Font**: Helvetica Neue
- **Date Format**: Gregorian
- **Number Format**: Western numerals (123)

---

## 🚀 Quick Start Example

```tsx
import { useTranslation } from '../context/TranslationContext';

function AuctionCard() {
  const { t, language, direction } = useTranslation();
  const isRTL = direction === 'rtl';

  return (
    <div className={isRTL ? 'text-right' : 'text-left'}>
      <h2>{t('auctions.title')}</h2>
      <p>{t('auctions.terms.mozayada')}</p>
      
      {/* Numeric data - always Helvetica */}
      <p className="numeric" data-numeric="true">
        450,000 SAR
      </p>
      
      {/* Tagline */}
      <p className={language === 'en' ? 'lowercase' : ''}>
        {t('common.tagline')}
      </p>
    </div>
  );
}
```

---

## 📞 Support

For questions or issues with the i18n system:
- Check translation files: `/src/locales/`
- Review typography: `/src/styles/fonts.css`
- Examine context: `/src/app/context/TranslationContext.tsx`

---

**Version**: 1.0.0  
**Last Updated**: March 18, 2026  
**Maintained by**: MZADAT Development Team
