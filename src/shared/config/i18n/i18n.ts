import * as i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { LANGUAGES } from 'src/shared/consts/langs';
import { resources } from './resources';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: LANGUAGES.RU.SHORT,
    supportedLngs: [LANGUAGES.RU.SHORT, LANGUAGES.EN.SHORT],
    debug: false,
    returnNull: false,

    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
