import { useEffect } from "react";
import { useTranslation } from 'react-i18next'
import { Link } from "react-router-dom";

const Footer = () => {

    const {t, i18n } = useTranslation()
    const locales = {
        en: {title: 'English'},
        ru: {title: 'Русский'},
        uz: {title: 'O\'zbek'}
    }

    useEffect(()=>{
        const list = document.querySelectorAll('.list')

        function activeLink() {
            
            list.forEach((item) =>
                item.classList.remove('active'))
            this.classList.add('active')
        }
        
        list.forEach((item) => {
            item.addEventListener('click', activeLink)
        })

    },[]);
    
    
    return (
        <div className="footer3">
            <button><Link to="/"><img src={require("../images/catalog.png")} alt="" />{t('catalog')}</Link></button>
            <button><Link to="/create"><img src={require("../images/create.png")} alt="" />{t('create')}</Link></button>
            <button><Link to="/shoppingCart"><img src={require("../images/cart.png")} alt="" />{t('cart')}</Link></button>
            <button><Link to="/myOrders"><img src={require("../images/orders.png")} alt="" />{t('orders')}</Link></button>
            <button><Link to="/profile"><img src={require("../images/cabinet.png")} alt="" />{t('cabinet')}</Link></button>
        </div>
    )
}

export default Footer