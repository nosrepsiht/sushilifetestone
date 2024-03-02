import { useTranslation } from "react-i18next"
import { Navigate, useNavigate } from "react-router-dom"

const Header = () => {

    const navigate = useNavigate()
    const {t, i18n } = useTranslation()
    const locales = {
        en: {title: "en"},
        ru: {title: "ru"},
        uz: {title: "uz"}
    }

    const handleChangeLanguage = (_locale) => {
        i18n.changeLanguage(_locale)
        window.location.reload()
    }

    
    return (
        <div className="header2">
            {/* <div className="search">
                <input type="text" placeholder={t('search')}></input>
            </div> */}
            <div>
                <button className="bMore" onClick={() => {navigate('/contacts')}}>{t('contacts')}</button>
            </div>
            <div className="cLogo">
                <img className="iLogo" src={require('../images/logo.png')} />
            </div>
            <ul className="languages">
                {/* {Object.keys(locales).map((locale) => (
                    <li className="language" key={locale}><button type="submit" onClick={() => i18n.changeLanguage(locale)}>
                        {locales[locale].title}
                        </button></li>
                ))} */}

                {Object.keys(locales).map((locale) => (
                    <li className="language" key={locale}><img onClick={() => handleChangeLanguage(locale)} src={require('../images/' + locales[locale].title + '.png')}/></li>
                ))}
            </ul>
        </div>
    )
}

export default Header