import { Language } from '../types';

export interface TranslationDictionary {
  // Navigation & General
  appTitle: string;
  tagline: string;
  yieldPredictor: string;
  priceDiscovery: string;
  marketLinkages: string;
  mandiAnalytics: string;
  weatherAlerts: string;
  myFarmPortfolio: string;
  aiAdvisory: string;
  predictYieldBtn: string;
  calculatePriceBtn: string;
  connectBuyersBtn: string;
  heroBadge: string;
  mspNotice: string;
  escrowGuaranteed: string;
  middlemanSaved: string;

  // Simple Kisan Guide
  simpleGuideTitle: string;
  simpleGuideSubtitle: string;
  step1ChooseCrop: string;
  step1Help: string;
  step2FairPrice: string;
  step3SellDirect: string;
  sellDirectDesc: string;
  listCropBtn: string;
  listenAudioBtn: string;
  stopAudioBtn: string;
  kisanHelpline: string;
  mspGovRate: string;
  middlemanSavings: string;
  rateComparisonBetter: string;
  oneClickSelect: string;
  freshDailyMandi: string;

  // FairScore Insights
  fairScoreHeaderTitle: string;
  fairScoreHeaderSub: string;
  selectDistrictTaluk: string;
  selectCropType: string;
  currentModalPrice: string;
  predictedPriceBand: string;
  fairScoreIndex: string;
  oversupplyRisk: string;
  simulatedAskingPrice: string;
  listMyCropAt: string;
  bandFloor: string;
  optimalMid: string;
  bandCeiling: string;
  oversupplyWarning: string;
  simpleViewToggle: string;
  technicalViewToggle: string;
  simpleModeActive: string;
  techModeActive: string;

  // Price Discovery Engine
  fairBaselineTitle: string;
  fairBaselineDesc: string;
  qualityGradingTitle: string;
  moisturePercent: string;
  foreignMatter: string;
  brokenGrains: string;
  colorLuster: string;
  superiorBright: string;
  standardGrade: string;
  costOfProduction: string;
  volumeQuintals: string;
  calculateFairBtn: string;
  connectBuyersAction: string;

  // Market Linkages
  marketLinkageTitle: string;
  marketLinkageSub: string;
  verifiedBuyers: string;
  allBuyers: string;
  negotiateBtn: string;
  createContractBtn: string;
  escrowProtectedBadge: string;
  counterOffer: string;
  buyerBid: string;

  // Common UI
  quintalUnit: string;
  loading: string;
  close: string;
  viewAll: string;
  saveChanges: string;
  share: string;
  back: string;

  // Advisory & Alerts
  alertsAdvisoryTitle?: string;
  alertsAdvisorySub?: string;
  askKisanAI?: string;

  // Portfolio
  portfolio?: string;
  portfolioTitle?: string;
  portfolioSub?: string;
  activeLotsPricing?: string;
  transactionHistory?: string;
  listMyCrop?: string;
  compareLots?: string;
  escrowProtected?: string;

  // Mandi Trends
  mandiTrends?: string;
  mandiTrendsTitle?: string;
  mandiTrendsSub?: string;

  // Yield AI
  yieldAI?: string;
  yieldPredictionTitle?: string;
  yieldPredictionSub?: string;

  // Extended UI Keys
  rightPricesStrongerHarvests?: string;
  growingBrighterTomorrow?: string;
  fairMarketsStrongerIndia?: string;
  todaysFairRateSub?: string;
  vsYesterday?: string;
  listenRateUpdate?: string;
  playingVoiceAdvisory?: string;
  moreSupport?: string;
  supportDesc?: string;
  searchPlaceholder?: string;
  selectLanguageModalTitle?: string;
  selectLanguageModalSub?: string;
  nineLanguagesSupported?: string;
  doneBtn?: string;
  empoweringFarmers?: string;
  support?: string;
  settings?: string;
  databaseHub?: string;
  sihPitch?: string;
  apmcMarketBulletin?: string;
  viewBulletinPoints?: string;
  allApmcMandiCrops?: string;
  liveNotifications?: string;

  [key: string]: any;
}

