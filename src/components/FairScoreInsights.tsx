import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  MapPin, 
  IndianRupee, 
  Volume2, 
  TrendingUp, 
  BookOpen, 
  Phone, 
  Megaphone,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ReferenceLine 
} from 'recharts';
import { Language } from '../types';
import { CropIcon } from './CropIcons';
import { getTranslation } from '../utils/translations';

interface FairScoreInsightsProps {
  currentLanguage?: Language;
  onLanguageChange?: (lang: Language) => void;
  onNavigateToListing?: (cropId: string, askingPrice: number, district: string) => void;
  onNavigateToMarket?: (crop: string, price: number) => void;
  onOpenWeather?: (district: string) => void;
  onOpenAdvisory?: () => void;
  selectedState?: string;
}

interface CropOption {
  id: string;
  name: string;
  varietyName: string;
  modalPrice: number;
  msp: number;
  middlemanCommission: number;
  fairScore: number;
  location: string;
  yesterdayDiff: number;
  higherThanBaseline: boolean;
  trendData: { date: string; price: number }[];
}

const DASHBOARD_CROPS: CropOption[] = [
  {
    id: 'wheat',
    name: 'Wheat',
    varietyName: 'Wheat (Sharbati)',
    modalPrice: 2850,
    msp: 2275,
    middlemanCommission: 240,
    fairScore: 94,
    location: 'Ludhiana, Punjab',
    yesterdayDiff: 35,
    higherThanBaseline: true,
    trendData: [
      { date: 'Aug 28', price: 2780 },
      { date: 'Aug 31', price: 2800 },
      { date: 'Sep 3', price: 2820 },
      { date: 'Sep 6', price: 2840 },
      { date: 'Sep 9', price: 2850 },
    ],
  },
  {
    id: 'paddy',
    name: 'Paddy',
    varietyName: 'Basmati Paddy 1121',
    modalPrice: 4200,
    msp: 3835,
    middlemanCommission: 350,
    fairScore: 91,
    location: 'Karnal, Haryana',
    yesterdayDiff: 60,
    higherThanBaseline: true,
    trendData: [
      { date: 'Aug 28', price: 4050 },
      { date: 'Aug 31', price: 4100 },
      { date: 'Sep 3', price: 4150 },
      { date: 'Sep 6', price: 4180 },
      { date: 'Sep 9', price: 4200 },
    ],
  },
  {
    id: 'tomato',
    name: 'Tomato',
    varietyName: 'Tomato (Hybrid)',
    modalPrice: 1950,
    msp: 1600,
    middlemanCommission: 220,
    fairScore: 82,
    location: 'Kolar, Karnataka',
    yesterdayDiff: -40,
    higherThanBaseline: true,
    trendData: [
      { date: 'Aug 28', price: 2100 },
      { date: 'Aug 31', price: 2050 },
      { date: 'Sep 3', price: 2000 },
      { date: 'Sep 6', price: 1980 },
      { date: 'Sep 9', price: 1950 },
    ],
  },
  {
    id: 'onion',
    name: 'Onion',
    varietyName: 'Onion (Red Nashik)',
    modalPrice: 2650,
    msp: 2400,
    middlemanCommission: 290,
    fairScore: 88,
    location: 'Lasalgaon, Maharashtra',
    yesterdayDiff: 75,
    higherThanBaseline: true,
    trendData: [
      { date: 'Aug 28', price: 2450 },
      { date: 'Aug 31', price: 2500 },
      { date: 'Sep 3', price: 2550 },
      { date: 'Sep 6', price: 2600 },
      { date: 'Sep 9', price: 2650 },
    ],
  },
  {
    id: 'soybean',
    name: 'Soybean',
    varietyName: 'Soybean (Yellow)',
    modalPrice: 4680,
    msp: 4600,
    middlemanCommission: 380,
    fairScore: 86,
    location: 'Indore, Madhya Pradesh',
    yesterdayDiff: 20,
    higherThanBaseline: true,
    trendData: [
      { date: 'Aug 28', price: 4600 },
      { date: 'Aug 31', price: 4620 },
      { date: 'Sep 3', price: 4640 },
      { date: 'Sep 6', price: 4660 },
      { date: 'Sep 9', price: 4680 },
    ],
  },
  {
    id: 'mustard',
    name: 'Mustard',
    varietyName: 'Mustard (Pusa Bold)',
    modalPrice: 5850,
    msp: 5650,
    middlemanCommission: 480,
    fairScore: 89,
    location: 'Bharatpur, Rajasthan',
    yesterdayDiff: 50,
    higherThanBaseline: true,
    trendData: [
      { date: 'Aug 28', price: 5550 },
      { date: 'Aug 31', price: 5650 },
      { date: 'Sep 3', price: 5720 },
      { date: 'Sep 6', price: 5800 },
      { date: 'Sep 9', price: 5850 },
    ],
  },
  {
    id: 'cotton',
    name: 'Cotton',
    varietyName: 'Cotton (Shankar-6)',
    modalPrice: 7920,
    msp: 7121,
    middlemanCommission: 620,
    fairScore: 93,
    location: 'Rajkot, Gujarat',
    yesterdayDiff: 110,
    higherThanBaseline: true,
    trendData: [
      { date: 'Aug 28', price: 7400 },
      { date: 'Aug 31', price: 7550 },
      { date: 'Sep 3', price: 7700 },
      { date: 'Sep 6', price: 7820 },
      { date: 'Sep 9', price: 7920 },
    ],
  },
  {
    id: 'groundnut',
    name: 'Groundnut',
    varietyName: 'Groundnut (Bold 32)',
    modalPrice: 6850,
    msp: 6377,
    middlemanCommission: 510,
    fairScore: 87,
    location: 'Junagadh, Gujarat',
    yesterdayDiff: 45,
    higherThanBaseline: true,
    trendData: [
      { date: 'Aug 28', price: 6500 },
      { date: 'Aug 31', price: 6600 },
      { date: 'Sep 3', price: 6700 },
      { date: 'Sep 6', price: 6800 },
      { date: 'Sep 9', price: 6850 },
    ],
  },
];

