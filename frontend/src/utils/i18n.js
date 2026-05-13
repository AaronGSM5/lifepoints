import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import deCommon from '@/../public/locales/de/common.json';
import deSettings from '@/../public/locales/de/settings.json';
import deHome from '@/../public/locales/de/home.json'

import enCommon from '@/../public/locales/en/common.json';
import enSettings from '@/../public/locales/en/settings.json';
import enHome from '@/../public/locales/en/home.json'

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      const savedLanguage = await AsyncStorage.getItem('@user_language');
      if (savedLanguage) {
        return callback(savedLanguage);
      }
      const systemLang = Localization.getLocales()[0].languageCode;
      return callback(systemLang);
    } catch (error) {
      console.log('Error reading language', error);
      callback('en'); // Fallback zu Englisch bei Fehlern
    }
  },
  init: () => { },
  cacheUserLanguage: (language) => {
    AsyncStorage.setItem('@user_language', language);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',

    resources: {
      de: {
        common: deCommon,
        settings: deSettings,
        home: deHome
      },
      en: {
        common: enCommon,
        settings: enSettings,
        home: enHome
      },
    },

    ns: ['common', 'settings', 'home'],

    defaultNS: 'common',

    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;