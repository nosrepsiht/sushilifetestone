import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import MapComponent from './MapComponent'


const TestComponent = () => {

    const {t, i18n } = useTranslation()
    const locales = {
        en: {title: 'English'},
        ru: {title: 'Русский'},
        uz: {title: 'O\'zbek'}
    }

    return (
        <div>
            {t('profile')}
            <div>
                <button><Link to="/">{t('main')}</Link></button>
            </div>

            <div>
                <MapComponent/>
            </div>
        </div>
    )
}

export default TestComponent