const getCropLocalizedName = (cropId: string, cropName: string, lang: Language) => {
  const map: Record<string, Record<Language, string>> = {
    wheat: { en: 'Wheat', hi: 'गेहूं', pa: 'ਕਣਕ', mr: 'गहू', te: 'గోధుమలు', ta: 'கோதுமை', kn: 'ಗೋಧಿ', gu: 'ઘઉં', bn: 'গম' },
    paddy: { en: 'Paddy', hi: 'धान', pa: 'ਝੋਨਾ', mr: 'भात', te: 'వరి', ta: 'நெல்', kn: 'ಬತ್ತ', gu: 'ડાંગર', bn: 'ধান' },
    tomato: { en: 'Tomato', hi: 'टमाटर', pa: 'ਟਮਾਟਰ', mr: 'टोमॅटो', te: 'టమాటో', ta: 'தக்காளி', kn: 'ಟೊಮೆಟೊ', gu: 'ટામેટા', bn: 'টমেটো' },
    onion: { en: 'Onion', hi: 'प्याज', pa: 'ਪਿਆਜ਼', mr: 'कांदा', te: 'ఉల్లిపాయ', ta: 'வெங்காயம்', kn: 'ಈರುಳ್ಳಿ', gu: 'ડુંગળી', bn: 'পেঁয়াজ' },
    soybean: { en: 'Soybean', hi: 'सोयाबीन', pa: 'ਸੋਇਆਬੀਨ', mr: 'सोयाबीन', te: 'సోయాబీన్', ta: 'சோயாபீன்', kn: 'ಸೋಯಾಬೀನ್', gu: 'સોયાબીನ್', bn: 'সয়াবিন' },
    mustard: { en: 'Mustard', hi: 'सरसों', pa: 'ਸਰ੍ਹੋਂ', mr: 'मोहरी', te: 'ఆవాలు', ta: 'கடுகு', kn: 'ಸಾಸಿವೆ', gu: 'રાઈ', bn: 'সরষে' },
    cotton: { en: 'Cotton', hi: 'कपास', pa: 'ਕਪਾਹ', mr: 'कापूस', te: 'పత్తి', ta: 'பருத்தி', kn: 'ಹತ್ತಿ', gu: 'કપાસ', bn: 'তুলা' },
    groundnut: { en: 'Groundnut', hi: 'मूंगफली', pa: 'ਮੂੰਗਫਲੀ', mr: 'भुईमूग', te: 'వేరుశనగ', ta: 'நிலக்கடலை', kn: 'ಕಡಲೆಕಾಯಿ', gu: 'મગફળી', bn: 'বাদામ' },
  };
  return map[cropId]?.[lang] || cropName;
};

