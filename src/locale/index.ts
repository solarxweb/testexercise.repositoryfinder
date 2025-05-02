import i18next from "i18next";
import en from "./resources/en";
import ru from "./resources/ru";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const i18nInstance = i18next.createInstance();

i18nInstance
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: { 
      en,
      ru,
    },
    fallbackLng: 'en',
  } as const);

export default i18nInstance;
