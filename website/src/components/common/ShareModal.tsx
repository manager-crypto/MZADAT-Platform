import React from 'react';
import {
  X,
  Link,
  Mail,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export const ShareModal = ({ isOpen, onClose, title, url }: ShareModalProps) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    onClose();
  };

  const shareLinks = [
    {
      name: t('shareModal.whatsapp'),
      icon: <img src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png" alt="WhatsApp" className="w-8 h-8" />,
      url: `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`,
      color: 'bg-[#25D366]/10 text-[#25D366]'
    },
    {
      name: t('shareModal.twitter'),
      icon: <img src="https://cdn-icons-png.flaticon.com/512/5969/5969020.png" alt="Twitter" className="w-8 h-8" />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: 'bg-black/5 text-black'
    },
    {
      name: t('shareModal.facebook'),
      icon: <img src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" alt="Facebook" className="w-8 h-8" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'bg-[#1877F2]/10 text-[#1877F2]'
    },
    {
      name: t('shareModal.linkedin'),
      icon: <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="LinkedIn" className="w-8 h-8" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'bg-[#0077B5]/10 text-[#0077B5]'
    },
    {
      name: t('shareModal.email'),
      icon: <Mail size={32} className="text-gray-600" />,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
      color: 'bg-gray-100 text-gray-700'
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">{t('shareModal.title')}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {shareLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${link.color}`}>
                  {link.icon}
                </div>
                <span className="text-xs font-medium text-gray-600">{link.name}</span>
              </a>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              readOnly
              value={url}
              className="w-full ps-4 pe-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 outline-none"
            />
            <button
              onClick={handleCopy}
              className="absolute end-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white rounded-lg transition-colors text-[#47CCD0]"
              title={t('shareModal.copyLink')}
            >
              <Link size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
