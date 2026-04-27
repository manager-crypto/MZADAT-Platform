import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Plus, Search, Filter, MoreVertical, TrendingUp, AlertCircle, CheckCircle, Clock, X, Eye, Trash2 } from 'lucide-react';
import { RiyalSymbol } from '../ui/RiyalSymbol';

export const AssetManagementComponent = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const [assets, setAssets] = useState([
    {
      id: 1,
      titleKey: 'assetMgmt.ast1Title',
      typeKey: 'assetMgmt.ast1Type',
      typeValue: 'realestate',
      value: '4,500,000',
      status: 'active',
      date: '2024-03-01',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      titleKey: 'assetMgmt.ast2Title',
      typeKey: 'assetMgmt.ast2Type',
      typeValue: 'realestate',
      value: '1,200,000',
      status: 'pending',
      date: '2024-03-05',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      titleKey: 'assetMgmt.ast3Title',
      typeKey: 'assetMgmt.ast3Type',
      typeValue: 'land',
      value: '8,000,000',
      status: 'active',
      date: '2024-02-15',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    }
  ]);

  const [newAsset, setNewAsset] = useState({
    titleKey: '',
    typeKey: 'assetMgmt.typeRealEstate',
    typeValue: 'realestate',
    value: '',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  });

  // For the add-asset form, we keep a raw title string (user input, not a key)
  const [newAssetTitle, setNewAssetTitle] = useState('');

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetTitle || !newAsset.value) return;

    const asset = {
      id: assets.length + 1,
      titleKey: newAssetTitle,
      typeKey: newAsset.typeKey,
      typeValue: newAsset.typeValue,
      value: `${newAsset.value}`,
      status: newAsset.status,
      image: newAsset.image,
      date: new Date().toISOString().split('T')[0]
    };

    setAssets([asset, ...assets]);
    setIsModalOpen(false);
    setNewAssetTitle('');
    setNewAsset({
      titleKey: '',
      typeKey: 'assetMgmt.typeRealEstate',
      typeValue: 'realestate',
      value: '',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    });
  };

  const handleDeleteAsset = (id: number) => {
    setAssets(assets.filter(a => a.id !== id));
    setDropdownOpen(null);
  };

  // Resolve title: if the item is from mock data, use t(); if user-added raw string, display directly
  const resolveTitle = (asset: typeof assets[0]) => {
    // Mock data title keys start with 'assetMgmt.'
    if (asset.titleKey.startsWith('assetMgmt.')) {
      return t(asset.titleKey);
    }
    return asset.titleKey; // user-entered raw title
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200"><CheckCircle size={14} /> {t('assetMgmt.statusActive')}</span>;
      case 'pending':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200"><Clock size={14} /> {t('assetMgmt.statusPending')}</span>;
      default:
        return null;
    }
  };

  const filterTabs = [
    { id: 'all', labelKey: 'assetMgmt.filterAll' },
    { id: 'realestate', labelKey: 'assetMgmt.filterRealEstate' },
  ];

  const typeOptions = [
    { value: 'realestate', labelKey: 'assetMgmt.typeRealEstate', typeKey: 'assetMgmt.ast1Type' },
    { value: 'land', labelKey: 'assetMgmt.typeLand', typeKey: 'assetMgmt.ast3Type' },
    { value: 'commercial', labelKey: 'assetMgmt.typeCommercial', typeKey: 'assetMgmt.typeCommercial' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('assetMgmt.pageTitle')}</h2>
          <p className="text-gray-500 text-sm">{t('assetMgmt.pageSubtitle')}</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#2B3D50] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1a2533] transition-colors shadow-lg shadow-gray-900/10"
        >
          <Plus size={18} />
          {t('assetMgmt.addAsset')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 bg-[#47CCD0]/10 rounded-xl flex items-center justify-center text-[#47CCD0]">
            <Building2 size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">{t('assetMgmt.statTotalAssets')}</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">3</h3>
            <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded-md">{t('assetMgmt.statTotalAssetsTag')}</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1 flex items-center gap-1">{t('assetMgmt.statEstimatedValue')} <RiyalSymbol className="w-4 h-4 text-gray-500" /></p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-mono">13.7M</h3>
            <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-md">{t('assetMgmt.statGrowthTag')}</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">{t('assetMgmt.statAlerts')}</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">1</h3>
            <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded-md">{t('assetMgmt.statAlertsTag')}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex bg-gray-50 p-1 rounded-xl">
              {filterTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {t(tab.labelKey)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search size={18} className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('assetMgmt.searchPlaceholder')}
                  className="w-full ps-4 pe-10 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#47CCD0]/20 transition-all"
                />
              </div>
              <button className="p-2.5 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100">
                <Filter size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-end">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm font-bold text-gray-500">
                <th className="px-6 py-4 rounded-se-xl">{t('assetMgmt.colAsset')}</th>
                <th className="px-6 py-4">{t('assetMgmt.colType')}</th>
                <th className="px-6 py-4">{t('assetMgmt.colValue')}</th>
                <th className="px-6 py-4">{t('assetMgmt.colDate')}</th>
                <th className="px-6 py-4">{t('assetMgmt.colStatus')}</th>
                <th className="px-6 py-4 rounded-ss-xl">{t('assetMgmt.colAction')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                        <img src={asset.image} alt={resolveTitle(asset)} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{resolveTitle(asset)}</p>
                        <p className="text-xs text-gray-500 mt-1">{t('assetMgmt.refNo')} AST-{asset.id}002</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg font-medium">{t(asset.typeKey)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-[#2B3D50]">{asset.value}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">{asset.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(asset.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 relative">
                      <button
                        onClick={() => setSelectedAsset(asset)}
                        className="text-xs font-bold bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                      >
                        {t('assetMgmt.btnDetails')}
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setDropdownOpen(dropdownOpen === asset.id ? null : asset.id)}
                          className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical size={16} />
                        </button>
                        {dropdownOpen === asset.id && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(null)}></div>
                            <div className="absolute start-0 mt-1 w-36 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden py-1">
                              <button
                                onClick={() => { setSelectedAsset(asset); setDropdownOpen(null); }}
                                className="w-full text-end px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Eye size={14} /> {t('assetMgmt.dropdownViewDetails')}
                              </button>
                              <button
                                onClick={() => handleDeleteAsset(asset.id)}
                                className="w-full text-end px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <Trash2 size={14} /> {t('assetMgmt.dropdownDelete')}
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">{t('assetMgmt.modalDetailsTitle')}</h3>
              <button
                onClick={() => setSelectedAsset(null)}
                className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                <img src={selectedAsset.image} alt={resolveTitle(selectedAsset)} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{resolveTitle(selectedAsset)}</h4>
                  <p className="text-sm text-gray-500 mt-1">{t('assetMgmt.refNo')} AST-{selectedAsset.id}002</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">{t('assetMgmt.detailAssetType')}</p>
                      <p className="font-bold text-gray-900">{t(selectedAsset.typeKey)}</p>
                   </div>
                   <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">{t('assetMgmt.detailEstimatedValue')}</p>
                      <p className="font-bold text-[#2B3D50]">{selectedAsset.value}</p>
                   </div>
                   <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">{t('assetMgmt.detailDateAdded')}</p>
                      <p className="font-bold text-gray-900">{selectedAsset.date}</p>
                   </div>
                   <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">{t('assetMgmt.detailStatus')}</p>
                      <div>{getStatusBadge(selectedAsset.status)}</div>
                   </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedAsset(null)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {t('assetMgmt.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Asset Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">{t('assetMgmt.modalAddTitle')}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddAsset} className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 block">{t('assetMgmt.formAssetName')}</label>
                <input
                  type="text"
                  required
                  value={newAssetTitle}
                  onChange={(e) => setNewAssetTitle(e.target.value)}
                  placeholder={t('assetMgmt.formAssetNamePlaceholder')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#47CCD0]/20 focus:border-[#47CCD0] outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 block">{t('assetMgmt.formAssetType')}</label>
                  <select
                    value={newAsset.typeValue}
                    onChange={(e) => {
                      const opt = typeOptions.find(o => o.value === e.target.value);
                      setNewAsset({ ...newAsset, typeValue: e.target.value, typeKey: opt ? opt.typeKey : 'assetMgmt.ast1Type' });
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#47CCD0]/20 focus:border-[#47CCD0] outline-none transition-all appearance-none bg-white"
                  >
                    {typeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-1">{t('assetMgmt.formEstimatedValue')} <RiyalSymbol className="w-4 h-4 text-gray-700" /></label>
                  <input
                    type="text"
                    required
                    value={newAsset.value}
                    onChange={(e) => setNewAsset({ ...newAsset, value: e.target.value })}
                    placeholder={t('assetMgmt.formValuePlaceholder')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#47CCD0]/20 focus:border-[#47CCD0] outline-none transition-all"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 block">{t('assetMgmt.formAssetStatus')}</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={newAsset.status === 'active'}
                      onChange={(e) => setNewAsset({ ...newAsset, status: e.target.value })}
                      className="text-[#47CCD0] focus:ring-[#47CCD0]"
                    />
                    <span className="text-sm text-gray-700">{t('assetMgmt.radioActive')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="pending"
                      checked={newAsset.status === 'pending'}
                      onChange={(e) => setNewAsset({ ...newAsset, status: e.target.value })}
                      className="text-[#47CCD0] focus:ring-[#47CCD0]"
                    />
                    <span className="text-sm text-gray-700">{t('assetMgmt.radioPending')}</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  {t('assetMgmt.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#47CCD0] hover:bg-[#3bbabb] shadow-[0_4px_15px_rgba(71,204,208,0.4)] transition-all flex items-center gap-2"
                >
                  <Plus size={18} />
                  {t('assetMgmt.submitAddAsset')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
