import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { DEFAULT_APP_LANGUAGE, LANGUAGE_LOCALSTORAGE_KEY } from '../../consts'
import en from './translations/en.json'
import pl from './translations/pl.json'
import ru from './translations/ru.json'
import uk from './translations/uk.json'
import de from './translations/de.json'


let selectedLanguage = DEFAULT_APP_LANGUAGE

try {
  const value = window.localStorage.getItem(LANGUAGE_LOCALSTORAGE_KEY)
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
    resources: { en, pl, ru, uk, de }
  })
