import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Send, 
  Mic, 
  Languages, 
  Bot, 
  User, 
  X, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { Language, VernacularMessage } from '../types';
import { ArrowScrollContainer } from './ArrowScrollContainer';
import { getTranslation } from '../utils/translations';

const WELCOME_MESSAGES: Record<Language, string> = {
  en: 'Welcome farmer friend! I am your KrishiSetu AI Advisory Assistant. Ask me about crop yields, fair mandi prices, direct buyer contracts, or warehouse holding in your language.',
  hi: 'नमस्ते किसान भाई! मैं कृषिसेतु AI सलाहकार हूँ। आप मुझसे फसल की उपज, उचित मंडी भाव, सीधे खरीदार अनुबंध, या कोल्ड स्टोरेज के बारे में अपनी भाषा में पूछ सकते हैं।',
  gu: 'નમસ્તે ખેડૂત મિત્ર! હું કૃષિસેતુ AI સલાહકાર છું. તમે મને પાક ઉપજ, યોગ્ય માર્કેટ યાર્ડ ભાવ, સીધા ખરીદનાર કરારો અથવા ગોડાઉન સંગ્રહ વિશે તમારી ભાષામાં પૂછી શકો છો.',
  bn: 'নমস্কার কৃষক বন্ধু! আমি কৃষিসেতু এআই উপদেষ্টা। আপনি আপনার নিজের ভাষায় ফসলের ফলন, ন্যায্য মান্ডি দর, সরাসরি ক্রেতার চুক্তি বা গুদামজাতকরণ সম্পর্কে আমাকে জিজ্ঞাসা করতে পারেন।',
  pa: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰੋ! ਮੈਂ ਕ੍ਰਿਸ਼ੀਸੇਤੂ AI ਸਲਾਹਕਾਰ ਹਾਂ। ਤੁਸੀਂ ਫ਼ਸਲ ਦੇ ਝਾੜ, ਵਾਜਬ ਮੰਡੀ ਭਾਅ, ਸਿੱਧੇ ਖਰੀਦਦਾਰਾਂ ਜਾਂ ਗੋਦਾਮ ਬਾਰੇ ਪੁੱਛ ਸਕਦੇ ਹੋ।',
  mr: 'नमस्कार शेतकरी बंधूंनो! मी कृषीसेतू AI सल्लागार आहे. तुम्ही मला पीक उत्पादन, रास्त बाजारभाव, थेट खरेदीदार करार किंवा गोदामाबद्दल आपल्या भाषेत विचारू शकता.',
  te: 'నమస్కారం రైతు సోదరులారా! నేను కృషిసేతు AI సలహాదారుని. పంట దిగుబడి, సరసమైన మార్కెట్ ధరలు, ప్రత్యక్ష కొనుగోలుదారు ఒప్పందాల గురించి మీ స్వంత భాషలో నన్ను అడగవచ్చు.',
  ta: 'வணக்கம் விவசாய தோழரே! நான் கிருஷிசேது AI ஆலோசகர். பயிர் விளைச்சல், நியாயமான மண்டி விலை, நேரடி வாங்குபவர் ஒப்பந்தங்கள் பற்றி உங்கள் மொழியிலேயே கேட்கலாம்.',
  kn: 'ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ! ನಾನು ಕೃಷಿಸೇತು AI ಸಲಹೆಗಾರ. ಬೆಳೆ ಇಳುವರಿ, ನ್ಯಾಯಯುತ ಮಾರುಕಟ್ಟೆ ದರ, ನೇರ ಖರೀದಿದಾರರ ಒಪ್ಪಂದಗಳ ಕುರಿತು ನಿಮ್ಮದೇ ಭಾಷೆಯಲ್ಲಿ ಕೇಳಬಹುದು.',
};

