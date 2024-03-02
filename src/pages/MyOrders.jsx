import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import GlobalVars from '../globalVariables/GlobalVars'
import { Link, useNavigate } from 'react-router-dom'
// import Cookies from 'universal-cookie'


const MyOrders = () => {
    
    const {t, i18n } = useTranslation()
    const locales = {
        en: {title: 'English'},
        ru: {title: 'Русский'}
    }

    const [myOrders, setMyOrders] = useState([])
    const navigate = useNavigate()

    // const cookies = new Cookies()

    useEffect(()=>{
        const fetchMyOrders = async ()=>{
            try{
                if (localStorage.getItem("username") != null) {
                    const res = await axios.post(GlobalVars.backend_server + "/myOrders", [localStorage.getItem("username")])
                    setMyOrders(res.data)
                }
                
            }
            catch(err){
                console.log(err)
            }
        }
        fetchMyOrders()
    },[]);

    const login = ()=>{
        navigate('/login')
    }

    const register = ()=>{
        navigate('/register')
    }

    const handleMore = async (order_id)=>{
        // console.log("yeah..., it is working...)")
        navigate("/order/" + order_id)
    }
        if (localStorage.getItem("username") == null) {
            return (
                <div>
                    <h2 style={{textAlign: "center"}}>{t('please_log_in_to_your_account_to_see_orders')}</h2>

                    <button className="login" onClick={login}>{t('login')}</button>
                    <button className="register" onClick={register}>{t('register')}</button>
                </div>
            )
        }

        else {
            return (
                <div>
                    {/* <div>{t('my_orders')}</div>
                    <button><Link to="/">{t('main')}</Link></button>
                    <button><Link to="/profile">{t('profile')}</Link></button>
                    <button><Link to="/shoppingCart">{t('shopping_cart')}</Link></button>
                    <button><Link to="/myOrders">{t('orders')}</Link></button>
                    <ul>
                        {Object.keys(locales).map((locale) => (
                            <li key={locale}><button type="submit" onClick={() => i18n.changeLanguage(locale)}>
                                {locales[locale].title}
                                </button></li>
                        ))}
                    </ul> */}
                    <h1 style={{textAlign: "center"}}>{t('my_orders')}</h1>
    
                    <table style={{textAlign: "center"}}>
                        <tbody>
                            <tr style={{backgroundColor: "#ff6600"}}>
                                <td>{t('order_id')}</td>
                                {/* <td>{t('status')}</td> */}
                                <td>{t('price')}</td>
                                <td>{t('date')}</td>
                                <td>{t('more')}</td>
                            </tr>
                            {myOrders.map((order, index) => (
                                <tr key={index} style={{backgroundColor: "#46a7ce"}}>
                                    <td>{order.order_id}</td>
                                    {/* <td>{order.status == null ? "null" : order.status}</td> */}
                                    <td>{order.cost.toLocaleString('en') + " " + t('sum')}</td>
                                    <td>{new Date(order.datetime).toLocaleString([], {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'})}</td>
                                    <td><button className="more" onClick={()=>handleMore(order.order_id)}>{t('more')}</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    
                    {/* <div className="my_orders">
                        {myOrders.map((order) => (
                            <div className="order" key={order.id}>
                                {"ID: " + order.id + " - " + t("names." + order.order_id)}
                                <button className="add" onClick={()=>handleMore(order.order_id)}>{t('more')}</button>
                            </div>
                        ))}
                    </div> */}
                </div>
            )
        }
        
}

export default MyOrders