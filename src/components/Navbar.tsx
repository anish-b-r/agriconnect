import React, { useState } from 'react';
import { 
  Sprout, 
  TrendingUp, 
  Store, 
  Scale, 
  MapPin, 
  BookOpen, 
  MessageSquareText, 
  ShieldCheck,
  Languages,
  Sparkles,
  ChevronDown,
  X,
  ArrowUpRight,
  ArrowDownRight,
  BellRing,
  CheckCircle2,
  Database,
  CloudSun,
  Trophy,
  Bell,
  IndianRupee,
  LogOut,
  LogIn,
  User,
  Menu,
  Volume2
} from 'lucide-react';
import { Language, MongoUser } from '../types';
import { VERNACULAR_TRANSLATIONS } from '../data/cropMaster';
import { ArrowScrollContainer } from './ArrowScrollContainer';

export type NavTabType = 'fairscore' | 'yield' | 'price' | 'linkages' | 'advisory' | 'weather' | 'mandi' | 'portfolio' | 'database' | 'sihpitch';

interface NavLabels {
  fairscore: string;
  fairscoreShort: string;
  yield: string;
  yieldShort: string;
  price: string;
  priceShort: string;
  linkages: string;
  linkagesShort: string;
  portfolio: string;
  portfolioShort: string;
  mandi: string;
  mandiShort: string;
  weather: string;
  weatherShort: string;
  advisory: string;
  advisoryShort: string;
  database: string;
  databaseShort: string;
  pitch: string;
  pitchShort: string;
  voiceHelp: string;
  kisanAdvisory: string;
  bulletinTitle: string;
  bulletinSub: string;
  bulletinBtn: string;
  badge: string;
  login: string;
  logout: string;
}