interface VernacularAdvisoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const VernacularAdvisoryModal: React.FC<VernacularAdvisoryModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onLanguageChange,
}) => {
  if (!isOpen) return null;

  const [inputQuestion, setInputQuestion] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [speaking, setSpeaking] = useState<boolean>(false);

  const [messages, setMessages] = useState<VernacularMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: WELCOME_MESSAGES[currentLanguage] || WELCOME_MESSAGES.hi,
      timestamp: 'Just now',
      suggestedAction: 'Ask about Fair Price & Market Advisory',
    },
  ]);

  // Update welcome message if language switches and only 1 welcome message is present
  React.useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome-1') {
        return [
          {
            ...prev[0],
            text: WELCOME_MESSAGES[currentLanguage] || WELCOME_MESSAGES.hi,
          },
        ];
      }
      return prev;
    });
  }, [currentLanguage]);

  const presetQuestions: Record<string, string[]> = {
    en: [
      'Should I sell my wheat now or hold in warehouse for 30 days?',
      'A trader is offering ₹2,400 for Lokwan wheat. Is that below fair baseline?',
      'How to get 75% e-NWR warehouse receipt loan?',
      'How does 100% Escrow protection work for direct buyers?',
    ],
    hi: [
      'क्या मुझे अपना गेहूं अभी बेचना चाहिए या 30 दिन वेयरहाउस में रखना चाहिए?',
      'व्यापारी ₹2,400 प्रति क्विंटल दे रहा है। क्या यह उचित मूल्य से कम है?',
      'वेयरहाउस रसीद (e-NWR) पर 75% लोन कैसे प्राप्त करें?',
      'सीधे खरीदारों के साथ 100% एस्क्रो भुगतान सुरक्षा कैसे काम करती है?',
    ],
    pa: [
      'ਕੀ ਮੈਨੂੰ ਕਣਕ ਹੁਣੇ ਵੇਚਣੀ ਚਾਹੀਦੀ ਹੈ ਜਾਂ 30 ਦਿਨ ਸਟੋਰ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ?',
      'ਵਪਾਰੀ ₹2,400 ਰੁਪਏ ਦੇ ਰਿਹਾ ਹੈ। ਕੀ ਇਹ ਘੱਟ ਭਾਅ ਹੈ?',
      'ਸਿੱਧੇ ਖਰੀਦਦਾਰ ਨਾਲ 100% ਐਸਕਰੋ ਭੁਗਤਾਨ ਕਿਵੇਂ ਹੁੰਦਾ ਹੈ?',
    ],
    mr: [
      'मी माझा सोयाबीन आत्ता विकावा की ३० दिवस साठवून ठेवावा?',
      'व्यापारी ₹२,४०० भाव देत आहे, हा रास्त भावापेक्षा कमी आहे का?',
      'थेट खरेदीदारांकडून १००% सुरक्षित पेमेंट कसे मिळते?',
    ],
    te: [
      'నేను నా పంటను ఇప్పుడే విక్రయించాలా లేక వేర్‌హౌస్‌లో ఉంచాలా?',
      'వ్యాపారి క్వింటాలుకు ₹2,400 ఇస్తున్నారు, ఇది సరసమైన ధరేనా?',
      'e-NWR రసీదుపై 75% రుణం ఎలా పొందాలి?',
    ],
    ta: [
      'நான் இப்போது விற்க வேண்டுமா அல்லது கிடங்கில் வைக்க வேண்டுமா?',
      'வியாபாரி ₹2,400 தருகிறார், இது நியாய விலையா?',
      'e-NWR ரசீது கடன் பெறுவது எப்படி?',
    ],
    kn: [
      'ನಾನು ಈಗಲೇ ಬೆಳೆ ಮಾರಾಟ ಮಾಡಬೇಕೇ ಅಥವಾ ಗೋದಾಮಿನಲ್ಲಿ ಇಡಬೇಕೇ?',
      'ವ್ಯಾಪಾರಿ ₹2,400 ನೀಡುತ್ತಿದ್ದಾರೆ, ಇದು ನ್ಯಾಯಯುತ ಬೆಲೆಯೇ?',
      'e-NWR ರಸೀದಿಯ ಮೇಲೆ 75% ಸಾಲ ಪಡೆಯುವುದು ಹೇಗೆ?',
    ],
    gu: [
      'શું મારે મારો ઘઉં અત્યારે વેચવો જોઈએ કે 30 દિવસ ગોડાઉનમાં રાખવો જોઈએ?',
      'વેપારી ₹2,400 આપી રહ્યો છે, શું આ વાજબી ભાવ કરતાં ઓછો છે?',
      'ગોડાઉન રસીદ (e-NWR) પર 75% લોન કેવી રીતે મેળવવી?',
      'સીધા ખરીદદારો સાથે 100% એસ્ક્રો ચૂકવણી સુરક્ષા કેવી રીતે કાર્ય કરે છે?',
    ],
    bn: [
      'আমার কি এখনই গম বিক্রি করা উচিত নাকি ৩০ দিন গুদামে রাখা উচিত?',
      'ব্যাপারী কুইন্টাল প্রতি ₹২,৪০০ দিচ্ছে, এটা কি ন্যায্য মূল্যের চেয়ে কম?',
      'গুদাম রসিদ (e-NWR) এর উপর ৭৫% ঋণ কীভাবে পাওয়া যায়?',
      'সরাসরি ক্রেতাদের সাথে ১০০% এসক্রো পেমেন্ট নিরাপত্তা কীভাবে কাজ করে?',
    ],
  };

  const currentPresets = presetQuestions[currentLanguage] || presetQuestions['en'] || presetQuestions['hi'];

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    if (speaking) {
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const langMap: Record<string, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      pa: 'pa-IN',
      mr: 'mr-IN',
      te: 'te-IN',
      ta: 'ta-IN',
      kn: 'kn-IN',
      gu: 'gu-IN',
      bn: 'bn-IN',
    };
    utterance.lang = langMap[currentLanguage] || 'hi-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (questionText?: string) => {
    const query = questionText || inputQuestion;
    if (!query.trim()) return;

    const userMsg: VernacularMessage = {
      id: `user-${Date.now()}`,
      sender: 'farmer',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: currentLanguage,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/advisory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          language: currentLanguage,
          cropContext: 'Wheat / Soybean / Cash crops',
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        const aiMsg: VernacularMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: resData.data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedAction: resData.data.suggestedActions?.[0],
          audioAvailable: true,
        };
        setMessages((prev) => [...prev, aiMsg]);
        speakText(resData.data.reply);
      }
    } catch (err) {
      console.error('Advisory error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl max-w-4xl w-full h-[680px] shadow-2xl border border-stone-200/90 flex flex-col overflow-hidden transition-all duration-300">
        {/* Header */}
        <div className="bg-stone-950 text-white p-4 sm:p-5 flex items-center justify-between border-b border-stone-800/80">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-[#1b4332] flex items-center justify-center text-white font-bold shadow-md">
              <Sparkles className="w-5.5 h-5.5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold font-display flex items-center gap-2.5">
                <span>Kisan Voice & Vernacular AI Advisory</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Multilingual AI
                </span>
              </h3>
              <p className="text-xs text-stone-400 font-sans mt-0.5">
                Data-backed advice on fair prices, mandi spreads, and holding economics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <select
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-stone-900 border border-stone-700/80 text-xs text-stone-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium cursor-pointer shadow-xs"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="gu">ગુજરાતી</option>
              <option value="bn">বাংলা</option>
              <option value="pa">ਪੰਜਾਬੀ</option>
              <option value="mr">मराठी</option>
              <option value="te">తెలుగు</option>
              <option value="ta">தமிழ்</option>
              <option value="kn">ಕನ್ನಡ</option>
            </select>

            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white p-2 rounded-xl hover:bg-stone-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preset Question Pills with Arrow Navigation */}
        <div className="bg-stone-50/90 border-b border-stone-200/80 px-4 py-2.5 flex items-center">
          <ArrowScrollContainer scrollAmount={180}>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 flex-shrink-0 pr-1 font-mono">Quick Queries:</span>
            {currentPresets.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="flex-shrink-0 text-xs font-semibold bg-stone-900 hover:bg-[#1b4332] text-stone-100 hover:text-emerald-100 border border-stone-800 hover:border-emerald-700/60 px-3.5 py-1.5 rounded-full transition-all cursor-pointer truncate max-w-xs shadow-2xs"
              >
                {q}
              </button>
            ))}
          </ArrowScrollContainer>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-stone-50/50 no-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'farmer' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-9 h-9 rounded-2xl bg-[#1b4332] text-emerald-200 flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs border border-emerald-900/40">
                  <Bot className="w-4.5 h-4.5" />
                </div>
              )}

              <div
                className={`max-w-[82%] rounded-2xl sm:rounded-3xl p-4 text-xs leading-relaxed shadow-xs ${
                  msg.sender === 'farmer'
                    ? 'bg-[#1b4332] text-emerald-50 font-medium rounded-tr-sm border border-emerald-900/50'
                    : 'bg-white text-stone-900 border border-stone-200/90 rounded-tl-sm'
                }`}
              >
                <p className="font-sans text-xs sm:text-[13px]">{msg.text}</p>

                {msg.sender === 'ai' && (
                  <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                    <span>{msg.timestamp}</span>
                    <button
                      onClick={() => speakText(msg.text)}
                      className="flex items-center gap-1.5 text-[#1b4332] hover:text-emerald-800 font-bold transition-colors cursor-pointer bg-emerald-50/80 px-2.5 py-1 rounded-full border border-emerald-200/60"
                    >
                      {speaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#1b4332]" />}
                      <span>{speaking ? 'Stop Voice' : 'Listen Audio'}</span>
                    </button>
                  </div>
                )}
              </div>

              {msg.sender === 'farmer' && (
                <div className="w-9 h-9 rounded-2xl bg-stone-900 text-stone-100 flex items-center justify-center flex-shrink-0 text-xs font-bold border border-stone-800">
                  <User className="w-4.5 h-4.5" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2.5 text-stone-600 text-xs font-medium py-2 px-3 bg-white/80 rounded-2xl border border-stone-200/70 w-fit">
              <RefreshCw className="w-4 h-4 animate-spin text-[#1b4332]" />
              <span>Kisan AI is analyzing mandi price trends & agronomy...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-stone-200/80 flex items-center gap-3">
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything in your language (e.g. मंडी भाव, वेयरहाउस लोन, MSP)..."
            className="flex-1 text-xs sm:text-sm bg-stone-50 border border-stone-300/80 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none transition-all placeholder:text-stone-400 font-sans shadow-2xs"
          />

          <button
            onClick={() => handleSend()}
            disabled={loading || !inputQuestion.trim()}
            className="p-3 bg-[#1b4332] hover:bg-[#143527] disabled:bg-stone-200 disabled:text-stone-400 text-white rounded-2xl shadow-sm transition-all cursor-pointer flex items-center justify-center border border-emerald-900/40"
          >
            <Send className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
