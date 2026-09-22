import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './i18n/locales/en';
import { es } from './i18n/locales/es';
import { fr } from './i18n/locales/fr';
import { de } from './i18n/locales/de';
import { it } from './i18n/locales/it';
import { pt } from './i18n/locales/pt';
import { zh } from './i18n/locales/zh';
import { ja } from './i18n/locales/ja';
import { ko } from './i18n/locales/ko';
import { ar } from './i18n/locales/ar';
import { ru } from './i18n/locales/ru';
import { hi } from './i18n/locales/hi';
import { nl } from './i18n/locales/nl';
import { pl } from './i18n/locales/pl';
import { tr } from './i18n/locales/tr';
import { vi } from './i18n/locales/vi';
import { id } from './i18n/locales/id';

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
];

const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null;
const supportedCodes = SUPPORTED_LANGUAGES.map(l => l.code);
const initialLanguage = savedLanguage && supportedCodes.includes(savedLanguage) ? savedLanguage : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      de: { translation: de },
      it: { translation: it },
      pt: { translation: pt },
      zh: { translation: zh },
      ja: { translation: ja },
      ko: { translation: ko },
      ar: { translation: ar },
      ru: { translation: ru },
      hi: { translation: hi },
      nl: { translation: nl },
      pl: { translation: pl },
      tr: { translation: tr },
      vi: { translation: vi },
      id: { translation: id },
    },
    lng: initialLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    parseMissingKeyHandler: (key) => {
      // Prevent technical dot-notated keys from ever showing in the UI
      const lastPart = key.split('.').pop() || '';
      return lastPart.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()).trim();
    },
  });

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('i18nextLng', lng);
    document.documentElement.lang = lng;
  }
});

if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLanguage;
}

export default i18n;
