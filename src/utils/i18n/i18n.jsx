import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

let language = localStorage.getItem('language');
if (!language) {
    const userLanguage = navigator.language;
    language = userLanguage.startsWith('ru') ? 'ru' : 'en';
    localStorage.setItem('language', language);
}

i18n
    .use(initReactI18next)
    .use(HttpApi)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'ru',
        debug: false,
        detection: {
            order: ['localStorage', 'navigator'],
            lookupLocalStorage: 'language',
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
            cache: {
                enabled: true,
                cacheExpirationTime: 60 * 60 * 1000,
                 version: 'v1',
                 clearExpired: true,
                 storage: window.localStorage
            }
        },
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: true,
        },
    });

export default i18n;