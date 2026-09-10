/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavTabType } from './components/Navbar';
import { DashboardLayout } from './components/DashboardLayout';
import { FairScoreInsights } from './components/FairScoreInsights';
import { AlertsAdvisoryHub } from './components/AlertsAdvisoryHub';
import { SihDemoWalkthrough } from './components/SihDemoWalkthrough';
import { YieldGrowthPredictor } from './components/YieldGrowthPredictor';
import { PriceDiscoveryEngine } from './components/PriceDiscoveryEngine';
import { MarketLinkagesHub } from './components/MarketLinkagesHub';
import { MandiTrendsMap } from './components/MandiTrendsMap';
import { FarmerPortfolio } from './components/FarmerPortfolio';
import { VernacularAdvisoryModal } from './components/VernacularAdvisoryModal';
import { MongoDatabaseHub } from './components/MongoDatabaseHub';
import { WeatherAlerts } from './components/WeatherAlerts';
import { 
  CropMasterData, 
  YieldPredictionResult, 
  FarmerBatchListing, 
  MarketLinkageContract, 
  QualityParameters, 
  Language,
  MongoUser
} from './types';
import { CROP_MASTER_LIST, SAMPLE_FINALIZED_CONTRACTS } from './data/cropMaster';
import { AuthModal, DEMO_PROFILES } from './components/AuthModal';
import { 
  Sprout, 
  Scale, 
  Store, 
  TrendingUp, 
  ShieldCheck, 
  BookOpen, 
  Sparkles,
  ArrowRight,
  IndianRupee,
  CheckCircle2,
  Lock,
  Database,
  CloudSun,
  Trophy,
  Bell,
  LogOut,
  LogIn,
  UserCheck
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTabType>('fairscore');
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('agriconnect_lang');
      if (saved && ['en', 'hi', 'pa', 'mr', 'te', 'ta', 'kn', 'gu', 'bn'].includes(saved)) {
        return saved as Language;
      }
    } catch (e) {}
    return 'en';
  });
  const [selectedState, setSelectedState] = useState<string>('Karnataka');
  const [isAdvisoryOpen, setIsAdvisoryOpen] = useState<boolean>(false);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    try {
      localStorage.setItem('agriconnect_lang', lang);
    } catch (e) {}
  };

  // User Authentication & Session State
  const [currentUser, setCurrentUser] = useState<MongoUser | null>(() => {
    try {
      const saved = localStorage.getItem('agriconnect_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return DEMO_PROFILES[0]; // Default to Sardar Gurpreet Singh (Verified Farmer)
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'logoutConfirm'>('login');
  const [userNotification, setUserNotification] = useState<string | null>(null);

  const handleOpenAuth = (mode: 'login' | 'logoutConfirm' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogin = (user: MongoUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('agriconnect_user', JSON.stringify(user));
    } catch (e) {}
    setUserNotification(`Logged in as ${user.name} (${user.role.toUpperCase()})`);
    setTimeout(() => setUserNotification(null), 4000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('agriconnect_user');
    } catch (e) {}
    setUserNotification('You have logged out successfully.');
    setTimeout(() => setUserNotification(null), 4000);
  };

  // Cross-component state transfers
  const [prefillYield, setPrefillYield] = useState<YieldPredictionResult | null>(null);
  const [prefillCrop, setPrefillCrop] = useState<CropMasterData | null>(null);
  const [prefillWeatherRisk, setPrefillWeatherRisk] = useState<'Normal' | 'Deficit Monsoon (-15%)' | 'Excess Rain / Hail' | 'Heatwave Spike' | 'Frost Risk'>('Normal');
  const [targetFairPrice, setTargetFairPrice] = useState<number>(2650);

  // Prefill for Farmer Portfolio "List My Crop" modal
  const [openAddLotModal, setOpenAddLotModal] = useState<boolean>(false);
  const [prefillLotCropId, setPrefillLotCropId] = useState<string>('wheat');
  const [prefillLotPrice, setPrefillLotPrice] = useState<number>(2750);
  const [prefillLotDistrict, setPrefillLotDistrict] = useState<string>('Ludhiana');

  // Active listings
  const [listings, setListings] = useState<FarmerBatchListing[]>([
    {
      id: 'batch-wheat-1',
      farmerName: 'Balwinder Singh & Co-op',
      village: 'Khanna Farm Cluster, Ludhiana',
      district: 'Ludhiana',
      state: 'Punjab',
      cropId: 'wheat',
      cropName: 'Wheat (Sharbati / Lokwan)',
      variety: 'Lokwan Sharbati (Premium Grain)',
      harvestDate: '2026-08-25',
      availableQuantityQuintals: 95,
      qualityGrade: 'Grade A',
      qualityParams: {
        moistureContent: 11.5,
        foreignMatter: 0.8,
        brokenGrainsOrDamaged: 1.0,
        grainSizeOrCount: 'Bold 8mm+',
        colorAndLuster: 'Superior / Bright',
        admixturePercent: 0.5,
      },
      estimatedCostOfProduction: 1589,
      askingPricePerQtl: 2850,
      fairBaselinePrice: 2608,
      mspBenchmark: 2425,
      status: 'Listed',
      batchCode: 'KS-WHT-9421',
      createdDate: '2026-08-26',
      bidsReceived: [
        {
          id: 'bid-itc-1',
          buyerName: 'Aashirvaad Sourcing Cell',
          buyerCompany: 'ITC Agri Business Division',
          offeredPrice: 2850,
          bidDate: '2026-08-28',
          status: 'Pending',
          notes: 'Grade A Export standard, 100% Escrow on inspection',
        }
      ],
    },
    {
      id: 'batch-soy-2',
      farmerName: 'Kailash Patidar & Sons',
      village: 'Sanwer, Indore',
      district: 'Indore',
      state: 'Madhya Pradesh',
      cropId: 'soybean',
      cropName: 'Soybean (JS 9560 / JS 20-34)',
      variety: 'JS 9560 Yellow',
      harvestDate: '2026-08-20',
      availableQuantityQuintals: 60,
      qualityGrade: 'Grade A',
      qualityParams: {
        moistureContent: 10.8,
        foreignMatter: 0.6,
        brokenGrainsOrDamaged: 0.8,
        grainSizeOrCount: 'Standard 6mm',
        colorAndLuster: 'Superior / Bright',
        admixturePercent: 0.4,
      },
      estimatedCostOfProduction: 3200,
      askingPricePerQtl: 5350,
      fairBaselinePrice: 4993,
      mspBenchmark: 4892,
      status: 'Negotiation Active',
      batchCode: 'KS-SOY-3180',
      createdDate: '2026-08-21',
      bidsReceived: [
        {
          id: 'bid-adani-1',
          buyerName: 'Fortune Oil Milling Direct',
          buyerCompany: 'Adani Wilmar Agri Hub',
          offeredPrice: 5380,
          bidDate: '2026-08-29',
          status: 'Accepted',
          notes: 'Immediate RTGS payment, Collection at farmgate',
        }
      ],
    },
    {
      id: 'batch-cotton-3',
      farmerName: 'Rameshwar Patel',
      village: 'Jetpur Road, Rajkot',
      district: 'Rajkot',
      state: 'Gujarat',
      cropId: 'cotton',
      cropName: 'Cotton (Shankar-6 / Bt Hybrid)',
      variety: 'Shankar-6 Long Staple (29mm)',
      harvestDate: '2026-08-18',
      availableQuantityQuintals: 45,
      qualityGrade: 'Grade A',
      qualityParams: {
        moistureContent: 7.5,
        foreignMatter: 1.2,
        brokenGrainsOrDamaged: 0.5,
        grainSizeOrCount: 'Long 29mm staple',
        colorAndLuster: 'Superior / Bright',
        admixturePercent: 0.3,
      },
      estimatedCostOfProduction: 4950,
      askingPricePerQtl: 8100,
      fairBaselinePrice: 7520,
      mspBenchmark: 7121,
      status: 'Listed',
      batchCode: 'KS-COT-5502',
      createdDate: '2026-08-19',
      bidsReceived: [
        {
          id: 'bid-vardhman-1',
          buyerName: 'Vardhman Textiles Procurement',
          buyerCompany: 'Vardhman Group Ludhiana',
          offeredPrice: 8050,
          bidDate: '2026-08-30',
          status: 'Pending',
          notes: 'Mill delivery terms, moisture verified under 8%',
        }
      ],
    },
  ]);

  const [contracts, setContracts] = useState<MarketLinkageContract[]>(SAMPLE_FINALIZED_CONTRACTS);

  const handleUpdateContractStatus = (
    contractId: string,
    newStatus: 'Escrow Funded (100%)' | 'Dispatched' | 'Quality Passed & Paid'
  ) => {
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id === contractId) {
          const isPaid = newStatus === 'Quality Passed & Paid';
          return {
            ...c,
            escrowStatus: newStatus,
            paymentReleasedDate: isPaid ? (c.paymentReleasedDate || new Date().toISOString().split('T')[0]) : c.paymentReleasedDate,
            bankReference: isPaid && !c.bankReference ? `UTR: PUNBR5${Date.now().toString().slice(-8)}` : c.bankReference,
          };
        }
        return c;
      })
    );
  };

  const handleUpdateAskingPrice = (batchId: string, newAskingPrice: number) => {
    setListings((prev) =>
      prev.map((lot) =>
        lot.id === batchId ? { ...lot, askingPricePerQtl: newAskingPrice } : lot
      )
    );
  };

  // Navigation handlers
  const handleNavigateToPriceEngine = (prediction: YieldPredictionResult, crop: CropMasterData) => {
    setPrefillYield(prediction);
    setPrefillCrop(crop);
    setActiveTab('price');
  };

  const handleNavigateToLinkages = (cropId: string, fairPrice: number) => {
    setTargetFairPrice(fairPrice);
    setActiveTab('linkages');
  };

  const handleCreateLotFromPriceEngine = (
    crop: CropMasterData,
    fairPrice: number,
    quality: QualityParameters,
    volume: number
  ) => {
    const newLot: FarmerBatchListing = {
      id: `batch-${Date.now()}`,
      farmerName: 'Balwinder Singh & Farmers Collective',
      village: 'Khanna Agri Belt',
      district: 'Ludhiana',
      state: 'Punjab',
      cropId: crop.id,
      cropName: crop.name,
      variety: 'Certified Standard',
      harvestDate: new Date().toISOString().split('T')[0],
      availableQuantityQuintals: volume,
      qualityGrade: quality.moistureContent <= 12 ? 'Grade A' : 'Grade B',
      qualityParams: quality,
      estimatedCostOfProduction: 1589,
      askingPricePerQtl: Math.round(fairPrice * 1.08),
      fairBaselinePrice: fairPrice,
      mspBenchmark: crop.defaultMsp,
      status: 'Listed',
      batchCode: `KS-LOT-${Math.floor(1000 + Math.random() * 9000)}`,
      createdDate: new Date().toISOString().split('T')[0],
      bidsReceived: [],
    };

    setListings([newLot, ...listings]);
    setActiveTab('portfolio');

    // Sync to MongoDB crop_listings in background
    fetch('/api/crop-listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        farmer_id: 'usr-f-01',
        crop_name: newLot.cropName,
        quantity_kg: newLot.availableQuantityQuintals * 100,
        quality_grade: newLot.qualityGrade,
        district: newLot.district,
        harvest_date: newLot.harvestDate,
        asking_price: Number((newLot.askingPricePerQtl / 100).toFixed(2)),
        fairscore_at_listing: 91,
        status: 'active',
        variety: newLot.variety,
        moisture_percent: newLot.qualityParams.moistureContent,
      }),
    }).catch((err) => console.warn('Sync to MongoDB note:', err));
  };

  const handleAddListing = (newListing: FarmerBatchListing) => {
    setListings([newListing, ...listings]);

    // Sync to MongoDB crop_listings
    fetch('/api/crop-listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        farmer_id: 'usr-f-01',
        crop_name: newListing.cropName,
        quantity_kg: newListing.availableQuantityQuintals * 100,
        quality_grade: newListing.qualityGrade,
        district: newListing.district,
        harvest_date: newListing.harvestDate,
        asking_price: Number((newListing.askingPricePerQtl / 100).toFixed(2)),
        fairscore_at_listing: 90,
        status: 'active',
        variety: newListing.variety,
        moisture_percent: newListing.qualityParams.moistureContent,
      }),
    }).catch((err) => console.warn('Sync to MongoDB note:', err));
  };

  const handleSelectListingForPrice = (listing: FarmerBatchListing) => {
    const crop = CROP_MASTER_LIST.find((c) => c.id === listing.cropId);
    if (crop) {
      setPrefillCrop(crop);
      setPrefillYield({
        estimatedYieldQuintals: listing.availableQuantityQuintals,
        estimatedYieldPerAcre: 19,
        yieldRangeMin: listing.availableQuantityQuintals * 0.9,
        yieldRangeMax: listing.availableQuantityQuintals * 1.1,
        maturityDate: listing.harvestDate,
        harvestWindowStart: listing.harvestDate,
        harvestWindowEnd: listing.harvestDate,
        qualityBreakdown: {
          gradeA_Percent: listing.qualityGrade === 'Grade A' ? 75 : 40,
          gradeB_Percent: 20,
          gradeC_Percent: 5,
        },
        totalProductionCost: listing.estimatedCostOfProduction * listing.availableQuantityQuintals,
        costOfProductionPerQuintal: listing.estimatedCostOfProduction,
        c2CostOfProductionPerQuintal: Math.round(listing.estimatedCostOfProduction * 1.35),
        growthStage: 'Harvest Ready',
        riskScore: 15,
        recommendations: [],
      });
      setActiveTab('price');
    }
  };

  const handleContractCreated = (contract: MarketLinkageContract) => {
    setContracts([contract, ...contracts]);

    // Sync to MongoDB transactions
    fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        listing_id: contract.batchId || 'list-01',
        buyer_id: 'usr-b-01',
        agreed_price: Number((contract.agreedPricePerQtl / 100).toFixed(2)),
        quantity: (contract.quantityQuintals || 50) * 100,
        status: contract.escrowStatus === 'Escrow Funded (100%)' ? 'escrow_locked' : 'dispatched',
        notes: `KrishiSetu Escrow Contract #${contract.contractCode} with ${contract.buyerName}`,
        payment_reference: `ESCROW-DEP-${Date.now().toString().slice(-6)}`,
      }),
    }).catch((err) => console.warn('Sync transaction to MongoDB note:', err));
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      currentLanguage={currentLanguage}
      setCurrentLanguage={handleLanguageChange}
      onOpenAdvisory={() => setIsAdvisoryOpen(true)}
      currentUser={currentUser}
      onOpenAuth={handleOpenAuth}
      onLogout={handleLogout}
      selectedState={selectedState}
      setSelectedState={setSelectedState}
    >
      {/* Global User Session Feedback Toast / Banner */}
      {userNotification && (
        <div className="mb-4 bg-emerald-500 text-stone-950 px-4 py-2.5 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 shadow-md transition-all">
          <CheckCircle2 className="w-4 h-4 text-stone-950 flex-shrink-0" />
          <span>{userNotification}</span>
        </div>
      )}

      {/* Guest Mode Indicator */}
      {!currentUser && (
        <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 rounded-2xl text-xs flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-amber-950 font-display">Guest Mode Active.</span>
            <span className="hidden sm:inline text-stone-600">Log in or select a demo profile to manage farm harvest batches & contract escrows.</span>
          </div>
          <button
            onClick={() => handleOpenAuth('login')}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold rounded-xl text-xs cursor-pointer flex items-center gap-1 shadow-sm transition-colors"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Log In</span>
          </button>
        </div>
      )}

      {/* Active Tab View Rendering */}
      {activeTab === 'fairscore' && (
        <FairScoreInsights
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
          selectedState={selectedState}
          onNavigateToListing={(cropId, price, district) => {
            setPrefillLotCropId(cropId);
            setPrefillLotPrice(price);
            setPrefillLotDistrict(district);
            setOpenAddLotModal(true);
            setActiveTab('portfolio');
          }}
          onNavigateToMarket={(crop, price) => {
            setTargetFairPrice(price);
            setActiveTab('linkages');
          }}
          onOpenAdvisory={() => setIsAdvisoryOpen(true)}
        />
      )}

      {activeTab === 'yield' && (
        <YieldGrowthPredictor
          currentLanguage={currentLanguage}
          onNavigateToPriceEngine={handleNavigateToPriceEngine}
          initialWeatherRisk={prefillWeatherRisk}
          onNavigateToWeather={() => setActiveTab('weather')}
        />
      )}

      {activeTab === 'price' && (
        <PriceDiscoveryEngine
          currentLanguage={currentLanguage}
          prefillYield={prefillYield}
          prefillCrop={prefillCrop}
          onNavigateToLinkages={handleNavigateToLinkages}
          onCreateLot={handleCreateLotFromPriceEngine}
        />
      )}

      {activeTab === 'linkages' && (
        <MarketLinkagesHub
          currentLanguage={currentLanguage}
          initialCropId={prefillCrop?.id}
          fairFloorPrice={targetFairPrice}
          onContractCreated={handleContractCreated}
        />
      )}

      {activeTab === 'advisory' && (
        <AlertsAdvisoryHub
          currentLanguage={currentLanguage}
          onNavigateToFairScore={(crop) => {
            setActiveTab('fairscore');
          }}
          onNavigateToMarket={() => {
            setActiveTab('linkages');
          }}
          onOpenKisanChat={() => setIsAdvisoryOpen(true)}
        />
      )}

      {activeTab === 'mandi' && (
        <MandiTrendsMap
          currentLanguage={currentLanguage}
          selectedState={selectedState}
        />
      )}

      {activeTab === 'weather' && (
        <WeatherAlerts
          currentLanguage={currentLanguage}
          selectedState={selectedState}
          onNavigateToYield={(risk) => {
            setPrefillWeatherRisk(risk);
            setActiveTab('yield');
          }}
          onNavigateToPriceDiscovery={() => setActiveTab('price')}
        />
      )}

      {activeTab === 'portfolio' && (
        <FarmerPortfolio
          currentLanguage={currentLanguage}
          listings={listings}
          contracts={contracts}
          onAddListing={handleAddListing}
          onSelectListingForPrice={handleSelectListingForPrice}
          onUpdateAskingPrice={handleUpdateAskingPrice}
          onUpdateContractStatus={handleUpdateContractStatus}
          initialOpenAddModal={openAddLotModal}
          initialCropId={prefillLotCropId}
          initialAskingPrice={prefillLotPrice}
          initialDistrict={prefillLotDistrict}
          onModalClose={() => setOpenAddLotModal(false)}
          currentUser={currentUser}
          onOpenAuth={handleOpenAuth}
        />
      )}

      {activeTab === 'database' && (
        <MongoDatabaseHub
          currentLanguage={currentLanguage}
        />
      )}

      {activeTab === 'sihpitch' && (
        <SihDemoWalkthrough
          onSelectStepTab={(tab) => {
            setActiveTab(tab as any);
          }}
        />
      )}

      {/* Vernacular Voice Advisory Modal */}
      <VernacularAdvisoryModal
        isOpen={isAdvisoryOpen}
        onClose={() => setIsAdvisoryOpen(false)}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />

      {/* User Authentication & Logout Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        initialMode={authModalMode}
      />
    </DashboardLayout>
  );
}
