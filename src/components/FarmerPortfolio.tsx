import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  FileCheck, 
  QrCode, 
  Printer, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock, 
  Award, 
  IndianRupee,
  Layers,
  X,
  Warehouse,
  TrendingUp,
  TrendingDown,
  Target,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronRight,
  Check,
  Receipt,
  FileText,
  Download,
  MapPin,
  Scale,
  LogOut,
  User,
  ArrowRight
} from 'lucide-react';
import { FarmerBatchListing, CropMasterData, QualityParameters, Language, MarketLinkageContract, MongoUser } from '../types';
import { CROP_MASTER_LIST, SAMPLE_MANDIS, SAMPLE_FINALIZED_CONTRACTS } from '../data/cropMaster';
import { getTranslation, getLocalizedCropName } from '../utils/translations';
import { TransactionHistoryView } from './TransactionHistoryView';
import { TransactionVoucherModal } from './TransactionVoucherModal';
import { LotInspectionReportModal } from './LotInspectionReportModal';

interface FarmerPortfolioProps {
  currentLanguage: Language;
  listings: FarmerBatchListing[];
  contracts?: MarketLinkageContract[];
  onAddListing: (newListing: FarmerBatchListing) => void;
  onSelectListingForPrice: (listing: FarmerBatchListing) => void;
  onUpdateAskingPrice?: (batchId: string, newAskingPrice: number) => void;
  onUpdateContractStatus?: (
    contractId: string, 
    newStatus: 'Escrow Funded (100%)' | 'Dispatched' | 'Quality Passed & Paid'
  ) => void;
  initialOpenAddModal?: boolean;
  initialCropId?: string;
  initialAskingPrice?: number;
  initialDistrict?: string;
  onModalClose?: () => void;
  currentUser?: MongoUser | null;
  onOpenAuth?: (mode?: 'login' | 'logoutConfirm') => void;
}

