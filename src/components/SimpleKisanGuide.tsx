import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  PhoneCall, 
  ShieldCheck, 
  Clock
} from 'lucide-react';
import { Language } from '../types';
import { speakText, stopSpeech, isSpeechSupported } from '../utils/speechHelper';
import { getTranslation } from '../utils/translations';

interface SimpleKisanGuideProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenListCrop: (cropId: string, price: number, district: string) => void;
  onOpenAdvisory: () => void;
  onSelectCrop?: (cropId: string) => void;
}

interface RuralCropItem {
  id: string;
  icon: string;
  modal: number;
  msp: number;
  mandi: string;
  state: string;
  names: Record<Language, string>;
}

const RURAL_CROPS: RuralCropItem[] = [
  {
    id: 'wheat',
    icon: '🌾',
    modal: 2650,
    msp: 2425,
    mandi: 'Khanna / Ludhiana',
    state: 'Punjab',
    names: {
      en: 'Wheat (Sharbati)',
      hi: 'गेहूं (शरबती)',
      gu: 'ઘઉં (શરબતી / લોકવન)',
      bn: 'গম (শরবতী)',
      pa: 'ਕਣਕ (ਸ਼ਰਬਤੀ)',
      mr: 'गहू (लोकवन)',
      te: 'గోధుమ (Wheat)',
      ta: 'கோதுமை (Wheat)',
      kn: 'ಗೋಧಿ (Wheat)',
    },
  },
  {
    id: 'paddy_basmati',
    icon: '🍚',
    modal: 2320,
    msp: 2320,
    mandi: 'Karnal',
    state: 'Haryana',
    names: {
      en: 'Paddy / Basmati',
      hi: 'धान (बासमती)',
      gu: 'ડાંગર / ચોખા (બાસમતી)',
      bn: 'ধান (বাসমতী)',
      pa: 'ਝੋਨਾ (ਬਾਸਮਤੀ)',
      mr: 'भात / तांदूळ (बासमती)',
      te: 'వరి / వడ్లు (Paddy)',
      ta: 'நெல் (Paddy)',
      kn: 'ಭತ್ತ (Paddy)',
    },
  },
  {
    id: 'tomato',
    icon: '🍅',
    modal: 2180,
    msp: 1200,
    mandi: 'Mandya / Kolar',
    state: 'Karnataka',
    names: {
      en: 'Tomato (Hybrid)',
      hi: 'टमाटर (हाइब्रिड अभिनव)',
      gu: 'ટામેટા (હાઇબ્રિડ અભિનવ)',
      bn: 'টমেটো (হাইব্রিড)',
      pa: 'ਟਮਾਟਰ (ਹਾਈਬ੍ਰਿਡ)',
      mr: 'टोमॅटो (हायब्रिड)',
      te: 'టమోటా (Tomato)',
      ta: 'தக்காளி (Tomato)',
      kn: 'ಟೊಮ್ಯಾಟೊ (Tomato)',
    },
  },
  {
    id: 'onion',
    icon: '🧅',
    modal: 2280,
    msp: 1400,
    mandi: 'Lasalgaon / Nashik',
    state: 'Maharashtra',
    names: {
      en: 'Onion (Red)',
      hi: 'प्याज (लाल नासिक)',
      gu: 'ડુંગળી (લાલ નાસિક)',
      bn: 'পেঁয়াজ (লাল)',
      pa: 'ਪਿਆਜ਼ (ਲਾਲ)',
      mr: 'कांदा (लाल नाशिक)',
      te: 'ఉల్లిపాయ (Onion)',
      ta: 'வெங்காயம் (Onion)',
      kn: 'ಈರುಳ್ಳಿ (Onion)',
    },
  },
  {
    id: 'soybean',
    icon: '🌱',
    modal: 5120,
    msp: 4892,
    mandi: 'Indore',
    state: 'Madhya Pradesh',
    names: {
      en: 'Soybean (Yellow)',
      hi: 'सोयाबीन (पीला)',
      gu: 'સોયાબીન (પીળું)',
      bn: 'সয়াবিন (হলুদ)',
      pa: 'ਸੋਇਆਬੀਨ (ਪੀਲੀ)',
      mr: 'सोयाबीन (पिवळी)',
      te: 'సోయాబీన్ (Soybean)',
      ta: 'சோயாபீன் (Soybean)',
      kn: 'ಸೋಯಾಬೀನ್ (Soybean)',
    },
  },
  {
    id: 'mustard',
    icon: '🌻',
    modal: 5850,
    msp: 5950,
    mandi: 'Jaipur / Bharatpur',
    state: 'Rajasthan',
    names: {
      en: 'Mustard / Rapeseed',
      hi: 'सरसों / राई',
      gu: 'રાયડો / સરસવ',
      bn: 'সরিষা (Mustard)',
      pa: 'ਸਰ੍ਹੋਂ / ਰਾਇਆ',
      mr: 'मोहरी (Mustard)',
      te: 'ఆవాలు (Mustard)',
      ta: 'கடுகு (Mustard)',
      kn: 'ಸಾಸಿವೆ (Mustard)',
    },
  },
  {
    id: 'cotton',
    icon: '☁️',
    modal: 7850,
    msp: 7521,
    mandi: 'Rajkot / Gondal',
    state: 'Gujarat',
    names: {
      en: 'Cotton (Long Staple)',
      hi: 'कपास (लंबा रेशा)',
      gu: 'કપાસ (શંકર-૬ / લાંબો તાર)',
      bn: 'তুলা (Cotton)',
      pa: 'ਨਰਮਾ / ਕਪਾਹ',
      mr: 'कापूस (लांब धागा)',
      te: 'పత్తి (Cotton)',
      ta: 'பருத்தி (Cotton)',
      kn: 'ಹತ್ತಿ (Cotton)',
    },
  },
  {
    id: 'groundnut',
    icon: '🥜',
    modal: 6850,
    msp: 6783,
    mandi: 'Gondal / Junagadh',
    state: 'Gujarat',
    names: {
      en: 'Groundnut / Peanut',
      hi: 'मूंगफली (दाना)',
      gu: 'મગફળી (દાણા / તેલીબિયાં)',
      bn: 'চীনাবাদাম (Peanut)',
      pa: 'ਮੂੰਗਫਲੀ (Peanut)',
      mr: 'भुईमूग (शेंगदाणा)',
      te: 'వేరుశనగ (Groundnut)',
      ta: 'வேர்க்கடலை (Peanut)',
      kn: 'ಕಡಲೆಕಾಯಿ (Groundnut)',
    },
  },
];

