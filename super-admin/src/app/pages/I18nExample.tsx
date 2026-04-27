/**
 * MZADAT 2026 - i18n Example Component
 * 
 * This component demonstrates all aspects of the i18n system:
 * - Translation hooks
 * - RTL/LTR layout
 * - Typography switching
 * - Real estate terminology
 * - Number formatting
 * - Date formatting
 */

import { useTranslation } from '../context/TranslationContext';
import { useDirection, useNumberFormat, useDateFormat, useAuctionTerms } from '../hooks/useI18nHelpers';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { DollarSign, Calendar, TrendingUp, Award } from 'lucide-react';

export default function I18nExample() {
  const { t, language } = useTranslation();
  const { isRTL, textAlign, flexRow } = useDirection();
  const { formatCurrency, formatPercent } = useNumberFormat();
  const { formatDate, formatHijriDate } = useDateFormat();
  const auctionTerms = useAuctionTerms();

  // Sample data
  const auctionPrice = 2450000;
  const growthRate = 15.5;
  const today = new Date();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header with Language Switcher */}
        <div className={`flex items-center justify-between ${flexRow}`}>
          <div className={textAlign}>
            <h1 className="text-4xl font-light text-[#2B3D50] dark:text-white">
              {language === 'ar' ? 'مثال تطبيق i18n' : 'i18n Implementation Example'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              {language === 'ar' 
                ? 'دليل شامل لاستخدام نظام تعدد اللغات' 
                : 'Comprehensive guide to using the i18n system'}
            </p>
          </div>
          <LanguageSwitcher variant="default" />
        </div>

        {/* Basic Translation Examples */}
        <Card>
          <CardHeader>
            <CardTitle className={textAlign}>
              {language === 'ar' ? '1. الترجمات الأساسية' : '1. Basic Translations'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`grid grid-cols-2 gap-4 ${textAlign}`}>
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'مفتاح الترجمة:' : 'Translation Key:'}
                </p>
                <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  t('common.save')
                </code>
              </div>
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'النتيجة:' : 'Result:'}
                </p>
                <p className="text-lg text-[#5AC4BE]">{t('common.save')}</p>
              </div>
            </div>

            <div className={`grid grid-cols-2 gap-4 ${textAlign}`}>
              <div>
                <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  t('navigation.overview')
                </code>
              </div>
              <div>
                <p className="text-lg text-[#5AC4BE]">{t('navigation.overview')}</p>
              </div>
            </div>

            <div className={`grid grid-cols-2 gap-4 ${textAlign}`}>
              <div>
                <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  t('overview.title')
                </code>
              </div>
              <div>
                <p className="text-lg text-[#5AC4BE]">{t('overview.title')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Saudi Real Estate Terminology */}
        <Card>
          <CardHeader>
            <CardTitle className={textAlign}>
              {language === 'ar' ? '2. المصطلحات العقارية السعودية' : '2. Saudi Real Estate Terminology'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { term: 'saey', icon: DollarSign },
                { term: 'tarsiya', icon: Award },
                { term: 'mozayada', icon: TrendingUp },
                { term: 'startingPrice', icon: DollarSign },
                { term: 'winningBid', icon: Award },
                { term: 'earnestMoney', icon: DollarSign },
              ].map(({ term, icon: Icon }) => (
                <div 
                  key={term}
                  className={`flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg ${flexRow}`}
                >
                  <Icon className="w-5 h-5 text-[#5AC4BE]" />
                  <div className={`flex-1 ${textAlign}`}>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {term}
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {auctionTerms[term as keyof typeof auctionTerms]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Number Formatting */}
        <Card>
          <CardHeader>
            <CardTitle className={textAlign}>
              {language === 'ar' ? '3. تنسيق الأرقام والعملات' : '3. Number & Currency Formatting'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`flex items-center justify-between ${flexRow}`}>
              <div className={textAlign}>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'سعر المزاد' : 'Auction Price'}
                </p>
                <p className="text-2xl font-light text-[#2B3D50] dark:text-white numeric" data-numeric="true">
                  {formatCurrency(auctionPrice)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#5AC4BE]/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#5AC4BE]" />
              </div>
            </div>

            <div className={`flex items-center justify-between ${flexRow}`}>
              <div className={textAlign}>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'معدل النمو' : 'Growth Rate'}
                </p>
                <p className="text-2xl font-light text-green-600 dark:text-green-400 numeric" data-numeric="true">
                  {formatPercent(growthRate)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Date Formatting */}
        <Card>
          <CardHeader>
            <CardTitle className={textAlign}>
              {language === 'ar' ? '4. تنسيق التواريخ' : '4. Date Formatting'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`flex items-center gap-3 ${flexRow}`}>
              <Calendar className="w-5 h-5 text-[#5AC4BE]" />
              <div className={`flex-1 ${textAlign}`}>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'التاريخ الميلادي' : 'Gregorian Date'}
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatDate(today, { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            <div className={`flex items-center gap-3 ${flexRow}`}>
              <Calendar className="w-5 h-5 text-[#5AC4BE]" />
              <div className={`flex-1 ${textAlign}`}>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'التاريخ الهجري' : 'Hijri Date'}
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatHijriDate(today)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RTL/LTR Layout Demonstration */}
        <Card>
          <CardHeader>
            <CardTitle className={textAlign}>
              {language === 'ar' ? '5. عرض الاتجاه (RTL/LTR)' : '5. Directional Layout (RTL/LTR)'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`p-4 bg-gray-50 dark:bg-gray-800 rounded-lg ${textAlign}`}>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {language === 'ar' ? 'الاتجاه الحالي:' : 'Current Direction:'}
              </p>
              <p className="text-2xl font-medium text-[#5AC4BE]">
                {isRTL ? 'RTL (من اليمين لليسار)' : 'LTR (Left to Right)'}
              </p>
            </div>

            <div className={`flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg ${flexRow}`}>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className={`flex-1 ${textAlign}`}>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {language === 'ar' 
                    ? 'الأرقام تترتب حسب اتجاه اللغة' 
                    : 'Numbers follow language direction'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography System */}
        <Card>
          <CardHeader>
            <CardTitle className={textAlign}>
              {language === 'ar' ? '6. نظام الخطوط' : '6. Typography System'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`p-4 bg-gray-50 dark:bg-gray-800 rounded-lg ${textAlign}`}>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {language === 'ar' ? 'الخط الحالي:' : 'Current Font:'}
              </p>
              <p className="text-xl font-medium">
                {language === 'ar' 
                  ? 'Noto Kufi Arabic - هذا نص عربي جميل' 
                  : 'Helvetica Neue - This is beautiful English text'}
              </p>
            </div>

            <div className={`p-4 bg-gray-50 dark:bg-gray-800 rounded-lg ${textAlign}`}>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {language === 'ar' ? 'الأرقام (دائماً Helvetica):' : 'Numeric Data (Always Helvetica):'}
              </p>
              <p className="text-3xl font-light numeric" data-numeric="true">
                1,234,567.89
              </p>
            </div>

            <div className={`p-4 bg-[#5AC4BE]/10 rounded-lg ${textAlign}`}>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {language === 'ar' ? 'شعار مزادات (lowercase للإنجليزية):' : 'MZADAT Tagline (lowercase in English):'}
              </p>
              <p className={`text-2xl font-light text-[#2B3D50] dark:text-white ${language === 'en' ? 'lowercase' : ''}`}>
                {t('common.tagline')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Code Examples */}
        <Card>
          <CardHeader>
            <CardTitle className={textAlign}>
              {language === 'ar' ? '7. أمثلة الكود' : '7. Code Examples'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={textAlign}>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'استخدام hook الترجمة:' : 'Using the translation hook:'}
              </p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { useTranslation } from '../context/TranslationContext';

function MyComponent() {
  const { t, language, direction } = useTranslation();
  
  return (
    <div dir={direction}>
      <h1>{t('common.mzadat')}</h1>
    </div>
  );
}`}
              </pre>
            </div>

            <div className={textAlign}>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'ar' ? 'تطبيق RTL/LTR:' : 'Applying RTL/LTR:'}
              </p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { useDirection } from '../hooks/useI18nHelpers';

const { isRTL, textAlign, flexRow } = useDirection();

<div className={\`flex \${flexRow}\`}>
  <p className={textAlign}>Content</p>
</div>`}
              </pre>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