export const FarmerPortfolio: React.FC<FarmerPortfolioProps> = ({
  currentLanguage,
  listings,
  contracts,
  onAddListing,
  onSelectListingForPrice,
  onUpdateAskingPrice,
  onUpdateContractStatus,
  initialOpenAddModal,
  initialCropId,
  initialAskingPrice,
  initialDistrict,
  onModalClose,
  currentUser = null,
  onOpenAuth,
}) => {
  const t = getTranslation(currentLanguage);

  const [portfolioTab, setPortfolioTab] = useState<'lots' | 'transactions'>('lots');
  const [selectedContractForVoucher, setSelectedContractForVoucher] = useState<MarketLinkageContract | null>(null);

  const contractList = contracts && contracts.length > 0 ? contracts : SAMPLE_FINALIZED_CONTRACTS;

  const [selectedBatchForInspectionReport, setSelectedBatchForInspectionReport] = useState<FarmerBatchListing | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(initialOpenAddModal || false);

  const [cropId, setCropId] = useState<string>(initialCropId || 'wheat');
  const [variety, setVariety] = useState<string>('Lokwan Sharbati');
  const [quantity, setQuantity] = useState<number | ''>(100);
  const [askingPrice, setAskingPrice] = useState<number | ''>(initialAskingPrice || 2750);
  const [moisture, setMoisture] = useState<number>(11.5);
  const [village, setVillage] = useState<string>(initialDistrict ? `${initialDistrict} Farm Cluster` : 'Khanna Farm Cluster, Ludhiana');

  React.useEffect(() => {
    if (initialOpenAddModal) {
      setShowAddModal(true);
      if (initialCropId) setCropId(initialCropId);
      if (initialAskingPrice) setAskingPrice(initialAskingPrice);
      if (initialDistrict) setVillage(`${initialDistrict} Farm Cluster`);
    }
  }, [initialOpenAddModal, initialCropId, initialAskingPrice, initialDistrict]);

  const batchComparisonData = listings.map((lot) => {
    const mandis = SAMPLE_MANDIS[lot.cropId] || [];
    const marketAverage = mandis.length > 0 
      ? Math.round(mandis.reduce((sum, m) => sum + m.spotPrice, 0) / mandis.length)
      : Math.round(lot.mspBenchmark * 1.12);

    const askingPriceVal = lot.askingPricePerQtl;
    const fairBaseline = lot.fairBaselinePrice;

    return {
      batchId: lot.id,
      batchCode: lot.batchCode,
      cropName: lot.cropName,
      variety: lot.variety,
      askingPrice: askingPriceVal,
      fairBaselinePrice: fairBaseline,
      marketAverage,
      totalValueAtAsking: askingPriceVal * lot.availableQuantityQuintals,
    };
  });

  const totalAskingValuation = batchComparisonData.reduce((acc, b) => acc + b.totalValueAtAsking, 0);

  const handleCreateNewLot = (e: React.FormEvent) => {
    e.preventDefault();
    const crop = CROP_MASTER_LIST.find((c) => c.id === cropId) || CROP_MASTER_LIST[0];

    const newListing: FarmerBatchListing = {
      id: `batch-${Date.now()}`,
      farmerName: currentUser?.name || 'Sardar Gurpreet Singh',
      village,
      district: 'Ludhiana',
      state: 'Punjab',
      cropId: crop.id,
      cropName: crop.name,
      variety,
      harvestDate: new Date().toISOString().split('T')[0],
      availableQuantityQuintals: quantity,
      qualityGrade: moisture <= 12 ? 'Grade A' : 'Grade B',
      qualityParams: {
        moistureContent: moisture,
        foreignMatter: 0.8,
        brokenGrainsOrDamaged: 1.0,
        grainSizeOrCount: 'Bold 8mm+',
        colorAndLuster: 'Superior / Bright',
        admixturePercent: 0.5,
      },
      estimatedCostOfProduction: 1589,
      askingPricePerQtl: askingPrice,
      fairBaselinePrice: Math.max(crop.defaultMsp, Math.round(1589 * 1.35)),
      mspBenchmark: crop.defaultMsp,
      status: 'Listed',
      batchCode: `KS-LOT-${Math.floor(1000 + Math.random() * 9000)}`,
      createdDate: new Date().toISOString().split('T')[0],
      bidsReceived: [],
    };

    onAddListing(newListing);
    setShowAddModal(false);
    if (onModalClose) onModalClose();
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-stone-900 pb-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 flex items-center gap-3 font-display">
              <BookOpen className="w-8 h-8 text-[#1b4332]" />
              My Harvest Lots & B2B Contracts
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              Manage your active crop listings, view corporate buyer offers, and track 100% bank escrow contract payments.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3.5 bg-[#1b4332] hover:bg-[#143527] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>List New Crop Lot</span>
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setPortfolioTab('lots')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
              portfolioTab === 'lots'
                ? 'bg-[#1b4332] text-white font-extrabold shadow-sm'
                : 'bg-stone-50 text-stone-700 hover:text-stone-900 border border-stone-200'
            }`}
          >
            📦 Active Harvest Lots ({listings.length})
          </button>
          <button
            onClick={() => setPortfolioTab('transactions')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
              portfolioTab === 'transactions'
                ? 'bg-[#1b4332] text-white font-extrabold shadow-sm'
                : 'bg-stone-50 text-stone-700 hover:text-stone-900 border border-stone-200'
            }`}
          >
            📑 Escrow Contracts & Vouchers ({contractList.length})
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="text-right">
            <span className="text-[10px] text-stone-400 block font-semibold">Total Portfolio Value</span>
            <span className="text-base font-black text-stone-900">₹{totalAskingValuation.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {portfolioTab === 'lots' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((lot) => (
            <div key={lot.id} className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-extrabold text-stone-100 font-mono px-3 py-1 rounded-full bg-stone-900 border border-stone-800 shadow-xs tracking-wider">
                    {lot.batchCode}
                  </span>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#1b4332] text-emerald-100 border border-emerald-900/40 shadow-xs font-mono">
                    {lot.qualityGrade}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-stone-900 font-display">{getLocalizedCropName(lot.cropId || '', currentLanguage, lot.cropName)}</h3>
                <p className="text-xs text-stone-500 mt-0.5">{lot.variety} • {lot.village}</p>

                <div className="my-4 p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1.5 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-stone-500">Asking Price:</span>
                    <span className="text-sm font-black text-[#1b4332]">₹{lot.askingPricePerQtl}/Qtl</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-stone-500">Available Volume:</span>
                    <span className="text-xs font-bold text-stone-900">{lot.availableQuantityQuintals} Quintals</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-stone-500">Fair Baseline Floor:</span>
                    <span className="text-xs font-bold text-stone-600">₹{lot.fairBaselinePrice}/Qtl</span>
                  </div>
                </div>

                <div className="text-xs text-stone-600 space-y-1 font-mono">
                  <p className="flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">Moisture Content:</span>
                    <span className="font-bold text-emerald-800">{lot.qualityParams.moistureContent}%</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">Bids Received:</span>
                    <span className="font-bold text-stone-900">{lot.bidsReceived.length} Verified Buyer Bids</span>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedBatchForInspectionReport(lot)}
                  className="py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1 border border-stone-200 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#1b4332]" />
                  <span>Report PDF</span>
                </button>

                <button
                  onClick={() => onSelectListingForPrice(lot)}
                  className="py-2.5 bg-[#1b4332] hover:bg-[#143527] text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Recalculate Price</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <TransactionHistoryView
          contracts={contractList}
          currentLanguage={currentLanguage}
          onSelectContract={(contract) => setSelectedContractForVoucher(contract)}
          onUpdateContractStatus={onUpdateContractStatus}
        />
      )}

      {/* Add New Lot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 animate-scaleUp space-y-4 text-stone-900">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-extrabold text-stone-900 font-display">List New Farm Harvest Lot</h3>
              <button onClick={() => { setShowAddModal(false); if (onModalClose) onModalClose(); }} className="text-stone-400 hover:text-stone-700 font-bold text-sm">✕</button>
            </div>
            <form onSubmit={handleCreateNewLot} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1 font-mono">Select Commodity</label>
                <select
                  value={cropId}
                  onChange={(e) => setCropId(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900 outline-none"
                >
                  {CROP_MASTER_LIST.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1 font-mono">Lot Volume (Quintals)</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value === '' ? '' : Number(e.target.value))}
                    onBlur={() => { if (quantity === '') setQuantity(100); }}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1 font-mono">Asking Price (₹/Qtl)</label>
                  <input
                    type="number"
                    value={askingPrice}
                    onChange={(e) => setAskingPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    onBlur={() => { if (askingPrice === '') setAskingPrice(initialAskingPrice || 2750); }}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1 font-mono">Farm Location / Cluster</label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1b4332] hover:bg-[#143527] text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer transition-all"
              >
                Create Listing & Generate Gate Pass
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modals for Voucher and Inspection Report */}
      {selectedContractForVoucher && (
        <TransactionVoucherModal
          contract={selectedContractForVoucher}
          onClose={() => setSelectedContractForVoucher(null)}
          currentLanguage={currentLanguage}
        />
      )}

      {selectedBatchForInspectionReport && (
        <LotInspectionReportModal
          lot={selectedBatchForInspectionReport}
          onClose={() => setSelectedBatchForInspectionReport(null)}
        />
      )}
    </div>
  );
};