export const APP_TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    appTitle: 'AgriConnect FairScore',
    tagline: 'Predictive Fair-Value & Direct Market-Linkage Platform for Farmers (SIH26132)',
    yieldPredictor: 'Yield & Growth AI',
    priceDiscovery: 'FairScore Insights & Band',
    marketLinkages: 'Direct Farmer ↔ Buyer Market',
    mandiAnalytics: 'Mandi Arbitrage & Trends',
    weatherAlerts: 'Weather & Harvest Risks',
    myFarmPortfolio: 'My Harvests & Lots',
    aiAdvisory: 'Kisan Voice AI Advisory',
    predictYieldBtn: 'Predict Yield & Cost of Production',
    calculatePriceBtn: 'Calculate Fair Baseline Price',
    connectBuyersBtn: 'Explore Institutional Buyers',
    heroBadge: 'SIH26132 • Government Aligned MSP Benchmark',
    mspNotice: 'Statutory MSP Benchmark Floor Protection',
    escrowGuaranteed: '100% Payment Escrow Protected',
    middlemanSaved: 'Save 8–15% Middleman Commission',

    simpleGuideTitle: 'Simple Kisan Guide',
    simpleGuideSubtitle: 'Select your language • Know today\'s fair mandi rate • Sell directly to verified buyers',
    step1ChooseCrop: '1. Select Crop',
    step1Help: 'Tap the crop you want to check rate or sell:',
    step2FairPrice: '2. Today\'s Fair Rate',
    step3SellDirect: '3. Sell Directly',
    sellDirectDesc: 'Sell directly to verified corporate buyers (ITC, Adani, Cargill) with guaranteed bank payment.',
    listCropBtn: '🌾 List My Crop Now',
    listenAudioBtn: '🔊 Listen Rate Aloud',
    stopAudioBtn: 'Stop Audio',
    kisanHelpline: '📞 Kisan Call Centre (Toll-Free): 1800-180-1551',
    mspGovRate: 'Government MSP Benchmark:',
    middlemanSavings: 'Middleman Commission Saved (8-15%):',
    rateComparisonBetter: 'This rate is higher than minimum support baseline.',
    oneClickSelect: '1-Click Selection',
    freshDailyMandi: 'Fresh Daily APMC Mandi Rates',

    fairScoreHeaderTitle: 'FairScore Insights & Price Band Engine',
    fairScoreHeaderSub: 'Real-time district-level fair price index powered by daily Agmarknet trends, AI forecasting, and oversupply alerts.',
    selectDistrictTaluk: 'Select District & Taluk',
    selectCropType: 'Select Commodity Crop',
    currentModalPrice: 'Current Modal Price',
    predictedPriceBand: 'Predicted Fair Price Band',
    fairScoreIndex: 'FairScore Index',
    oversupplyRisk: 'Oversupply Risk',
    simulatedAskingPrice: 'Interactive FairScore Simulator (Asking Price)',
    listMyCropAt: 'List My Crop at',
    bandFloor: 'Band Floor',
    optimalMid: 'Optimal Mid',
    bandCeiling: 'Band Ceiling',
    oversupplyWarning: 'Oversupply Early-Warning Alert',
    simpleViewToggle: 'Collapse to Simple View',
    technicalViewToggle: 'Expand All Analytics (SIH26132)',
    simpleModeActive: 'Simple Kisan Mode is Active — tap to view full technical analytics',
    techModeActive: 'Detailed Technical Analysis and AI Models (Prophet/ARIMA) are Active',

    fairBaselineTitle: 'Transparent Price Realization & Swaminathan Parity',
    fairBaselineDesc: 'Protect your harvest against middleman cartelization with dynamic fair baseline floor prices.',
    qualityGradingTitle: 'Harvest Quality Assay & Lab Parameters',
    moisturePercent: 'Moisture Content (%)',
    foreignMatter: 'Foreign Matter (%)',
    brokenGrains: 'Broken Grains (%)',
    colorLuster: 'Color & Luster Grade',
    superiorBright: 'Superior / Bright',
    standardGrade: 'Standard',
    costOfProduction: 'Farmer Cost of Production (₹/Qtl)',
    volumeQuintals: 'Lot Volume (Quintals)',
    calculateFairBtn: 'Calculate Dynamic Fair Price',
    connectBuyersAction: 'Connect with Verified Buyers at Fair Price',

    marketLinkageTitle: 'Direct Farmer ↔ Institutional Buyer Marketplace',
    marketLinkageSub: 'Eliminate middlemen fees. Trade directly with verified mills, processors, and exporters with 100% escrow.',
    verifiedBuyers: 'Verified Institutional Buyers',
    allBuyers: 'All Buyers',
    negotiateBtn: 'AI Negotiate & Counter',
    createContractBtn: 'Create Escrow Contract',
    escrowProtectedBadge: '100% Escrow Protected',
    counterOffer: 'Counter-Offer Price',
    buyerBid: 'Buyer Offered Bid',

    quintalUnit: '/ Quintal (100 kg)',
    loading: 'Loading...',
    close: 'Close',
    viewAll: 'View All',
    saveChanges: 'Save Changes',
    share: 'Share',
    back: 'Back',
  },

  hi: {
    appTitle: 'एग्रीकनेक्ट फेयरस्कोर',
    tagline: 'किसानों के लिए सटीक मूल्य पूर्वानुमान, 0-100 फेयरस्कोर और सीधा बाजार संपर्क (SIH26132)',
    yieldPredictor: 'उपज और लागत AI',
    priceDiscovery: 'फेयरस्कोर इनसाइट्स व बैंड',
    marketLinkages: 'सीधे खरीदार और अनुबंध',
    mandiAnalytics: 'मंडी भाव और रुझान',
    weatherAlerts: 'मौसम और कटाई जोखिम',
    myFarmPortfolio: 'मेरी फसल लॉट व पास',
    aiAdvisory: 'किसान वॉयस AI सलाहकार',
    predictYieldBtn: 'उपज और उत्पादन लागत का अनुमान लगाएं',
    calculatePriceBtn: 'उचित बेसलाइन मूल्य की गणना करें',
    connectBuyersBtn: 'संस्थागत खरीदारों से जुड़ें',
    heroBadge: 'SIH26132 • भारत सरकार एवं कृषि ढांचा समर्थित',
    mspNotice: 'न्यूनतम समर्थन मूल्य (MSP) गारंटी बेंचमार्क',
    escrowGuaranteed: '100% एस्क्रो भुगतान सुरक्षित',
    middlemanSaved: '8-15% बिचौलिया कमीशन की सीधी बचत',

    simpleGuideTitle: 'सरल किसान साथी',
    simpleGuideSubtitle: 'अपनी भाषा चुनें • मंडी का सही भाव जानें • सीधे खरीदार को बेचें',
    step1ChooseCrop: '1. फसल चुनें (Choose Crop)',
    step1Help: 'जिस फसल का भाव देखना या बेचना चाहते हैं, उस पर टैप करें:',
    step2FairPrice: '2. आज का सही भाव (Fair Rate)',
    step3SellDirect: '3. फसल बेचें (Sell Crop)',
    sellDirectDesc: 'बिना किसी बिचौलिए के सीधे संस्थागत खरीदारों (ITC, Cargill, Adani) को बेचें और पक्का बैंक भुगतान पाएं।',
    listCropBtn: '🌾 अपनी फसल लिस्ट करें',
    listenAudioBtn: '🔊 बोलकर सुनें (Listen Rate Aloud)',
    stopAudioBtn: 'आवाज़ रोकें (Stop Audio)',
    kisanHelpline: '📞 किसान कॉल सेंटर (टोल-फ्री): 1800-180-1551',
    mspGovRate: 'सरकारी MSP समर्थन मूल्य:',
    middlemanSavings: 'दलाल कमीशन बचत (8-15%):',
    rateComparisonBetter: 'यह भाव सरकारी समर्थन मूल्य से बेहतर है।',
    oneClickSelect: 'एक क्लिक में चुनें',
    freshDailyMandi: '100% सरकारी APMC आंकड़े',

    fairScoreHeaderTitle: 'फेयरस्कोर इनसाइट्स व मूल्य बैंड इंजन',
    fairScoreHeaderSub: 'दैनिक एगमार्कनेट रुझान, एआई पूर्वानुमान और ओवरसप्लाई अलर्ट के साथ वास्तविक समय का मूल्य सूचकांक।',
    selectDistrictTaluk: 'जिला और तालुका चुनें',
    selectCropType: 'फसल / जिंस चुनें',
    currentModalPrice: 'वर्तमान मंडी भाव',
    predictedPriceBand: 'अनुमानित उचित मूल्य बैंड',
    fairScoreIndex: 'फेयरस्कोर इंडेक्स',
    oversupplyRisk: 'अधिक आवक जोखिम',
    simulatedAskingPrice: 'इंटरएक्टिव फेयरस्कोर सिम्युलेटर (मांग भाव)',
    listMyCropAt: 'इस भाव पर फसल लिस्ट करें:',
    bandFloor: 'बैंड न्यूनतम',
    optimalMid: 'सर्वोत्तम मध्य',
    bandCeiling: 'बैंड अधिकतम',
    oversupplyWarning: 'अत्यधिक आवक चेतावनी (Oversupply Alert)',
    simpleViewToggle: 'सरल दृश्य में समेटें',
    technicalViewToggle: 'विस्तृत विश्लेषक दृश्य देखें (SIH26132)',
    simpleModeActive: 'सरल किसान मोड चालू है — तकनीकी विवरण देखने के लिए बटन दबाएं',
    techModeActive: 'विस्तृत तकनीकी विश्लेषण और एआई मॉडल सक्रिय हैं',

    fairBaselineTitle: 'पारदर्शी मूल्य प्राप्ति और स्वामीनाथन C2+50% पैरिटी',
    fairBaselineDesc: 'वास्तविक उत्पादन लागत, एमएसपी और गुणवत्ता के आधार पर अपनी फसल को बिचौलियों से सुरक्षित करें।',
    qualityGradingTitle: 'फसल गुणवत्ता परख व लैब पैरामीटर्स',
    moisturePercent: 'नमी की मात्रा (%)',
    foreignMatter: 'विदेशी तत्व / कचरा (%)',
    brokenGrains: 'टूटे हुए दाने (%)',
    colorLuster: 'रंग और चमक ग्रेड',
    superiorBright: 'उत्कृष्ट / चमकदार',
    standardGrade: 'मानक (स्टैंडर्ड)',
    costOfProduction: 'किसान की उत्पादन लागत (₹/क्विंटल)',
    volumeQuintals: 'कुल मात्रा (क्विंटल)',
    calculateFairBtn: 'सटीक उचित भाव निकालें',
    connectBuyersAction: 'सत्यापित खरीदारों से उचित भाव पर जुड़ें',

    marketLinkageTitle: 'सीधे किसान ↔ संस्थागत खरीदार मंडी',
    marketLinkageSub: 'बिचौलियों का कमीशन हटाएं। १००% सुरक्षित एस्क्रो के साथ सीधे मिलों और निर्यातकों को बेचें।',
    verifiedBuyers: 'सत्यापित संस्थागत खरीदार',
    allBuyers: 'सभी खरीदार',
    negotiateBtn: 'AI मोलभाव व काउंटर',
    createContractBtn: 'एस्क्रो अनुबंध बनाएं',
    escrowProtectedBadge: '100% एस्क्रो सुरक्षित',
    counterOffer: 'जवाबी भाव प्रस्ताव',
    buyerBid: 'खरीदार की बोली',

    quintalUnit: '/ क्विंटल (100 kg)',
    loading: 'लोड हो रहा है...',
    close: 'बंद करें',
    viewAll: 'सभी देखें',
    saveChanges: 'परिवर्तन सहेजें',
    share: 'साझा करें',
    back: 'वापस',
  },

  gu: {
    appTitle: 'એગ્રીકનેક્ટ ફેરસ્કોર',
    tagline: 'ખેડૂતો માટે યોગ્ય ભાવ શોધ, ઉપજ અનુમાન અને સીધા બજાર જોડાણ (SIH26132)',
    yieldPredictor: 'ઉપજ અને વૃદ્ધિ AI',
    priceDiscovery: 'વાજબી ભાવ શોધ (FairScore)',
    marketLinkages: 'સીધા ખરીદદારોનું બજાર',
    mandiAnalytics: 'માર્કેટ યાર્ડ ભાવ અને પ્રવાહો',
    weatherAlerts: 'હવામાન અને લણણી જોખમો',
    myFarmPortfolio: 'મારી ઉપજ અને લોટ્સ',
    aiAdvisory: 'કિસાન વોઇસ AI સલાહકાર',
    predictYieldBtn: 'ઉપજ અને ઉત્પાદન ખર્ચનો અંદાજ મેળવો',
    calculatePriceBtn: 'વાજબી લઘુત્તમ ભાવ ગણો',
    connectBuyersBtn: 'સંસ્થાકીય ખરીદદારો સાથે જોડાઓ',
    heroBadge: 'SIH26132 • સરકારી MSP અને પારદર્શક બજાર માળખું',
    mspNotice: 'લઘુત્તમ ટેકાના ભાવ (MSP) ની સુરક્ષા',
    escrowGuaranteed: '100% સુરક્ષિત એસ્ક્રો ચુકવણી',
    middlemanSaved: 'દલાલોના 8-15% કમિશનની બચત',

    simpleGuideTitle: 'સરળ કિસાન સાથી',
    simpleGuideSubtitle: 'તમારી ભાષા પસંદ કરો • માર્કેટ યાર્ડનો સાચો ભાવ જાણો • સીધા ખરીદદારને વેચો',
    step1ChooseCrop: '1. પાક પસંદ કરો (Choose Crop)',
    step1Help: 'જે પાકનો ભાવ જોવો કે વેચવો હોય તેના પર ટેપ કરો:',
    step2FairPrice: '2. આજનો વાજબી ભાવ (Fair Rate)',
    step3SellDirect: '3. પાક સીધો વેચો (Sell Crop)',
    sellDirectDesc: 'કોઈપણ વચેટિયા વગર સીધા ચકાસાયેલ ખરીદદારો (ITC, Cargill, Adani) ને વેચો અને પાક્કું બેંક પેમેન્ટ મેળવો.',
    listCropBtn: '🌾 તમારો પાક લિસ્ટ કરો',
    listenAudioBtn: '🔊 અવાજ દ્વારા સાંભળો (Listen Aloud)',
    stopAudioBtn: 'અવાજ બંધ કરો (Stop Audio)',
    kisanHelpline: '📞 કિસાન કૉલ સેન્ટર (ટોલ-ફ્રી): 1800-180-1551',
    mspGovRate: 'સરકારી MSP ટેકાનો ભાવ:',
    middlemanSavings: 'દલાલી કમિશન બચત (8-15%):',
    rateComparisonBetter: 'આ ભાવ સરકારી ટેકાના ભાવ કરતાં ઊંચો છે.',
    oneClickSelect: 'એક ક્લિકમાં પસંદ કરો',
    freshDailyMandi: '100% સરકારી APMC ના અદ્યતન આંકડા',

    fairScoreHeaderTitle: 'ફેરસ્કોર ઇનસાઇટ્સ અને પ્રાઇસ બેન્ડ એન્જિન',
    fairScoreHeaderSub: 'દૈનિક માર્કેટ યાર્ડ ટ્રેન્ડ્સ, AI આગાહી અને ઓવરસપ્લાય ચેતવણી સાથે વાસ્તવિક સમયનું મૂલ્યાંકન.',
    selectDistrictTaluk: 'જિલ્લો અને તાલુકો પસંદ કરો',
    selectCropType: 'પાક / કોમોડિટી પસંદ કરો',
    currentModalPrice: 'હાલનો યાર્ડ ભાવ',
    predictedPriceBand: 'અનુમાનિત વાજબી ભાવ બેન્ડ',
    fairScoreIndex: 'ફેરસ્કોર ઇન્ડેક્સ',
    oversupplyRisk: 'ઓવરસપ્લાય જોખમ',
    simulatedAskingPrice: 'ઇન્ટરેક્ટિવ ફેરસ્કોર સિમ્યુલેટર (માંગણી ભાવ)',
    listMyCropAt: 'આ ભાવે પાક લિસ્ટ કરો:',
    bandFloor: 'બેન્ડ લઘુત્તમ',
    optimalMid: 'શ્રેષ્ઠ મધ્યમ',
    bandCeiling: 'બેન્ડ મહત્તમ',
    oversupplyWarning: 'વધારાની આવક ચેતવણી (Oversupply Alert)',
    simpleViewToggle: 'સરળ વ્યુમાં ફેરવો',
    technicalViewToggle: 'વિગતવાર વિશ્લેષણ જુઓ (SIH26132)',
    simpleModeActive: 'સરળ કિસાન મોડ ચાલુ છે — વિગતો માટે બટન દબાવો',
    techModeActive: 'વિગતવાર તકનીકી વિશ્લેષણ અને AI મોડેલ્સ સક્રિય છે',

    fairBaselineTitle: 'પારદર્શક ભાવ પ્રાપ્તિ અને સ્વામીનાથન C2+50% ફોર્મ્યુલા',
    fairBaselineDesc: 'ખેડૂતોને ઉત્પાદન ખર્ચ, MSP અને ગુણવત્તાના આધારે વાજબી ભાવની બાંહેધરી.',
    qualityGradingTitle: 'પાકની ગુણવત્તા ચકાસણી અને પરિમાણો',
    moisturePercent: 'ભેજનું પ્રમાણ (%)',
    foreignMatter: 'કચરો / અન્ય પદાર્થ (%)',
    brokenGrains: 'તૂટેલા દાણા (%)',
    colorLuster: 'રંગ અને ચમક ગ્રેડ',
    superiorBright: 'ઉત્કૃષ્ટ / ચમકદાર',
    standardGrade: 'સામાન્ય (સ્ટાન્ડર્ડ)',
    costOfProduction: 'ખેડૂતનો ઉત્પાદન ખર્ચ (₹/ક્વિન્ટલ)',
    volumeQuintals: 'કુલ જથ્થો (ક્વિન્ટલ)',
    calculateFairBtn: 'વાજબી ભાવ ગણો',
    connectBuyersAction: 'ચકાસાયેલ ખરીદદારો સાથે સીધા જોડાઓ',

    marketLinkageTitle: 'સીધા ખેડૂત ↔ સંસ્થાકીય ખરીદદાર બજાર',
    marketLinkageSub: 'દલાલોનું કમિશન દૂર કરો. 100% સુરક્ષિત એસ્ક્રો સાથે સીધા મિલો અને પ્રોસેસર્સને વેચો.',
    verifiedBuyers: 'ચકાસાયેલ સંસ્થાકીય ખરીદદારો',
    allBuyers: 'બધા ખરીદદારો',
    negotiateBtn: 'AI વાટાઘાટો અને કાઉન્ટર',
    createContractBtn: 'એસ્ક્રો કોન્ટ્રાક્ટ બનાવો',
    escrowProtectedBadge: '100% એસ્ક્રો સુરક્ષિત',
    counterOffer: 'સામેનો ભાવ પ્રસ્તાવ',
    buyerBid: 'ખરીદદારની બોલી',

    quintalUnit: '/ ક્વિન્ટલ (100 kg)',
    loading: 'લોડ થઈ રહ્યું છે...',
    close: 'બંધ કરો',
    viewAll: 'બધું જુઓ',
    saveChanges: 'સાચવો',
    share: 'શેર કરો',
    back: 'પાછા જાઓ',
  },

  bn: {
    appTitle: 'এগ্রিকানেক্ট ফেয়ারস্কোর',
    tagline: 'কৃষকদের জন্য ন্যায্য মূল্য অনুসন্ধান, ফলন পূর্বাভাস ও সরাসরি বাজার সংযোগ (SIH26132)',
    yieldPredictor: 'ফলন ও বৃদ্ধি AI',
    priceDiscovery: 'ন্যায্য মূল্য নির্ধারণ (FairScore)',
    marketLinkages: 'সরাসরি ক্রেতা বাজার',
    mandiAnalytics: 'মান্ডি দর ও প্রবণতা',
    weatherAlerts: 'আবহাওয়া ও ফসল কাটার ঝুঁকি',
    myFarmPortfolio: 'আমার ফসলের লট',
    aiAdvisory: 'কিসান ভয়েস AI উপদেষ্টা',
    predictYieldBtn: 'ফলন এবং উৎপাদন খরচ গণনা করুন',
    calculatePriceBtn: 'ন্যায্য সর্বনিম্ন মূল্য পান',
    connectBuyersBtn: 'প্রাতিষ্ঠানিক ক্রেতাদের সাথে যুক্ত হন',
    heroBadge: 'SIH26132 • সরকারি MSP মানদণ্ড সমর্থিত',
    mspNotice: 'ন্যূনতম সহায়ক মূল্য (MSP) সুরক্ষা',
    escrowGuaranteed: '১০০% সুরক্ষিত এসক্রো পেমেন্ট',
    middlemanSaved: 'মধ্যস্বত্বভোগীদের ৮-১৫% কমিশন সাশ্রয়',

    simpleGuideTitle: 'সহজ কিসান বন্ধু',
    simpleGuideSubtitle: 'আপনার ভাষা বেছে নিন • মান্ডির ন্যায্য দর জানুন • সরাসরি ক্রেতার কাছে বিক্রি করুন',
    step1ChooseCrop: '১. ফসল বেছে নিন (Choose Crop)',
    step1Help: 'যে ফসলের দর জানতে বা বিক্রি করতে চান তাতে ট্যাপ করুন:',
    step2FairPrice: '২. আজকের ন্যায্য দর (Fair Rate)',
    step3SellDirect: '৩. সরাসরি বিক্রি করুন (Sell Crop)',
    sellDirectDesc: 'কোনো দালাল ছাড়াই সরাসরি যাচাইকৃত ক্রেতাদের (ITC, Cargill, Adani) কাছে বিক্রি করুন এবং নিশ্চিত পেমেন্ট পান।',
    listCropBtn: '🌾 নিজের ফসল তালিকাভুক্ত করুন',
    listenAudioBtn: '🔊 মুখে শুনে নিন (Listen Rate Aloud)',
    stopAudioBtn: 'শব্দ বন্ধ করুন (Stop Audio)',
    kisanHelpline: '📞 কিসান কল সেন্টার (টোল-ফ্রি): ১৮০০-১৮০-১৫৫১',
    mspGovRate: 'সরকারি MSP সহায়ক মূল্য:',
    middlemanSavings: 'দালাল কমিশন সাশ্রয় (৮-১৫%):',
    rateComparisonBetter: 'এই দর সরকারি সহায়ক মূল্যের চেয়ে বেশি।',
    oneClickSelect: 'এক ক্লিকে নির্বাচন',
    freshDailyMandi: '১০০% সরকারি APMC তথ্য',

    fairScoreHeaderTitle: 'ফেয়ারস্কোর ইনসাইটস ও প্রাইজ ব্যান্ড ইঞ্জিন',
    fairScoreHeaderSub: 'দৈনিক মান্ডি প্রবণতা, AI পূর্বাভাস এবং অতিরিক্ত সরবরাহ সতর্কতার সাথে রিয়েল-টাইম মূল্য সূচক।',
    selectDistrictTaluk: 'জেলা ও ব্লক নির্বাচন করুন',
    selectCropType: 'ফসল নির্বাচন করুন',
    currentModalPrice: 'বর্তমান মান্ডি দর',
    predictedPriceBand: 'পূর্বাভাসিত ন্যায্য মূল্য ব্যান্ড',
    fairScoreIndex: 'ফেয়ারস্কোর ইনডেক্স',
    oversupplyRisk: 'অতিরিক্ত সরবরাহ ঝুঁকি',
    simulatedAskingPrice: 'ইন্টারেক্টিভ ফেয়ারস্কোর সিমুলেটর (চাওয়া দাম)',
    listMyCropAt: 'এই দরে ফসল তালিকাভুক্ত করুন:',
    bandFloor: 'ব্যান্ড সর্বনিম্ন',
    optimalMid: 'সর্বোত্তম গড়',
    bandCeiling: 'ব্যান্ড সর্বোচ্চ',
    oversupplyWarning: 'অতিরিক্ত সরবরাহ সতর্কতা (Oversupply Alert)',
    simpleViewToggle: 'সহজ ভিউতে ফিরুন',
    technicalViewToggle: 'বিস্তারিত বিশ্লেষণ দেখুন (SIH26132)',
    simpleModeActive: 'সহজ কিসান মোড সক্রিয় — বিস্তারিত দেখতে বোতামে চাপুন',
    techModeActive: 'বিস্তারিত প্রযুক্তিগত বিশ্লেষণ এবং AI মডেল সক্রিয় রয়েছে',

    fairBaselineTitle: 'স্বচ্ছ মূল্য প্রাপ্তি এবং স্বামীনাথন C2+50% নীতি',
    fairBaselineDesc: 'উৎপাদন খরচ, MSP ও মানের ভিত্তিতে ফসলের সঠিক দাম নিশ্চিত করুন।',
    qualityGradingTitle: 'ফসলের গুণমান পরীক্ষা ও ল্যাব মাপকাঠি',
    moisturePercent: 'আর্দ্রতার পরিমাণ (%)',
    foreignMatter: 'ময়লা / বহিরাগত পদার্থ (%)',
    brokenGrains: 'ভাঙা দানা (%)',
    colorLuster: 'রং ও উজ্জ্বলতার মান',
    superiorBright: 'উৎকৃষ্ট / উজ্জ্বল',
    standardGrade: 'সাধারণ মান',
    costOfProduction: 'কৃষকের উৎপাদন খরচ (₹/কুইন্টাল)',
    volumeQuintals: 'মোট পরিমাণ (কুইন্টাল)',
    calculateFairBtn: 'ন্যায্য মূল্য নির্ধারণ করুন',
    connectBuyersAction: 'ন্যায্য মূল্যে যাচাইকৃত ক্রেতাদের সাথে যুক্ত হন',

    marketLinkageTitle: 'সরাসরি কৃষক ↔ প্রাতিষ্ঠানিক ক্রেতার বাজার',
    marketLinkageSub: 'দালালদের কমিশন দূর করুন। ১০০% সুরক্ষিত এসক্রো পেমেন্টে সরাসরি বিক্রি করুন।',
    verifiedBuyers: 'যাচাইকৃত প্রাতিষ্ঠানিক ক্রেতা',
    allBuyers: 'সমস্ত ক্রেতা',
    negotiateBtn: 'AI দরদাম ও পাল্টা অফার',
    createContractBtn: 'এসক্রো চুক্তি তৈরি করুন',
    escrowProtectedBadge: '১০০% এসক্রো সুরক্ষিত',
    counterOffer: 'পাল্টা অফার মূল্য',
    buyerBid: 'ক্রেতার প্রস্তাবিত দর',

    quintalUnit: '/ কুইন্টাল (১০০ কেজি)',
    loading: 'লোড হচ্ছে...',
    close: 'বন্ধ করুন',
    viewAll: 'সব দেখুন',
    saveChanges: 'সংরক্ষণ করুন',
    share: 'শেয়ার করুন',
    back: 'ফিরে যান',
  },

  pa: {
    appTitle: 'ਕ੍ਰਿਸ਼ੀਸੇਤੂ',
    tagline: 'ਕਿਸਾਨਾਂ ਲਈ ਨਿਰਪੱਖ ਕੀਮਤ ਖੋਜ, ਝਾੜ ਪੂਰਵ-ਅਨੁਮਾਨ ਅਤੇ ਸਿੱਧਾ ਮੰਡੀ ਸੰਪਰਕ',
    yieldPredictor: 'ਝਾੜ ਅਤੇ ਲਾਗਤ AI',
    priceDiscovery: 'ਨਿਰਪੱਖ ਮੁੱਲ ਖੋਜ',
    marketLinkages: 'ਸਿੱਧੇ ਖਰੀਦਦਾਰ',
    mandiAnalytics: 'ਮੰਡੀ ਭਾਅ ਅਤੇ ਰੁਝਾਨ',
    weatherAlerts: 'ਮੌਸਮ ਅਤੇ ਵਾਢੀ ਜੋਖਮ',
    myFarmPortfolio: 'ਮੇਰੀ ਫ਼ਸਲ ਲਾਟ',
    aiAdvisory: 'ਕਿਸਾਨ ਆਵਾਜ਼ ਸਲਾਹਕਾਰ',
    predictYieldBtn: 'ਝਾੜ ਅਤੇ ਲਾਗਤ ਦਾ ਅੰਦਾਜ਼ਾ ਲਗਾਓ',
    calculatePriceBtn: 'ਨਿਰਪੱਖ ਮੁੱਲ ਗਿਣੋ',
    connectBuyersBtn: 'ਖਰੀਦਦਾਰਾਂ ਨਾਲ ਜੁੜੋ',
    heroBadge: 'ਸਰਕਾਰੀ MSP ਅਤੇ ਨਿਰਪੱਖ ਕੀਮਤ ਨਿਯਮਾਂ ਅਨੁਸਾਰ',
    mspNotice: 'ਸਰਕਾਰੀ MSP ਗਾਰੰਟੀ ਬੈਂਚਮਾਰਕ',
    escrowGuaranteed: '100% ਸੁਰੱਖਿਅਤ ਭੁਗਤਾਨ',
    middlemanSaved: 'ਆੜ੍ਹਤੀਆ ਕਮਿਸ਼ਨ ਦੀ ਬੱਚਤ',

    simpleGuideTitle: 'ਸਰਲ ਕਿਸਾਨ ਸਾਥੀ',
    simpleGuideSubtitle: 'ਆਪਣੀ ਬੋਲੀ ਚੁਣੋ • ਅੱਜ ਦਾ ਸਹੀ ਮੰਡੀ ਭਾਅ ਜਾਣੋ • ਸਿੱਧਾ ਖਰੀਦਦਾਰ ਨੂੰ ਵੇਚੋ',
    step1ChooseCrop: '1. ਫ਼ਸਲ ਚੁਣੋ (Choose Crop)',
    step1Help: 'ਜਿਸ ਫ਼ਸਲ ਦਾ ਭਾਅ ਦੇਖਣਾ ਜਾਂ ਵੇਚਣਾ ਹੈ, ਉਸ ਤੇ ਕਲਿੱਕ ਕਰੋ:',
    step2FairPrice: '2. ਅੱਜ ਦਾ ਸਹੀ ਭਾਅ (Fair Rate)',
    step3SellDirect: '3. ਸਿੱਧੀ ਫ਼ਸਲ ਵੇਚੋ (Sell Crop)',
    sellDirectDesc: 'ਬਿਨਾਂ ਕਿਸੇ ਆੜ੍ਹਤੀਏ ਦੇ ਸਿੱਧਾ ਕਾਰਪੋਰੇਟ ਖਰੀਦਦਾਰਾਂ ਨੂੰ ਵੇਚੋ ਅਤੇ ਪੱਕਾ ਬੈਂਕ ਭੁਗਤਾਨ ਪ੍ਰਾਪਤ ਕਰੋ।',
    listCropBtn: '🌾 ਆਪਣੀ ਫ਼ਸਲ ਲਿਸਟ ਕਰੋ',
    listenAudioBtn: '🔊 ਆਵਾਜ਼ ਵਿੱਚ ਸੁਣੋ (Listen Aloud)',
    stopAudioBtn: 'ਆਵਾਜ਼ ਰੋਕੋ',
    kisanHelpline: '📞 ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ: 1800-180-1551',
    mspGovRate: 'ਸਰਕਾਰੀ MSP ਘੱਟੋ-ਘੱਟ ਮੁੱਲ:',
    middlemanSavings: 'ਆੜ੍ਹਤੀਆ ਕਮਿਸ਼ਨ ਬੱਚਤ (8-15%):',
    rateComparisonBetter: 'ਇਹ ਭਾਅ ਸਰਕਾਰੀ ਘੱਟੋ-ਘੱਟ ਮੁੱਲ ਨਾਲੋਂ ਬਿਹਤਰ ਹੈ।',
    oneClickSelect: 'ਇੱਕ ਕਲਿੱਕ ਵਿੱਚ ਚੁਣੋ',
    freshDailyMandi: 'ਤਾਜ਼ਾ ਰੋਜ਼ਾਨਾ ਸਰਕਾਰੀ APMC ਅੰਕੜੇ',

    fairScoreHeaderTitle: 'ਫੇਅਰਸਕੋਰ ਇਨਸਾਈਟਸ ਅਤੇ ਕੀਮਤ ਬੈਂਡ ਇੰਜਣ',
    fairScoreHeaderSub: 'ਅਸਲ-ਸਮੇਂ ਦਾ ਜ਼ਿਲ੍ਹਾ ਪੱਧਰੀ ਨਿਰਪੱਖ ਮੁੱਲ ਸੂਚਕਾਂਕ।',
    selectDistrictTaluk: 'ਜ਼ਿਲ੍ਹਾ ਅਤੇ ਤਹਿਸੀਲ ਚੁਣੋ',
    selectCropType: 'ਫ਼ਸਲ ਚੁਣੋ',
    currentModalPrice: 'ਮੌਜੂਦਾ ਮੰਡੀ ਭਾਅ',
    predictedPriceBand: 'ਅਨੁਮਾਨਿਤ ਨਿਰਪੱਖ ਮੁੱਲ ਬੈਂਡ',
    fairScoreIndex: 'ਫੇਅਰਸਕੋਰ ਇੰਡੈਕਸ',
    oversupplyRisk: 'ਵੱਧ ਆਮਦ ਜੋਖਮ',
    simulatedAskingPrice: 'ਫੇਅਰਸਕੋਰ ਸਿਮੂਲੇਟਰ (ਮੰਗ ਭਾਅ)',
    listMyCropAt: 'ਇਸ ਭਾਅ ਤੇ ਫ਼ਸਲ ਵੇਚੋ:',
    bandFloor: 'ਬੈਂਡ ਘੱਟੋ-ਘੱਟ',
    optimalMid: 'ਸਰਵੋਤਮ ਵਿਚਕਾਰਲਾ',
    bandCeiling: 'ਬੈਂਡ ਵੱਧ ਤੋਂ ਵੱਧ',
    oversupplyWarning: 'ਵੱਧ ਆਮਦ ਚਿਤਾਵਨੀ',
    simpleViewToggle: 'ਸਰਲ ਦ੍ਰਿਸ਼',
    technicalViewToggle: 'ਵਿਸਤ੍ਰਿਤ ਦ੍ਰਿਸ਼',
    simpleModeActive: 'ਸਰਲ ਕਿਸਾਨ ਮੋਡ ਸਰਗਰਮ ਹੈ',
    techModeActive: 'ਤਕਨੀਕੀ ਵਿਸ਼ਲੇਸ਼ਣ ਸਰਗਰਮ ਹੈ',

    fairBaselineTitle: 'ਪਾਰਦਰਸ਼ੀ ਕੀਮਤ ਪ੍ਰਾਪਤੀ ਅਤੇ ਸਵਾਮੀਨਾਥਨ ਫਾਰਮੂਲਾ',
    fairBaselineDesc: 'ਲਾਗਤ, MSP ਅਤੇ ਗੁਣਵੱਤਾ ਦੇ ਆਧਾਰ ਤੇ ਨਿਰਪੱਖ ਕੀਮਤ।',
    qualityGradingTitle: 'ਫ਼ਸਲ ਗੁਣਵੱਤਾ ਮਾਪਦੰਡ',
    moisturePercent: 'ਸਿੱਲ੍ਹ ਦੀ ਮਾਤਰਾ (%)',
    foreignMatter: 'ਕੂੜਾ ਕਬਾੜ (%)',
    brokenGrains: 'ਟੁੱਟੇ ਦਾਣੇ (%)',
    colorLuster: 'ਰੰਗ ਤੇ ਚਮਕ',
    superiorBright: 'ਵਧੀਆ / ਚਮਕਦਾਰ',
    standardGrade: 'ਆਮ (ਸਟੈਂਡਰਡ)',
    costOfProduction: 'ਕਿਸਾਨ ਦੀ ਉਤਪਾਦਨ ਲਾਗਤ (₹/ਕੁਇੰਟਲ)',
    volumeQuintals: 'ਕੁੱਲ ਮਾਤਰਾ (ਕੁਇੰਟਲ)',
    calculateFairBtn: 'ਸਹੀ ਮੁੱਲ ਕੱਢੋ',
    connectBuyersAction: 'ਖਰੀਦਦਾਰਾਂ ਨਾਲ ਜੁੜੋ',

    marketLinkageTitle: 'ਸਿੱਧਾ ਕਿਸਾਨ ↔ ਖਰੀਦਦਾਰ ਬਾਜ਼ਾਰ',
    marketLinkageSub: 'ਆੜ੍ਹਤੀਆ ਕਮਿਸ਼ਨ ਖਤਮ ਕਰੋ। 100% ਸੁਰੱਖਿਅਤ ਐਸਕਰੋ ਭੁਗਤਾਨ।',
    verifiedBuyers: 'ਪ੍ਰਮਾਣਿਤ ਖਰੀਦਦਾਰ',
    allBuyers: 'ਸਾਰੇ ਖਰੀਦਦਾਰ',
    negotiateBtn: 'AI ਗੱਲਬਾਤ',
    createContractBtn: 'ਕੰਟਰੈਕਟ ਬਣਾਓ',
    escrowProtectedBadge: '100% ਸੁਰੱਖਿਅਤ',
    counterOffer: 'ਜਵਾਬੀ ਭਾਅ',
    buyerBid: 'ਖਰੀਦਦਾਰ ਦੀ ਬੋਲੀ',

    quintalUnit: '/ ਕੁਇੰਟਲ (100 kg)',
    loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    close: 'ਬੰਦ ਕਰੋ',
    viewAll: 'ਸਾਰੇ ਦੇਖੋ',
    saveChanges: 'ਸੰਭਾਲੋ',
    share: 'ਸਾਂਝਾ ਕਰੋ',
    back: 'ਪਿੱਛੇ',
  },

  mr: {
    appTitle: 'कृषीसेतू',
    tagline: 'शेतकऱ्यांसाठी अचूक पीक अंदाज, रास्त भाव शोध आणि थेट बाजारपेठ जोडणी',
    yieldPredictor: 'पीक उत्पादन AI',
    priceDiscovery: 'रास्त भाव शोध',
    marketLinkages: 'थेट खरेदीदार',
    mandiAnalytics: 'बाजार भाव व ट्रेंड',
    weatherAlerts: 'हवामान आणि कापणी जोखीम',
    myFarmPortfolio: 'माझे पीक लॉट्स',
    aiAdvisory: 'किसान व्हॉइस सल्लागार',
    predictYieldBtn: 'उत्पादन व खर्चाचा अंदाज घ्या',
    calculatePriceBtn: 'रास्त हमीभाव काढा',
    connectBuyersBtn: 'थेट खरेदीदारांना भेटा',
    heroBadge: 'शासकीय हमीभाव व रास्त बाजार नियमांशी सुसंगत',
    mspNotice: 'किमान आधारभूत किंमत (MSP) सुरक्षा',
    escrowGuaranteed: '१००% सुरक्षित एस्क्रो पेमेंट',
    middlemanSaved: 'दलालांचे ८-१५% कमिशन वाचवा',

    simpleGuideTitle: 'सोपा शेतकरी मार्गदर्शक',
    simpleGuideSubtitle: 'आपली भाषा निवडा • आजचा खरा बाजारभाव जाणा • थेट खरेदीदारास विका',
    step1ChooseCrop: '१. पीक निवडा (Choose Crop)',
    step1Help: 'ज्या पिकाचा भाव पाहायचा किंवा विकायचे आहे त्यावर टॅप करा:',
    step2FairPrice: '२. आजचा रास्त भाव (Fair Rate)',
    step3SellDirect: '३. थेट विक्री करा (Sell Crop)',
    sellDirectDesc: 'कोणत्याही मध्यस्थाशिवाय थेट मोठ्या खरेदीदारांना विका आणि पक्के बँक पेमेंट मिळवा.',
    listCropBtn: '🌾 आपले पीक लिस्ट करा',
    listenAudioBtn: '🔊 आवाजात ऐका (Listen Aloud)',
    stopAudioBtn: 'आवाज थांबवा',
    kisanHelpline: '📞 शेतकरी कॉल सेंटर: १८००-१८०-१५५१',
    mspGovRate: 'शासकीय हमीभाव (MSP):',
    middlemanSavings: 'दलाली कमिशन बचत (८-१५%):',
    rateComparisonBetter: 'हा दर किमान आधारभूत किंमतीपेक्षा जास्त आहे.',
    oneClickSelect: 'एका क्लिकवर निवडा',
    freshDailyMandi: 'ताजे शासकीय APMC बाजारभाव',

    fairScoreHeaderTitle: 'फेअरस्कोर इनसाइट्स आणि प्राइस बँड इंजिन',
    fairScoreHeaderSub: 'अगमार्कनेट ट्रेंड्स, AI अंदाज आणि आवक अलर्टसह रिअल-टाइम किंमत निर्देशांक.',
    selectDistrictTaluk: 'जिल्हा व तालुका निवडा',
    selectCropType: 'पीक निवडा',
    currentModalPrice: 'चालू बाजारभाव',
    predictedPriceBand: 'अंदाजित रास्त भाव बँड',
    fairScoreIndex: 'फेअरस्कोर इंडेक्स',
    oversupplyRisk: 'जादा आवक जोखीम',
    simulatedAskingPrice: 'फेअरस्कोर सिम्युलेटर (अपेक्षित भाव)',
    listMyCropAt: 'या दराने पीक लिस्ट करा:',
    bandFloor: 'किमान बँड',
    optimalMid: 'सर्वोत्तम मध्यम',
    bandCeiling: 'कमाल बँड',
    oversupplyWarning: 'अति आवक इशारा',
    simpleViewToggle: 'सोपे दृश्य',
    technicalViewToggle: 'सविस्तर विश्लेषण (SIH26132)',
    simpleModeActive: 'सोपा शेतकरी मोड सुरू आहे',
    techModeActive: 'तांत्रिक विश्लेषण सुरू आहे',

    fairBaselineTitle: 'पारदर्शक भाव प्राप्ती आणि स्वामिनाथन सूत्र',
    fairBaselineDesc: 'उत्पादन खर्च, MSP आणि गुणवत्तेवर आधारित योग्य दर मिळवा.',
    qualityGradingTitle: 'पीक गुणवत्ता निकष व लॅब तपासणी',
    moisturePercent: 'ओलावा प्रमाण (%)',
    foreignMatter: 'कचरा / बाह्य घटक (%)',
    brokenGrains: 'तुटलेले दाणे (%)',
    colorLuster: 'रंग आणि चमक',
    superiorBright: 'उत्कृष्ट / चमकदार',
    standardGrade: 'सामान्य',
    costOfProduction: 'शेतकऱ्याचा उत्पादन खर्च (₹/क्विंटल)',
    volumeQuintals: 'एकूण प्रमाण (क्विंटल)',
    calculateFairBtn: 'रास्त भाव काढा',
    connectBuyersAction: 'खरेदीदारांशी थेट संपर्क साधा',

    marketLinkageTitle: 'थेट शेतकरी ↔ संस्थात्मक खरेदीदार बाजार',
    marketLinkageSub: 'दलालांचे कमिशन टाळा. १००% सुरक्षित एस्क्रो पेमेंट.',
    verifiedBuyers: 'पडताळणी झालेले खरेदीदार',
    allBuyers: 'सर्व खरेदीदार',
    negotiateBtn: 'AI बोलणी व ऑफर',
    createContractBtn: 'एस्क्रो करार करा',
    escrowProtectedBadge: '१००% सुरक्षित',
    counterOffer: 'प्रति-ऑफर किंमत',
    buyerBid: 'खरेदीदाराची बोली',

    quintalUnit: '/ क्विंटल (१०० किलो)',
    loading: 'लोड होत आहे...',
    close: 'बंद करा',
    viewAll: 'सर्व पहा',
    saveChanges: 'जतन करा',
    share: 'शेअर करा',
    back: 'मागे',
  },

  te: {
    appTitle: 'కృషిసేతు',
    tagline: 'రైతులకు సరసమైన ధరల గుర్తింపు, దిగుబడి అంచనా మరియు ప్రత్యక్ష మార్కెట్ అనుసంధానం',
    yieldPredictor: 'దిగుబడి అంచనా AI',
    priceDiscovery: 'సరసమైన ధర నిర్ణయం',
    marketLinkages: 'ప్రత్యక్ష కొనుగోలుదారులు',
    mandiAnalytics: 'మార్కెట్ ధరలు & ట్రెండ్స్',
    weatherAlerts: 'వాతావరణం & కోత ప్రమాదాలు',
    myFarmPortfolio: 'నా పంట వివరాలు',
    aiAdvisory: 'రైతు వాయిస్ AI సలహాదారు',
    predictYieldBtn: 'దిగుబడిని అంచనా వేయండి',
    calculatePriceBtn: 'సరసమైన ధరను లెక్కించండి',
    connectBuyersBtn: 'కొనుగోలుదారులతో కనెక్ట్ అవ్వండి',
    heroBadge: 'ప్రభుత్వ MSP మార్గదర్శకాలకు అనుగుణంగా',
    mspNotice: 'కనీస మద్దతు ధర (MSP) రక్షణ',
    escrowGuaranteed: '100% సురక్షిత చెల్లింపులు',
    middlemanSaved: 'దళారీ కమీషన్ 8-15% ఆదా',

    simpleGuideTitle: 'సరళ కిసాన్ మార్గదర్శి',
    simpleGuideSubtitle: 'మీ భాషను ఎంచుకోండి • మార్కెట్ ధర తెలుసుకోండి • నేరుగా విక్రయించండి',
    step1ChooseCrop: '1. పంటను ఎంచుకోండి (Choose Crop)',
    step1Help: 'ధర తెలుసుకోవాలనుకునే పంటపై క్లిక్ చేయండి:',
    step2FairPrice: '2. నేటి సరసమైన ధర (Fair Rate)',
    step3SellDirect: '3. నేరుగా విక్రయించండి (Sell Crop)',
    sellDirectDesc: 'దళారులు లేకుండా నేరుగా పెద్ద కొనుగోలుదారులకు అమ్మి ఖచ్చితమైన బ్యాంక్ చెల్లింపు పొందండి.',
    listCropBtn: '🌾 మీ పంటను లిస్ట్ చేయండి',
    listenAudioBtn: '🔊 ధరను వాయిస్‌లో వినండి',
    stopAudioBtn: 'ఆడియో ఆపండి',
    kisanHelpline: '📞 కిసాన్ కాల్ సెంటర్: 1800-180-1551',
    mspGovRate: 'ప్రభుత్వ కనీస మద్దతు ధర (MSP):',
    middlemanSavings: 'దళారీ కమీషన్ ఆదా (8-15%):',
    rateComparisonBetter: 'ఈ ధర ప్రభుత్వ కనీస మద్దతు ధర కంటే ఎక్కువ.',
    oneClickSelect: 'ఒకే క్లిక్‌తో ఎంపిక',
    freshDailyMandi: 'తాజా రోజువారీ APMC మార్కెట్ ధరలు',

    fairScoreHeaderTitle: 'ఫేర్‌స్కోర్ అంతర్దృష్టులు & ధరల బ్యాండ్ ఇంజిన్',
    fairScoreHeaderSub: 'రియల్-టైమ్ మార్కెట్ విశ్లేషణ మరియు సరసమైన ధరల సూచిక.',
    selectDistrictTaluk: 'జిల్లా & మండలం ఎంచుకోండి',
    selectCropType: 'పంటను ఎంచుకోండి',
    currentModalPrice: 'ప్రస్తుత మార్కెట్ ధర',
    predictedPriceBand: 'అంచనా వేసిన సరసమైన ధరల బ్యాండ్',
    fairScoreIndex: 'ఫేర్‌స్కోర్ ఇండెక్స్',
    oversupplyRisk: 'అధిక సరఫరా ప్రమాదం',
    simulatedAskingPrice: 'ఫేర్‌స్కోర్ సిమ్యులేటర్ (కోరుకునే ధర)',
    listMyCropAt: 'ఈ ధరకు పంటను లిస్ట్ చేయండి:',
    bandFloor: 'బ్యాండ్ కనిష్ట',
    optimalMid: 'సరైన మధ్యస్థం',
    bandCeiling: 'బ్యాండ్ గరిష్ట',
    oversupplyWarning: 'అధిక సరఫరా హెచ్చరిక',
    simpleViewToggle: 'సాధారణ వీక్షణ',
    technicalViewToggle: 'పూర్తి విశ్లేషణ (SIH26132)',
    simpleModeActive: 'సరళ మోడ్ ఆన్‌లో ఉంది',
    techModeActive: 'సాంకేతిక విశ్లేషణ ఆన్‌లో ఉంది',

    fairBaselineTitle: 'పారదర్శక ధర గుర్తింపు & స్వామినాథన్ ఫార్ములా',
    fairBaselineDesc: 'ఉత్పత్తి వ్యయం, MSP మరియు నాణ్యత ఆధారంగా సరసమైన ధరను పొందండి.',
    qualityGradingTitle: 'పంట నాణ్యత పారామితులు',
    moisturePercent: 'తేమ శాతం (%)',
    foreignMatter: 'వ్యర్థాలు (%)',
    brokenGrains: 'విరిగిన గింజలు (%)',
    colorLuster: 'రంగు & మెరుపు',
    superiorBright: 'ఉత్తమమైనది / మెరిసేది',
    standardGrade: 'సాధారణం',
    costOfProduction: 'రైతు ఉత్పత్తి ఖర్చు (₹/క్వింటాల్)',
    volumeQuintals: 'మొత్తం పరిమాణం (క్వింటాళ్ళు)',
    calculateFairBtn: 'ధరను లెక్కించండి',
    connectBuyersAction: 'కొనుగోలుదారులతో కనెక్ట్ అవ్వండి',

    marketLinkageTitle: 'రైతు ↔ కొనుగోలుదారు ప్రత్యక్ష మార్కెట్',
    marketLinkageSub: 'దళారీలను నివారించండి. 100% ఎస్క్రో రక్షణతో నేరుగా వ్యాపారం చేయండి.',
    verifiedBuyers: 'ధృవీకరించబడిన కొనుగోలుదారులు',
    allBuyers: 'అన్ని కొనుగోలుదారులు',
    negotiateBtn: 'AI చర్చలు',
    createContractBtn: 'ఒప్పందం చేయండి',
    escrowProtectedBadge: '100% రక్షణ',
    counterOffer: 'కౌంటర్ ఆఫర్',
    buyerBid: 'కొనుగోలుదారు ఆఫర్',

    quintalUnit: '/ క్వింటాల్ (100 కిలోలు)',
    loading: 'లోడ్ అవుతోంది...',
    close: 'మూసివేయి',
    viewAll: 'అన్నీ చూడండి',
    saveChanges: 'సేవ్ చేయండి',
    share: 'భాగస్వామ్యం చేయండి',
    back: 'వెనుకకు',
  },

  ta: {
    appTitle: 'கிருஷிசேது',
    tagline: 'விவசாயிகளுக்கான நியாயமான விலை கண்டறிதல் மற்றும் நேரடி சந்தை இணைப்பு',
    yieldPredictor: 'மகசூல் கணிப்பு AI',
    priceDiscovery: 'நியாய விலை கணக்கீடு',
    marketLinkages: 'நேரடி வாங்குவோர்',
    mandiAnalytics: 'மண்டி விலை போக்குகள்',
    weatherAlerts: 'வானிலை & அறுவடை அபாயங்கள்',
    myFarmPortfolio: 'எனது பயிர் தொகுதி',
    aiAdvisory: 'விவசாயி குரல் AI ஆலோசகர்',
    predictYieldBtn: 'மகசூல் மற்றும் செலவை கணக்கிடுங்கள்',
    calculatePriceBtn: 'நியாய விலையை கணக்கிடுங்கள்',
    connectBuyersBtn: 'நிறுவன வாங்குவோருடன் இணையுங்கள்',
    heroBadge: 'அரசு குறைந்தபட்ச ஆதரவு விலை விதிகளின்படி',
    mspNotice: 'MSP குறைந்தபட்ச விலை உத்தரவாதம்',
    escrowGuaranteed: '100% பாதுகாப்பான பணம் செலுத்துதல்',
    middlemanSaved: 'தரகர் கமிஷன் 8-15% சேமிப்பு',

    simpleGuideTitle: 'எளிய உழவர் வழிகாட்டி',
    simpleGuideSubtitle: 'மொழியைத் தேர்வுசெய்யுங்கள் • சரியான மண்டி விலையை அறிந்துகொள்ளுங்கள் • நேரடியாக விற்கவும்',
    step1ChooseCrop: '1. பயிரைத் தேர்வு செய்யவும் (Choose Crop)',
    step1Help: 'விலை பார்க்க அல்லது விற்க விரும்பும் பயிரைத் தொடவும்:',
    step2FairPrice: '2. இன்றைய நியாய விலை (Fair Rate)',
    step3SellDirect: '3. நேரடியாக விற்கவும் (Sell Crop)',
    sellDirectDesc: 'இடைத்தரகர்கள் இன்றி நேரடியாக பெரிய நிறுவனங்களுக்கு விற்று உத்தரவாதமான வங்கிப் பணம் பெறுங்கள்.',
    listCropBtn: '🌾 பயிரைப் பட்டியலிடவும்',
    listenAudioBtn: '🔊 குரலில் கேட்கவும் (Listen Aloud)',
    stopAudioBtn: 'ஒலியை நிறுத்தவும்',
    kisanHelpline: '📞 உழவர் உதவி மையம்: 1800-180-1551',
    mspGovRate: 'அரசு குறைந்தபட்ச ஆதரவு விலை (MSP):',
    middlemanSavings: 'தரகர் கமிஷன் சேமிப்பு (8-15%):',
    rateComparisonBetter: 'இந்த விலை அரசு குறைந்தபட்ச விலையை விட அதிகம்.',
    oneClickSelect: 'ஒரே கிளிக்கில் தேர்வு',
    freshDailyMandi: 'தினசரி அரசு APMC மண்டி விலை நிலவரம்',

    fairScoreHeaderTitle: 'ஃபேர்ஸ்கோர் மற்றும் விலை வரம்பு கணிப்பு',
    fairScoreHeaderSub: 'நிகழ்நேர மண்டி போக்குகள் மற்றும் நியாய விலை குறியீடு.',
    selectDistrictTaluk: 'மாவட்டம் & தாலுகா தேர்வு',
    selectCropType: 'பயிரைத் தேர்ந்தெடுக்கவும்',
    currentModalPrice: 'தற்போதைய மண்டி விலை',
    predictedPriceBand: 'கணிக்கப்பட்ட நியாய விலை வரம்பு',
    fairScoreIndex: 'ஃபேர்ஸ்கோர் குறியீடு',
    oversupplyRisk: 'அதிக வரத்து ஆபத்து',
    simulatedAskingPrice: 'ஃபேர்ஸ்கோர் சிமுலேட்டர் (கேட்கும் விலை)',
    listMyCropAt: 'இந்த விலையில் பட்டியலிடவும்:',
    bandFloor: 'வரம்பு குறைந்தது',
    optimalMid: 'சரியான நடுத்தரம்',
    bandCeiling: 'வரம்பு அதிகபட்சம்',
    oversupplyWarning: 'அதிக வரத்து எச்சரிக்கை',
    simpleViewToggle: 'எளிய காட்சி',
    technicalViewToggle: 'முழு விவரங்கள் (SIH26132)',
    simpleModeActive: 'எளிய பயன்முறை செயலில் உள்ளது',
    techModeActive: 'தொழில்நுட்ப பகுப்பாய்வு செயலில் உள்ளது',

    fairBaselineTitle: 'வெளிப்படையான விலை மற்றும் சுவாமிநாதன் சூத்திரம்',
    fairBaselineDesc: 'உற்பத்திச் செலவு, MSP மற்றும் தரத்தின் அடிப்படையில் நியாயமான விலையைப் பெறுங்கள்.',
    qualityGradingTitle: 'பயிர் தர பரிசோதனை அளவுருக்கள்',
    moisturePercent: 'ஈரப்பதம் (%)',
    foreignMatter: 'அந்நியப் பொருட்கள் (%)',
    brokenGrains: 'உடைந்த தானியங்கள் (%)',
    colorLuster: 'நிறம் மற்றும் பளபளப்பு',
    superiorBright: 'சிறந்தது / பளபளப்பானது',
    standardGrade: 'வழக்கமானது',
    costOfProduction: 'உற்பத்திச் செலவு (₹/குவிண்டால்)',
    volumeQuintals: 'மொத்த அளவு (குவிண்டால்)',
    calculateFairBtn: 'விலையைக் கணக்கிடுங்கள்',
    connectBuyersAction: 'வாங்குவோருடன் இணையுங்கள்',

    marketLinkageTitle: 'விவசாயி ↔ வாங்குவோர் நேரடி சந்தை',
    marketLinkageSub: 'தரகர்களைத் தவிர்க்கவும். 100% பாதுகாப்பான எஸ்க்ரோ பரிவர்த்தனை.',
    verifiedBuyers: 'சரிபார்க்கப்பட்ட வாங்குபவர்கள்',
    allBuyers: 'அனைத்து வாங்குபவர்கள்',
    negotiateBtn: 'AI பேச்சுவார்த்தை',
    createContractBtn: 'ஒப்பந்தம் உருவாக்கவும்',
    escrowProtectedBadge: '100% பாதுகாப்பு',
    counterOffer: 'எதிர் சலுகை',
    buyerBid: 'வாங்குபவர் விலை',

    quintalUnit: '/ குவிண்டால் (100 கிலோ)',
    loading: 'ஏற்றுகிறது...',
    close: 'மூடு',
    viewAll: 'அனைத்தும் பார்',
    saveChanges: 'சேமி',
    share: 'பகிர்',
    back: 'பின்செல்',
  },

  kn: {
    appTitle: 'ಅಗ್ರಿಕನೆಕ್ಟ್ ಫೇರ್‌ಸ್ಕೋರ್',
    tagline: 'ರೈತರಿಗೆ ನ್ಯಾಯಯುತ ಬೆಲೆ ಅನ್ವೇಷಣೆ, ಮುನ್ಸೂಚನೆ ಮತ್ತು ನೇರ ಮಾರುಕಟ್ಟೆ ಸಂಪರ್ಕ',
    yieldPredictor: 'ಇಳುವರಿ ಮತ್ತು ಬೆಳವಣಿಗೆ AI',
    priceDiscovery: 'ನ್ಯಾಯಯುತ ಬೆಲೆ ಪಟ್ಟಿ (FairScore)',
    marketLinkages: 'ನೇರ ಖರೀದಿದಾರರ ಮಾರುಕಟ್ಟೆ',
    mandiAnalytics: 'ಮಂಡಿ ಬೆಲೆ ಪ್ರವೃತ್ತಿ & ವಿಶ್ಲೇಷಣೆ',
    weatherAlerts: 'ಹವಾಮಾನ ಮತ್ತು ಕೊಯ್ಲು ಎಚ್ಚರಿಕೆ',
    myFarmPortfolio: 'ನನ್ನ ಬೆಳೆ ಪಟ್ಟಿ ಮತ್ತು ಲಾಟ್‌ಗಳು',
    aiAdvisory: 'ಕಿಸಾನ್ ವಾಯ್ಸ್ AI ಸಲಹೆಗಾರ',
    predictYieldBtn: 'ಇಳುವರಿ ಮತ್ತು ಉತ್ಪಾದನಾ ವೆಚ್ಚ ಲೆಕ್ಕಹಾಕಿ',
    calculatePriceBtn: 'ನ್ಯಾಯಯುತ ಕನಿಷ್ಠ ಬೆಲೆ ಪಡೆಯಿರಿ',
    connectBuyersBtn: 'ದೃಢೀಕೃತ ಖರೀದಿದಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ',
    heroBadge: 'ಕರ್ನಾಟಕ & ಮಹಾರಾಷ್ಟ್ರ ಕೃಷಿ ಮಾರುಕಟ್ಟೆ ಚೌಕಟ್ಟು (SIH26132)',
    mspNotice: 'ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆ (MSP) ರಕ್ಷಣೆ ಖಾತರಿ',
    escrowGuaranteed: '100% ಸುರಕ್ಷಿತ ಎಸ್ಕ್ರೋ ಪಾವತಿ ರಕ್ಷಣೆ',
    middlemanSaved: 'ಮಧ್ಯವರ್ತಿಗಳ 8-15% ಕಮಿಷನ್ ಉಳಿತಾಯ',

    simpleGuideTitle: 'ಸರಳ ಕಿಸಾನ್ ಸಹಾಯಕ',
    simpleGuideSubtitle: 'ನಿಮ್ಮ ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ • ಇಂದಿನ ಸರಿಯಾದ ಮಂಡಿ ಬೆಲೆ ತಿಳಿಯಿರಿ • ನೇರವಾಗಿ ಖರೀದಿದಾರರಿಗೆ ಮಾರಿ',
    step1ChooseCrop: '1. ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ (Choose Crop)',
    step1Help: 'ಬೆಲೆ ನೋಡಲು ಅಥವಾ ಮಾರಾಟ ಮಾಡಲು ಬಯಸುವ ಬೆಳೆಯ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ:',
    step2FairPrice: '2. ಇಂದಿನ ಸರಿಯಾದ ದರ (Fair Rate)',
    step3SellDirect: '3. ನೇರವಾಗಿ ಮಾರಾಟ ಮಾಡಿ (Sell Crop)',
    sellDirectDesc: 'ಯಾವುದೇ ದಲ್ಲಾಳಿಗಳಿಲ್ಲದೆ ನೇರವಾಗಿ ದೊಡ್ಡ ಖರೀದಿದಾರರಿಗೆ (ITC, Adani) ಮಾರಿ ಬ್ಯಾಂಕ್ ಪಾವತಿ ಪಡೆಯಿರಿ.',
    listCropBtn: '🌾 ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಪಟ್ಟಿ ಮಾಡಿ',
    listenAudioBtn: '🔊 ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ (Listen Aloud)',
    stopAudioBtn: 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ',
    kisanHelpline: '📞 ಕಿಸಾನ್ ಸಹಾಯವಾಣಿ: 1800-180-1551',
    mspGovRate: 'ಸರ್ಕಾರಿ ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆ (MSP):',
    middlemanSavings: 'ದಲ್ಲಾಳಿ ಕಮಿಷನ್ ಉಳಿತಾಯ (8-15%):',
    rateComparisonBetter: 'ಈ ದರ ಸರ್ಕಾರಿ ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆಗಿಂತ ಹೆಚ್ಚಾಗಿದೆ.',
    oneClickSelect: 'ಒಂದೇ ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಆಯ್ಕೆ',
    freshDailyMandi: 'ತಾಜಾ ದೈನಂದಿನ ಸರ್ಕಾರಿ APMC ದರಗಳು',

    fairScoreHeaderTitle: 'ಫೇರ್‌ಸ್ಕೋರ್ ಒಳನೋಟಗಳು ಮತ್ತು ಬೆಲೆ ಬ್ಯಾಂಡ್ ಎಂಜಿನ್',
    fairScoreHeaderSub: 'ನೈಜ ಸಮಯದ ಮಂಡಿ ಪ್ರವೃತ್ತಿಗಳು ಮತ್ತು ನ್ಯಾಯಯುತ ಬೆಲೆ ಸೂಚ್ಯಂಕ.',
    selectDistrictTaluk: 'ಜಿಲ್ಲೆ ಮತ್ತು ತಾಲೂಕು ಆಯ್ಕೆಮಾಡಿ',
    selectCropType: 'ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ',
    currentModalPrice: 'ಪ್ರಸ್ತುತ ಮಂಡಿ ಬೆಲೆ',
    predictedPriceBand: 'ಅಂದಾಜು ನ್ಯಾಯಯುತ ಬೆಲೆ ಬ್ಯಾಂಡ್',
    fairScoreIndex: 'ಫೇರ್‌ಸ್ಕೋರ್ ಸೂಚ್ಯಂಕ',
    oversupplyRisk: 'ಹೆಚ್ಚುವರಿ ಪೂರೈಕೆ ಅಪಾಯ',
    simulatedAskingPrice: 'ಫೇರ್‌ಸ್ಕೋರ್ ಸಿಮ್ಯುಲೇಟರ್ (ಅಪೇಕ್ಷಿತ ಬೆಲೆ)',
    listMyCropAt: 'ಈ ಬೆಲೆಗೆ ಬೆಳೆ ಪಟ್ಟಿ ಮಾಡಿ:',
    bandFloor: 'ಬ್ಯಾಂಡ್ ಕನಿಷ್ಠ',
    optimalMid: 'ಸೂಕ್ತ ಮಧ್ಯಮ',
    bandCeiling: 'ಬ್ಯಾಂಡ್ ಗರಿಷ್ಠ',
    oversupplyWarning: 'ಹೆಚ್ಚುವರಿ ಪೂರೈಕೆ ಎಚ್ಚರಿಕೆ',
    simpleViewToggle: 'ಸರಳ ವೀಕ್ಷಣೆ',
    technicalViewToggle: 'ಸಂಪೂರ್ಣ ವಿವರಗಳು (SIH26132)',
    simpleModeActive: 'ಸರಳ ಕಿಸಾನ್ ಮೋಡ್ ಸಕ್ರಿಯವಾಗಿದೆ',
    techModeActive: 'ತಾಂತ್ರಿಕ ವಿಶ್ಲೇಷಣೆ ಸಕ್ರಿಯವಾಗಿದೆ',

    fairBaselineTitle: 'ಪಾರದರ್ಶಕ ಬೆಲೆ ಮತ್ತು ಸ್ವಾಮಿನಾಥನ್ ಸೂತ್ರ',
    fairBaselineDesc: 'ಉತ್ಪಾದನಾ ವೆಚ್ಚ, MSP ಮತ್ತು ಗುಣಮಟ್ಟದ ಆಧಾರದ ಮೇಲೆ ಸರಿಯಾದ ಬೆಲೆ ಪಡೆಯಿರಿ.',
    qualityGradingTitle: 'ಬೆಳೆ ಗುಣಮಟ್ಟದ ನಿಯತಾಂಕಗಳು',
    moisturePercent: 'ತೇವಾಂಶ (%)',
    foreignMatter: 'ಕಲ್ಮಶಗಳು (%)',
    brokenGrains: 'ಒಡೆದ ಧಾನ್ಯ (%)',
    colorLuster: 'ಬಣ್ಣ ಮತ್ತು ಹೊಳಪು',
    superiorBright: 'ಅತ್ಯುತ್ತಮ / ಹೊಳಪುಳ್ಳ',
    standardGrade: 'ಸಾಮಾನ್ಯ',
    costOfProduction: 'ರೈತರ ಉತ್ಪಾದನಾ ವೆಚ್ಚ (₹/ಕ್ವಿಂಟಾಲ್)',
    volumeQuintals: 'ಒಟ್ಟು ಪ್ರಮಾಣ (ಕ್ವಿಂಟಾಲ್)',
    calculateFairBtn: 'ಬೆಲೆಯನ್ನು ಲೆಕ್ಕಹಾಕಿ',
    connectBuyersAction: 'ಖರೀದಿದಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ',

    marketLinkageTitle: 'ರೈತ ↔ ಖರೀದಿದಾರರ ನೇರ ಮಾರುಕಟ್ಟೆ',
    marketLinkageSub: 'ಮಧ್ಯವರ್ತಿಗಳನ್ನು ತಪ್ಪಿಸಿ. 100% ಸುರಕ್ಷಿತ ಎಸ್ಕ್ರೋ ಮೂಲಕ ನೇರವಾಗಿ ವ್ಯಾಪಾರ ಮಾಡಿ.',
    verifiedBuyers: 'ದೃಢೀಕೃತ ಖರೀದಿದಾರರು',
    allBuyers: 'ಎಲ್ಲಾ ಖರೀದಿದಾರರು',
    negotiateBtn: 'AI ಚರ್ಚೆ',
    createContractBtn: 'ಒಪ್ಪಂದ ರಚಿಸಿ',
    escrowProtectedBadge: '100% ಸುರಕ್ಷಿತ',
    counterOffer: 'ಪ್ರತಿ ಪ್ರಸ್ತಾಪ',
    buyerBid: 'ಖರೀದಿದಾರರ ಬಿಡ್',

    quintalUnit: '/ ಕ್ವಿಂಟಾಲ್ (100 ಕೆಜಿ)',
    loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    close: 'ಮುಚ್ಚಿ',
    viewAll: 'ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ',
    saveChanges: 'ಉಳಿಸಿ',
    share: 'ಹಂಚಿಕೊಳ್ಳಿ',
    back: 'ಹಿಂದೆ',
  },
};

export const getTranslation = (lang: Language): TranslationDictionary => {
  const dict = APP_TRANSLATIONS[lang] || APP_TRANSLATIONS['en'];
  const fallback = APP_TRANSLATIONS['en'];
  return new Proxy(dict, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined;
      const key = prop as keyof TranslationDictionary;
      if (key in target && target[key] !== undefined && target[key] !== '') {
        return target[key];
      }
      if (key in fallback && fallback[key] !== undefined && fallback[key] !== '') {
        return fallback[key];
      }
      return String(prop);
    }
  });
};
