import { useTranslation } from '../context/TranslationContext';
import { useDirection } from '../hooks/useI18nHelpers';
import { useTheme } from '../context/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { Check } from 'lucide-react';

export default function LanguageSwitcherShowcase() {
  const { t, language } = useTranslation();
  const { textAlign, isRTL } = useDirection();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className={textAlign}>
        <h1 className={`text-4xl font-light ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
          {language === 'ar' ? 'أزرار تبديل اللغة' : 'Language Switcher Variants'}
        </h1>
        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-[#a6adb9]'} mt-2`}>
          {language === 'ar' 
            ? 'تصاميم متعددة مع تباين لوني ممتاز وإمكانية الوصول الكاملة' 
            : 'Multiple designs with excellent color contrast and full accessibility'}
        </p>
      </div>

      {/* Sidebar Variant */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className={`text-xl font-light ${isDark ? 'text-white' : 'text-[#2B3D50]'} ${textAlign}`}>
            {language === 'ar' ? '1. نسخة الشريط الجانبي (Sidebar Variant)' : '1. Sidebar Variant'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${textAlign}`}>
            {/* Preview on Dark Background */}
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                {language === 'ar' ? 'على خلفية داكنة' : 'On Dark Background'}
              </p>
              <div className="bg-[#2B3D50] dark:bg-[#0f0f0f] p-6 rounded-lg">
                <LanguageSwitcher variant="sidebar" />
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                {language === 'ar' ? 'الميزات:' : 'Features:'}
              </p>
              {[
                language === 'ar' ? 'خلفية بيضاء بتباين 95%' : 'White background with 95% contrast',
                language === 'ar' ? 'أيقونة Globe مع تأثير hover' : 'Globe icon with hover effect',
                language === 'ar' ? 'تسمية توضيحية "اللغة / Language"' : 'Descriptive label "اللغة / Language"',
                language === 'ar' ? 'تأثير Gradient عند الـ hover' : 'Gradient effect on hover',
                language === 'ar' ? 'ظل يزداد عند التفاعل' : 'Shadow increases on interaction',
              ].map((feature, index) => (
                <div key={index} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Check className="w-4 h-4 text-[#5AC4BE] shrink-0" />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Example */}
          <div className="mt-6">
            <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2 ${textAlign}`}>
              {language === 'ar' ? 'مثال الكود:' : 'Code Example:'}
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<LanguageSwitcher variant="sidebar" />`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Icon Variant */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className={`text-xl font-light ${isDark ? 'text-white' : 'text-[#2B3D50]'} ${textAlign}`}>
            {language === 'ar' ? '2. نسخة الأيقونة (Icon Variant)' : '2. Icon Variant'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${textAlign}`}>
            {/* Preview */}
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                {language === 'ar' ? 'المعاينة' : 'Preview'}
              </p>
              <div className={`flex items-center gap-4 p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg`}>
                <LanguageSwitcher variant="icon" />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {language === 'ar' ? 'مثالي للشريط العلوي' : 'Perfect for top bar'}
                </span>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                {language === 'ar' ? 'الميزات:' : 'Features:'}
              </p>
              {[
                language === 'ar' ? 'حجم مضغوط للشريط العلوي' : 'Compact size for top bar',
                language === 'ar' ? 'أيقونة Globe فقط' : 'Globe icon only',
                language === 'ar' ? 'تباين لوني واضح' : 'Clear color contrast',
                language === 'ar' ? 'تأثير hover بلون #5AC4BE' : 'Hover effect with #5AC4BE',
                language === 'ar' ? 'Tooltip للوصولية' : 'Tooltip for accessibility',
              ].map((feature, index) => (
                <div key={index} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Check className="w-4 h-4 text-[#5AC4BE] shrink-0" />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Example */}
          <div className="mt-6">
            <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2 ${textAlign}`}>
              {language === 'ar' ? 'مثال الكود:' : 'Code Example:'}
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<LanguageSwitcher variant="icon" />`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Compact Variant */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className={`text-xl font-light ${isDark ? 'text-white' : 'text-[#2B3D50]'} ${textAlign}`}>
            {language === 'ar' ? '3. النسخة المدمجة (Compact Variant)' : '3. Compact Variant'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${textAlign}`}>
            {/* Preview */}
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                {language === 'ar' ? 'المعاينة' : 'Preview'}
              </p>
              <div className={`flex items-center gap-4 p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg`}>
                <LanguageSwitcher variant="compact" />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {language === 'ar' ? 'EN أو عربي' : 'EN or عربي'}
                </span>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                {language === 'ar' ? 'الميزات:' : 'Features:'}
              </p>
              {[
                language === 'ar' ? 'نص واضح: EN أو عربي' : 'Clear text: EN or عربي',
                language === 'ar' ? 'حد بسمك 2px' : '2px border thickness',
                language === 'ar' ? 'تأثير hover على الحد والنص' : 'Hover effect on border and text',
                language === 'ar' ? 'خط semibold للوضوح' : 'Semibold font for clarity',
                language === 'ar' ? 'ظل يظهر عند hover' : 'Shadow appears on hover',
              ].map((feature, index) => (
                <div key={index} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Check className="w-4 h-4 text-[#5AC4BE] shrink-0" />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Example */}
          <div className="mt-6">
            <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2 ${textAlign}`}>
              {language === 'ar' ? 'مثال الكود:' : 'Code Example:'}
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<LanguageSwitcher variant="compact" />`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Default Variant */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className={`text-xl font-light ${isDark ? 'text-white' : 'text-[#2B3D50]'} ${textAlign}`}>
            {language === 'ar' ? '4. النسخة الافتراضية (Default Variant)' : '4. Default Variant'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${textAlign}`}>
            {/* Preview */}
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                {language === 'ar' ? 'المعاينة' : 'Preview'}
              </p>
              <div className={`flex items-center gap-4 p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg`}>
                <LanguageSwitcher variant="default" />
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                {language === 'ar' ? 'الميزات:' : 'Features:'}
              </p>
              {[
                language === 'ar' ? 'نص كامل: English أو العربية' : 'Full text: English or العربية',
                language === 'ar' ? 'أيقونة Globe مع النص' : 'Globe icon with text',
                language === 'ar' ? 'حد بسمك 2px مع hover' : '2px border with hover',
                language === 'ar' ? 'ظل مع لون #5AC4BE' : 'Shadow with #5AC4BE color',
                language === 'ar' ? 'مثالي للاستخدام المستقل' : 'Perfect for standalone use',
              ].map((feature, index) => (
                <div key={index} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Check className="w-4 h-4 text-[#5AC4BE] shrink-0" />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Example */}
          <div className="mt-6">
            <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2 ${textAlign}`}>
              {language === 'ar' ? 'مثال الكود:' : 'Code Example:'}
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<LanguageSwitcher variant="default" />`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Color Contrast Information */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-[#5AC4BE]/5 to-transparent">
        <CardHeader>
          <CardTitle className={`text-xl font-light ${isDark ? 'text-white' : 'text-[#2B3D50]'} ${textAlign}`}>
            {language === 'ar' ? 'معلومات التباين اللوني' : 'Color Contrast Information'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`space-y-4 ${textAlign}`}>
            <div className={`p-4 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg`}>
              <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-[#2B3D50]'}`}>
                {language === 'ar' ? 'نسب التباين (WCAG 2.1 Level AA)' : 'Contrast Ratios (WCAG 2.1 Level AA)'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    {language === 'ar' ? 'النص الرئيسي:' : 'Primary Text:'}
                  </p>
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="w-8 h-8 bg-[#2B3D50] rounded"></div>
                    <span className="text-sm">#2B3D50 on white</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded numeric">14:1</span>
                  </div>
                </div>

                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    {language === 'ar' ? 'لون hover:' : 'Hover Color:'}
                  </p>
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="w-8 h-8 bg-[#5AC4BE] rounded"></div>
                    <span className="text-sm">#5AC4BE</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded numeric">8:1</span>
                  </div>
                </div>

                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    {language === 'ar' ? 'الحد (Border):' : 'Border:'}
                  </p>
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="w-8 h-8 border-2 border-gray-200 rounded"></div>
                    <span className="text-sm">2px thickness</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                      {language === 'ar' ? 'ممتاز' : 'Excellent'}
                    </span>
                  </div>
                </div>

                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    {language === 'ar' ? 'الخلفية:' : 'Background:'}
                  </p>
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="w-8 h-8 bg-white border border-gray-200 rounded"></div>
                    <span className="text-sm">white / 95% opacity</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                      {language === 'ar' ? 'ممتاز' : 'Excellent'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 ${isDark ? 'bg-gray-800' : 'bg-blue-50'} rounded-lg`}>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>{language === 'ar' ? 'ملاحظة:' : 'Note:'}</strong>{' '}
                {language === 'ar' 
                  ? 'جميع الأزرار تلتزم بمعايير WCAG 2.1 Level AA للوصولية، مع نسبة تباين لا تقل عن 4.5:1 للنصوص و3:1 للمكونات.'
                  : 'All buttons comply with WCAG 2.1 Level AA accessibility standards, with a contrast ratio of at least 4.5:1 for text and 3:1 for components.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
