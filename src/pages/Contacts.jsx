import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'


const Contacts = () => {

    const navigate = useNavigate()

    const {t, i18n } = useTranslation()
    const locales = {
        en: {title: 'English'},
        ru: {title: 'Русский'}
    }

    return (
        <div>
            <h1 style={{textAlign: "center"}}>{t('contacts')}</h1>

            <div>
                <div style={{textAlign: "center"}}>{t('phone') + ": +998 94 545 12 50"}</div>
            </div>

            <br></br>

            <div style={{textAlign: "center"}}>
                <button className="login" onClick={() => navigate('/')}>{t('main')}</button>
            </div>

            
        </div>
    )
}

export default Contacts