export const FairScoreInsights: React.FC<FairScoreInsightsProps> = ({
  currentLanguage = 'en',
  onNavigateToListing,
  onNavigateToMarket,
  onOpenAdvisory,
  selectedState = 'Punjab',
}) => {
  const lang: Language = (currentLanguage as Language) || 'en';
  const t = getTranslation(lang);
  const [selectedCropId, setSelectedCropId] = useState<string>('wheat');
  const [showCallCenterModal, setShowCallCenterModal] = useState<boolean>(false);
  const [showBulletinModal, setShowBulletinModal] = useState<boolean>(false);
  const [showAllCropsModal, setShowAllCropsModal] = useState<boolean>(false);

  const activeCrop = useMemo(() => {
    return DASHBOARD_CROPS.find((c) => c.id === selectedCropId) || DASHBOARD_CROPS[0];
  }, [selectedCropId]);

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      {/* Top Banner / Hero Title Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
        <div className="w-full lg:w-auto">
          <span className="text-[11px] font-extrabold text-stone-400 tracking-wider uppercase font-mono block mb-1">
            FAIRSCORE
          </span>
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-snug font-display mb-2 break-words">
            {t.rightPricesStrongerHarvests || 'Right Prices, Stronger Harvests'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 max-w-xl font-normal leading-relaxed">
            {t.simpleGuideSubtitle || 'Check real mandi rates, compare with government benchmarks, and sell directly to verified buyers.'}
          </p>
        </div>

        {/* Right Hero Banner Card with Farmland Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-sm border border-stone-200/80 w-full lg:w-[460px] min-h-[140px] sm:h-[155px] flex-shrink-0 bg-stone-100">
          <img 
            src="/assets/farmland_banner.jpg" 
            alt="Lush green Indian farmland" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/60 via-stone-950/30 to-transparent" />
          
          <div className="relative z-10 p-4 sm:p-5 flex flex-col justify-between h-full space-y-3">
            <div>
              <h3 className="text-base sm:text-xl font-extrabold text-white leading-snug drop-shadow-md font-display max-w-[260px]">
                {t.growingBrighterTomorrow || 'Growing a brighter tomorrow'}
              </h3>
              <div className="w-10 h-1 bg-emerald-400 rounded-full mt-1.5" />
            </div>

            <div className="self-start sm:self-end max-w-full">
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-stone-800 bg-white/95 backdrop-blur-md border border-stone-200 px-2.5 sm:px-3 py-1 rounded-full shadow-sm max-w-full truncate">
                <span className="truncate">{t.fairMarketsStrongerIndia || 'Fair markets for a stronger India.'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 3 Step Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* CARD 1: SELECT CROP (4 cols on lg) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#1b4332] text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0 font-mono shadow-sm">
                1
              </div>
              <div>
                <h3 className="text-base font-extrabold text-stone-900 font-display leading-tight">
                  {t.step1ChooseCrop || 'Select Crop'}
                </h3>
                <p className="text-xs text-stone-500 font-normal">
                  {t.step1Help || 'Choose a crop to view live mandi rates'}
                </p>
              </div>
            </div>

            {/* 2x4 Crop Grid */}
            <div className="grid grid-cols-2 gap-2.5 my-2">
              {DASHBOARD_CROPS.map((crop) => {
                const isSelected = crop.id === selectedCropId;
                return (
                  <button
                    key={crop.id}
                    onClick={() => setSelectedCropId(crop.id)}
                    className={`p-3 rounded-xl border text-center transition-all duration-150 cursor-pointer flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-white border-2 border-[#1b4332] shadow-sm text-stone-900'
                        : 'bg-white border-stone-200/80 hover:bg-stone-50/60 text-stone-700'
                    }`}
                  >
                    <CropIcon cropId={crop.id} className="w-10 h-10 mb-1.5" />
                    <span className="text-xs font-bold font-sans text-stone-900 block leading-snug">
                      {getCropLocalizedName(crop.id, crop.name, lang)}
                    </span>
                    <span className="text-[11px] font-extrabold text-stone-600 font-mono mt-0.5">
                      ₹{crop.modalPrice.toLocaleString('en-IN')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 mt-2">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {t.freshDailyMandi || 'Live rates from APMC mandis'}
            </span>
            <button 
              onClick={() => setShowAllCropsModal(true)}
              className="font-bold text-[#1b4332] hover:underline cursor-pointer flex items-center gap-1 text-xs"
            >
              {t.viewAll || 'View all crops'} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CARD 2: TODAY'S FAIR RATE (5 cols on lg) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-start justify-between gap-2 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1b4332] text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0 font-mono shadow-sm">
                  2
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-stone-900 font-display leading-tight">
                    {t.step2FairPrice || "Today's Fair Rate"}
                  </h3>
                  <p className="text-xs text-stone-500 font-normal">
                    {t.todaysFairRateSub || 'Live mandi rate and government benchmarks'}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-stone-200/90 text-stone-900 text-[11px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 flex-shrink-0 shadow-2xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1b4332]" />
                <span>{t.fairScoreIndex || 'FairScore'} <strong className="text-[#1b4332]">88/100</strong></span>
              </div>
            </div>

            {/* Active Crop Name & Location */}
            <div className="flex items-center gap-2 mb-2">
              <CropIcon cropId={activeCrop.id} className="w-6 h-6" />
              <span className="text-sm font-extrabold text-stone-900 font-display">
                {getCropLocalizedName(activeCrop.id, activeCrop.varietyName, lang)}
              </span>
              <span className="text-stone-300">|</span>
              <span className="text-xs text-stone-500 flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                {activeCrop.location}
              </span>
            </div>

            {/* Price Row */}
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-4">
              <span className="text-3xl sm:text-4xl font-black text-stone-950 font-display tracking-tight">
                ₹{activeCrop.modalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-stone-500 font-bold font-mono">
                {t.quintalUnit || '/ Quintal (100 kg)'}
              </span>
              <span className="sm:ml-auto text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full border border-stone-200/90 bg-white flex items-center gap-1 font-mono shadow-2xs">
                <span className={activeCrop.yesterdayDiff >= 0 ? 'text-[#1b4332]' : 'text-rose-600'}>
                  {activeCrop.yesterdayDiff >= 0 ? `+ ₹${activeCrop.yesterdayDiff}` : `- ₹${Math.abs(activeCrop.yesterdayDiff)}`}
                </span>
                <span className="text-stone-500 font-normal">{t.vsYesterday || 'vs. yesterday'}</span> ↗
              </span>
            </div>

            {/* Benchmark Sub-cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-stone-50/80 p-3 rounded-xl border border-stone-200/70">
                <span className="text-[11px] text-stone-500 font-medium block mb-1">
                  {t.mspGovRate || 'Government MSP'}
                </span>
                <span className="text-base font-extrabold text-stone-900 font-mono">
                  ₹{activeCrop.msp.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="bg-stone-50/80 p-3 rounded-xl border border-stone-200/70">
                <span className="text-[11px] text-stone-500 font-medium block mb-1">
                  {t.middlemanSavings || 'Middleman Commission (8–15%)'}
                </span>
                <span className="text-base font-extrabold text-stone-900 font-mono">
                  + ₹{activeCrop.middlemanCommission}
                </span>
              </div>
            </div>

            {/* Trend Recharts Graph */}
            <div className="h-32 w-full mt-2 relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeCrop.trendData} margin={{ top: 15, right: 15, left: 0, bottom: 0 }}>
                  <XAxis dataKey="date" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis domain={['auto', 'auto']} hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1b4332', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '11px', padding: '4px 8px' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    formatter={(val: any) => [`₹${val}`, 'Mandi Rate']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#10b981" 
                    strokeWidth={2.5} 
                    dot={{ fill: '#10b981', r: 4, stroke: '#fff', strokeWidth: 2 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
              {/* Badge Overlay on Graph */}
              <div className="absolute top-1 right-8 bg-[#1b4332] text-white font-mono text-[11px] font-extrabold px-2 py-0.5 rounded shadow-sm">
                ₹{activeCrop.modalPrice.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Baseline Alert Box */}
            <div className="bg-[#f0fdf4] border border-emerald-200/80 text-emerald-900 text-xs font-semibold p-3 rounded-xl flex items-center justify-between gap-2 mt-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{t.rateComparisonBetter || 'This rate is higher than the minimum support baseline.'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: SELL DIRECTLY (3 cols on lg) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#1b4332] text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0 font-mono shadow-sm">
                3
              </div>
              <div>
                <h3 className="text-base font-extrabold text-stone-900 font-display leading-tight">
                  {t.step3SellDirect || 'Sell Directly'}
                </h3>
                <p className="text-xs text-stone-500 font-normal">
                  {t.sellDirectDesc || 'Connect with verified corporate buyers (ITC, Adani, Cargill) and get guaranteed payment.'}
                </p>
              </div>
            </div>

            {/* List My Crop Action Button */}
            <button
              onClick={() => {
                if (onNavigateToListing) {
                  onNavigateToListing(activeCrop.id, activeCrop.modalPrice, activeCrop.location.split(',')[1]?.trim() || 'Ludhiana');
                }
              }}
              className="w-full bg-[#1b4332] hover:bg-[#143527] text-white font-extrabold text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all hover:shadow-lg active:scale-[0.99] mb-6"
            >
              <span>{t.listCropBtn || 'List My Crop Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* More Support Section */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-extrabold text-stone-400 uppercase tracking-wider block font-mono">
                {t.moreSupport || 'More Support'}
              </span>

              {/* Kisan Voice AI Advisory */}
              <button
                onClick={() => onOpenAdvisory && onOpenAdvisory()}
                className="w-full text-left p-3.5 rounded-xl bg-stone-50/80 hover:bg-stone-100/90 border border-stone-200/70 transition-all flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-stone-200/80 text-[#1b4332] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-stone-900 group-hover:text-[#1b4332] transition-colors">
                      {t.aiAdvisory || 'Kisan Voice AI Advisory'}
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      {t.supportDesc || 'Get price advice in your language'}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#1b4332] group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* Kisan Call Centre */}
              <button
                onClick={() => setShowCallCenterModal(true)}
                className="w-full text-left p-3.5 rounded-xl bg-stone-50/80 hover:bg-stone-100/90 border border-stone-200/70 transition-all flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-stone-200/80 text-[#1b4332] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-stone-900 group-hover:text-[#1b4332] transition-colors">
                      Kisan Call Centre
                    </h4>
                    <p className="text-[11px] text-stone-500 font-mono">
                      Toll-Free: 1800-180-1551
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#1b4332] group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Announcement / Bulletin Bar */}
      <div className="bg-white rounded-xl p-3.5 border border-stone-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs text-stone-700">
          <Megaphone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full font-mono">
            New
          </span>
          <span className="font-medium text-stone-800">
            {t.techModeActive || 'Detailed Technical Analysis and AI Models (Prophet/ARIMA) are now live.'}
          </span>
        </div>

        <button 
          onClick={() => setShowBulletinModal(true)}
          className="text-xs font-bold text-[#1b4332] hover:underline cursor-pointer flex items-center gap-1 font-sans flex-shrink-0"
        >
          {t.viewBulletinPoints || 'View Bulletin Points'} <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Kisan Call Centre Modal */}
      {showCallCenterModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 animate-scaleUp">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-stone-900 font-display">Kisan Call Centre</h3>
                <p className="text-xs text-stone-500">Government Toll-Free Agri Helpline</p>
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center my-4 font-mono">
              <span className="text-xs text-emerald-800 block mb-1">Direct Dial Line</span>
              <a href="tel:18001801551" className="text-2xl font-black text-emerald-950 hover:underline">
                1800-180-1551
              </a>
              <span className="text-[11px] text-stone-500 block mt-1">Available 6:00 AM - 10:00 PM (All 22 Languages)</span>
            </div>
            <button
              onClick={() => setShowCallCenterModal(false)}
              className="w-full py-2.5 bg-stone-900 text-[#ffffff] rounded-xl font-bold text-xs hover:bg-stone-800 transition-colors cursor-pointer"
            >
              {t.close || 'Close'}
            </button>
          </div>
        </div>
      )}

      {/* Bulletin Points Modal */}
      {showBulletinModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 animate-scaleUp space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-extrabold text-stone-900 font-display">
                  {t.apmcMarketBulletin || 'APMC Market Bulletin'}
                </h3>
              </div>
              <button onClick={() => setShowBulletinModal(false)} className="text-stone-400 hover:text-stone-700 font-bold text-sm">✕</button>
            </div>
            <div className="space-y-3 text-xs text-stone-700 max-h-[60vh] overflow-y-auto pr-2">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                <span className="font-bold text-stone-900 block mb-1">📈 Prophet/ARIMA Price Forecasting</span>
                <p className="text-stone-600">AI models now analyze historical mandi arrivals, weather anomaly risks, and international trade policies to forecast 14-day price corridors with 92% confidence.</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                <span className="font-bold text-stone-900 block mb-1">🛡️ 100% Escrow Protection</span>
                <p className="text-stone-600">Direct corporate buyer transactions (ITC, Adani, Cargill) are protected with bank-guaranteed escrow locks released upon quality verification.</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80">
                <span className="font-bold text-stone-900 block mb-1">🗣️ Voice AI Advisory in 9 Languages</span>
                <p className="text-stone-600">Farmers can listen to live mandi rate advice or speak queries in Punjabi, Hindi, Marathi, Gujarati, Kannada, Tamil, Telugu, and Bengali.</p>
              </div>
            </div>
            <button
              onClick={() => setShowBulletinModal(false)}
              className="w-full py-2.5 bg-[#1b4332] text-white rounded-xl font-bold text-xs hover:bg-[#143527] transition-colors cursor-pointer"
            >
              {t.doneBtn || 'Done'}
            </button>
          </div>
        </div>
      )}

      {/* All Crops Modal */}
      {showAllCropsModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 animate-scaleUp space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-extrabold text-stone-900 font-display">
                {t.allApmcMandiCrops || 'All APMC Mandi Crops'}
              </h3>
              <button onClick={() => setShowAllCropsModal(false)} className="text-stone-400 hover:text-stone-700 font-bold text-sm">✕</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto">
              {DASHBOARD_CROPS.map((crop) => (
                <div 
                  key={crop.id}
                  onClick={() => {
                    setSelectedCropId(crop.id);
                    setShowAllCropsModal(false);
                  }}
                  className="p-3 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/50 cursor-pointer transition-all text-center"
                >
                  <CropIcon cropId={crop.id} className="w-10 h-10 mx-auto mb-1.5" />
                  <span className="font-bold text-xs text-stone-900 block">{crop.name}</span>
                  <span className="text-[11px] font-extrabold text-emerald-800 font-mono">₹{crop.modalPrice}/Qtl</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