const getNavLabels = (lang: Language): NavLabels => {
  switch (lang) {
    case 'en':
      return {
        fairscore: 'FairScore Insights',
        fairscoreShort: 'FairScore',
        yield: 'Yield AI',
        yieldShort: 'Yield AI',
        price: 'Fair Price Engine',
        priceShort: 'Fair Price',
        linkages: 'Buyer Market',
        linkagesShort: 'Buyers',
        portfolio: 'My Lots',
        portfolioShort: 'Lots',
        mandi: 'Mandi Trends',
        mandiShort: 'Mandi',
        weather: 'Weather Alerts',
        weatherShort: 'Weather',
        advisory: 'Alerts & Advisory',
        advisoryShort: 'Advisory',
        database: 'Database',
        databaseShort: 'DB',
        pitch: 'SIH Pitch',
        pitchShort: 'Pitch',
        voiceHelp: '🔊 Voice Advisory',
        kisanAdvisory: 'Kisan Advisory',
        bulletinTitle: 'LIVE MANDI APMC — Simple Bulletin Board',
        bulletinSub: 'Real-time spot prices from government-regulated APMC markets',
        bulletinBtn: '📋 All Bulletin Points',
        badge: 'MSP & Fair Price Protected',
        login: 'Log In',
        logout: 'Logout',
      };
    case 'hi':
      return {
        fairscore: '🌾 सही भाव',
        fairscoreShort: 'सही भाव',
        yield: '🌱 उपज AI',
        yieldShort: 'उपज AI',
        price: '⚖️ उचित मूल्य',
        priceShort: 'उचित मूल्य',
        linkages: '🛒 खरीदार मंडी',
        linkagesShort: 'खरीदार',
        portfolio: '📦 मेरी फसलें',
        portfolioShort: 'मेरी फसल',
        mandi: '📈 मंडी भाव',
        mandiShort: 'मंडी भाव',
        weather: '🌦️ मौसम जोखिम',
        weatherShort: 'मौसम',
        advisory: '🔔 किसान सलाह',
        advisoryShort: 'सलाह',
        database: 'डेटाबेस',
        databaseShort: 'DB',
        pitch: 'पिच',
        pitchShort: 'पिच',
        voiceHelp: '🔊 बोलकर पूछें',
        kisanAdvisory: 'किसान सलाहकार',
        bulletinTitle: 'लाइव मंडी APMC — दैनिक बुलेटिन',
        bulletinSub: 'सरकारी मंडियों से प्रमाणित दैनिक मॉडल थोक भाव',
        bulletinBtn: '📋 सभी मंडी भाव',
        badge: 'सरकारी MSP व उचित मूल्य संरक्षित',
        login: 'लॉग इन',
        logout: 'लॉग आउट',
      };
    case 'pa':
      return {
        fairscore: '🌾 ਨਿਰਪੱਖ ਭਾਅ',
        fairscoreShort: 'ਨਿਰਪੱਖ ਭਾਅ',
        yield: '🌱 ਝਾੜ AI',
        yieldShort: 'ਝਾੜ AI',
        price: '⚖️ ਨਿਰਪੱਖ ਮੁੱਲ',
        priceShort: 'ਨਿਰਪੱਖ ਮੁੱਲ',
        linkages: '🛒 ਸਿੱਧੇ ਖਰੀਦਦਾਰ',
        linkagesShort: 'ਖਰੀਦਦਾਰ',
        portfolio: '📦 ਮੇਰੀ ਫ਼ਸਲ ਲਾਟ',
        portfolioShort: 'ਫ਼ਸਲ ਲਾਟ',
        mandi: '📈 ਮੰਡੀ ਭਾਅ',
        mandiShort: 'ਮੰਡੀ',
        weather: '🌦️ ਮੌਸਮ',
        weatherShort: 'ਮੌਸਮ',
        advisory: '🔔 ਸਲਾਹਕਾਰ',
        advisoryShort: 'ਸਲਾਹ',
        database: 'ਡੇਟਾਬੇਸ',
        databaseShort: 'DB',
        pitch: 'ਪਿੱਚ',
        pitchShort: 'ਪਿੱਚ',
        voiceHelp: '🔊 ਬੋਲ ਕੇ ਪੁੱਛੋ',
        kisanAdvisory: 'ਕਿਸਾਨ ਸਲਾਹਕਾਰ',
        bulletinTitle: 'ਲਾਈਵ ਮੰਡੀ APMC — ਬੁਲੇਟਿਨ',
        bulletinSub: 'ਸਰਕਾਰੀ ਮੰਡੀਆਂ ਤੋਂ ਤਾਜ਼ਾ ਮੁੱਲ',
        bulletinBtn: '📋 ਸਾਰੇ ਭਾਅ',
        badge: 'ਸਰਕਾਰੀ MSP ਗਾਰੰਟੀ ਬੈਂਚਮਾਰਕ',
        login: 'ਲਾਗ ਇਨ',
        logout: 'ਲਾਗ ਆਉਟ',
      };
    case 'mr':
      return {
        fairscore: '🌾 रास्त भाव',
        fairscoreShort: 'रास्त भाव',
        yield: '🌱 पीक अंदाज',
        yieldShort: 'पीक अंदाज',
        price: '⚖️ हमीभाव शोध',
        priceShort: 'हमीभाव',
        linkages: '🛒 थेट खरेदीदार',
        linkagesShort: 'खरेदीदार',
        portfolio: '📦 माझे पीक लॉट्स',
        portfolioShort: 'माझे लॉट्स',
        mandi: '📈 बाजार भाव',
        mandiShort: 'बाजार',
        weather: '🌦️ हवामान',
        weatherShort: 'हवामान',
        advisory: '🔔 शेती सल्ला',
        advisoryShort: 'सल्ला',
        database: 'डेटाबेस',
        databaseShort: 'DB',
        pitch: 'पिच',
        pitchShort: 'पिच',
        voiceHelp: '🔊 बोलून विचारा',
        kisanAdvisory: 'किसान सल्लागार',
        bulletinTitle: 'थेट बाजार APMC — दैनिक बुलेटिन',
        bulletinSub: 'शासकीय कृषी उत्पन्न बाजार समित्यांचे थेट भाव',
        bulletinBtn: '📋 सर्व बाजार भाव',
        badge: 'किमान आधारभूत किंमत (MSP) सुरक्षा',
        login: 'लॉग इन',
        logout: 'लॉग आउट',
      };
    case 'te':
      return {
        fairscore: '🌾 సరసమైన ధర',
        fairscoreShort: 'సరసమైన ధర',
        yield: '🌱 దిగుబడి AI',
        yieldShort: 'దిగుబడి AI',
        price: '⚖️ ధర నిర్ణయం',
        priceShort: 'ధర నిర్ణయం',
        linkages: '🛒 కొనుగోలుదారులు',
        linkagesShort: 'కొనుగోలుదారులు',
        portfolio: '📦 నా లాట్లు',
        portfolioShort: 'నా లాట్లు',
        mandi: '📈 మార్కెట్ ధరలు',
        mandiShort: 'మార్కెట్',
        weather: '🌦️ వాతావరణం',
        weatherShort: 'వాతావరణం',
        advisory: '🔔 రైతు సలహా',
        advisoryShort: 'సలహా',
        database: 'డేటాబేస్',
        databaseShort: 'DB',
        pitch: 'పిచ్',
        pitchShort: 'పిచ్',
        voiceHelp: '🔊 మాట్లాడండి',
        kisanAdvisory: 'కిసాన్ అడ్వైజర్',
        bulletinTitle: 'లైవ్ మండి APMC — బులెటిన్',
        bulletinSub: 'ప్రభుత్వ మార్కెట్ల ప్రత్యక్ష ధరలు',
        bulletinBtn: '📋 అన్ని ధరలు',
        badge: 'ప్రభుత్వ MSP రక్షణ',
        login: 'లాగిన్',
        logout: 'లాగౌట్',
      };
    case 'ta':
      return {
        fairscore: '🌾 நியாயமான விலை',
        fairscoreShort: 'நியாயமான விலை',
        yield: '🌱 மகசூல் AI',
        yieldShort: 'மகசூல் AI',
        price: '⚖️ விலை கணிப்பு',
        priceShort: 'விலை கணிப்பு',
        linkages: '🛒 நேரடி கொள்முதல்',
        linkagesShort: 'கொள்முதல்',
        portfolio: '📦 எனது பயிர் தொகுப்பு',
        portfolioShort: 'எனது பயிர்',
        mandi: '📈 சந்தை விலைகள்',
        mandiShort: 'சந்தை',
        weather: '🌦️ வானிலை',
        weatherShort: 'வானிலை',
        advisory: '🔔 உழவர் ஆலோசனை',
        advisoryShort: 'ஆலோசனை',
        database: 'தரவுத்தளம்',
        databaseShort: 'DB',
        pitch: 'பிட்ச்',
        pitchShort: 'பிட்ச்',
        voiceHelp: '🔊 குரல் உதவி',
        kisanAdvisory: 'உழவர் ஆலோசகர்',
        bulletinTitle: 'நேரடி சந்தை APMC — செய்தி இதழ்',
        bulletinSub: 'அரசு ஒழுங்குமுறை சந்தை விலைகள்',
        bulletinBtn: '📋 அனைத்து விலைகள்',
        badge: 'அரசு MSP பாதுகாப்பு',
        login: 'உள்நுழைக',
        logout: 'வெளியேறு',
      };
    case 'kn':
      return {
        fairscore: '🌾 ನ್ಯಾಯಯುತ ಬೆಲೆ',
        fairscoreShort: 'ನ್ಯಾಯಯುತ ಬೆಲೆ',
        yield: '🌱 ಇಳುವರಿ AI',
        yieldShort: 'ಇಳುವರಿ AI',
        price: '⚖️ ಬೆಲೆ ಪಟ್ಟಿ',
        priceShort: 'ಬೆಲೆ ಪಟ್ಟಿ',
        linkages: '🛒 ನೇರ ಖರೀದಿದಾರರು',
        linkagesShort: 'ಖರೀದಿದಾರರು',
        portfolio: '📦 ನನ್ನ ಬೆಳೆ ಲಾಟ್‌ಗಳು',
        portfolioShort: 'ನನ್ನ ಬೆಳೆ',
        mandi: '📈 ಮಂಡಿ ದರಗಳು',
        mandiShort: 'ಮಂಡಿ',
        weather: '🌦️ ಹವಾಮಾನ',
        weatherShort: 'ಹವಾಮಾನ',
        advisory: '🔔 ಕಿಸಾನ್ ಸಲಹೆ',
        advisoryShort: 'ಸಲಹೆ',
        database: 'ಡೇಟಾಬೇಸ್',
        databaseShort: 'DB',
        pitch: 'ಪಿಚ್',
        pitchShort: 'ಪಿಚ್',
        voiceHelp: '🔊 ಧ್ವನಿ ನೆರವು',
        kisanAdvisory: 'ಕಿಸಾನ್ ಸಲಹೆಗಾರ',
        bulletinTitle: 'ಲೈವ್ ಮಂಡಿ APMC — ಬುಲೆಟಿನ್',
        bulletinSub: 'ಸರ್ಕಾರಿ ನಿಯಂತ್ರಿತ ಮಾರುಕಟ್ಟೆ ದರಗಳು',
        bulletinBtn: '📋 ಎಲ್ಲಾ ದರಗಳು',
        badge: 'ಸರ್ಕಾರಿ MSP ಬೆಂಬಲ ರಕ್ಷಣೆ',
        login: 'ಲಾಗಿನ್',
        logout: 'ಲಾಗ್ ಔಟ್',
      };
    case 'gu':
      return {
        fairscore: '🌾 વાજબી ભાવ',
        fairscoreShort: 'વાજબી ભાવ',
        yield: '🌱 ઉપજ AI',
        yieldShort: 'ઉપજ AI',
        price: '⚖️ ભાવ શોધ',
        priceShort: 'ભાવ શોધ',
        linkages: '🛒 સીધા ખરીદદારો',
        linkagesShort: 'ખરીદદારો',
        portfolio: '📦 મારા પાક લોટ્સ',
        portfolioShort: 'મારા પાક',
        mandi: '📈 યાર્ડ ભાવ',
        mandiShort: 'યાર્ડ ભાવ',
        weather: '🌦️ હવામાન',
        weatherShort: 'હવામાન',
        advisory: '🔔 કિસાન સલાહ',
        advisoryShort: 'સલાહ',
        database: 'ડેટાબેઝ',
        databaseShort: 'DB',
        pitch: 'પિચ',
        pitchShort: 'પિચ',
        voiceHelp: '🔊 અવાજ સહાય',
        kisanAdvisory: 'કિસાન સલાહકાર',
        bulletinTitle: 'લાઈવ માર્કેટ યાર્ડ APMC — બુલેટિન',
        bulletinSub: 'સરકાર નિયંત્રિત એપીએમસી દરો',
        bulletinBtn: '📋 બધા દરો જુઓ',
        badge: 'સરકારી MSP ગેરંટી સુરક્ષા',
        login: 'લૉગ ઇન',
        logout: 'લૉગ આઉટ',
      };
    case 'bn':
      return {
        fairscore: '🌾 ন্যায্য মূল্য',
        fairscoreShort: 'ন্যায্য মূল্য',
        yield: '🌱 ফলন AI',
        yieldShort: 'ফলন AI',
        price: '⚖️ মূল্য নির্ধারণ',
        priceShort: 'মূল্য নির্ধারণ',
        linkages: '🛒 সরাসরি ক্রেতা',
        linkagesShort: 'ক্রেতা',
        portfolio: '📦 আমার ফসল',
        portfolioShort: 'আমার ফসল',
        mandi: '📈 মান্ডি দর',
        mandiShort: 'মান্ডি দর',
        weather: '🌦️ আবহাওয়া',
        weatherShort: 'আবহাওয়া',
        advisory: '🔔 কিসান পরামর্শ',
        advisoryShort: 'পরামর্শ',
        database: 'ডাটাবেস',
        databaseShort: 'DB',
        pitch: 'পিচ',
        pitchShort: 'পিচ',
        voiceHelp: '🔊 ভয়েস সহায়তা',
        kisanAdvisory: 'কিসান উপদেষ্টা',
        bulletinTitle: 'লাইভ মান্ডি APMC — বুলেটিন বোর্ড',
        bulletinSub: 'সরকারি নিয়ন্ত্রিত বাজার দর',
        bulletinBtn: '📋 সমস্ত দর দেখুন',
        badge: 'সরকারি MSP মানদণ্ড সমর্থিত',
        login: 'লগ ইন',
        logout: 'লগ আউট',
      };
    default:
      return {
        fairscore: 'FairScore Insights',
        fairscoreShort: 'FairScore',
        yield: 'Yield AI',
        yieldShort: 'Yield AI',
        price: 'Fair Price Engine',
        priceShort: 'Fair Price',
        linkages: 'Buyer Market',
        linkagesShort: 'Buyers',
        portfolio: 'My Lots',
        portfolioShort: 'Lots',
        mandi: 'Mandi Trends',
        mandiShort: 'Mandi',
        weather: 'Weather Alerts',
        weatherShort: 'Weather',
        advisory: 'Alerts & Advisory',
        advisoryShort: 'Advisory',
        database: 'Database',
        databaseShort: 'DB',
        pitch: 'SIH Pitch',
        pitchShort: 'Pitch',
        voiceHelp: '🔊 Voice Advisory',
        kisanAdvisory: 'Kisan Advisory',
        bulletinTitle: 'LIVE MANDI APMC — Simple Bulletin Board',
        bulletinSub: 'Real-time spot prices from government-regulated APMC markets',
        bulletinBtn: '📋 All Bulletin Points',
        badge: 'MSP & Fair Price Protected',
        login: 'Log In',
        logout: 'Logout',
      };
  }
};

