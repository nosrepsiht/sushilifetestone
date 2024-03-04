export const Dictionary = (data) => {

    console.log("dat:" + data)
    const {t, i18n } = useTranslation()
    // i18n.changeLanguage('en')
    
    return t(data)
}

export const Locales = () => {
    
    const locales = {
        en: {title: 'English'},
        ru: {title: 'Русский'},
        uz: {title: 'O\'zbek'}
    }

    return locales
}

// export const ChangeLanguage = (locale) => {
    
//     const {t, i18n } = useTranslation()
//     i18n.changeLanguage('en')
//     console.log(i18n)
//     console.log(useTranslation().t('products'))

//     return "success"
// }



// module.exports = [t, locales];

// export default TranslationVars