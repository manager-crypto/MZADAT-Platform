import React from 'react';
import { ShieldCheck, Building2, Server } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const TrustIndicators: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-6 border-t border-white/10 mt-8">
      <div className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-default group">
        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
          <ShieldCheck size={20} />
        </div>
        <div>
          <p className="text-white text-sm font-bold">{t('trustIndicators.absherVerified')}</p>
          <p className="text-gray-400 text-xs">{t('trustIndicators.absherDesc')}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-default group">
        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
          <Building2 size={20} />
        </div>
        <div>
          <p className="text-white text-sm font-bold">{t('trustIndicators.samaLicensed')}</p>
          <p className="text-gray-400 text-xs">{t('trustIndicators.samaDesc')}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-default group">
        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
          <Server size={20} />
        </div>
        <div>
          <p className="text-white text-sm font-bold">{t('trustIndicators.cstAccredited')}</p>
          <p className="text-gray-400 text-xs">{t('trustIndicators.cstDesc')}</p>
        </div>
      </div>
    </div>
  );
};
