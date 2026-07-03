import { initReactI18next } from 'react-i18next';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';

// Imports für die deutsche Sprache
import deAuth from '@/../public/locales/de/auth.json';
import deCommon from '@/../public/locales/de/common.json';
import deCommunity from '@/../public/locales/de/community.json';
import deHome from '@/../public/locales/de/home.json';
import dePost from '@/../public/locales/de/post.json'
import deProfile from '@/../public/locales/de/profile.json';
import deSettings from '@/../public/locales/de/settings.json';
import deShop from '@/../public/locales/de/shop.json'
import deTasks from '@/../public/locales/de/tasks.json';
import deTrophies from '@/../public/locales/de/trophies.json'
// Imports für die englische Sprache
import enAuth from '@/../public/locales/en/auth.json';
import enCommon from '@/../public/locales/en/common.json';
import enCommunity from '@/../public/locales/en/community.json';
import enHome from '@/../public/locales/en/home.json';
import enPost from '@/../public/locales/en/post.json'
import enProfile from '@/../public/locales/en/profile.json';
import enSettings from '@/../public/locales/en/settings.json';
import enShop from '@/../public/locales/en/shop.json'
import enTasks from '@/../public/locales/en/tasks.json';
import enTrophies from '@/../public/locales/en/trophies.json'

// Erkennt die Nutzersprache: Entweder aus dem Speicher oder vom Betriebssystem
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      const savedLanguage = await AsyncStorage.getItem('@user_language');
      if (savedLanguage) {
        return callback(savedLanguage);
      }

      // Holt die Systemsprache des Smartphones (z.B. 'de' oder 'en')
      const systemLang = Localization.getLocales()[0].languageCode;
      return callback(systemLang);
    } catch (error) {
      console.log('Error reading language', error);
      callback('en'); // Sicherer Fallback bei Speicherfehlern
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

    // Hier werden jetzt ALLE deine Feature-Dateien sauber gemappt
    resources: {
      de: {
        auth: deAuth,
        common: deCommon,
        community: deCommunity,
        home: deHome,
        profile: deProfile,
        settings: deSettings,
        tasks: deTasks,
        trophies: deTrophies,
        shop: deShop,
        post: dePost,
      },
      en: {
        auth: enAuth,
        common: enCommon,
        community: enCommunity,
        home: enHome,
        profile: enProfile,
        settings: enSettings,
        tasks: enTasks,
        trophies: enTrophies,
        shop: enShop,
        post: enPost,
      },
    },

    // Deklaration aller Namespaces, damit i18next weiß, welche Keys existieren
    ns: ['auth', 'common', 'community', 'home', 'profile', 'settings', 'tasks', 'trophies', 'shop', 'post'],

    // Wenn kein Namespace angegeben wird (z.B. i18n.t('save')), greift 'common'
    defaultNS: 'common',

    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React schützt uns bereits nativ vor XSS
    },
  });

export default i18n;