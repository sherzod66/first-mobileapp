import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, ru, uz } from './translations';
import AsyncStorage from '@react-native-community/async-storage';

const STORE_LANGUAGE_KEY = 'settings.lang';

const languageDetectorPlugin: any = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      // get stored language from Async storage
      // put your own language detection logic here
      await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then(language => {
        if (language) {
          //if language was stored before, use this language in the app
          return callback(language);
        } else {
          //if language was not stored yet, use english
          return callback('en');
        }
      });
    } catch (error) {
      console.log('Error reading language', error);
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      //save a user's language choice in Async storage
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {}
  },
};

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  uz: {
    translation: uz,
  },
};

i18next
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    fallbackLng: 'ru',
    compatibilityJSON: 'v4',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
  });

export default i18next;
