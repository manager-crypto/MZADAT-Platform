# MZADAT Typography System Guide

## Overview
Complete typography system following Mzadat 2026 Identity Guidelines with automatic font switching between Arabic (Noto Kufi Arabic) and English (Helvetica).

## Font Stack

### Arabic Text
```css
font-family: 'Noto Kufi Arabic', sans-serif;
line-height: 1.8;
```

### English/Latin Text
```css
font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
line-height: 1.5;
```

### Numeric Data (Always Helvetica)
```css
font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
font-variant-numeric: tabular-nums; /* Monospaced for table alignment */
```

## Typography Hierarchy

| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| **H1** | 28px | Bold (700) | Page titles |
| **H2** | 22px | SemiBold (600) | Section headings |
| **H3** | 18px | Medium (500) | Card titles |
| **Body** | 14px | Regular (400) | Body text |
| **Caption** | 12px | Regular (400) | Labels, captions |

## Usage Examples

### Method 1: Utility Classes (Recommended)

```tsx
// Page title
<h1 className="mzadat-h1">نظرة عامة</h1>

// Section heading
<h2 className="mzadat-h2">التحليلات</h2>

// Card title
<h3 className="mzadat-h3">المستخدمون النشطون</h3>

// Body text
<p className="mzadat-body">وصف تفصيلي للمحتوى</p>

// Caption/Label
<span className="mzadat-caption">منذ 5 دقائق</span>
```

### Method 2: Typography Component

```tsx
import { Typography, H1, H2, H3 } from './components/Typography';

// Using main component
<Typography variant="h1">نظرة عامة</Typography>

// Using helper components
<H1>نظرة عامة</H1>
<H2>التحليلات</H2>
<H3>المستخدمون النشطون</H3>
```

### Method 3: Language-Specific Fonts

```tsx
// Force Arabic font
<p className="font-arabic">النص بالعربي</p>

// Force English/Helvetica font
<p className="font-english">English Text</p>

// For numeric data (always Helvetica with tabular nums)
<span className="numeric" data-numeric="true">1,247</span>
<span className="font-helvetica">SAR 2,500,000</span>
```

## Automatic Language Switching

The system automatically applies the correct font based on the `lang` attribute:

```tsx
// Wrapping with language context
<div lang="ar">النص بالعربي</div>  // Uses Noto Kufi Arabic
<div lang="en">English Text</div>   // Uses Helvetica
```

## Dark Mode Support

All typography classes automatically support dark mode:

```tsx
// In light mode: text-[#2B3D50]
// In dark mode: text-[#F1F5F9]
<H1 className="mzadat-h1">Auto Dark Mode Support</H1>
```

## Best Practices

1. **Always wrap numeric data** with `.numeric` or `data-numeric="true"`
   ```tsx
   <span className="numeric">123,456</span>
   ```

2. **Use tabular nums for tables** to ensure proper alignment
   ```tsx
   <td className="numeric">SAR 1,234.00</td>
   ```

3. **Wrap pages with language attribute**
   ```tsx
   <div lang={language}>
     {/* Your content */}
   </div>
   ```

4. **Use semantic HTML with utility classes**
   ```tsx
   <h1 className="mzadat-h1">Title</h1>  // Better than <div>
   ```

## CSS Variables

All typography values are stored in CSS variables:

```css
/* Font Families */
--font-arabic: 'Noto Kufi Arabic', sans-serif;
--font-english: 'Helvetica Neue', Helvetica, Arial, sans-serif;
--font-numeric: 'Helvetica Neue', Helvetica, Arial, sans-serif;

/* Font Sizes */
--text-h1: 28px;
--text-h2: 22px;
--text-h3: 18px;
--text-body: 14px;
--text-caption: 12px;

/* Font Weights */
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;

/* Line Heights */
--line-height-arabic: 1.8;
--line-height-english: 1.5;
```

## Integration with Translations

```tsx
import { useTranslation } from './context/TranslationContext';

function MyComponent() {
  const { t, language } = useTranslation();
  
  return (
    <div lang={language}>
      <H1>{t('overview.title')}</H1>
      <span className="numeric">1,247</span>
    </div>
  );
}
```

## File Structure

```
/src/styles/
├── fonts.css          # Font imports and typography utilities
├── theme.css          # CSS variables and theme definitions
└── index.css          # Main CSS file (imports all others)

/src/app/components/
└── Typography.tsx     # Typography React components
```

## Notes

- All English headings (like "Auction Life-Cycle Control", "Financial Oversight") automatically use Helvetica
- All Arabic text automatically uses Noto Kufi Arabic
- Numbers, IDs (like AUC-2026-00547), and SAR amounts always use Helvetica with tabular-nums
- The system respects RTL/LTR direction
- Full Dark Mode support built-in
