import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp, 
  CloudRain, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight, 
  Filter, 
  Volume2, 
  Sparkles,
  Calendar,
  MapPin,
  MessageSquareText,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface AdvisoryAlertItem {
  id: string;
  type: 'oversupply' | 'price' | 'weather' | 'opportunity';
  title: string;
  crop: string;
  location: string;
  message: string;
  actionText: string;
  actionRoute: 'fairscore' | 'weather' | 'advisory' | 'linkages';
  date: string;
  impactBadge: string;
  impactColor: string;
  audioAvailable?: boolean;
}

const INITIAL_ALERTS: AdvisoryAlertItem[] = [
  {
    id: 'alt-1',
    type: 'oversupply',
    title: 'High Oversupply Warning: Tomato Glut Detected',
    crop: 'Tomato',
    location: 'Mandya Taluk, Karnataka',
    message: '42% of registered farmers in Mandya have listed Tomato this week. Local APMC arrivals are up +38%. Spot prices are projected to experience 12–18% downward pressure over the next 10 days.',
    actionText: 'View Fair Price Band & Holding Economics',
    actionRoute: 'fairscore',
    date: 'Today, 08:30 AM',
    impactBadge: 'High Risk (Glut Alert)',
    impactColor: 'bg-rose-50 text-rose-800 border-rose-200',
    audioAvailable: true,
  },
  {
    id: 'alt-2',
    type: 'price',
    title: 'Price Trend Alert: Onion Firming Up in Lasalgaon',
    crop: 'Onion (Red)',
    location: 'Nashik / Lasalgaon, Maharashtra',
    message: 'Modal prices for Garwa Red Onion at Lasalgaon APMC have risen +₹110/Qtl over the last 48 hours due to export sorting demand. Farmers holding cured lots can target ₹2,350–₹2,450/Qtl.',
    actionText: 'Calculate Fair Baseline Asking Price',
    actionRoute: 'fairscore',
    date: 'Today, 06:15 AM',
    impactBadge: 'Bullish Opportunity',
    impactColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    audioAvailable: true,
  },
  {
    id: 'alt-3',
    type: 'weather',
    title: 'Harvest Weather Alert: Heavy Rain & Squall Forecast',
    crop: 'Wheat / Soybean',
    location: 'Kolar & Malwa Agro-Climatic Zone',
    message: 'IMD radar indicates 35–50mm unseasonal rain within 48 hours. Protect open-air threshing floors and accelerate solar poly-tunnel drying to prevent fungal discoloration.',
    actionText: 'Check 5-Day Hourly Weather Radar',
    actionRoute: 'weather',
    date: 'Yesterday, 04:45 PM',
    impactBadge: 'Weather Spoilage Threat',
    impactColor: 'bg-amber-50 text-amber-800 border-amber-200',
    audioAvailable: true,
  },
  {
    id: 'alt-4',
    type: 'opportunity',
    title: 'Crop Opportunity: Rising Demand for Sharbati Wheat',
    crop: 'Wheat (Sharbati)',
    location: 'Central & North India Mandis',
    message: 'Institutional flour millers (ITC, Adani, Cargill) are actively procuring bold Grade A Lokwan / Sharbati wheat at ₹2,800+/Qtl (+15% above statutory MSP). Consider sowing for the upcoming Rabi cycle.',
    actionText: 'Explore Verified Institutional Buyers',
    actionRoute: 'linkages',
    date: '2 days ago',
    impactBadge: 'Crop Diversification',
    impactColor: 'bg-sky-50 text-sky-800 border-sky-200',
    audioAvailable: false,
  },
];

interface AlertsAdvisoryHubProps {
  currentLanguage: Language;
  onNavigateToFairScore: (cropName?: string) => void;
  onNavigateToMarket: () => void;
  onOpenKisanChat: () => void;
}

export const AlertsAdvisoryHub: React.FC<AlertsAdvisoryHubProps> = ({
  currentLanguage,
  onNavigateToFairScore,
  onNavigateToMarket,
  onOpenKisanChat,
}) => {
  const t = getTranslation(currentLanguage);
  const [filterType, setFilterType] = useState<string>('all');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const filteredAlerts = INITIAL_ALERTS.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  const handlePlayAudio = (alertId: string) => {
    if (playingAudioId === alertId) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(alertId);
      setTimeout(() => setPlayingAudioId(null), 4000);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-stone-900 pb-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-sm">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold font-mono mb-3">
            <Bell className="w-4 h-4 text-[#1b4332]" />
            <span>KisanSetu Real-Time Advisory Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-stone-900">
            Pest, Climate & Market Glut Advisory Bulletin
          </h1>
          <p className="mt-1 text-stone-500 text-xs sm:text-sm leading-relaxed">
            AI-generated regional advisories, government scheme updates, and early warnings to protect your farm harvest value.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto font-mono text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              filterType === 'all' ? 'bg-[#1b4332] text-white font-extrabold shadow-xs' : 'bg-stone-50 text-stone-700 border border-stone-200'
            }`}
          >
            All Alerts ({INITIAL_ALERTS.length})
          </button>
          <button
            onClick={() => setFilterType('oversupply')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              filterType === 'oversupply' ? 'bg-[#1b4332] text-white font-extrabold shadow-xs' : 'bg-stone-50 text-stone-700 border border-stone-200'
            }`}
          >
            Glut & Oversupply
          </button>
          <button
            onClick={() => setFilterType('price')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              filterType === 'price' ? 'bg-[#1b4332] text-white font-extrabold shadow-xs' : 'bg-stone-50 text-stone-700 border border-stone-200'
            }`}
          >
            Price Trends
          </button>
          <button
            onClick={() => setFilterType('weather')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
              filterType === 'weather' ? 'bg-[#1b4332] text-white font-extrabold shadow-xs' : 'bg-stone-50 text-stone-700 border border-stone-200'
            }`}
          >
            Weather Spoilage
          </button>
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm space-y-3 relative">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${alert.impactColor}`}>
                  {alert.impactBadge}
                </span>
                <span className="text-xs text-stone-500 font-mono">• {alert.location}</span>
              </div>
              <span className="text-xs text-stone-400 font-mono">{alert.date}</span>
            </div>

            <h3 className="text-base font-extrabold text-stone-900 font-display">{alert.title}</h3>
            <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-200/80">
              {alert.message}
            </p>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => {
                  if (alert.actionRoute === 'fairscore') onNavigateToFairScore(alert.crop);
                  else if (alert.actionRoute === 'linkages') onNavigateToMarket();
                }}
                className="text-xs font-extrabold text-[#1b4332] hover:underline flex items-center gap-1.5 cursor-pointer font-mono"
              >
                <span>{alert.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {alert.audioAvailable && (
                <button
                  onClick={() => handlePlayAudio(alert.id)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg text-xs font-bold text-stone-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#1b4332]" />
                  <span>{playingAudioId === alert.id ? 'Playing Voice Advisory...' : 'Listen Advisory'}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
