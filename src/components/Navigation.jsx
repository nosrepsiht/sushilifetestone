import { useEffect } from "react";
import { useTranslation } from 'react-i18next'

const Navigation = () => {

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
        <div className="navigation-class">
            <div className="navigation-body">
                <div className="navigation">
                    <ul>
                        <li className="list active">
                            <a href="/main">
                                <span className="icon">
                                    <img style={{width: "50px"}} src={require("../images/catalog.png")} alt="" />
                                </span>
                                <span className="text">{t('catalog')}</span>
                            </a>
                        </li>
                        <li className="list">
                            <a href="/create">
                                <span className="icon">
                                    <img style={{width: "50px"}} src={require("../images/create.png")} alt="" />
                                </span>
                                <span className="text">{t('create')}</span>
                            </a>
                        </li>
                        <li className="list">
                            <a href="/shoppingCart">
                                <span className="icon">
                                    <img style={{width: "50px"}} src={require("../images/cart.png")} alt="" />
                                </span>
                                <span className="text">{t('cart')}</span>
                            </a>
                        </li>
                        <li className="list">
                            <a href="/myOrders">
                                <span className="icon">
                                    <img style={{width: "50px"}} src={require("../images/orders.png")} alt="" />
                                </span>
                                <span className="text">{t('orders')}</span>
                            </a>
                        </li>
                        <li className="list">
                            <a href="/profile">
                                <span className="icon">
                                    <img style={{width: "50px"}} src={require("../images/cabinet.png")} alt="" />
                                </span>
                                <span className="text">{t('cabinet')}</span>
                            </a>
                        </li>
                        {/* <div className="indicator"></div> */}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navigation