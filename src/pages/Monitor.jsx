import { useEffect, useState } from "react";
import GlobalVars from "../globalVariables/GlobalVars";
import axios from "axios";
// import io from 'socket.io-client'
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useSound from 'use-sound'

// const Monitor = ({ socket }) => {
const Monitor = () => {

    const {t, i18n } = useTranslation()
    const locales = {
        en: {title: 'English'},
        ru: {title: 'Русский'},
        uz: {title: 'O\'zbek'}
    }

    // const url = `https://api.telegram.org/bot7025954997:AAEuUd8kvV8vd_KSVEqHTACVd2_zjnzbNm4/sendMessage`

    // console.log("yes")

    // let a = 0
    // let b = 0

    // let notification = new Audio(require('../sounds/notification.wav'))
    const [playSound] = useSound(require('../sounds/notification.wav'))

    const [account, setAccount] = useState([])
    // const socket = io.connect("http://localhost:3001")
    // console.log("mda connecting: " + socket.connected)
    // const socket = io.connect("https://e1304fb0b766af.lhr.life")

    const [myOrders, setMyOrders] = useState([])
    const navigate = useNavigate()

    // playSound()

    const fetchAccountData = async ()=>{
        try{
            const res = await axios.post(GlobalVars.backend_server + "/getAccount", [localStorage.getItem("username")])
            setAccount(res.data)

            // console.log(res.data)
        }

        catch(err){
            console.log(err)
        }
    }

    const fetchMyOrders = async ()=>{
        try{
            const res = await axios.get(GlobalVars.backend_server + "/allOrders")
            setMyOrders(res.data)

            return res.data[0]
        }
        catch(err){
            console.log(err)
        }
    }

    // useEffect(() => {
    //     socket.on("order", (data) => {
    //       handleGetOrder(data)
    //     })

    //     console.log("some")

    //     // playSound()

    //     // handleGetOrder()

    //     // socket.on('connect', () => {
    //     //     console.log(socket)
    //     // })
    //   }, [socket])

    // useEffect(() => {
    //     socket.on("receive_message", (data) => {
    //         handleGetOrder(data)
    //     })

    //     socket.on('connect', () => {
    //         console.log(socket)
    //     })
    // }, [])

    useEffect(()=>{
        fetchAccountData()
    },[]);

    useEffect(()=>{
        if (account.length != 0 && account[0].user_type == "admin") {
            fetchMyOrders()
        }
    },[account]);

    

    // useEffect(() => {
    //     console.log("haha")
    // }, [account])

    // useEffect(() => {
    //     console.log("haha2")
    // }, [socket])

    const handleMore = async (order_id)=>{
        // console.log("yeah..., it is working...)")
        navigate("/order/" + order_id)
    }

    const handleGetOrder = async (data)=>{
        // console.log(myOrders)
        // console.log(myOrders[0])
        // playSound()
        // console.log(data)
        //   notification.play()
        // console.log("lol")

        // const lastOrder = await axios.get(GlobalVars.backend_server + "/getLastOrder")
        // const lastOrderDetails = await axios.delete(GlobalVars.backend_server + "/getOrder/" + lastOrder.data[0].order_id)

        // console.log(lastOrder.data[0].cost)
        // console.log(lastOrderDetails.data[1])
        // console.log(t('names.' + lastOrderDetails.data[1][0].product_name))
        // console.log(lastOrderDetails.data[1][0].product_stuffing.split(";").map((stuffing) => t('stuffings.' + stuffing.split(":")[0]) + " (" + stuffing.split(":")[1] + " " + t('grams') + ")"))

        // console.log(lastOrderDetails.data[1][0].product_stuffing.split(";").map((stuffing) => t('stuffings.' + stuffing)).join(', '))

        // let message = "Номер заказа: " + lastOrder.data[0].order_id + "\n\n"

        // let products = []

        // for (let i = 0; i < lastOrderDetails.data[1].length; i++) {
        //     let _name = lastOrderDetails.data[1][i].product_id != 0 ? t('names.' + lastOrderDetails.data[1][i].product_name) : lastOrderDetails.data[1][i].product_name
            
        //     // console.log(lastOrderDetails.data[1][i].product_stuffing)


        //     // let _stuffing = lastOrderDetails.data[1][i].product_stuffing

        //     // let _stuffing = lastOrderDetails.data[1][i].product_stuffing.split(";").map((_stuffing2, _index) => {lastOrderDetails.data[1][i].product_id == 0 ? "mda".toString() : "mda2".toString()})
        //     // let _stuffing = lastOrderDetails.data[1][i].product_stuffing != null ? lastOrderDetails.data[1][i].product_stuffing.split(";").map((_stuffing2, _index) => {lastOrderDetails.data[1][i].product_id == 0 ? 
        //     //     // _stuffing2.split(":").map(() => t('stuffings.' + _stuffing2.split(":")[0]) + " (" + _stuffing2.split(":")[1] + " " + t('grams') + ")")
        //     //     //     : t('stuffings.' + _stuffing2)

        //     //     "hehe0".toString() : "hehe+".toString()
        //     // })

        //     // : t('no')

        //     let _stuffing = lastOrderDetails.data[1][i].product_stuffing != null ? lastOrderDetails.data[1][i].product_id != 0 ? lastOrderDetails.data[1][i].product_stuffing.split(";").map((stuffing2) => t('stuffings.' + stuffing2)).join(', ') : lastOrderDetails.data[1][i].product_stuffing.split(";").map((stuffing3) => t('stuffings.' + stuffing3.split(":")[0]) + " (" + stuffing3.split(":")[1] + " " + t('grams') + ")").join(', ') : t('no')

        //     // if (lastOrderDetails.data[1][i].product_stuffing != null) {
                
        //     //     lastOrderDetails.data[1][i].product_stuffing.split(";").map((_stuffing, _index) => {
        //     //         if (lastOrderDetails.data[1][i].product_id == 0) {
        //     //             console.log("mda1")
        //     //             _stuffing = lastOrderDetails.data[1][i].product_stuffing.split(";").map((stuffing) => t('stuffings.' + stuffing.split(":")[0]) + " (" + stuffing.split(":")[1] + " " + t('grams') + ")")
        //     //         }
    
        //     //         else {
        //     //             console.log("mda2")
        //     //             _stuffing = lastOrderDetails.data[1][i].product_stuffing.split(";").map((stuffing) => t('stuffings.' + stuffing)).join(', ')
        //     //         }
        //     //     })
        //     // }

        //     // let _pouring = lastOrderDetails.data[1][i].product_pouring != null ? lastOrderDetails.data[1][0].product_pouring.split(";").map((pouring) => t('pourings.' + pouring)).join(', ') : t('no')
        //     let _pouring = lastOrderDetails.data[1][i].product_pouring != null ? t('pourings.' + lastOrderDetails.data[1][i].product_pouring) : t('no')
        //     let _hat = lastOrderDetails.data[1][i].product_hat != null ? t('hats.' + lastOrderDetails.data[1][i].product_hat) : t('no')
        //     let _cover = t('covers.' + lastOrderDetails.data[1][i].product_cover)
        //     let _additional_cover = lastOrderDetails.data[1][i].product_additional_cover != null ? lastOrderDetails.data[1][i].product_additional_cover.split(";").map((additional_cover) => t('additional_covers.' + additional_cover)).join(', ') : t('no')
        //     // let _additional_cover = t('no')
        //     let _quantity = lastOrderDetails.data[1][i].product_quantity
        //     let _cost = lastOrderDetails.data[1][i].product_cost
        //     let _price = parseInt(lastOrderDetails.data[1][i].product_quantity) * parseInt(lastOrderDetails.data[1][i].product_cost)

        //     products.push({_name, _stuffing, _pouring, _hat, _cover, _additional_cover, _quantity, _cost, _price})
        // }

        // console.log(products)

        // for (let i = 0; i < products.length; i++) {
        //     message += t('name') + ": " + products[i]._name + "\n" +
        //     t('stuffing') + ": " + products[i]._stuffing + "\n" +
        //     t('pouring') + ": " + products[i]._pouring + "\n" +
        //     t('hat') + ": " + products[i]._hat + "\n" +
        //     t('cover') + ": " + products[i]._cover + "\n" +
        //     t('additional_cover') + ": " + products[i]._additional_cover + "\n" +
        //     t('quantity') + ": " + products[i]._quantity + "\n" +
        //     t('cost') + ": " + (products[i]._cost).toLocaleString('en') + " " + t('sum') + "\n" +
        //     t('price') + ": " + (products[i]._price).toLocaleString('en') + " " + t('sum')

        //     if (i + 1 < products.length) {
        //         message += "\n\n"
        //     }
        // }

        // message += "\n\n" + "Итого: " + (lastOrder.data[0].cost).toLocaleString('en') + " " + t('sum')

        // const someData = await axios.post(url, {
        //     chat_id: -1002036778710,
        //     parse_mode: 'html',
        //     text: message,
        // })
        // .then((res) => {
        //     console.log(res.data)
        // })
        // .catch((err) => {
        //     console.log(err)
        // })

        // console.log(someData)

        // console.log("a: " + a)
        // a++
        // console.log("new_order came")
        // window.location.reload()
        // fetchMyOrders(true)
        
    }

    // const playM = () => {
    //     notification.play()
    // }

    if (account.length != 0 && account[0].user_type == "admin") {

        // socket.emit("join_administration")
        // fetchMyOrders()

        return (
            <div>
                {/* <button onClick={playM}>Play</button> */}
                <div>{t('my_orders')}</div>
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
                </ul>
                <h1>{t('my_orders')}</h1>

                <table style={{textAlign: "center"}}>
                    <tbody>
                        <tr style={{backgroundColor: "#ff6600"}}>
                            <td>{t('order_id')}</td>
                            <td>{t('status')}</td>
                            <td>{t('price')}</td>
                            <td>{t('date')}</td>
                            <td>{t('more')}</td>
                        </tr>
                        {myOrders.map((order, index) => (
                            <tr key={index} style={{backgroundColor: "#46a7ce"}}>
                                <td>{order.order_id}</td>
                                <td>{order.status == null ? "null" : order.status}</td>
                                <td>{order.cost.toLocaleString('en') + " " + t('sum')}</td>
                                <td>{new Date(order.datetime).toLocaleString([], {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'})}</td>
                                <td><button className="add" onClick={()=>handleMore(order.order_id)}>{t('more')}</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="my_orders">
                    {myOrders.map((order) => (
                        <div className="order" key={order.id}>
                            {"ID: " + order.id + " - " + t("names." + order.order_id)}
                            <button className="add" onClick={()=>handleMore(order.order_id)}>{t('more')}</button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    
    return (
        <div>
            hello man
        </div>
    )
}

export default Monitor