export const SimpleKisanGuide: React.FC<SimpleKisanGuideProps> = ({
  currentLanguage,
  onLanguageChange,
  onOpenListCrop,
  onOpenAdvisory,
  onSelectCrop,
}) => {
  const t = getTranslation(currentLanguage);
  const [selectedCropId, setSelectedCropId] = useState<string>('wheat');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);

  useEffect(() => {
    setSpeechSupported(isSpeechSupported());
  }, []);

  const activeCrop = RURAL_CROPS.find((c) => c.id === selectedCropId) || RURAL_CROPS[0];
  const activeCropName = activeCrop.names[currentLanguage] || activeCrop.names['en'];

  const handleSpeech = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      return;
    }

    let textToSpeak = '';
    switch (currentLanguage) {
      case 'gu':
        textToSpeak = `આજે ${activeCropName} નો ${activeCrop.mandi} યાર્ડમાં વાજબી ભાવ ₹${activeCrop.modal} પ્રતિ ક્વિન્ટલ છે. સરકારી MSP ટેકાનો ભાવ ₹${activeCrop.msp} છે. તમે કોઈપણ વચેટિયા વગર સીધો પાક વેચી શકો છો.`;
        break;
      case 'bn':
        textToSpeak = `আজ ${activeCropName} এর ${activeCrop.mandi} মান্ডিতে ন্যায্য দর ₹${activeCrop.modal} প্রতি কুইন্টাল। সরকারি ন্যূনতম সহায়ক মূল্য ₹${activeCrop.msp}। আপনি কোনো দালাল ছাড়াই সরাসরি বিক্রি করতে পারেন।`;
        break;
      case 'pa':
        textToSpeak = `ਅੱਜ ${activeCropName} ਦਾ ${activeCrop.mandi} ਮੰਡੀ ਵਿੱਚ ਭਾਅ ₹${activeCrop.modal} ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਹੈ। ਸਰਕਾਰੀ MSP ₹${activeCrop.msp} ਹੈ।`;
        break;
      case 'mr':
        textToSpeak = `आज ${activeCropName} चा ${activeCrop.mandi} बाजारात भाव ₹${activeCrop.modal} प्रति क्विंटल आहे. शासकीय हमीभाव ₹${activeCrop.msp} आहे.`;
        break;
      case 'te':
        textToSpeak = `ఈరోజు ${activeCropName} మార్కెట్ ధర క్వింటాలుకు ₹${activeCrop.modal}. ప్రభుత్వ కనీస మద్దతు ధర ₹${activeCrop.msp}.`;
        break;
      case 'ta':
        textToSpeak = `இன்று ${activeCropName} சந்தை விலை குவிண்டாலுக்கு ₹${activeCrop.modal}. அரசு குறைந்தபட்ச ஆதரவு விலை ₹${activeCrop.msp}.`;
        break;
      case 'kn':
        textToSpeak = `ಇಂದು ${activeCropName} ಮಂಡಿ ಬೆಲೆ ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹${activeCrop.modal}. ಸರ್ಕಾರಿ MSP ₹${activeCrop.msp}.`;
        break;
      case 'hi':
        textToSpeak = `आज ${activeCropName} का ${activeCrop.mandi} मंडी में भाव ₹${activeCrop.modal} प्रति क्विंटल है। सरकारी समर्थन मूल्य ₹${activeCrop.msp} है। आप सीधे बिना दलाली के अपनी फसल बेच सकते हैं।`;
        break;
      default:
        textToSpeak = `Today's fair price for ${activeCropName} in ${activeCrop.mandi} mandi is ${activeCrop.modal} rupees per quintal. Government MSP benchmark is ${activeCrop.msp} rupees. You can sell your crop directly with zero middleman fee.`;
        break;
    }

    setIsSpeaking(true);
    const success = speakText(
      textToSpeak, 
      currentLanguage, 
      () => setIsSpeaking(true), 
      () => setIsSpeaking(false)
    );

    if (!success) setIsSpeaking(false);
  };

  return (
    <div className="bg-gradient-to-b from-emerald-950 via-stone-900 to-stone-950 rounded-3xl p-4 sm:p-6 text-white border-2 border-emerald-600/50 shadow-2xl relative overflow-hidden mb-8">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Quick Vernacular Language Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-emerald-500 text-stone-950 font-black flex items-center justify-center text-base shadow-sm">
            🌾
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-heading text-white flex items-center gap-2">
              <span>{t.simpleGuideTitle}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% Vernacular
              </span>
            </h2>
            <p className="text-xs text-stone-300">
              {t.simpleGuideSubtitle}
            </p>
          </div>
        </div>

        {/* 1-Tap Language Quick Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {[
            { code: 'hi', label: 'हिंदी' },
            { code: 'gu', label: 'ગુજરાતી' },
            { code: 'bn', label: 'বাংলা' },
            { code: 'pa', label: 'ਪੰਜਾਬੀ' },
            { code: 'mr', label: 'मराठी' },
            { code: 'te', label: 'తెలుగు' },
            { code: 'ta', label: 'தமிழ்' },
            { code: 'kn', label: 'ಕನ್ನಡ' },
            { code: 'en', label: 'English' },
          ].map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => onLanguageChange(l.code as Language)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
                currentLanguage === l.code
                  ? 'bg-emerald-500 text-stone-950 border-emerald-400 shadow-sm scale-105'
                  : 'bg-stone-800/90 text-stone-300 hover:bg-stone-700 border-stone-700'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Step Simple Rural Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
        
        {/* STEP 1: Crop Selection */}
        <div className="lg:col-span-5 bg-stone-900/90 border border-stone-800 p-4 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-black">1</span>
                <span>{t.step1ChooseCrop}</span>
              </span>
              <span className="text-[11px] text-stone-400">{t.oneClickSelect}</span>
            </div>

            <p className="text-xs text-stone-300 mb-3">
              {t.step1Help}
            </p>

            {/* Big Visual Crop Selection Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {RURAL_CROPS.map((crop) => {
                const isSelected = crop.id === selectedCropId;
                const localizedName = crop.names[currentLanguage] || crop.names['en'];
                const displayName = localizedName.split(' ')[0];
                return (
                  <button
                    key={crop.id}
                    type="button"
                    onClick={() => {
                      setSelectedCropId(crop.id);
                      if (onSelectCrop) onSelectCrop(crop.id);
                    }}
                    className={`p-2.5 rounded-xl text-left transition-all cursor-pointer flex flex-col items-center justify-center text-center border ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md ring-2 ring-emerald-400/60 scale-[1.02]'
                        : 'bg-stone-800/80 hover:bg-stone-700/80 text-stone-200 border-stone-700'
                    }`}
                  >
                    <span className="text-2xl mb-1">{crop.icon}</span>
                    <span className="text-xs font-bold leading-tight line-clamp-1">{displayName}</span>
                    <span className="text-[10px] text-stone-300">₹{crop.modal}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.freshDailyMandi}</span>
            </span>
            <span className="text-emerald-400 font-bold">{activeCrop.state}</span>
          </div>
        </div>

        {/* STEP 2: Today's Fair Rate */}
        <div className="lg:col-span-4 bg-emerald-950/40 border border-emerald-500/40 p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/30 text-emerald-300 flex items-center justify-center text-xs font-black">2</span>
                <span>{t.step2FairPrice}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <ShieldCheck className="w-3 h-3" />
                FairScore 88/100
              </span>
            </div>

            <div className="my-3">
              <div className="text-xs text-stone-300 flex items-center gap-1">
                <span>{activeCrop.icon}</span>
                <span className="font-semibold">{activeCropName}</span>
                <span className="text-stone-400">({activeCrop.mandi})</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono-num mt-1 flex items-baseline gap-2">
                <span>₹{activeCrop.modal.toLocaleString('en-IN')}</span>
                <span className="text-xs font-bold text-emerald-300">{t.quintalUnit}</span>
              </div>
            </div>

            {/* Comparison with MSP */}
            <div className="bg-stone-900/90 rounded-xl p-3 border border-stone-700/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-400">{t.mspGovRate}</span>
                <span className="font-bold text-amber-300 font-mono-num">₹{activeCrop.msp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-400">{t.middlemanSavings}</span>
                <span className="font-bold text-emerald-400">+₹{Math.round(activeCrop.modal * 0.10)} {t.quintalUnit.split(' ')[0]}</span>
              </div>
              <div className="pt-1.5 border-t border-stone-800 text-[11px] text-emerald-300 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t.rateComparisonBetter}</span>
              </div>
            </div>
          </div>

          {/* Audio Speak Button */}
          {speechSupported && (
            <button
              type="button"
              onClick={handleSpeech}
              className={`mt-4 w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                isSpeaking
                  ? 'bg-amber-500 text-stone-950 border-amber-400 animate-pulse'
                  : 'bg-stone-800 hover:bg-stone-700 text-emerald-300 border-emerald-500/40'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 text-stone-950" />
                  <span>{t.stopAudioBtn}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>{t.listenAudioBtn}</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* STEP 3: Sell Directly */}
        <div className="lg:col-span-3 bg-stone-900/90 border border-stone-800 p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-black">3</span>
                <span>{t.step3SellDirect}</span>
              </span>
            </div>

            <p className="text-xs text-stone-300 mb-4 leading-relaxed">
              {t.sellDirectDesc}
            </p>

            {/* Big Green Sell Button */}
            <button
              type="button"
              onClick={() => onOpenListCrop(activeCrop.id, activeCrop.modal, activeCrop.state)}
              className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-stone-950 font-black rounded-xl text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="kisan-guide-sell-btn"
            >
              <span>{t.listCropBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Help & Helpline */}
          <div className="mt-4 pt-3 border-t border-stone-800 space-y-2">
            <button
              type="button"
              onClick={onOpenAdvisory}
              className="w-full py-2 px-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{getTranslation(currentLanguage).aiAdvisory}</span>
            </button>

            <a
              href="tel:18001801551"
              className="block w-full py-2 px-3 text-center text-stone-400 hover:text-white bg-stone-800/80 rounded-xl text-[11px] font-semibold transition-colors border border-stone-700/60"
            >
              {t.kisanHelpline}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
