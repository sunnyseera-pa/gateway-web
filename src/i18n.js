import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import enGBTranslation from 'public/locales/en-GB/translation.json';

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: false,
		fallbackLng: 'en-GB',
		lng: 'en-GB',
		interpolation: {
			escapeValue: false,
		},
		...(process.env.NODE_ENV === 'test' && {
			react: {
				wait: true,
				useSuspense: false,
			},
			resources: {
				'en-GB': {
					translation: enGBTranslation,
				},
			},
		}),
	});

export default i18n;
