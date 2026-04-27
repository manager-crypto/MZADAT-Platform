import React, { useState, useRef } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Settings,
  Folder,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Trash2,
  RefreshCw,
  Box,
  Layers,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VirtualTour360 } from '../../components/pages/VirtualTour360';
import { useTranslation } from 'react-i18next';

type MediaItem = {
  id: string;
  name: string;
  type: 'image' | '360' | 'video';
  size: string;
  url: string;
  status: 'processing' | 'ready' | 'error';
  cdnUrl?: string;
  date: string;
  compressed: boolean;
  watermarked: boolean;
};

export const AdminMediaPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'all' | 'images' | '360'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: '1',
      name: 'villa-exterior-main.jpg',
      type: 'image',
      size: '1.2 MB',
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
      status: 'ready',
      cdnUrl: 'cdn.mazadat.sa/media/v1/villa-ext.jpg',
      date: '2026-03-24',
      compressed: true,
      watermarked: true
    },
    {
      id: '2',
      name: 'luxury-apartment-360.zip',
      type: '360',
      size: '45 MB',
      url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      status: 'ready',
      cdnUrl: 'cdn.mazadat.sa/tours/lux-apt/index.html',
      date: '2026-03-23',
      compressed: true,
      watermarked: false
    },
    {
      id: '3',
      name: 'office-space-raw.png',
      type: 'image',
      size: '8.4 MB',
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
      status: 'processing',
      date: '2026-03-24',
      compressed: false,
      watermarked: false
    }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      simulateUploadProcessing(e.target.files[0]);
    }
  };

  const simulateUploadProcessing = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus(t('adminMedia.uploadingStatus'));

    const is360 = file.name.includes('360') || file.name.endsWith('.zip');

    // Simulate steps
    setTimeout(() => {
      setUploadProgress(30);
      setUploadStatus(is360 ? t('adminMedia.processingVirtualTour') : t('adminMedia.compressingImage'));

      setTimeout(() => {
        setUploadProgress(60);
        setUploadStatus(is360 ? t('adminMedia.creatingViewLinks') : t('adminMedia.addingWatermark'));

        setTimeout(() => {
          setUploadProgress(90);
          setUploadStatus(t('adminMedia.publishingCdn'));

          setTimeout(() => {
            setUploadProgress(100);
            setUploadStatus(t('adminMedia.publishedSuccess'));

            const newItem: MediaItem = {
              id: Date.now().toString(),
              name: file.name,
              type: is360 ? '360' : 'image',
              size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
              url: is360 ? 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267' : URL.createObjectURL(file),
              status: 'ready',
              cdnUrl: `cdn.mazadat.sa/media/v2/${file.name}`,
              date: new Date().toISOString().split('T')[0],
              compressed: true,
              watermarked: !is360
            };

            setMediaItems([newItem, ...mediaItems]);

            setTimeout(() => {
              setIsUploading(false);
            }, 2000);
          }, 1500);
        }, 1500);
      }, 1500);
    }, 1000);
  };

  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || item.type === activeTab || (activeTab === 'images' && item.type === 'image');
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('adminMedia.title')}</h1>
          <p className="text-gray-500 mt-1">{t('adminMedia.subtitle')}</p>
        </div>
        <button
          onClick={handleUploadClick}
          disabled={isUploading}
          className="flex items-center gap-2 px-4 py-2 bg-[#47CCD0] text-white rounded-lg hover:bg-[#3bbabb] transition-colors disabled:opacity-50 font-bold"
        >
          <Upload size={20} />
          <span>{t('adminMedia.uploadBtn')}</span>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/*,.zip"
        />
      </div>

      {isUploading && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl border border-[#47CCD0]/30 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-gray-800">{uploadStatus}</span>
            <span className="text-[#47CCD0] font-bold">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <motion.div
              className="bg-[#47CCD0] h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${uploadProgress}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500">
            <div className={`flex items-center gap-1 ${uploadProgress >= 30 ? 'text-[#47CCD0]' : ''}`}>
              <CheckCircle2 size={14} /> {t('adminMedia.stepCompress')}
            </div>
            <div className={`flex items-center gap-1 ${uploadProgress >= 60 ? 'text-[#47CCD0]' : ''}`}>
              <CheckCircle2 size={14} /> {t('adminMedia.stepWatermark')}
            </div>
            <div className={`flex items-center gap-1 ${uploadProgress >= 90 ? 'text-[#47CCD0]' : ''}`}>
              <CheckCircle2 size={14} /> {t('adminMedia.stepCdn')}
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
            <Layers size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">{t('adminMedia.statTotalFiles')}</p>
            <p className="text-2xl font-bold text-gray-900">12,450</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-[#47CCD0]/10 rounded-lg flex items-center justify-center text-[#47CCD0]">
            <Folder size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">{t('adminMedia.statStorageCdn')}</p>
            <p className="text-2xl font-bold text-gray-900">450 GB</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-500">
            <Box size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">{t('adminMedia.statTours360')}</p>
            <p className="text-2xl font-bold text-gray-900">342</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500">
            <RefreshCw size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">{t('adminMedia.statProcessedMonthly')}</p>
            <p className="text-2xl font-bold text-gray-900">2,100</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Controls */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'all' ? 'bg-[#47CCD0] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t('adminMedia.tabAll')}
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'images' ? 'bg-[#47CCD0] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t('adminMedia.tabImages')}
            </button>
            <button
              onClick={() => setActiveTab('360')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === '360' ? 'bg-[#47CCD0] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t('adminMedia.tabTours')}
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder={t('adminMedia.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full ps-4 pe-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#47CCD0]"
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Media Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="border border-gray-200 rounded-xl overflow-hidden group"
                >
                  <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                    {item.type === '360' && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
                        <div className="bg-white/90 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 backdrop-blur-sm">
                          <Box size={14} /> {t('adminMedia.tourLabel')}
                        </div>
                      </div>
                    )}
                    <img
                      src={item.url}
                      alt={item.name}
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${item.status === 'processing' ? 'blur-sm grayscale' : ''}`}
                    />

                    {item.status === 'processing' && (
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center z-20">
                        <RefreshCw className="text-white animate-spin mb-2" size={24} />
                        <span className="text-white text-sm font-bold">{t('adminMedia.statusProcessing')}</span>
                      </div>
                    )}

                    <div className="absolute top-2 end-2 flex gap-1 z-20">
                      {item.watermarked && (
                        <div className="bg-blue-500/80 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded" title={t('adminMedia.badgeProtectedTitle')}>
                          {t('adminMedia.badgeProtected')}
                        </div>
                      )}
                      {item.compressed && (
                        <div className="bg-green-500/80 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded" title={t('adminMedia.badgeCompressedTitle')}>
                          {t('adminMedia.badgeCompressed')}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="overflow-hidden">
                        <h3 className="font-bold text-sm text-gray-900 truncate" title={item.name}>{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{item.size} • {item.date}</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <MoreVertical size={16} />
                      </button>
                    </div>

                    {item.cdnUrl && (
                      <div className="mt-3 text-xs bg-gray-50 p-2 rounded border border-gray-100 flex items-center justify-between">
                        <span className="text-gray-500 truncate me-2 font-mono" dir="ltr">{item.cdnUrl}</span>
                        <button className="text-[#47CCD0] hover:text-[#3bbabb] shrink-0" onClick={() => navigator.clipboard.writeText(item.cdnUrl!)}>
                          {t('adminMedia.copyBtn')}
                        </button>
                      </div>
                    )}

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => setPreviewItem(item)}
                        className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-1.5 rounded text-sm font-bold transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye size={14} /> {t('adminMedia.previewBtn')}
                      </button>
                      <button className="px-3 bg-red-50 hover:bg-red-100 text-red-600 py-1.5 rounded transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredItems.length === 0 && (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-500">
                <ImageIcon size={48} className="text-gray-300 mb-4" />
                <p>{t('adminMedia.noResults')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setPreviewItem(null)}
            className="absolute top-4 end-4 text-white bg-black/50 hover:bg-black/80 p-2 rounded-full transition-colors z-50"
          >
            <X size={24} />
          </button>

          <div className="max-w-6xl w-full max-h-[90vh] bg-gray-900 rounded-xl overflow-hidden flex flex-col relative">
            <div className="p-4 bg-black/80 flex justify-between items-center text-white">
              <div>
                <h3 className="font-bold">{previewItem.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{previewItem.cdnUrl}</p>
              </div>
              <div className="flex gap-2">
                {previewItem.watermarked && <span className="bg-blue-600/30 text-blue-400 text-xs px-2 py-1 rounded border border-blue-500/50">{t('adminMedia.watermarkBadge')}</span>}
                {previewItem.compressed && <span className="bg-green-600/30 text-green-400 text-xs px-2 py-1 rounded border border-green-500/50">{t('adminMedia.compressedBadge')}</span>}
              </div>
            </div>

            <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden min-h-[500px]">
              {previewItem.type === '360' ? (
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute inset-0 z-0">
                    <img
                      src={previewItem.url}
                      alt="360 view"
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                    <Box size={48} className="text-white mb-4 animate-pulse" />
                    <p className="text-white text-lg font-bold mb-2">{t('adminMedia.virtualTourViewer')}</p>
                    <p className="text-gray-300 text-sm max-w-md text-center">
                      {t('adminMedia.virtualTourDesc')}
                    </p>
                    <button className="mt-6 px-6 py-2 bg-[#47CCD0] text-white rounded-lg font-bold flex items-center gap-2">
                      <RefreshCw size={18} />
                      {t('adminMedia.loadViewer')}
                    </button>
                  </div>
                </div>
              ) : (
                <img
                  src={previewItem.url}
                  alt={previewItem.name}
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
