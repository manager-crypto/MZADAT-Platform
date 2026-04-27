import React, { useState } from 'react';
import {
  Code2,
  Key,
  Copy,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ApiDeveloperComponent: React.FC = () => {
  const { t } = useTranslation();
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const apiKey = "mzd_live_9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1";
  const maskedKey = "mzd_live_********************************";

  const [endpoints, setEndpoints] = useState([
    { id: 'bidding', titleKey: 'apiDev.endpoint1Title', descKey: 'apiDev.endpoint1Desc', enabled: true },
    { id: 'listings', titleKey: 'apiDev.endpoint2Title', descKey: 'apiDev.endpoint2Desc', enabled: true },
    { id: 'results', titleKey: 'apiDev.endpoint3Title', descKey: 'apiDev.endpoint3Desc', enabled: false },
    { id: 'wallet', titleKey: 'apiDev.endpoint4Title', descKey: 'apiDev.endpoint4Desc', enabled: false },
  ]);

  const toggleEndpoint = (id: string) => {
    setEndpoints(endpoints.map(ep =>
      ep.id === id ? { ...ep, enabled: !ep.enabled } : ep
    ));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-[#2B3D50] mb-2 font-serif">{t('apiDev.title')}</h2>
          <p className="text-gray-500">{t('apiDev.subtitle')}</p>
        </div>
        <a
          href="#"
          className="text-[#47CCD0] font-bold hover:underline flex items-center gap-2"
        >
          <Code2 size={18} />
          {t('apiDev.devGuide')}
        </a>
      </div>

      <div className="bg-[#F9FAFB] rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#2B3D50] shrink-0">
            <Key size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#2B3D50]">{t('apiDev.apiKeyTitle')}</h3>
            <p className="text-sm text-gray-500 mt-1">{t('apiDev.apiKeyDesc')}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
          <div className="flex-1 font-mono text-start overflow-hidden text-ellipsis whitespace-nowrap bg-gray-50 p-3 rounded-lg border border-gray-100 text-gray-700" dir="ltr">
            {showKey ? apiKey : maskedKey}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowKey(!showKey)}
              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#2B3D50] hover:bg-gray-50 rounded-lg transition-colors"
              title={showKey ? t('apiDev.hide') : t('apiDev.show')}
            >
              {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <button
              onClick={handleCopy}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                copied ? 'bg-green-50 text-green-600' : 'text-gray-500 hover:text-[#47CCD0] hover:bg-teal-50'
              }`}
              title={t('apiDev.copyKey')}
            >
              {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ms-2 border-e border-gray-200 pe-4"
              title={t('apiDev.generateKey')}
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-orange-600 bg-orange-50 p-3 rounded-lg border border-orange-100">
          <AlertCircle size={16} className="shrink-0" />
          <p>{t('apiDev.keyWarning')}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-[#2B3D50]">{t('apiDev.endpointsTitle')}</h3>
          <p className="text-sm text-gray-500 mt-1">{t('apiDev.endpointsSubtitle')}</p>
        </div>

        <div className="divide-y divide-gray-100">
          {endpoints.map((endpoint) => (
            <div key={endpoint.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div>
                <h4 className="font-bold text-[#2B3D50]">{t(endpoint.titleKey)}</h4>
                <p className="text-sm text-gray-500 mt-1">{t(endpoint.descKey)}</p>
              </div>

              <button
                onClick={() => toggleEndpoint(endpoint.id)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none shrink-0 flex items-center px-1 ${
                  endpoint.enabled ? 'bg-[#47CCD0] justify-end' : 'bg-gray-200 justify-start'
                }`}
                dir="ltr"
              >
                <span className="bg-white w-4 h-4 rounded-full shadow-sm transition-all duration-300" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
