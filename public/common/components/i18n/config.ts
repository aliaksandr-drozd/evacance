import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { DEFAULT_APP_LANGUAGE, LANGUAGE_LOCAL_STORAGE_KEY } from '../../consts'
import languageEN from './translations/en/translate.json'
import languagePL from './translations/pl/translate.json'
import languageRU from './translations/ru/translate.json'
import languageUA from './translations/ua/translate.json'


let selectedLanguage = DEFAULT_APP_LANGUAGE

try {
  const value = window.localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY)
  if (value) {
    selectedLanguage = JSON.parse(value)
  }
} catch (e) {}


export default i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: selectedLanguage,
    fallbackLng: DEFAULT_APP_LANGUAGE,
    keySeparator: '.',
    resources: {
      en: languageEN,
      pl: languagePL,
      ru: languageRU,
      ua: languageUA,
    }
  })
