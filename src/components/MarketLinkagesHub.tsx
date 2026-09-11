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
import { BuyerOrder, CropMasterData, MarketLinkageContract, Language, FarmerBatchListing, MongoUser } from '../types';
import { CROP_MASTER_LIST, INITIAL_BUYER_ORDERS } from '../data/cropMaster';
import { getTranslation, getLocalizedCropName } from '../utils/translations';

interface MarketLinkagesHubProps {
  currentLanguage: Language;
  initialCropId?: string;
  fairFloorPrice?: number;
  onContractCreated: (contract: MarketLinkageContract) => void;
  farmerListings?: FarmerBatchListing[];
  currentUser?: MongoUser | null;
  onBuyListing?: (listing: FarmerBatchListing, purchaseQty: number, agreedPrice: number) => void;
  onOpenAuth?: (mode?: 'login' | 'logoutConfirm') => void;
}

export const MarketLinkagesHub: React.FC<MarketLinkagesHubProps> = ({
  currentLanguage,
  initialCropId,
  fairFloorPrice = 2650,
  onContractCreated,
  farmerListings = [],
  currentUser = null,
  onBuyListing,
  onOpenAuth,
}) => {
  const t = getTranslation(currentLanguage);

  const isBuyerUser = currentUser?.role === 'buyer';
  const [marketTab, setMarketTab] = useState<'farmer_lots' | 'buyer_demands'>(
    isBuyerUser ? 'farmer_lots' : 'buyer_demands'
  );

  const [selectedCropFilter, setSelectedCropFilter] = useState<string>(initialCropId || 'all');
  const [selectedBuyerType, setSelectedBuyerType] = useState<string>('all');
  const [buyerOrders, setBuyerOrders] = useState<BuyerOrder[]>(INITIAL_BUYER_ORDERS);

  // Buyer Purchasing Listing Modal State
  const [purchasingListing, setPurchasingListing] = useState<FarmerBatchListing | null>(null);
  const [purchaseQty, setPurchaseQty] = useState<number>(50);
  const [paymentMode, setPaymentMode] = useState<string>('Agri Escrow RTGS');

  // Negotiation Modal State
  const [activeNegotiationBuyer, setActiveNegotiationBuyer] = useState<BuyerOrder | null>(null);
  const [negotiationLoading, setNegotiationLoading] = useState<boolean>(false);
  const [customCounterPrice, setCustomCounterPrice] = useState<number>(0);
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

  const filteredFarmerListings = farmerListings.filter((lot) => {
    if (selectedCropFilter === 'all') return true;
    return lot.cropId === selectedCropFilter || lot.cropName?.toLowerCase().includes(selectedCropFilter.toLowerCase());
  });

  const handleStartNegotiation = async (buyer: BuyerOrder) => {
    setActiveNegotiationBuyer(buyer);
    setNegotiationLoading(true);
    setNegotiationResult(null);
    setCustomCounterPrice(Math.round(buyer.offeredPricePerQtl * 1.04));

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
        if (resData.data.counterOfferPrice) {
          setCustomCounterPrice(resData.data.counterOfferPrice);
        }
      } else {
        const calculatedPrice = Math.round(buyer.offeredPricePerQtl * 1.04);
        setCustomCounterPrice(calculatedPrice);
        setNegotiationResult({
          counterOfferPrice: calculatedPrice,
          dealEvaluation: `Offer of ₹${buyer.offeredPricePerQtl} is above statutory MSP. Propose counter-offer of ₹${calculatedPrice} based on Grade-A moisture parameters.`,
          leveragePoints: [
            'Moisture content is verified at 11.2% (below 12% standard threshold).',
            'Direct farmgate loading saves buyer ₹45/Qtl in mandi commission.',
            'Quality certified under AgriConnect FairScore Inspection Protocol.'
          ],
          counterMessageScript: `Dear ${buyer.buyerName}, we appreciate your offer of ₹${buyer.offeredPricePerQtl}/Qtl. In view of our Grade-A lab moisture score (11.2%) and direct farmgate collection, our counter-offer is ₹${calculatedPrice}/Qtl.`,
          fallbackWalkawayPrice: fairFloorPrice,
        });
      }
    } catch (e) {
      const calculatedPrice = Math.round(buyer.offeredPricePerQtl * 1.04);
      setCustomCounterPrice(calculatedPrice);
      setNegotiationResult({
        counterOfferPrice: calculatedPrice,
        dealEvaluation: 'Counter-proposal calculated using FairScore Grade-A premium rules.',
        leveragePoints: ['Lab verified low moisture', 'Direct farmgate dispatch'],
        counterMessageScript: `Offer of ₹${calculatedPrice}/Qtl submitted under FairScore terms.`,
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

  const handleConfirmBuyerPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!purchasingListing) return;

    const qty = Number(purchaseQty) || purchasingListing.availableQuantityQuintals;
    const agreedPrice = purchasingListing.askingPricePerQtl;
    const totalValue = qty * agreedPrice;
    const buyerName = currentUser?.name || 'Vikram Singhania (Buyer)';
    const buyerCompany = currentUser?.district ? `${currentUser.district} Agri Sourcing` : 'Apex Agro Enterprises';

    const newContract: MarketLinkageContract = {
      id: `contract-buy-${Date.now()}`,
      contractCode: `KS-CT-${Math.floor(1000 + Math.random() * 9000)}`,
      farmerName: purchasingListing.farmerName || 'Sardar Gurpreet Singh',
      buyerName,
      buyerCompany,
      cropName: purchasingListing.cropName || 'Wheat',
      agreedPricePerQtl: agreedPrice,
      quantityQuintals: qty,
      totalContractValue: totalValue,
      escrowStatus: 'Escrow Funded (100%)',
      deliveryTerms: `Farmgate Dispatch at ${purchasingListing.village || purchasingListing.district || 'Farm Hub'}`,
      qualitySpecs: `${purchasingListing.qualityGrade || 'Grade A'} (Moisture ${purchasingListing.qualityParams?.moistureContent || 11.5}%)`,
      createdDate: new Date().toISOString().split('T')[0],
      bankReference: `UTR: PUNBR5${Date.now().toString().slice(-8)}`,
      batchId: purchasingListing.id || 'batch-1',
    };

    if (onBuyListing) {
      onBuyListing(purchasingListing, qty, agreedPrice);
    }
    onContractCreated(newContract);
    setContractCreated(newContract);
    setPurchasingListing(null);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (err) {}
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
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 flex items-center gap-3 font-display">
              <Store className="w-8 h-8 text-[#1b4332]" />
              Verified Direct Buyer Market Linkages
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              Bypass middleman APMC deductions. Trade directly with verified processors, millers, and institutional buyers under 100% Bank Escrow guarantees.
            </p>
          </div>

          <button
            onClick={() => setShowPostLotModal(true)}
            className="px-5 py-3.5 bg-[#1b4332] hover:bg-[#143527] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4 text-white" />
            <span>Broadcast Sourcing Demand</span>
          </button>
        </div>
      </div>

      {/* Role Context Bar */}
      {isBuyerUser ? (
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-sky-900 shadow-2xs font-sans">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-sky-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
              🛒
            </span>
            <div>
              <span className="font-extrabold text-sky-950 font-display block">Buyer Account Active ({currentUser?.name})</span>
              <span className="text-sky-700">Browse harvest crop lots listed by verified farmers below to place 100% Bank Escrow purchase orders directly.</span>
            </div>
          </div>
          <button
            onClick={() => onOpenAuth?.('login')}
            className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors shadow-xs"
          >
            Switch Profile
          </button>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-emerald-950 shadow-2xs font-sans">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-emerald-700 text-emerald-100 font-black flex items-center justify-center text-sm shadow-xs">
              🌾
            </span>
            <div>
              <span className="font-extrabold text-emerald-950 font-display block">Farmer Account Active ({currentUser?.name || 'Farmer'})</span>
              <span className="text-emerald-800">You can list new crop lots in "My Lots" tab or view buyer demands below. Switch to Buyer profile to test purchasing.</span>
            </div>
          </div>
          <button
            onClick={() => onOpenAuth?.('login')}
            className="px-3 py-1.5 bg-[#1b4332] hover:bg-[#143527] text-white font-bold rounded-xl text-xs cursor-pointer transition-colors shadow-xs"
          >
            Switch to Buyer Account
          </button>
        </div>
      )}

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
                  100% Bank Escrow: ₹{contractCreated.totalContractValue.toLocaleString('en-IN')} locked for {contractCreated.quantityQuintals} Qtl {contractCreated.cropName} (Farmer: {contractCreated.farmerName}).
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

      {/* Navigation Tabs: Farmer Crop Listings vs Corporate Buyer Demands */}
      <div className="bg-white rounded-2xl p-3 border border-stone-200/80 shadow-sm flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMarketTab('farmer_lots')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
              marketTab === 'farmer_lots'
                ? 'bg-[#1b4332] text-white font-extrabold shadow-sm'
                : 'bg-stone-50 text-stone-700 hover:text-stone-900 border border-stone-200'
            }`}
          >
            <span>🌾 Farmer Crop Listings for Purchase ({filteredFarmerListings.length})</span>
            {isBuyerUser && <span className="bg-sky-400 text-stone-950 text-[10px] px-1.5 py-0.5 rounded-md font-black uppercase">Buyer View</span>}
          </button>
          <button
            onClick={() => setMarketTab('buyer_demands')}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
              marketTab === 'buyer_demands'
                ? 'bg-[#1b4332] text-white font-extrabold shadow-sm'
                : 'bg-stone-50 text-stone-700 hover:text-stone-900 border border-stone-200'
            }`}
          >
            <span>🛒 Corporate Buyer Procurement Demands ({filteredOrders.length})</span>
          </button>
        </div>

        <span className="text-[11px] text-stone-400 font-semibold hidden md:inline">
          100% Verified Bank Escrow & Direct Farmgate Trade
        </span>
      </div>

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

          {marketTab === 'buyer_demands' && (
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
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-800 font-mono font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>
            {marketTab === 'farmer_lots'
              ? `${filteredFarmerListings.length} Active Farmer Lots Listed for Purchase`
              : `${filteredOrders.length} Active Escrow Bids Available`}
          </span>
        </div>
      </div>

      {/* Tab 1: Farmer Crop Listings for Purchase (Buyer View) */}
      {marketTab === 'farmer_lots' && (
        <div className="space-y-4">
          {filteredFarmerListings.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-stone-200 space-y-3">
              <p className="text-stone-500 font-bold text-sm">No farmer crop listings match the current filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFarmerListings.map((lot) => {
                const isAvailable = lot.status === 'Listed';
                const lotId = lot.id || `lot-${Math.random()}`;

                return (
                  <div
                    key={lotId}
                    className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm hover:shadow-md hover:border-stone-300 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                          {lot.batchCode || 'KS-LOT'}
                        </span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono border ${
                          isAvailable
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {isAvailable ? '✓ Available for Purchase' : lot.status || 'Contracted'}
                        </span>
                      </div>

                      <h3 className="text-base font-extrabold text-stone-900 font-display leading-tight">
                        {getLocalizedCropName(lot.cropId || '', currentLanguage, lot.cropName)}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Farmer: <strong className="text-stone-800">{lot.farmerName}</strong> • {lot.village || lot.district}
                      </p>

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
                          <span className="text-[11px] text-stone-500">Quality Grade:</span>
                          <span className="text-xs font-extrabold text-emerald-800">{lot.qualityGrade || 'Grade A'}</span>
                        </div>
                        {lot.qualityParams?.moistureContent && (
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-stone-500">Moisture:</span>
                            <span className="text-xs font-semibold text-stone-700">{lot.qualityParams.moistureContent}%</span>
                          </div>
                        )}
                      </div>

                      <div className="text-xs space-y-1.5 font-sans">
                        <div className="flex items-center gap-2 text-stone-600">
                          <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span className="truncate">{lot.village || `${lot.district}, ${lot.state}`}</span>
                        </div>
                        <div className="flex items-center gap-2 text-stone-600">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>100% Escrow Guaranteed • Direct Loading</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-100">
                      {isAvailable ? (
                        <button
                          onClick={() => {
                            if (!currentUser) {
                              onOpenAuth?.('login');
                              return;
                            }
                            setPurchasingListing(lot);
                            setPurchaseQty(lot.availableQuantityQuintals);
                          }}
                          className="w-full py-3 bg-[#1b4332] hover:bg-[#143527] text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all active:scale-98"
                        >
                          <Lock className="w-4 h-4 text-white shrink-0" />
                          <span>Buy Crop Lot (100% Escrow)</span>
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full py-3 bg-stone-100 text-stone-500 font-bold rounded-xl text-xs cursor-not-allowed text-center"
                        >
                          Lot {lot.status || 'Contracted'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Corporate Buyer Procurement Demands (Farmer View) */}
      {marketTab === 'buyer_demands' && (
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
      )}

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
                {/* Editable Counter Price Card */}
                <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/90 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[#1b4332] font-mono text-xs uppercase tracking-wider">
                      Your Counter Price (₹/Quintal)
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                      AI Suggested: ₹{negotiationResult.counterOfferPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg font-black text-stone-600 font-mono">₹</span>
                      <input
                        type="number"
                        value={customCounterPrice || ''}
                        onChange={(e) => setCustomCounterPrice(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full pl-8 pr-4 py-2.5 bg-white border border-emerald-300 rounded-xl text-xl font-black text-stone-900 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
                        placeholder="Enter counter price..."
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setCustomCounterPrice((prev) => Math.max(100, prev - 25))}
                        className="w-10 h-10 bg-white hover:bg-stone-100 text-stone-800 font-black text-base border border-stone-300 rounded-xl flex items-center justify-center transition-colors cursor-pointer shadow-xs active:scale-95"
                        title="Decrease by ₹25"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomCounterPrice((prev) => prev + 25)}
                        className="w-10 h-10 bg-white hover:bg-stone-100 text-stone-800 font-black text-base border border-stone-300 rounded-xl flex items-center justify-center transition-colors cursor-pointer shadow-xs active:scale-95"
                        title="Increase by ₹25"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Quick Preset Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-stone-500 font-semibold mr-1">Quick Presets:</span>
                    <button
                      type="button"
                      onClick={() => setCustomCounterPrice(activeNegotiationBuyer.offeredPricePerQtl)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${
                        customCounterPrice === activeNegotiationBuyer.offeredPricePerQtl
                          ? 'bg-[#1b4332] text-white border-[#1b4332]'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      Buyer Offer (₹{activeNegotiationBuyer.offeredPricePerQtl})
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomCounterPrice(negotiationResult.counterOfferPrice)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${
                        customCounterPrice === negotiationResult.counterOfferPrice
                          ? 'bg-[#1b4332] text-white border-[#1b4332]'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      AI Recommended (₹{negotiationResult.counterOfferPrice})
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomCounterPrice(Math.round(activeNegotiationBuyer.offeredPricePerQtl * 1.05))}
                      className="px-2.5 py-1 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 rounded-lg text-[11px] font-bold transition-all cursor-pointer"
                    >
                      +5% Premium (₹{Math.round(activeNegotiationBuyer.offeredPricePerQtl * 1.05)})
                    </button>
                  </div>

                  <p className="text-stone-700 text-[11px] leading-relaxed border-t border-emerald-200/60 pt-2">
                    {negotiationResult.dealEvaluation}
                  </p>
                </div>

                {/* Live Counter Script */}
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/90 space-y-1">
                  <span className="font-extrabold text-amber-900 block font-mono text-[11px] uppercase tracking-wide">
                    Live Counter Script to Buyer:
                  </span>
                  <p className="text-stone-700 italic text-xs leading-relaxed">
                    "Dear {activeNegotiationBuyer.companyName || activeNegotiationBuyer.buyerName}, thank you for your bid of ₹{activeNegotiationBuyer.offeredPricePerQtl}/Qtl. Our lot of {farmerLotQuantity} Qtl {activeNegotiationBuyer.cropName} meets Grade-A export standards. Considering direct farmgate supply and mandi parity, our counter-offer is ₹{customCounterPrice || negotiationResult.counterOfferPrice}/Qtl with immediate dispatch."
                  </p>
                </div>

                {/* Responsive Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={() => handleAcceptDeal(activeNegotiationBuyer, activeNegotiationBuyer.offeredPricePerQtl)}
                    className="w-full sm:w-1/2 py-3 px-4 bg-[#1b4332] text-white font-extrabold rounded-xl text-xs hover:bg-[#143527] transition-all cursor-pointer shadow-md active:scale-98"
                  >
                    Accept Deal (₹{activeNegotiationBuyer.offeredPricePerQtl}/Qtl)
                  </button>

                  <button
                    onClick={() => handleAcceptDeal(activeNegotiationBuyer, customCounterPrice || negotiationResult.counterOfferPrice)}
                    className="w-full sm:w-1/2 py-3 px-4 bg-stone-100 text-stone-900 font-bold rounded-xl text-xs hover:bg-stone-200 border border-stone-300 transition-all cursor-pointer active:scale-98"
                  >
                    Send Counter Offer (₹{customCounterPrice || negotiationResult.counterOfferPrice}/Qtl)
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
      {/* Buyer Purchase Crop Lot Modal */}
      {purchasingListing && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 text-stone-900 font-sans">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-2xl bg-[#1b4332] text-emerald-300 font-black flex items-center justify-center border border-emerald-900/40">
                  🛒
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-stone-900 font-display">Purchase Crop Lot</h3>
                  <p className="text-[11px] text-stone-500 font-mono font-semibold">100% Bank Escrow Guarantee</p>
                </div>
              </div>
              <button
                onClick={() => setPurchasingListing(null)}
                className="text-stone-400 hover:text-stone-700 p-1.5 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmBuyerPurchase} className="space-y-4">
              {/* Lot Summary Box */}
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/90 space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-sans">Commodity:</span>
                  <strong className="text-stone-900 font-extrabold">{purchasingListing.cropName}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-sans">Farmer / Seller:</span>
                  <span className="text-stone-900 font-bold">{purchasingListing.farmerName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-sans">Location:</span>
                  <span className="text-stone-700">{purchasingListing.village || purchasingListing.district}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-sans">Asking Price:</span>
                  <strong className="text-[#1b4332] font-black text-sm">₹{purchasingListing.askingPricePerQtl}/Qtl</strong>
                </div>
              </div>

              {/* Purchase Quantity */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-stone-700 font-mono">Purchase Volume (Quintals)</label>
                  <span className="text-[11px] text-stone-500 font-mono">Available: {purchasingListing.availableQuantityQuintals} Qtl</span>
                </div>
                <input
                  type="number"
                  min={1}
                  max={purchasingListing.availableQuantityQuintals}
                  value={purchaseQty}
                  onChange={(e) => setPurchaseQty(Math.min(purchasingListing.availableQuantityQuintals, Math.max(1, Number(e.target.value))))}
                  className="w-full p-3 bg-stone-50 border border-stone-300 rounded-2xl text-stone-900 font-bold text-sm outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                />
              </div>

              {/* Payment Mode */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 font-mono">Escrow Payment Channel</label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-300 rounded-2xl text-xs font-bold text-stone-900 outline-none cursor-pointer"
                >
                  <option value="Agri Escrow RTGS">ICICI Bank Agri Escrow (Instant RTGS)</option>
                  <option value="UPI Corporate Direct">HDFC Corporate UPI Direct</option>
                  <option value="Kisan Credit Line">State Bank Agri-Credit Escrow Line</option>
                </select>
              </div>

              {/* Price Calculation Box */}
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/90 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-900 font-sans">Escrow Purchase Total:</span>
                  <strong className="text-base font-black text-[#1b4332]">
                    ₹{(Number(purchaseQty || 1) * purchasingListing.askingPricePerQtl).toLocaleString('en-IN')}
                  </strong>
                </div>
                <div className="flex justify-between items-center text-[10px] text-emerald-700">
                  <span>Platform Fee: ₹0 (Zero Commission)</span>
                  <span>100% Escrow Secured</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2 font-mono">
                <button
                  type="button"
                  onClick={() => setPurchasingListing(null)}
                  className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-2xl text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#1b4332] hover:bg-[#143527] text-white font-extrabold rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all border border-emerald-900/40"
                >
                  <Lock className="w-4 h-4 text-white" />
                  <span>Confirm Escrow</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
