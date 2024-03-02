import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import GlobalVars from '../globalVariables/GlobalVars'
import MapDetails from '../components/MapDetails'
import { Link } from 'react-router-dom'
// import Cookies from 'universal-cookie'


const Order = () => {
    
    const {t, i18n } = useTranslation()
    const locales = {
        en: {title: 'English'},
        ru: {title: 'Русский'}
    }

    const [order, setOrder] = useState([])
    const [orderDetails, setOrderDetails] = useState([])

    // const cookies = new Cookies()

    useEffect(()=>{
        const fetchOrder = async ()=>{
            try{
                const res = await axios.delete(GlobalVars.backend_server + "/getOrder/" + window.location.pathname.split("/").pop())
                setOrder(res.data[0][0])
                setOrderDetails(res.data[1])
                // localStorage.setItem("orderLocation", JSON.stringify([res.data[0][0].locationX, res.data[0][0].locationY]))
                // console.log(JSON.parse(getItem("orderLocation")))
                // console.log(res.data[0][0])
            }
            catch(err){
                console.log(err)
            }
        }
        fetchOrder()
    },[]);

    // const handleDetails = async ()=>{
    //     console.log("yeah..., it is working...)")
    // }

        if (localStorage.getItem("username") == null) {
            return (
                <div>Hello</div>
            )
        }

        else {
            return (
                <div>
                    {/* <div>{t('order_details')}</div>
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
                    
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <div className="order" style={{width: "fit-content"}}>
                            <h1 style={{textAlign: "center"}}>{t('order_details')}</h1>
                            
                            {/* <div>
                                {"ID: " + order.order_id}
                                {", "}
                                {t('cost') + ": " + order.cost}
                                {", "}
                                {t('date') + ": " + new Date(order.datetime).toLocaleString([], {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'})}
                            </div> */}
    
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <table style={{textAlign: "center"}}>
                                    <tbody>
                                        <tr style={{backgroundColor: "#ff6600"}}>
                                            <td>{"ID"}</td>
                                            <td>{t('date')}</td>
                                            <td>{t('status')}</td>
                                            <td>{t('price')}</td>
                                        </tr>
                                        <tr style={{backgroundColor: "#46a7ce"}}>
                                            <td>{order.order_id}</td>
                                            <td>{new Date(order.datetime).toLocaleString([], {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'})}</td>
                                            <td>{order.status}</td>
                                            <td>{(order.cost + 0).toLocaleString('en') + " " + t('sum')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
    
                            <br></br>
    
                            {/* <div className='products'>
                                {orderDetails.map((_order) => (
                                    <div className="orderDetails" key={_order.id}>
                                        <div style={{backgroundColor: "#46a7ce"}}>
                                            <div className='product-name' style={{display: "inline-block", verticalAlign: "top", width: "100px", textAlign: "center", height: "100px"}}>
                                                <div style={{verticalAlign: "top"}}>
                                                    {t('name')}
                                                </div>
                                                <div style={{background: "red"}}>
                                                    {_order.product_id == 0 ? _order.product_name : t('names.' + _order.product_name)}
                                                </div>
                                            </div>
                                            
                                            <div style={{display: "inline-block", verticalAlign: "top", width: "100px", textAlign: "center"}}>
                                                <div>
                                                    {t('quantity')}
                                                </div>
                                                <div>
                                                    {_order.product_quantity}
                                                </div>
                                            </div>
    
                                            <div style={{display: "inline-block", verticalAlign: "top", width: "100px", textAlign: "center"}}>
                                                <div>
                                                    {t('cost')}
                                                </div>
                                                <div>
                                                    {_order.product_cost}
                                                </div>
                                            </div>
    
                                            <div style={{display: "inline-block", verticalAlign: "top", width: "100px", textAlign: "center"}}>
                                                <div>
                                                    {t('cover')}
                                                </div>
                                                <div>
                                                    <img style={{width: "50px"}} src={require('../images/' + _order.product_cover + '.png')} />
                                                    <br></br>
                                                    {t('covers.' + _order.product_cover)}
                                                </div>
                                            </div>
    
                                            <div style={{display: "inline-block", verticalAlign: "top", width: "100px", textAlign: "center"}}>
                                                <div>
                                                    {t('form')}
                                                </div>
                                                <div>
                                                    <img style={{width: "50px"}} src={require('../images/' + _order.product_form + '.png')} />
                                                    <br></br>
                                                    {t('forms.' +_order.product_form)}
                                                </div>
                                            </div>
                                            
                                            <div style={{display: "inline-block", verticalAlign: "top", textAlign: "center"}}>
                                                <div>
                                                    {t('additional_cover')}
                                                </div>
                                                <div style={{display: "inline-block", verticalAlign: "top", width: "fit-content"}}>
                                                    {_order.product_additional_cover ?
                                                    _order.product_additional_cover.split(";").map((additional_cover) => (
                                                    <div className='additional_cover' style={{display: "inline-block"}}>
                                                        <img style={{width: "50px"}} src={require('../images/' + additional_cover + '.png')} />
                                                        <br></br>
                                                        {t('additional_covers.' + additional_cover)}
                                                    </div>))
                                                    : <div className='additional_cover'>{t('no')}</div>}
                                                </div>
                                            </div>
    
                                            <div style={{display: "inline-block", verticalAlign: "top", width: "fit-content", textAlign: "center"}}>
                                                <div>
                                                    {t('stuffing')}
                                                </div>
                                                {_order.product_stuffing ? _order.product_stuffing.split(";").map((stuffing) => (
                                                <div className='stuffing' style={{display: "inline-block"}}>
                                                    <img style={{width: "50px"}} src={require('../images/' + stuffing + '.png')} />
                                                    <br></br>
                                                    {t('stuffings.' + stuffing)}
                                                </div>))
                                                : <div className='stuffing'>{t('no')}</div>}
                                            </div>
                                        </div>
                                        <br></br>
                                    </div>
                                ))}
                            </div> */}
    
                            <div className='table-div'>
                                <table style={{textAlign: "center"}}>
                                    <tbody>
                                        <tr style={{backgroundColor: "#ff6600"}}>
                                            <td>{t('name')}</td>
                                            <td>{t('stuffing')}</td>
                                            <td>{t('pouring')}</td>
                                            <td>{t('hat')}</td>
                                            <td>{t('cover')}</td>
                                            <td>{t('additional_cover')}</td>
                                            <td>{t('quantity')}</td>
                                            <td>{t('cost')}</td>
                                            <td>{t('price')}</td>
                                        </tr>
                                        {orderDetails.map((_order, index) => (
                                            <tr key={index} style={{backgroundColor: "#46a7ce"}}>
                                                
                                                {/* Name */}
                                                <td>{_order.product_id == 0 ? _order.product_name : t('names.' + _order.product_name)}</td>
    
                                                {/* Stuffing */}
                                                <td>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                {_order.product_stuffing ?
                                                                    _order.product_stuffing.split(";").map((stuffing, index2) => (
                                                                        <td key={index2}>
                                                                            <img src={require('../images/' + stuffing.split(":")[0] + '.png')} />
                                                                            <br></br>
                                                                            {t('stuffings.' + stuffing.split(":")[0])}
                                                                            {stuffing.split(":")[1] ? " (" + stuffing.split(":")[1] + " " + t('grams') + ")" : ""}
                                                                        </td>
                                                                    ))
                                                                : <td>{t('no')}</td>}
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
    
                                                {/* Pouring */}
                                                <td>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                {_order.product_pouring ?
                                                                    _order.product_pouring.split(";").map((pouring, index) => (
                                                                        <td key={index}>
                                                                            <img src={require('../images/' + pouring + '.png')} />
                                                                            <br></br>
                                                                            {t('pourings.' + pouring)}
                                                                        </td>
                                                                    ))
                                                                : <td>{t('no')}</td>}
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
    
                                                {/* Hat */}
                                                <td>
                                                    {_order.product_hat ?
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <img src={require('../images/' + _order.product_hat + '.png')} />
                                                                    <br></br>
                                                                    {t('hats.' + _order.product_hat)}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    : t('no')
                                                    }
                                                </td>
    
                                                {/* Cover */}
                                                <td>
                                                    <img src={require('../images/' + _order.product_cover + '.png')} />
                                                    <br></br>
                                                    {t('covers.' + _order.product_cover)}
                                                </td>
    
                                                {/* Additional Cover */}
                                                <td>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                {_order.product_additional_cover ?
                                                                _order.product_additional_cover.split(";").map((additional_cover, index) => (
                                                                    <td key={index}>
                                                                        <img src={require('../images/' + additional_cover + '.png')} />
                                                                        <br></br>
                                                                        <div>
                                                                            {t('additional_covers.' + additional_cover)}
                                                                        </div>
                                                                    </td>
                                                                ))
                                                                : <td>{t('no')}</td>}
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
    
                                                {/* Quantity */}
                                                <td>{_order.product_quantity}</td>
    
                                                {/* Cost */}
                                                <td>{_order.product_cost.toLocaleString('en') + " " + t('sum')}</td>
    
                                                {/* Price */}
                                                <td>{(_order.product_cost * _order.product_quantity).toLocaleString('en') + " " + t('sum')}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
    
                            {/* <table>
                                <tr>
                                    <td>
                                        <td>Something1 Something1 Something1 Something1</td>
                                        <td>Something1 Something1 Something1 Something1</td>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <td>some2</td>
                                        <td>some3</td>
                                    </td>
                                </tr>
                            </table> */}
                        </div>
                    </div>
    
                    <MapDetails/>
                </div>
            )
        }
        
}

export default Order