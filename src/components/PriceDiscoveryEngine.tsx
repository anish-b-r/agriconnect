import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  IndianRupee, 
  TrendingUp, 
  Warehouse, 
  Store, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  HelpCircle, 
  Sliders, 
  Truck, 
  CheckCircle2, 
  Building2, 
  Check, 
  Clock,
  ArrowRight,
  Info,
  FileText
} from 'lucide-react';
import { 
  CropMasterData, 
  FairPriceAssessment, 
  QualityParameters, 
  MandiRecord, 
  Language,
  YieldPredictionResult,
  FarmerBatchListing
} from '../types';
import { CROP_MASTER_LIST, SAMPLE_MANDIS, INITIAL_BUYER_ORDERS } from '../data/cropMaster';
import { LotInspectionReportModal } from './LotInspectionReportModal';
import { getTranslation, getLocalizedCropName } from '../utils/translations';

interface PriceDiscoveryEngineProps {
  currentLanguage: Language;
  prefillYield?: YieldPredictionResult | null;
  prefillCrop?: CropMasterData | null;
  onNavigateToLinkages: (cropId: string, fairPrice: number) => void;
  onCreateLot: (crop: CropMasterData, fairPrice: number, quality: QualityParameters, volume: number) => void;
}

export const PriceDiscoveryEngine: React.FC<PriceDiscoveryEngineProps> = ({
  currentLanguage,
  prefillYield,
  prefillCrop,
  onNavigateToLinkages,
  onCreateLot,
}) => {
  const t = getTranslation(currentLanguage);

  const [selectedCropId, setSelectedCropId] = useState<string>(prefillCrop?.id || 'wheat');
  const [lotVolumeQuintals, setLotVolumeQuintals] = useState<number | ''>(prefillYield?.estimatedYieldQuintals || 95);
  const [farmerCostOfProduction, setFarmerCostOfProduction] = useState<number | ''>(
    prefillYield?.costOfProductionPerQuintal || 1589
  );

  // Quality grading parameters
  const [moisture, setMoisture] = useState<number>(11.5);
  const [foreignMatter, setForeignMatter] = useState<number>(0.8);
  const [brokenGrains, setBrokenGrains] = useState<number>(1.2);
  const [colorLuster, setColorLuster] = useState<'Superior / Bright' | 'Standard' | 'Slightly Discolored'>('Superior / Bright');
  const [admixture, setAdmixture] = useState<number>(0.5);

  const [loading, setLoading] = useState<boolean>(false);
  const [fairAssessment, setFairAssessment] = useState<FairPriceAssessment | null>(null);
  const [showInspectionReportModal, setShowInspectionReportModal] = useState<boolean>(false);

  const selectedCrop = CROP_MASTER_LIST.find((c) => c.id === selectedCropId) || CROP_MASTER_LIST[0];
  const mandiList = SAMPLE_MANDIS[selectedCropId] || SAMPLE_MANDIS['wheat'] || [];
  const relevantBuyers = INITIAL_BUYER_ORDERS.filter((b) => b.cropId === selectedCropId);

  // Run calculation whenever parameters change
  const calculateFairPrice = async () => {
    setLoading(true);
    const quality: QualityParameters = {
      moistureContent: moisture,
      foreignMatter,
      brokenGrainsOrDamaged: brokenGrains,
      grainSizeOrCount: 'Bold 8mm+',
      colorAndLuster: colorLuster,
      admixturePercent: admixture,
    };

    try {
      const response = await fetch('/api/gemini/price-discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropName: selectedCrop.name,
          msp: selectedCrop.defaultMsp,
          costOfProduction: farmerCostOfProduction,
          quality,
          mandiPrices: mandiList,
          buyerBids: relevantBuyers,
          volumeQuintals: lotVolumeQuintals,
        }),
      });

      const resData = await response.json();

      if (resData && (resData.assessment || resData.data)) {
        setFairAssessment(resData.assessment || resData.data);
      } else {
        const msp = selectedCrop.defaultMsp;
        const avgMandi = mandiList.reduce((acc, m) => acc + m.modalPrice, 0) / (mandiList.length || 1);
        const qualityPremium = moisture <= 12 ? 1.05 : 0.98;
        const recommendedFloor = Math.round(Math.max(msp, farmerCostOfProduction * 1.5, avgMandi * qualityPremium));

        setFairAssessment({
          recommendedFairFloorPrice: recommendedFloor,
          priceBandCeiling: Math.round(recommendedFloor * 1.12),
          targetNegotiationPrice: Math.round(recommendedFloor * 1.07),
          mspStatutory: msp,
          c2CostOfProductionBenchmark: Math.round(farmerCostOfProduction * 1.35),
          gradePremiumPercent: qualityPremium > 1 ? 5 : -2,
          qualityGradeResult: moisture <= 12 && foreignMatter <= 1 ? 'Grade A' : 'Grade B',
          fairScoreBand: '85-95 (Highly Fair / Premium)',
          decisionRationale: `Calculated using MSP (₹${msp}), C2+50% cost benchmark (₹${Math.round(farmerCostOfProduction * 1.5)}), and APMC modal prices with ${qualityPremium > 1 ? '+5% Grade A moisture premium' : 'standard grade deduction'}.`,
          storageHoldingEconomics: {
            storageCostPerMonthPerQtl: 28,
            expectedPriceAppreciation30d: 180,
            warehouseReceiptLoanAvailablePercent: 75,
            netGainAfterStorage30d: 152,
          },
        });
      }
    } catch (e) {
      const msp = selectedCrop.defaultMsp;
      const recommendedFloor = Math.round(Math.max(msp, farmerCostOfProduction * 1.5));
      setFairAssessment({
        recommendedFairFloorPrice: recommendedFloor,
        priceBandCeiling: Math.round(recommendedFloor * 1.12),
        targetNegotiationPrice: Math.round(recommendedFloor * 1.07),
        mspStatutory: msp,
        c2CostOfProductionBenchmark: Math.round(farmerCostOfProduction * 1.35),
        gradePremiumPercent: 5,
        qualityGradeResult: 'Grade A',
        fairScoreBand: '85-95 (Highly Fair)',
        decisionRationale: 'Local rule engine evaluated MSP protection floor & Swaminathan C2+50% cost formula.',
        storageHoldingEconomics: {
          storageCostPerMonthPerQtl: 28,
          expectedPriceAppreciation30d: 180,
          warehouseReceiptLoanAvailablePercent: 75,
          netGainAfterStorage30d: 152,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateFairPrice();
  }, [selectedCropId, moisture, foreignMatter, brokenGrains, colorLuster, farmerCostOfProduction, lotVolumeQuintals]);

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-stone-900 pb-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 flex items-center gap-3 font-display">
              <IndianRupee className="w-8 h-8 text-[#1b4332]" />
              Fair Price Discovery & Negotiation Engine
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              Combines statutory MSP benchmarks, Swaminathan C2+50% cost parameters, AI quality grading, and real-time APMC Mandi bids.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Parameters Left, Assessment Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Harvest & Quality Input Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm space-y-5">
            <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2.5 font-display pb-3 border-b border-stone-100">
              <Sliders className="w-5 h-5 text-[#1b4332]" />
              <span>Lot & Quality Assessment Parameters</span>
            </h3>

            {/* Select Crop */}
            <div>
              <label className="block text-[11px] font-extrabold text-stone-400 uppercase tracking-wider mb-1 font-mono">
                SELECT COMMODITY
              </label>
              <select
                value={selectedCropId}
                onChange={(e) => setSelectedCropId(e.target.value)}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-bold text-stone-900 focus:border-emerald-600 outline-none cursor-pointer"
              >
                {CROP_MASTER_LIST.map((c) => (
                  <option key={c.id} value={c.id}>
                    {getLocalizedCropName(c.id, currentLanguage, c.name)} — MSP: ₹{c.defaultMsp}/Qtl
                  </option>
                ))}
              </select>
            </div>

            {/* Volume & Cost Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1 font-mono">
                  Lot Volume (Quintals)
                </label>
                <input
                  type="number"
                  value={lotVolumeQuintals}
                  onChange={(e) => setLotVolumeQuintals(e.target.value === '' ? '' : Number(e.target.value))}
                  onBlur={() => { if (lotVolumeQuintals === '') setLotVolumeQuintals(95); }}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-mono font-bold text-stone-900 focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1 font-mono">
                  Farmer Cost of Prod (₹/Qtl)
                </label>
                <input
                  type="number"
                  value={farmerCostOfProduction}
                  onChange={(e) => setFarmerCostOfProduction(e.target.value === '' ? '' : Number(e.target.value))}
                  onBlur={() => { if (farmerCostOfProduction === '') setFarmerCostOfProduction(1589); }}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-mono font-bold text-stone-900 focus:border-emerald-600 outline-none"
                />
              </div>
            </div>

            {/* Quality Sliders */}
            <div className="space-y-4 pt-3 border-t border-stone-100">
              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">
                AI QUALITY PARAMETERS
              </h4>

              {/* Moisture */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1 font-mono">
                  <span className="text-stone-600 font-medium">Moisture Content (%):</span>
                  <span className={`font-bold ${moisture <= 12 ? 'text-emerald-800' : 'text-amber-800'}`}>
                    {moisture}% ({moisture <= 12 ? 'Optimal' : 'High Moisture'})
                  </span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="20"
                  step="0.1"
                  value={moisture}
                  onChange={(e) => setMoisture(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#1b4332]"
                />
              </div>

              {/* Foreign Matter */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1 font-mono">
                  <span className="text-stone-600 font-medium">Foreign Matter / Dust (%):</span>
                  <span className="font-bold text-emerald-800">{foreignMatter}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={foreignMatter}
                  onChange={(e) => setForeignMatter(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#1b4332]"
                />
              </div>

              {/* Color & Luster */}
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1 font-mono">
                  Color & Grain Appearance
                </label>
                <select
                  value={colorLuster}
                  onChange={(e) => setColorLuster(e.target.value as any)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900 outline-none cursor-pointer"
                >
                  <option value="Superior / Bright">Superior / Bright Luster (Grade A Premium)</option>
                  <option value="Standard">Standard Mandi Quality</option>
                  <option value="Slightly Discolored">Slightly Discolored / Rain Affected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Fair Price Assessment Board */}
        <div className="lg:col-span-7 space-y-6">
          {fairAssessment ? (
            <>
              {/* Primary Price Recommendation Card */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm relative overflow-hidden space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 font-mono">
                    FAIR BASELINE FLOOR & TARGET CORRIDOR
                  </span>
                  <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-extrabold">
                    {fairAssessment.qualityGradeResult} Verified
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80">
                    <span className="text-[11px] text-emerald-900 font-mono font-bold block">Recommended Fair Floor Price</span>
                    <div className="text-3xl font-black text-stone-950 font-mono mt-1 leading-none">
                      ₹{fairAssessment.recommendedFairFloorPrice.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-stone-500 ml-1">/ Qtl</span>
                    </div>
                    <span className="text-[11px] text-emerald-800 mt-1.5 block">MSP & C2 Cost Protected</span>
                  </div>

                  <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80">
                    <span className="text-[11px] text-amber-900 font-mono font-bold block">Target Buyer Asking Price</span>
                    <div className="text-3xl font-black text-stone-950 font-mono mt-1 leading-none">
                      ₹{fairAssessment.targetNegotiationPrice.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-stone-500 ml-1">/ Qtl</span>
                    </div>
                    <span className="text-[11px] text-amber-800 mt-1.5 block">+7% Negotiation Cushion</span>
                  </div>
                </div>

                {/* Benchmark Breakdown Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 text-xs font-mono">
                  <div>
                    <span className="text-stone-500 block text-[10px]">Statutory MSP</span>
                    <strong className="text-stone-900 text-sm">₹{fairAssessment.mspStatutory}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Swaminathan C2 Cost</span>
                    <strong className="text-stone-900 text-sm">₹{fairAssessment.c2CostOfProductionBenchmark}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">FairScore Index</span>
                    <strong className="text-emerald-800 text-xs">{fairAssessment.fairScoreBand}</strong>
                  </div>
                </div>

                <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-200/60 text-xs text-stone-700 leading-relaxed">
                  <p>
                    <strong className="text-[#1b4332] font-mono">AI Assessment Note: </strong>
                    {fairAssessment.decisionRationale}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <button
                    onClick={() => onNavigateToLinkages(selectedCrop.id, fairAssessment.recommendedFairFloorPrice)}
                    className="py-3 bg-[#1b4332] hover:bg-[#143527] text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                  >
                    <Store className="w-4 h-4 text-white" />
                    <span>View Buyer Contracts</span>
                  </button>

                  <button
                    onClick={() => setShowInspectionReportModal(true)}
                    className="py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 border border-stone-300 cursor-pointer transition-all"
                  >
                    <FileText className="w-4 h-4 text-[#1b4332]" />
                    <span>Inspection Report (PDF)</span>
                  </button>

                  <button
                    onClick={() => {
                      const quality: QualityParameters = {
                        moistureContent: moisture,
                        foreignMatter,
                        brokenGrainsOrDamaged: brokenGrains,
                        grainSizeOrCount: 'Bold 8mm+',
                        colorAndLuster: colorLuster,
                        admixturePercent: admixture,
                      };
                      onCreateLot(selectedCrop, fairAssessment.recommendedFairFloorPrice, quality, lotVolumeQuintals);
                    }}
                    className="py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Lock Lot & Gate Pass</span>
                  </button>
                </div>
              </div>

              {/* Warehouse Storage & Post-Harvest Holding Economics */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2 font-display">
                    <Warehouse className="w-4 h-4 text-sky-600" />
                    <span>Warehouse Storage (e-NWR) Holding Economics</span>
                  </h4>
                  <span className="text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200 font-mono">
                    WDRA Accredited
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  If harvest arrivals depress spot mandi prices, deposit your lot in a certified warehouse, obtain an instant 75% e-NWR pledge loan at 7% interest, and sell during the seasonal price rebound.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-3.5 rounded-xl border border-stone-200/80 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-stone-500 block mb-0.5">Monthly Storage</span>
                    <strong className="text-stone-900">₹{fairAssessment.storageHoldingEconomics.storageCostPerMonthPerQtl}/Qtl</strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-stone-500 block mb-0.5">30-Day Price Gain</span>
                    <strong className="text-emerald-700">+₹{fairAssessment.storageHoldingEconomics.expectedPriceAppreciation30d}/Qtl</strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-stone-500 block mb-0.5">Pledge Loan Advance</span>
                    <strong className="text-sky-700">{fairAssessment.storageHoldingEconomics.warehouseReceiptLoanAvailablePercent}% Value</strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-stone-500 block mb-0.5">Net Gain After Storage</span>
                    <strong className="text-emerald-800 font-extrabold">+₹{fairAssessment.storageHoldingEconomics.netGainAfterStorage30d}/Qtl</strong>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center text-stone-400 border border-stone-200/80">
              <div className="animate-spin w-8 h-8 border-3 border-[#1b4332] border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-xs font-bold font-mono">Running Fair Price Discovery Algorithm...</p>
            </div>
          )}
        </div>
      </div>

      {showInspectionReportModal && fairAssessment && (
        <LotInspectionReportModal
          lot={{
            id: `lot-${selectedCrop.id}-${Date.now()}`,
            farmerName: 'Sardar Gurpreet Singh & FPO Collective',
            village: 'Khanna Farm Cluster, Ludhiana',
            district: 'Ludhiana',
            state: 'Punjab',
            cropId: selectedCrop.id,
            cropName: selectedCrop.name,
            variety: `${selectedCrop.name} (${selectedCrop.hindiName}) Premium`,
            harvestDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
            availableQuantityQuintals: lotVolumeQuintals,
            qualityGrade: moisture <= 12 && foreignMatter <= 1 ? 'Grade A' : 'Grade B',
            qualityParams: {
              moistureContent: moisture,
              foreignMatter,
              brokenGrainsOrDamaged: brokenGrains,
              grainSizeOrCount: 'Bold 8.0mm+',
              colorAndLuster: colorLuster,
              admixturePercent: admixture,
            },
            estimatedCostOfProduction: farmerCostOfProduction,
            askingPricePerQtl: fairAssessment.targetNegotiationPrice,
            fairBaselinePrice: fairAssessment.recommendedFairFloorPrice,
            mspBenchmark: fairAssessment.mspStatutory,
            status: 'Listed',
            batchCode: `KS-LOT-${selectedCrop.id.substring(0, 3).toUpperCase()}-9024`,
            createdDate: new Date().toISOString(),
            bidsReceived: [],
          }}
          onClose={() => setShowInspectionReportModal(false)}
        />
      )}
    </div>
  );
};
