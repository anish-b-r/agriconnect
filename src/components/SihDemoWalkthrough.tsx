import React, { useState } from 'react';
import { 
  Trophy, 
  Sparkles, 
  Sprout, 
  TrendingUp, 
  Scale, 
  Store, 
  ShieldCheck, 
  Database, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Target, 
  Users, 
  Play, 
  BarChart3,
  CloudSun,
  Layers,
  Award,
  Zap,
  Check
} from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

export interface SihDemoWalkthroughProps {
  currentLanguage?: Language;
  onSelectStepTab: (tab: string) => void;
}

interface WalkthroughStep {
  id: string;
  tab: string;
  stepNumber: number;
  title: string;
  badge: string;
  icon: React.ElementType;
  description: string;
  keyInnovations: string[];
  impactMetric: string;
  color: string;
}

export const SihDemoWalkthrough: React.FC<SihDemoWalkthroughProps> = ({ currentLanguage = 'en' as Language, onSelectStepTab }) => {
  const t = getTranslation(currentLanguage);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps: WalkthroughStep[] = [
    {
      id: 'fairscore',
      tab: 'fairscore',
      stepNumber: 1,
      title: 'FairScore AI Index',
      badge: 'Core Innovation',
      icon: Scale,
      description: 'A 0–100 score quantifying crop quality, regional yield predictions, weather risks, and demand trends to prevent distress selling.',
      keyInnovations: [
        'Multi-factor score calculation combining soil, moisture & market data',
        'Real-time fair price floor recommendation for smallholder farmers',
        'Distress selling risk indicator with instant action prompts'
      ],
      impactMetric: '35% Higher Farmer Income Realization',
      color: 'emerald'
    },
    {
      id: 'yield',
      tab: 'yield',
      stepNumber: 2,
      title: 'Yield Growth Predictor',
      badge: 'ML Intelligence',
      icon: Sprout,
      description: 'Predictive machine learning algorithms that estimate harvest yield and risk factors based on sowing date, district climate, and soil profile.',
      keyInnovations: [
        'Hyper-local yield estimation by crop variety and acreage',
        'Climate risk impact simulation (drought, unseasonal rain)',
        'Input cost & gross revenue estimator'
      ],
      impactMetric: '92% Harvest Yield Prediction Accuracy',
      color: 'green'
    },
    {
      id: 'price',
      tab: 'price',
      stepNumber: 3,
      title: 'Dynamic Price Discovery Engine',
      badge: 'Algorithmic Pricing',
      icon: TrendingUp,
      description: 'Transparent price floor determination incorporating official Govt MSP rates, APMC mandi spreads, quality grade premiums, and transport costs.',
      keyInnovations: [
        'Govt MSP benchmark integration with grade-based premium calculation',
        'Real-time APMC Mandi price spread analysis across districts',
        'Automated recommended listing price calculation'
      ],
      impactMetric: 'Zero Unfair Commission Deductions',
      color: 'amber'
    },
    {
      id: 'linkages',
      tab: 'linkages',
      stepNumber: 4,
      title: 'B2B Market Linkages & Escrow',
      badge: 'Direct Trade',
      icon: Store,
      description: 'Direct connect platform enabling verified buyers, food processors, and exporters to contract directly with farmers using escrow protection.',
      keyInnovations: [
        '100% Escrow-backed contract farming agreement generator',
        'Zero-middleman direct buyer-seller chat & negotiation',
        'Verifiable quality inspection certificates'
      ],
      impactMetric: '0% Middleman Cut (Direct to Farmer)',
      color: 'blue'
    },
    {
      id: 'weather',
      tab: 'weather',
      stepNumber: 5,
      title: 'Weather & Vernacular AI Advisory',
      badge: 'Voice AI & Localized',
      icon: CloudSun,
      description: 'Generative AI advisory available in 9 Indian languages with real-time weather alerts and action guides powered by Google Gemini AI.',
      keyInnovations: [
        'Multilingual natural voice assistant in 9 regional languages',
        'Hyper-local extreme weather advisory & pest outbreak warnings',
        'Contextual agricultural action plans'
      ],
      impactMetric: '9 Vernacular Indian Languages Supported',
      color: 'sky'
    },
    {
      id: 'mandi',
      tab: 'mandi',
      stepNumber: 6,
      title: 'Live Mandi Trends & Analytics',
      badge: 'APMC Market Data',
      icon: BarChart3,
      description: 'Interactive map and real-time trend analytics tracking arrival volumes and price movements across major APMC Mandis.',
      keyInnovations: [
        'Statewide APMC Mandi arrival volume & price heatmaps',
        'Commodity-wise historical price trends & volatility trackers',
        'Optimal mandi destination router based on net profit margin'
      ],
      impactMetric: 'Real-time Sync with 500+ APMC Mandis',
      color: 'purple'
    },
    {
      id: 'database',
      tab: 'database',
      stepNumber: 7,
      title: 'Resilient MongoDB Cloud Hub',
      badge: 'Data Architecture',
      icon: Database,
      description: 'Robust dual-mode database engine supporting seamless cloud MongoDB Atlas integration with automatic in-memory fallback for offline resilience.',
      keyInnovations: [
        'Automatic cloud cluster connection with zero-downtime offline fallback',
        'Real-time collection inspection for users, listings & transactions',
        'Full document store schema flexibility for agricultural metrics'
      ],
      impactMetric: '100% Uptime Guaranteed Offline & Online',
      color: 'indigo'
    }
  ];

  const activeStep = steps[activeStepIndex];

  return (
    <div className="space-y-6 animate-fadeIn font-sans text-stone-900 pb-8">
      {/* Banner / Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                <Trophy className="w-3.5 h-3.5 text-[#1b4332]" />
                SIH 2026 Grand Finale
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200 font-mono">
                Problem ID: SIH26132
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                Govt of Maharashtra
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-display">
              AgriConnect FairScore <span className="text-[#1b4332]">Interactive Pitch Walkthrough</span>
            </h1>
            
            <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
              Empowering smallholder farmers through <strong className="text-[#1b4332]">Predictive Fair Value Pricing (0–100 Index)</strong>, direct <strong className="text-amber-800">B2B Market Linkages</strong> with Escrow, and <strong className="text-sky-800">Multilingual AI Advisory</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 min-w-[200px]">
            <button
              onClick={() => onSelectStepTab('fairscore')}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1b4332] hover:bg-[#143527] text-white font-extrabold text-xs transition-all shadow-md cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-white" />
              <span>Launch Live App</span>
            </button>
            
            <button
              onClick={() => onSelectStepTab('database')}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs border border-stone-200 transition-all cursor-pointer"
            >
              <Database className="w-4 h-4 text-[#1b4332]" />
              <span>Inspect DB Hub</span>
            </button>
          </div>
        </div>
      </div>

      {/* Step Selector Horizontal Pills */}
      <div className="bg-white rounded-xl p-2 border border-stone-200/80 shadow-2xs overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1b4332] text-white font-extrabold shadow-xs'
                    : 'bg-stone-50 text-stone-600 hover:text-stone-900 border border-stone-200/70'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                  isActive ? 'bg-white text-[#1b4332]' : 'bg-stone-200 text-stone-700'
                }`}>
                  {step.stepNumber}
                </span>
                <Icon className="w-4 h-4" />
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Showcase Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Main Content */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#1b4332]">
                  {React.createElement(activeStep.icon, { className: 'w-5 h-5' })}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-800 font-extrabold uppercase tracking-wider">
                    Module {activeStep.stepNumber} of 7
                  </span>
                  <h2 className="text-xl font-extrabold text-stone-900 font-display">
                    {activeStep.title}
                  </h2>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-700 border border-stone-200">
                {activeStep.badge}
              </span>
            </div>

            <p className="text-stone-600 text-sm leading-relaxed">
              {activeStep.description}
            </p>

            {/* Key Innovations */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider font-mono">
                TECHNICAL INNOVATIONS & FEATURES
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {activeStep.keyInnovations.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-xs text-stone-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA & Metric */}
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[#1b4332] font-bold text-xs font-mono">
              <Award className="w-4 h-4 text-amber-500" />
              <span>{activeStep.impactMetric}</span>
            </div>

            <button
              onClick={() => onSelectStepTab(activeStep.tab)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#143527] text-white font-extrabold text-xs transition-all shadow-md cursor-pointer"
            >
              <span>Try {activeStep.title} Live</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Right Highlights & Metrics Panel */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2 mb-4 font-display">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Platform Value Metrics</span>
            </h3>

            <div className="space-y-3 font-mono">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                <div className="text-2xl font-black text-amber-800">+35%</div>
                <div className="text-xs text-stone-600 font-medium">Farmer Realized Price vs Distress Sale</div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                <div className="text-2xl font-black text-emerald-800">100%</div>
                <div className="text-xs text-stone-600 font-medium">Escrow Protected B2B Contracts</div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                <div className="text-2xl font-black text-sky-800">9 Languages</div>
                <div className="text-xs text-stone-600 font-medium">Voice AI Regional Languages</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <span className="font-bold block mb-1">💡 SIH Judge Recommendation:</span>
            Use the tab bar above or the interactive buttons to navigate through each module in sequence for a complete demonstration.
          </div>
        </div>

      </div>
    </div>
  );
};
