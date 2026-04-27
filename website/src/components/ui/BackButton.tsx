import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  isEnglish?: boolean;
}

export const BackButton: React.FC<BackButtonProps> = ({
  label,
  isEnglish = false,
  className = '',
  disabled,
  ...props
}) => {
  const { t } = useTranslation();
  const displayLabel = label ?? t('common.back');

  return (
    <button
      disabled={disabled}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300
        text-sm font-medium
        ${isEnglish ? 'font-helvetica' : 'font-kufi'}
        ${disabled
          ? 'text-[#B6B5B5] cursor-not-allowed opacity-70'
          : 'text-[#2B3D50] hover:text-[#47CCD0] hover:bg-[#47CCD0]/10 cursor-pointer'}
        ${className}
      `}
      style={isEnglish ? { fontFamily: 'Helvetica, Arial, sans-serif' } : { fontFamily: "'Noto Kufi Arabic', sans-serif" }}
      {...props}
    >
      {/* Icon: Arrow Right for RTL (Arabic), Arrow Left for LTR (English) */}
      {isEnglish ? (
        <ArrowLeft size={16} strokeWidth={1.5} className="transition-transform group-hover:-translate-x-1" />
      ) : (
        <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1 rtl:rotate-0 ltr:rotate-180" />
      )}
      {displayLabel && <span>{displayLabel}</span>}
    </button>
  );
};
