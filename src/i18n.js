import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        fallbackLng: 'ru'
    })

export default i18n

// import i18n from 'i18next'
// import { initReactI18next } from 'react-i18next'
// import LanguageDetector from 'i18next-browser-languagedetector'
// import Backend from 'i18next-http-backend'
// import GlobalVars from './globalVariables/GlobalVars'

// i18n
//     .use(Backend)
//     .use(LanguageDetector)
//     .use(initReactI18next)
//     .init({
//         debug: false,
//         fallbackLng: 'ru',
//         backend: {
//             loadPath: GlobalVars.backend_server + "/api/translations/{{lng}}"
//         },
//         ns: ['common'], // Specify the namespaces to load
//         defaultNS: 'common', // Specify the default namespace
//         supportedLngs: ['en', 'ru'], // Specify the supported languages
//         load: 'languageOnly', // Load only the language-specific file, not the fallback
//     })

// export default i18n