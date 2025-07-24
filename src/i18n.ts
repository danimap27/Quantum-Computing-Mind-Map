import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'es'],
    fallbackLng: 'en',
    debug: true,
    backend: {
      loadPath: '/Quantum-Computing-Mind-Map/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
