// Web Speech API helper for Indian Rural Farmers (Text-to-Speech)
// Supports Hindi (hi-IN), English (en-IN), Punjabi, Marathi, Telugu, Tamil, Kannada

export function speakText(
  text: string, 
  langCode: string = 'hi', 
  onStart?: () => void, 
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported on this device/browser');
    return false;
  }

  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for clear rural comprehension
    utterance.pitch = 1.0;

    // Map app language code to BCP 47 language tag
    const langMap: Record<string, string> = {
      hi: 'hi-IN',
      en: 'en-IN',
      pa: 'pa-IN',
      mr: 'mr-IN',
      te: 'te-IN',
      ta: 'ta-IN',
      kn: 'kn-IN',
      gu: 'gu-IN',
      bn: 'bn-IN',
    };

    utterance.lang = langMap[langCode] || 'hi-IN';

    // If Hindi or regional voice is available, prefer it
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(langCode) || v.lang === (langMap[langCode] || 'hi-IN'));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    if (onStart) utterance.onstart = onStart;
    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (error) {
    console.error('Speech synthesis error:', error);
    if (onEnd) onEnd();
    return false;
  }
}

export function stopSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}
