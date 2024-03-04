import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import Cookies from 'universal-cookie'
import Products from '../components/Products'
import CreateRoll from '../components/CreateRoll'
import Header from '../components/Header'
import { useTranslation } from 'react-i18next'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const Main = () => {

    const {t, i18n } = useTranslation()
    const locales = {
        en: {title: 'English'},
        ru: {title: 'Русский'},
        uz: {title: 'O\'zbek'}
    }

    // const cookies = new Cookies()

    // if (localStorage.getItem('username') != null) {
    //     return (
    //         <div>
    //             {/* <div className='header'>
    //                 <Header/>
    //             </div> */}
    //             {/* {t('hello')}, {localStorage.getItem('username')} */}
    //             {/* <div className='header1'>
    //                 <button><Link to="/logout">{t('logout')}</Link></button>
    //                 <button><Link to="/profile">{t('profile')}</Link></button>
    //                 <button><Link to="/shoppingCart">{t('shopping_cart')}</Link></button>
    //                 <button><Link to="/myOrders">{t('orders')}</Link></button>
    //             </div> */}
    //             {/* <CreateRoll/> */}
    //             <Products/>
    //             {/* <div className='footer2'>
    //                 <button><Link to="/logout">{t('logout')}</Link></button>
    //                 <button><Link to="/profile">{t('profile')}</Link></button>
    //                 <button><Link to="/shoppingCart">{t('shopping_cart')}</Link></button>
    //                 <button><Link to="/myOrders">{t('orders')}</Link></button>
    //             </div> */}
    //             {/* <div className='footer'>
    //                 <Footer/>
    //             </div> */}
    //         </div>
    //     )
    // }

    // else {
    //     return (
    //         <div>
    //             {t('main')}
    //             <div>
    //                 <button><Link to="/login">{t('login')}</Link></button>
    //                 <button><Link to="/register">{t('register')}</Link></button>
    //                 <button><Link to="/shoppingCart">{t('shopping_cart')}</Link></button>
    //             </div>
    //             <CreateRoll/>
    //             <Products/>
    //         </div>
    //     )
    // }

    return (
        <div>
            <Products/>
        </div>
    )
}

export default Main