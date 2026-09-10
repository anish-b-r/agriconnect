import React, { useState } from 'react';
import { 
  Store, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  TrendingUp, 
  FileText, 
  CheckCircle2, 
  MessageSquare, 
  ArrowUpRight, 
  AlertCircle,
  Truck,
  Filter,
  DollarSign,
  Send,
  Lock,
  Download,
  X,
  IndianRupee,
  MapPin,
  Scale,
  ArrowRight,
  Handshake
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BuyerOrder, CropMasterData, MarketLinkageContract, Language } from '../types';
import { CROP_MASTER_LIST, INITIAL_BUYER_ORDERS } from '../data/cropMaster';
import { getTranslation, getLocalizedCropName } from '../utils/translations';

interface MarketLinkagesHubProps {
  currentLanguage: Language;
  initialCropId?: string;
  fairFloorPrice?: number;
  onContractCreated: (contract: MarketLinkageContract) => void;
}

export const MarketLinkagesHub: React.FC<MarketLinkagesHubProps> = ({
  currentLanguage,
  initialCropId,
  fairFloorPrice = 2650,
  onContractCreated,
}) => {
  const t = getTranslation(currentLanguage);

  const [selectedCropFilter, setSelectedCropFilter] = useState<string>(initialCropId || 'all');
  const [selectedBuyerType, setSelectedBuyerType] = useState<string>('all');
  const [buyerOrders, setBuyerOrders] = useState<BuyerOrder[]>(INITIAL_BUYER_ORDERS);

  // Negotiation Modal State
  const [activeNegotiationBuyer, setActiveNegotiationBuyer] = useState<BuyerOrder | null>(null);
  const [negotiationLoading, setNegotiationLoading] = useState<boolean>(false);
  const [negotiationResult, setNegotiationResult] = useState<{
    counterOfferPrice: number;
    dealEvaluation: string;
    leveragePoints: string[];
    counterMessageScript: string;
    fallbackWalkawayPrice: number;
  } | null>(null);

  // Contract Creation State
  const [contractCreated, setContractCreated] = useState<MarketLinkageContract | null>(null);
  const [farmerLotQuantity, setFarmerLotQuantity] = useState<number>(95);

  // Post new Lot Broadcast Modal
  const [showPostLotModal, setShowPostLotModal] = useState<boolean>(false);
  const [postCropId, setPostCropId] = useState<string>('wheat');
  const [postQty, setPostQty] = useState<number | ''>(100);
  const [postAskingPrice, setPostAskingPrice] = useState<number | ''>(2750);
  const [postVillage, setPostVillage] = useState<string>('Khanna, Punjab');

  const filteredOrders = buyerOrders.filter((o) => {
    const matchCrop = selectedCropFilter === 'all' || o.cropId === selectedCropFilter;
    const matchType = selectedBuyerType === 'all' || o.buyerType === selectedBuyerType;
    return matchCrop && matchType;
  });

  const handleStartNegotiation = async (buyer: BuyerOrder) => {
    setActiveNegotiationBuyer(buyer);
    setNegotiationLoading(true);
    setNegotiationResult(null);

    try {
      const response = await fetch('/api/gemini/negotiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buyerName: buyer.buyerName,
          buyerCompany: buyer.companyName,
          buyerOfferedPrice: buyer.offeredPricePerQtl,
          fairFloorPrice: fairFloorPrice || 2600,
          targetAskingPrice: Math.round(buyer.offeredPricePerQtl * 1.08),
          cropName: buyer.cropName,
          quantity: farmerLotQuantity,
          qualitySummary: 'Lab tested Grade-A, Moisture 11.2%, Foreign matter < 0.8%',
          farmerCost: 1589,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setNegotiationResult(resData.data);
      } else {
        setNegotiationResult({
          counterOfferPrice: Math.round(buyer.offeredPricePerQtl * 1.04),
          dealEvaluation: `Offer of ₹${buyer.offeredPricePerQtl} is above statutory MSP. Propose counter-offer of ₹${Math.round(buyer.offeredPricePerQtl * 1.04)} based on Grade-A moisture parameters.`,
          leveragePoints: [
            'Moisture content is verified at 11.2% (below 12% standard threshold).',
            'Direct farmgate loading saves buyer ₹45/Qtl in mandi commission.',
            'Quality certified under AgriConnect FairScore Inspection Protocol.'
          ],
          counterMessageScript: `Dear ${buyer.buyerName}, we appreciate your offer of ₹${buyer.offeredPricePerQtl}/Qtl. In view of our Grade-A lab moisture score (11.2%) and direct farmgate collection, our counter-offer is ₹${Math.round(buyer.offeredPricePerQtl * 1.04)}/Qtl.`,
          fallbackWalkawayPrice: fairFloorPrice,
        });
      }
    } catch (e) {
      setNegotiationResult({
        counterOfferPrice: Math.round(buyer.offeredPricePerQtl * 1.04),
        dealEvaluation: 'Counter-proposal calculated using FairScore Grade-A premium rules.',
        leveragePoints: ['Lab verified low moisture', 'Direct farmgate dispatch'],
        counterMessageScript: `Offer of ₹${Math.round(buyer.offeredPricePerQtl * 1.04)}/Qtl submitted under FairScore terms.`,
        fallbackWalkawayPrice: fairFloorPrice,
      });
    } finally {
      setNegotiationLoading(false);
    }
  };

  const handleAcceptDeal = (buyer: BuyerOrder, finalAgreedPrice: number) => {
    const newContract: MarketLinkageContract = {
      id: `contract-${Date.now()}`,
      contractCode: `KS-CT-${Math.floor(1000 + Math.random() * 9000)}`,
      buyerName: buyer.buyerName,
      buyerCompany: buyer.companyName,
      cropName: buyer.cropName,
      agreedPricePerQtl: finalAgreedPrice,
      quantityQuintals: farmerLotQuantity,
      totalContractValue: finalAgreedPrice * farmerLotQuantity,
      escrowStatus: 'Escrow Funded (100%)',
      deliveryTerms: buyer.deliveryTerms,
      qualitySpecs: 'Grade A (Moisture < 12%)',
      createdDate: new Date().toISOString().split('T')[0],
      paymentReleasedDate: undefined,
      bankReference: `UTR: PUNBR5${Date.now().toString().slice(-8)}`,
      batchId: 'batch-wheat-1',
    };

    onContractCreated(newContract);
    setContractCreated(newContract);
    setActiveNegotiationBuyer(null);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {}
  };

  const handleCreatePostLot = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCrop = CROP_MASTER_LIST.find((c) => c.id === postCropId) || CROP_MASTER_LIST[0];

    const newOrder: BuyerOrder = {
      id: `order-broadcast-${Date.now()}`,
      buyerName: 'Active Market Broadcast',
      companyName: 'Verified Direct Buyers Collective',
      buyerType: 'Processor / Mill',
      cropId: selectedCrop.id,
      cropName: selectedCrop.name,
      requiredQuantityQuintals: postQty,
      offeredPricePerQtl: postAskingPrice,
      deliveryTerms: `Direct Loading at ${postVillage}`,
      qualityRequirements: 'Grade A Moisture < 12%',
      validUntilDate: '2026-09-30',
      minFairScoreRequired: 80,
      verifiedBuyerBadge: true,
      escrowGuaranteed: true,
      paymentTerms: '100% Escrow upfront into KrishiSetu Bank Account',
    };

    setBuyerOrders([newOrder, ...buyerOrders]);
    setShowPostLotModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-stone-900 pb-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white text-stone-800 text-[11px] font-extrabold px-3.5 py-1 rounded-full border border-stone-200/90 shadow-2xs font-mono">
                SIH26132 Direct Buyer Linkages & Escrow
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 flex items-center gap-3 font-display">
              <Store className="w-8 h-8 text-[#1b4332]" />
              Verified Direct Buyer Market Linkages
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              Bypass middleman APMC deductions. Trade directly with verified processors, millers, and institutional exporters under 100% Escrow guarantees.
            </p>
          </div>

          <button
            onClick={() => setShowPostLotModal(true)}
            className="px-5 py-3.5 bg-[#1b4332] hover:bg-[#143527] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4 text-white" />
            <span>Broadcast My Lot to Buyers</span>
          </button>
        </div>
      </div>

      {/* Contract Created Success Toast */}
      {contractCreated && (
        <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-emerald-500 text-white font-black">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </span>
              <div>
                <h3 className="text-base font-extrabold font-display text-emerald-950">
                  Contract #{contractCreated.contractCode} Locked & Escrow Funded!
                </h3>
                <p className="text-xs text-emerald-800 font-mono">
                  100% Escrow Value: ₹{contractCreated.totalContractValue.toLocaleString('en-IN')} locked in Bank Escrow Account.
                </p>
              </div>
            </div>

            <button
              onClick={() => setContractCreated(null)}
              className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-[11px] font-extrabold text-stone-400 uppercase tracking-wider mb-1 font-mono">
              FILTER CROP
            </label>
            <select
              value={selectedCropFilter}
              onChange={(e) => setSelectedCropFilter(e.target.value)}
              className="pl-3 pr-8 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900 outline-none cursor-pointer"
            >
              <option value="all">All Commodities</option>
              {CROP_MASTER_LIST.map((c) => (
                <option key={c.id} value={c.id}>
                  {getLocalizedCropName(c.id, currentLanguage, c.name)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-stone-400 uppercase tracking-wider mb-1 font-mono">
              BUYER CATEGORY
            </label>
            <select
              value={selectedBuyerType}
              onChange={(e) => setSelectedBuyerType(e.target.value)}
              className="pl-3 pr-8 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900 outline-none cursor-pointer"
            >
              <option value="all">All Buyer Types</option>
              <option value="Processor / Mill">Processors & Millers</option>
              <option value="FMCG Enterprise">FMCG Corporates</option>
              <option value="Exporter">Export Houses</option>
              <option value="Institutional Buyer">Institutional Buyers</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-800 font-mono font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{filteredOrders.length} Active Escrow Bids Available</span>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((order) => {
          const deliveryText =
            order.deliveryTerms ||
            order.deliveryLocation ||
            order.location ||
            'Farmgate Collection / Direct Mandi Dispatch';

          const qualityText =
            order.qualityRequirements ||
            (Array.isArray(order.requirements) ? order.requirements.join(' • ') : order.requirements) ||
            order.gradeRequired ||
            'Grade A Quality Assured';

          const requiredQty =
            order.requiredQuantityQuintals ||
            order.targetQuantityQuintals ||
            order.quantityQuintals ||
            100;

          const isEscrow =
            order.escrowGuaranteed ??
            order.verifiedBuyerBadge ??
            order.verifiedBuyer ??
            true;

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm hover:shadow-md hover:border-stone-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200 font-mono">
                    {order.buyerType}
                  </span>
                  {isEscrow && (
                    <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1 font-mono bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Lock className="w-3 h-3 text-emerald-600 shrink-0" /> 100% Escrow
                    </span>
                  )}
                </div>

                <h3 className="text-base font-extrabold text-stone-900 font-display leading-tight">{order.companyName}</h3>
                <p className="text-xs text-stone-500 mt-0.5">{order.buyerName}</p>

                <div className="my-4 p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1.5 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-stone-500">Crop:</span>
                    <span className="text-xs font-extrabold text-stone-900">{getLocalizedCropName(order.cropId || '', currentLanguage, order.cropName)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-stone-500">Offered Price:</span>
                    <span className="text-sm font-black text-[#1b4332]">₹{order.offeredPricePerQtl}/Qtl</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-stone-500">Required Qty:</span>
                    <span className="text-xs font-bold text-stone-900">{requiredQty} Qtl</span>
                  </div>
                </div>

                <div className="text-xs space-y-2 font-sans">
                  <div className="flex items-start gap-2 min-w-0" title={deliveryText}>
                    <Truck className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span className="text-stone-600 font-medium leading-tight truncate">{deliveryText}</span>
                  </div>
                  <div className="flex items-start gap-2 min-w-0" title={qualityText}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-stone-600 font-medium leading-tight truncate">{qualityText}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                <button
                  onClick={() => handleStartNegotiation(order)}
                  className="flex-1 py-3 bg-[#1b4332] hover:bg-[#143527] text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                >
                  <Handshake className="w-4 h-4 text-white shrink-0" />
                  <span>Negotiate & Lock Deal</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Broadcast Lot Modal */}
      {showPostLotModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 animate-scaleUp space-y-4 text-stone-900">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-extrabold text-stone-900 font-display">Broadcast Lot to Verified Buyers</h3>
              <button onClick={() => setShowPostLotModal(false)} className="text-stone-400 hover:text-stone-700 font-bold text-sm">✕</button>
            </div>
            <form onSubmit={handleCreatePostLot} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1 font-mono">Commodity</label>
                <select
                  value={postCropId}
                  onChange={(e) => setPostCropId(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900 outline-none"
                >
                  {CROP_MASTER_LIST.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1 font-mono">Quantity (Quintals)</label>
                  <input
                    type="number"
                    value={postQty}
                    onChange={(e) => setPostQty(e.target.value === '' ? '' : Number(e.target.value))}
                    onBlur={() => { if (postQty === '') setPostQty(100); }}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1 font-mono">Asking Price (₹/Qtl)</label>
                  <input
                    type="number"
                    value={postAskingPrice}
                    onChange={(e) => setPostAskingPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    onBlur={() => { if (postAskingPrice === '') setPostAskingPrice(2750); }}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1 font-mono">Farm Location / Village</label>
                <input
                  type="text"
                  value={postVillage}
                  onChange={(e) => setPostVillage(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-900 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1b4332] hover:bg-[#143527] text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer transition-all"
              >
                Broadcast Lot to 150+ Verified Corporate Buyers
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Negotiation Modal */}
      {activeNegotiationBuyer && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 animate-scaleUp space-y-4 text-stone-900">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-lg font-extrabold font-display text-stone-900">{activeNegotiationBuyer.companyName}</h3>
                <p className="text-xs text-stone-500">Buyer Offer: ₹{activeNegotiationBuyer.offeredPricePerQtl}/Qtl</p>
              </div>
              <button onClick={() => setActiveNegotiationBuyer(null)} className="text-stone-400 hover:text-stone-700 font-bold text-sm">✕</button>
            </div>

            {negotiationLoading ? (
              <div className="p-8 text-center space-y-3">
                <div className="animate-spin w-8 h-8 border-3 border-[#1b4332] border-t-transparent rounded-full mx-auto" />
                <p className="text-xs font-bold font-mono text-[#1b4332]">Generating AI Counter-Negotiation Script...</p>
              </div>
            ) : negotiationResult ? (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80 space-y-2">
                  <span className="font-bold text-[#1b4332] block font-mono">Recommended Counter Price</span>
                  <div className="text-2xl font-black text-stone-950 font-mono">
                    ₹{negotiationResult.counterOfferPrice}/Qtl
                  </div>
                  <p className="text-stone-700 leading-relaxed">{negotiationResult.dealEvaluation}</p>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="font-bold text-amber-800 block mb-1 font-mono">Counter Script to Buyer:</span>
                  <p className="text-stone-700 italic">"{negotiationResult.counterMessageScript}"</p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => handleAcceptDeal(activeNegotiationBuyer, activeNegotiationBuyer.offeredPricePerQtl)}
                    className="flex-1 py-3 bg-[#1b4332] text-white font-extrabold rounded-xl text-xs hover:bg-[#143527] transition-colors"
                  >
                    Accept Deal (₹{activeNegotiationBuyer.offeredPricePerQtl}/Qtl)
                  </button>

                  <button
                    onClick={() => handleAcceptDeal(activeNegotiationBuyer, negotiationResult.counterOfferPrice)}
                    className="flex-1 py-3 bg-stone-100 text-stone-900 font-bold rounded-xl text-xs hover:bg-stone-200 border border-stone-300 transition-colors"
                  >
                    Send Counter Offer (₹{negotiationResult.counterOfferPrice}/Qtl)
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