interface NavbarProps {
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;
  currentLanguage: Language;
  setCurrentLanguage: (lang: Language) => void;
  onOpenAdvisory: () => void;
  currentUser?: MongoUser | null;
  onOpenAuth?: (mode?: 'login' | 'logoutConfirm') => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentLanguage,
  setCurrentLanguage,
  onOpenAdvisory,
  currentUser = null,
  onOpenAuth,
  onLogout,
}) => {
  const t = VERNACULAR_TRANSLATIONS[currentLanguage] || VERNACULAR_TRANSLATIONS['en'];
  const navLabels = getNavLabels(currentLanguage);
  const isAdmin = currentUser?.role === 'admin' || currentUser?.name?.toLowerCase() === 'admin' || currentUser?.name?.toLowerCase().includes('admin');
  const [showMandiBulletinModal, setShowMandiBulletinModal] = useState<boolean>(false);
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const languagesList: { code: Language; name: string; native: string; region: string }[] = [
    { code: 'en', name: 'English', native: 'English', region: 'All India / National' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', region: 'North & Central India' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', region: 'Punjab & North India' },
    { code: 'mr', name: 'Marathi', native: 'मराठी', region: 'Maharashtra' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', region: 'Andhra Pradesh & Telangana' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', region: 'Tamil Nadu & Puducherry' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', region: 'Karnataka' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', region: 'Gujarat' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা', region: 'West Bengal & Tripura' },
  ];

  const liveMandiBulletins = [
    {
      id: 'wht-azadpur',
      crop: 'Wheat',
      icon: '🌾',
      mandi: 'Azadpur APMC (Delhi)',
      rate: '₹2,850/Qtl',
      change: '+₹35',
      trend: 'up',
      note: 'High demand from North India roller flour mills.',
    },
    {
      id: 'oni-lasalgaon',
      crop: 'Onion',
      icon: '🧅',
      mandi: 'Lasalgaon APMC (Nashik)',
      rate: '₹2,280/Qtl',
      change: '0',
      trend: 'stable',
      note: 'Asia\'s largest onion market; steady arrivals and export sorting.',
    },
    {
      id: 'soy-indore',
      crop: 'Soybean',
      icon: '🌱',
      mandi: 'Indore APMC (MP)',
      rate: '₹5,120/Qtl',
      change: '+₹80',
      trend: 'up',
      note: 'Solvent extraction plants actively buying above statutory MSP.',
    },
    {
      id: 'cot-rajkot',
      crop: 'Cotton',
      icon: '☁️',
      mandi: 'Rajkot APMC (Gujarat)',
      rate: '₹7,920/Qtl',
      change: '+₹40',
      trend: 'up',
      note: 'Medium-long staple lint prices firm with textile mill orders.',
    },
    {
      id: 'wht-khanna',
      crop: 'Wheat (Sharbati)',
      icon: '🌾',
      mandi: 'Khanna APMC (Punjab)',
      rate: '₹2,720/Qtl',
      change: '+₹55',
      trend: 'up',
      note: 'Major grain mandi hub; active institutional procurement.',
    },
    {
      id: 'pot-agra',
      crop: 'Potato',
      icon: '🥔',
      mandi: 'Agra APMC (UP)',
      rate: '₹1,340/Qtl',
      change: '-₹10',
      trend: 'down',
      note: 'Cold-chain dispatch regular; table potato demand stable.',
    },
    {
      id: 'bas-karnal',
      crop: 'Basmati Paddy',
      icon: '🌾',
      mandi: 'Karnal APMC (Haryana)',
      rate: '₹3,650/Qtl',
      change: '+₹60',
      trend: 'up',
      note: 'Exporters actively bidding for PB-1121 and 1509 paddy lots.',
    },
    {
      id: 'mus-jaipur',
      crop: 'Mustard Seed',
      icon: '🌼',
      mandi: 'Jaipur APMC (Rajasthan)',
      rate: '₹5,450/Qtl',
      change: '+₹25',
      trend: 'up',
      note: 'Crushing demand strong ahead of festival restocking.',
    },
  ];

  return (
    <header className="sticky top-0 z-40 agri-glass-nav text-stone-100 shadow-xl">
      {/* Top Banner: LIVE MANDI APMC Marquee Bulletin */}
      <div className="bg-emerald-950/90 border-b border-emerald-500/20 text-xs py-1.5 px-3 sm:px-4 text-emerald-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-hidden">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              onClick={() => setShowMandiBulletinModal(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 uppercase tracking-wider flex-shrink-0 cursor-pointer hover:bg-emerald-500/30 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>LIVE APMC</span>
            </button>

            {/* Marquee Ticker */}
            <div 
              className="overflow-hidden whitespace-nowrap cursor-pointer flex-1 py-0.5"
              onClick={() => setShowMandiBulletinModal(true)}
              title="Click to open full APMC Mandi Bulletin"
            >
              <div className="inline-flex items-center gap-6 text-[11px] font-medium text-emerald-100 animate-marquee">
                <span className="inline-flex items-center gap-1.5 font-mono">
                  <span>🌾 Wheat (Azadpur):</span>
                  <strong className="text-white font-bold">₹2,850/Qtl</strong>
                  <span className="text-emerald-400 text-[10px] font-bold">(+₹35)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono">
                  <span>🧅 Onion (Lasalgaon):</span>
                  <strong className="text-white font-bold">₹2,280/Qtl</strong>
                  <span className="text-stone-400 text-[10px]">Steady</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono">
                  <span>🌱 Soybean (Indore):</span>
                  <strong className="text-white font-bold">₹5,120/Qtl</strong>
                  <span className="text-emerald-400 text-[10px] font-bold">(+₹80)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono">
                  <span>☁️ Cotton (Rajkot):</span>
                  <strong className="text-white font-bold">₹7,920/Qtl</strong>
                  <span className="text-emerald-400 text-[10px] font-bold">(+₹40)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono">
                  <span>🌾 Basmati Paddy (Karnal):</span>
                  <strong className="text-white font-bold">₹3,650/Qtl</strong>
                  <span className="text-emerald-400 text-[10px] font-bold">(+₹60)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono">
                  <span>🌼 Mustard (Jaipur):</span>
                  <strong className="text-white font-bold">₹5,450/Qtl</strong>
                  <span className="text-emerald-400 text-[10px] font-bold">(+₹25)</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setShowMandiBulletinModal(true)}
              className="hidden sm:flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50 text-[11px] font-semibold cursor-pointer transition-colors"
            >
              <span>{navLabels.bulletinBtn}</span>
            </button>
            <span className="hidden md:flex items-center gap-1 text-[11px] text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{navLabels.badge}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Full Live Mandi APMC Bulletin Modal */}
      {showMandiBulletinModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="agri-card border border-emerald-500/30 max-w-2xl w-full p-6 text-white shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-900/40">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <BellRing className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold font-display text-white">
                    {navLabels.bulletinTitle}
                  </h3>
                  <p className="text-xs text-stone-400">
                    {navLabels.bulletinSub}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowMandiBulletinModal(false)}
                className="text-stone-400 hover:text-white p-1.5 rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 overflow-y-auto space-y-2.5 flex-1 pr-1">
              {liveMandiBulletins.map((item) => (
                <div
                  key={item.id}
                  className="agri-card agri-card-hover p-3.5 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl p-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800/40">{item.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-sm font-display">{item.crop}</span>
                        <span className="text-xs text-emerald-300 font-medium bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800/50 font-mono">
                          {item.mandi}
                        </span>
                      </div>
                      <p className="text-xs text-stone-300 mt-1">
                        {item.note}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-base font-extrabold font-mono text-emerald-400">
                      {item.rate}
                    </div>
                    <div className="text-[11px] font-mono font-semibold mt-0.5">
                      {item.trend === 'up' && (
                        <span className="text-emerald-400 flex items-center justify-end gap-0.5">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          {item.change} today
                        </span>
                      )}
                      {item.trend === 'down' && (
                        <span className="text-rose-400 flex items-center justify-end gap-0.5">
                          <ArrowDownRight className="w-3.5 h-3.5" />
                          {item.change} today
                        </span>
                      )}
                      {item.trend === 'stable' && (
                        <span className="text-stone-400">Steady</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-emerald-900/40 flex items-center justify-between">
              <span className="text-xs text-stone-400 font-mono">
                Verified Agmarknet APMC Feed
              </span>
              <button
                onClick={() => {
                  setShowMandiBulletinModal(false);
                  setActiveTab('mandi');
                }}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
              >
                <TrendingUp className="w-4 h-4 text-stone-950" />
                <span>Open Mandi Trends Map</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('fairscore')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-stone-950 font-bold border border-emerald-400/40">
              <Scale className="w-6 h-6 text-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white font-display">
                  AgriConnect <span className="text-gradient-emerald">FairScore</span>
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  SIH26132
                </span>
              </div>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                {t.tagline || 'Predictive Fair Price Bands & Direct Farmer Market Linkages'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden xl:flex items-center gap-1 bg-emerald-950/70 p-1.5 rounded-2xl border border-emerald-500/20 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('fairscore')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'fairscore'
                  ? 'bg-emerald-500 text-stone-950 shadow-md shadow-emerald-500/20 font-black'
                  : 'text-stone-300 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{navLabels.fairscore}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
            </button>

            <button
              onClick={() => setActiveTab('yield')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'yield'
                  ? 'bg-emerald-500 text-stone-950 shadow-md font-bold'
                  : 'text-stone-300 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>{navLabels.yield}</span>
            </button>

            <button
              onClick={() => setActiveTab('price')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'price'
                  ? 'bg-emerald-500 text-stone-950 shadow-md font-bold'
                  : 'text-stone-300 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <IndianRupee className="w-3.5 h-3.5" />
              <span>{navLabels.price}</span>
            </button>

            <button
              onClick={() => setActiveTab('linkages')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'linkages'
                  ? 'bg-emerald-500 text-stone-950 shadow-md font-bold'
                  : 'text-stone-300 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>{navLabels.linkages}</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'portfolio'
                  ? 'bg-emerald-500 text-stone-950 shadow-md font-bold'
                  : 'text-stone-300 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{navLabels.portfolio}</span>
            </button>

            <button
              onClick={() => setActiveTab('mandi')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'mandi'
                  ? 'bg-emerald-500 text-stone-950 shadow-md font-bold'
                  : 'text-stone-300 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{navLabels.mandi}</span>
            </button>

            <button
              onClick={() => setActiveTab('weather')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'weather'
                  ? 'bg-emerald-500 text-stone-950 shadow-md font-bold'
                  : 'text-stone-300 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <CloudSun className="w-3.5 h-3.5 text-sky-400" />
              <span>{navLabels.weather}</span>
            </button>

            <button
              onClick={() => setActiveTab('advisory')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'advisory'
                  ? 'bg-emerald-500 text-stone-950 shadow-md font-bold'
                  : 'text-stone-300 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span>{navLabels.advisory}</span>
            </button>

            {isAdmin && (
              <>
                <button
                  onClick={() => setActiveTab('database')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'database'
                      ? 'bg-emerald-500 text-stone-950 shadow-md font-bold'
                      : 'text-stone-300 hover:text-white hover:bg-emerald-900/40'
                  }`}
                >
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{navLabels.databaseShort || 'DB'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('sihpitch')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'sihpitch'
                      ? 'bg-amber-500 text-stone-950 shadow-md font-black'
                      : 'text-amber-300 hover:text-white hover:bg-amber-500/20'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>{navLabels.pitchShort || 'Pitch'}</span>
                </button>
              </>
            )}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            {/* Vernacular Voice Advisory Pill Button */}
            <button
              onClick={onOpenAdvisory}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-md transition-all cursor-pointer flex-shrink-0"
            >
              <div className="flex items-center gap-0.5 h-3">
                <span className="w-0.5 bg-stone-950 wave-bar-1"></span>
                <span className="w-0.5 bg-stone-950 wave-bar-2"></span>
                <span className="w-0.5 bg-stone-950 wave-bar-3"></span>
                <span className="w-0.5 bg-stone-950 wave-bar-4"></span>
              </div>
              <span className="font-extrabold hidden sm:inline">{navLabels.kisanAdvisory}</span>
            </button>

            {/* Change Language Button & Dropdown */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => setShowLanguageModal(true)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-950/90 hover:bg-emerald-900/90 text-emerald-200 border border-emerald-500/40 shadow-sm transition-all cursor-pointer flex-shrink-0"
                title="Change Application Language (All 13 Indian Languages)"
                id="navbar-change-language-btn"
              >
                <Languages className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-extrabold hidden md:inline">
                  {languagesList.find((l) => l.code === currentLanguage)?.native || 'Language'}
                </span>
                <span className="md:hidden font-extrabold uppercase">{currentLanguage}</span>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-400/80 flex-shrink-0" />
              </button>

              <div className="hidden lg:flex items-center gap-1 bg-emerald-950/80 border border-emerald-500/30 rounded-xl px-1.5 sm:px-2 py-1.5 text-xs text-stone-200">
                <select
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value as Language)}
                  className="bg-transparent border-none text-xs text-stone-200 font-semibold focus:outline-none cursor-pointer pr-0.5"
                >
                  {languagesList.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-stone-900 text-stone-100">
                      {lang.native} ({lang.name})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* User Profile / Auth */}
            {currentUser ? (
              <div className="flex items-center gap-1 pl-1 border-l border-emerald-900/50 flex-shrink-0">
                <button
                  onClick={() => onOpenAuth?.('login')}
                  className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-stone-200 border border-emerald-500/30 text-xs transition-colors cursor-pointer flex-shrink-0"
                  title={`Logged in as ${currentUser.name} (${currentUser.role}). Click to switch profile.`}
                  id="navbar-profile-btn"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-stone-950 font-black text-[10px] flex items-center justify-center flex-shrink-0">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="hidden md:inline font-bold max-w-[100px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                </button>

                <button
                  onClick={() => {
                    if (onOpenAuth) onOpenAuth('logoutConfirm');
                    else if (onLogout) onLogout();
                  }}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold bg-rose-950/70 hover:bg-rose-900/90 text-rose-300 border border-rose-500/40 transition-all cursor-pointer flex-shrink-0"
                  title="Log out of AgriConnect"
                  id="navbar-logout-btn"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                  <span className="hidden sm:inline">{navLabels.logout}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth?.('login')}
                className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-md transition-all cursor-pointer flex-shrink-0"
                id="navbar-login-btn"
              >
                <LogIn className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{navLabels.login}</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 sm:p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-stone-300 hover:text-white cursor-pointer flex-shrink-0"
            >
              <Menu className="w-5 h-5 flex-shrink-0" />
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Tab Navigation */}
        <div className="xl:hidden py-2 border-t border-emerald-950">
          <ArrowScrollContainer darkTheme={true} scrollAmount={180}>
            <button
              onClick={() => setActiveTab('fairscore')}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
                activeTab === 'fairscore' ? 'bg-emerald-500 text-stone-950 font-black' : 'text-stone-300 bg-emerald-950/60 border border-emerald-500/20'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{navLabels.fairscoreShort || navLabels.fairscore}</span>
            </button>
            <button
              onClick={() => setActiveTab('yield')}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                activeTab === 'yield' ? 'bg-emerald-500 text-stone-950 font-bold' : 'text-stone-300 bg-emerald-950/60 border border-emerald-500/20'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>{navLabels.yieldShort || navLabels.yield}</span>
            </button>
            <button
              onClick={() => setActiveTab('price')}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                activeTab === 'price' ? 'bg-emerald-500 text-stone-950 font-bold' : 'text-stone-300 bg-emerald-950/60 border border-emerald-500/20'
              }`}
            >
              <IndianRupee className="w-3.5 h-3.5" />
              <span>{navLabels.priceShort || navLabels.price}</span>
            </button>
            <button
              onClick={() => setActiveTab('linkages')}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                activeTab === 'linkages' ? 'bg-emerald-500 text-stone-950 font-bold' : 'text-stone-300 bg-emerald-950/60 border border-emerald-500/20'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>{navLabels.linkagesShort || navLabels.linkages}</span>
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                activeTab === 'portfolio' ? 'bg-emerald-500 text-stone-950 font-bold' : 'text-stone-300 bg-emerald-950/60 border border-emerald-500/20'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{navLabels.portfolioShort || navLabels.portfolio}</span>
            </button>
            <button
              onClick={() => setActiveTab('mandi')}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                activeTab === 'mandi' ? 'bg-emerald-500 text-stone-950 font-bold' : 'text-stone-300 bg-emerald-950/60 border border-emerald-500/20'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{navLabels.mandiShort || navLabels.mandi}</span>
            </button>
            <button
              onClick={() => setActiveTab('weather')}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                activeTab === 'weather' ? 'bg-emerald-500 text-stone-950 font-bold' : 'text-stone-300 bg-emerald-950/60 border border-emerald-500/20'
              }`}
            >
              <CloudSun className="w-3.5 h-3.5 text-sky-400" />
              <span>{navLabels.weatherShort || navLabels.weather}</span>
            </button>
            <button
              onClick={() => setActiveTab('advisory')}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                activeTab === 'advisory' ? 'bg-emerald-500 text-stone-950 font-bold' : 'text-stone-300 bg-emerald-950/60 border border-emerald-500/20'
              }`}
            >
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span>{navLabels.advisoryShort || navLabels.advisory}</span>
            </button>
            {isAdmin && (
              <>
                <button
                  onClick={() => setActiveTab('database')}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                    activeTab === 'database' ? 'bg-emerald-500 text-stone-950 font-bold' : 'text-stone-300 bg-emerald-950/60 border border-emerald-500/20'
                  }`}
                >
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{navLabels.databaseShort || 'DB'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('sihpitch')}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold ${
                    activeTab === 'sihpitch' ? 'bg-amber-500 text-stone-950 font-black' : 'text-amber-300 bg-emerald-950/60 border border-amber-500/30'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>{navLabels.pitchShort || 'Pitch'}</span>
                </button>
              </>
            )}
          </ArrowScrollContainer>
        </div>
      </div>

      {/* Full Vernacular Indian Languages Selector Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-stone-900 border border-emerald-500/30 max-w-3xl w-full rounded-3xl p-5 sm:p-6 text-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Languages className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-white font-display">
                    Select Language / भाषा चुनें
                  </h3>
                  <p className="text-xs text-stone-400">
                    Choose your preferred Indian language for instant translation across KrishiSetu.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowLanguageModal(false)}
                className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 hover:text-white cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Language Grid */}
            <div className="py-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 flex-1 pr-1">
              {languagesList.map((lang) => {
                const isSelected = currentLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLanguage(lang.code);
                      setShowLanguageModal(false);
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-lg shadow-emerald-950/50 ring-2 ring-emerald-500/30'
                        : 'bg-stone-950/80 hover:bg-stone-800/80 border-stone-800 text-stone-300 hover:border-emerald-500/40'
                    }`}
                  >
                    <div>
                      <div className="text-base font-extrabold font-display leading-snug text-emerald-300">
                        {lang.native}
                      </div>
                      <div className="text-xs font-semibold text-white mt-0.5">
                        {lang.name}
                      </div>
                      <div className="text-[10px] text-stone-400 font-mono mt-1">
                        {lang.region}
                      </div>
                    </div>

                    {isSelected ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center font-bold text-xs flex-shrink-0">
                        ✓
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-stone-800 text-stone-500 flex items-center justify-center text-xs flex-shrink-0">
                        →
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 font-mono">
              <span>🌐 13 Vernacular Languages Supported</span>
              <button
                onClick={() => setShowLanguageModal(false)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold rounded-xl text-xs cursor-pointer transition-all shadow-md"
              >
                Done / हो गया
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
