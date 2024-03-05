import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import GlobalVars from "../globalVariables/GlobalVars"
import { useTranslation } from "react-i18next"
// import io from 'socket.io-client'
import MapShoppingCart from "./MapShoppingCart"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const ShoppingCart = () => {
    
    // const socket = io.connect("http://localhost:3001")
    // const socket = io.connect("https://e1304fb0b766af.lhr.life")
    const {t, i18n } = useTranslation()
    const locales = {
        en: {title: 'English'},
        ru: {title: 'Русский'},
        uz: {title: 'O\'zbek'}
    }

    const [createMap, setCreateMap] = useState ([false])
    const bottomRef = useRef(null);

    // document.getElementById("orderDateTime").value = date
    // console.log("createMap: " + createMap)

    // console.log(JSON.parse(localStorage.getItem("storedShoppingCart"))[0].product_cost = 35)

    // let testArr = JSON.parse(localStorage.getItem("storedShoppingCart"))
    // testArr[0].product_cost = 35
    // console.log(testArr)
    // localStorage.setItem("storedShoppingCart", JSON.stringify(testArr))
    // console.log(JSON.parse(localStorage.getItem("storedShoppingCart")))
    // hehe
    const [shoppingCart, setShoppingCart] = useState ([])
    const [shoppingCart2, setShoppingCart2] = useState ([])
    // const shoppingCart = {}
    // console.log(JSON.parse(localStorage.getItem("storedShoppingCart")))
    const navigate = useNavigate()
    const handleDelete = async (id)=>{
        try {
            shoppingCart.splice(id, 1)
            // console.log(shoppingCart)
            localStorage.setItem("storedShoppingCart", JSON.stringify(shoppingCart))
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    const handleCreateMap = ()=>{
        
        if (document.getElementById("sticks-quantity-input").value < 0) {
            toast(t('the_number_of_sticks_cannot_be_less_than_0'))
            return
        }

        setCreateMap([true])
        
        // if (localStorage.getItem("username") != null) {
        //     setCreateMap([true])
        // }

        // else {
        //     // console.log("please, log in")
        //     toast("Пожалуйста, войдите в аккаунт")
        // }
    }

    const handlePhone = (e)=>{
        localStorage.setItem("userPhone", e.target.value);
        // console.log(createRoll)
    }

    const handleSticksQuantity = async (_quantity, e) => {
        let testArr2 = shoppingCart2
        testArr2.chopsticks_quantity = parseInt(testArr2.chopsticks_quantity) + parseInt(_quantity)

        if (testArr2.chopsticks_quantity < 0) {
            testArr2.chopsticks_quantity = 0
        }
        
        // console.log(testArr2.chopsticks_quantity)

        setShoppingCart2(testArr2)
        localStorage.setItem("storedShoppingCart2", JSON.stringify(shoppingCart2))

        e.currentTarget.parentElement.children[1].value = testArr2.chopsticks_quantity
        // console.log(e.currentTarget.parentElement.children[6].innerHTML)
    }

    const handleSticksQuantity2 = (e)=>{
        let testArr = shoppingCart2
        testArr.chopsticks_quantity = e.target.value
        setShoppingCart2(testArr)
        localStorage.setItem("storedShoppingCart2", JSON.stringify(testArr))
        // console.log(testArr)
    }

    const handleDeliveryMethod = async (_method, e) => {
        
        let testArr2 = shoppingCart2
        testArr2.delivery_method = _method

        setShoppingCart2(testArr2)
        localStorage.setItem("storedShoppingCart2", JSON.stringify(shoppingCart2))

    }

    const handleQuantity = async (id, _quantity, _cost, e) => {
        
        // console.log(parseInt(document.getElementsByClassName("input-quantity")[id].value) + _quantity)
        // console.log(document.getElementsByClassName("input-quantity")[id].value)
        
        try {

            // console.log("one")
            if (parseInt(document.getElementsByClassName("product_quantity")[id].innerHTML) + _quantity > 0) {
                // console.log("two")
                // console.log(e.target.parentElement)
                // console.log(document.getElementsByClassName("input-quantity")[id].value)
                // document.getElementsByClassName("input-quantity")[id].setAttribute("value", parseInt(document.getElementsByClassName("input-quantity")[id].value) + _quantity)
                // document.getElementsByClassName("input-quantity")[id].value = parseInt(document.getElementsByClassName("input-quantity")[id].value) + _quantity
                document.getElementsByClassName("product_quantity")[id].innerHTML = parseInt(document.getElementsByClassName("product_quantity")[id].innerHTML) + _quantity
                shoppingCart[id].product_quantity = document.getElementsByClassName("product_quantity")[id].innerHTML
                localStorage.setItem("storedShoppingCart", JSON.stringify(shoppingCart))

                console.log(shoppingCart)
            }

            else {
                // console.log("three")
                handleDelete(id)
            }

            document.getElementsByClassName("cartProductPrice")[id].innerHTML = (parseInt(document.getElementsByClassName("product_quantity")[id].innerHTML) * _cost).toLocaleString('en') + " " + t('sum')

            
            updateTotalCost()
            
            
            // if (add) {
            //     // console.log("mda3")
            //     // document.getElementsByClassName("input-quantity")[id].setAttribute("value", document.getElementsByClassName("input-quantity")[id].getAttribute("value") + 1)
            //     let all_inputs = document.getElementsByClassName("input-quantity")
            //     all_inputs[id].setAttribute("value", all_inputs[id].value)
            //     // all_inputs[0].value = 56
            //     // console.log(all_inputs[id].getAttribute("value"))
            //     // console.log(e.target.parentElement)
            //     // console.log(document.getElementsByClassName("input-quantity")[1].getAttribute("value"))
            // }

            // else {
            //     document.getElementsByClassName("input-quantity")[id].setAttribute("value", document.getElementsByClassName("input-quantity")[id].getAttribute("value") - 1)

            //     if (document.getElementsByClassName("input-quantity")[id].getAttribute("value") <= 0) {
            //         handleDelete(id)
            //     }
            // }

            // console.log(shoppingCart)
            // localStorage.setItem("storedShoppingCart", JSON.stringify(shoppingCart))
            // window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    const handleQuantityChanged = (e, index) => {
        if (e.target.value <= 0) {
            handleDelete(index)
        }

        else {
            // shoppingCart[index].product_quantity = e.target.value
            // console.log(shoppingCart[index].product_quantity)
            document.getElementsByClassName("input-quantity")[index].setAttribute("value", e.target.value)
            document.getElementsByClassName("input-quantity")[index].value = parseInt(e.target.value)
        }

        updateTotalCost()
    }

    const updateTotalCost = () => {
        let _totalcost = 0

        let all_quantity = document.getElementsByClassName("product_quantity")
        // all_inputs[0].setAttribute("value", 56)
        if (all_quantity.length > 0) {
            for (let i = 0; i < all_quantity.length; i++) {
                _totalcost += shoppingCart[i].product_cost * parseInt(all_quantity[i].innerHTML)
            }
        }

        document.getElementsByClassName("total-cost")[0].innerHTML = t('price') + ": " + (_totalcost).toLocaleString('en') + " " + t('sum')
    }

    useEffect(()=>{
        const fetchCart = async ()=>{
            try{

                // console.log(new Date().toUTCString())
                
                // console.log(new Date(Date.now()))
                // console.log((new Date(Date.now() - new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16))
                // let cur = (new Date(Date.now() - new Date().getTimezoneOffset() * 60000))
                // cur.setHours(cur.getHours() + 1)
                // console.log(cur.toISOString().slice(0, 16))
                // document.getElementById("orderDateTime").value = cur.toISOString().slice(0, 16)

                setShoppingCart(JSON.parse(localStorage.getItem("storedShoppingCart")))
                // setShoppingCart2(JSON.parse(localStorage.getItem("storedShoppingCart2")))
                // console.log(JSON.parse(localStorage.getItem("storedShoppingCart")))
                
                // localStorage.removeItem("storedShoppingCart2")
                // console.log(JSON.parse(localStorage.getItem("storedShoppingCart2")))

                // console.log(localStorage.getItem("storedShoppingCart2"))
                if (JSON.parse(localStorage.getItem("storedShoppingCart2")) == null) {

                    let testArr = {
                        chopsticks_quantity: 1,
                        delivery_method: "free"
                    }

                    // console.log("mda")
                    
                    // testArr.ch_2 = 1

                    // console.log([testArr])

                    // console.log(null)

                    localStorage.setItem("storedShoppingCart2", JSON.stringify(testArr))
                    
                    // console.log(JSON.parse(localStorage.getItem("storedShoppingCart2")))
                }

                setShoppingCart2(JSON.parse(localStorage.getItem("storedShoppingCart2")))
                // console.log(JSON.parse(localStorage.getItem("storedShoppingCart2")))

                let delivery_methods = document.getElementsByClassName("delivery_method")

                if (JSON.parse(localStorage.getItem("storedShoppingCart2")).delivery_method == "free") {
                    delivery_methods[0].checked = true
                }

                else if (JSON.parse(localStorage.getItem("storedShoppingCart2")).delivery_method == "paid") {
                    delivery_methods[1].checked = true
                }

                document.getElementById('sticks-quantity-input').value = JSON.parse(localStorage.getItem("storedShoppingCart2")).chopsticks_quantity

                // for (let i = 0; i < delivery_methods.length; i++) {
                //     break
                // }
                

                // console.log("mda")
                // console.log(JSON.parse(localStorage.getItem("storedShoppingCart")))
            }
            catch(err){
                console.log(err)
            }
        }
        fetchCart()
    },[]);

    useEffect(()=>{
        
        let all_inputs = document.getElementsByClassName("input-quantity")
        // all_inputs[0].setAttribute("value", 56)
        if (all_inputs.length > 0) {
            for (let i = 0; i < all_inputs.length; i++) {
                all_inputs[i].setAttribute("value", all_inputs[i].getAttribute("quantity"))
            }
        }

        updateTotalCost()
        
    },[shoppingCart]);

    

    useEffect(()=>{

        if (document.getElementById("orderDateTime") != null) {
            let cur = (new Date(Date.now() - new Date().getTimezoneOffset() * 60000))
            cur.setHours(cur.getHours() + 1)
            // console.log(cur.toISOString().slice(0, 16))
            document.getElementById("orderDateTime").value = cur.toISOString().slice(0, 16)
        }
        
        if (createMap[0]) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }

    },[createMap]);

    const handleClearCart = async ()=>{
        // localStorage.removeItem("storedShoppingCart")
        localStorage.setItem("storedShoppingCart", JSON.stringify([]))
        window.location.reload()
    }

    const handleOrderCart = async (orderLater)=>{
        
        if (!localStorage.getItem("locationIsSelected")) {
            toast(t('please_click_on_the_map_to_place_a_mark'))
            return
        }

        if (localStorage.getItem("userPhone") != null) {

            if (localStorage.getItem("userPhone").length != 9) {
                toast(t('number_must_contain_9_digits'))
                return
            }
        }

        else {
            toast(t('number_must_contain_9_digits'))
            return
        }

        // let orderDate = new Date(Date.now())
        let orderDate = new Date()
        // orderDate.setUTCHours(orderDate.getUTCHours() + 5)
        // console.log(orderDate.toUTCString())

        if (orderLater) {
            // console.log(document.getElementById("orderDateTime").value)
            orderDate = new Date(document.getElementById("orderDateTime").value)
            // console.log("3: " + document.getElementById("orderDateTime").value)
            // console.log("4: " + orderDate)
            // let currentDateAndHalfAnHour = new Date(Date.now())
            let currentDateAndHalfAnHour = new Date()
            currentDateAndHalfAnHour.setUTCMinutes(currentDateAndHalfAnHour.getUTCMinutes() + 29)
            // let currentDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            // console.log(orderDate)
            // console.log(currentDateAndHalfAnHour)
            // console.log(orderDate < currentDate)

            if (orderDate < currentDateAndHalfAnHour) {
                // console.log("impossible")
                toast(t('please_choose_another_time'))
                return
            }

            // console.log("Hours: " + orderDate.getHours())

            // if (orderDate.getHours() < 12 || orderDate.getHours() > 19) {
            //     toast(t('please_choose_time_between_12_and_19'))
            //     return
            // }

            // orderDate.setHours(orderDate.getHours() + 5)

            // else {
            //     console.log("okay")
            // }
        }

        if (orderDate.getHours() < 12 || orderDate.getHours() > 19) {
            toast(t('please_choose_time_between_12_and_19'))
            return
        }

        if (orderDate.getDay() == 1) {
            toast(t('monday_is_off'))
            return
        }

        orderDate.setUTCHours(orderDate.getUTCHours() + 5)

        setCreateMap([false])

        // console.log(orderDate)
        // return

        // console.log("createMap: " + createMap[0])
        
        // if (createMap[0]) {
            // console.log("createMap: " + createMap[0])
            // return
            // await axios.post(GlobalVars.backend_server + "/order", [localStorage.getItem("username"), JSON.parse(localStorage.getItem("storedShoppingCart"))])

        // console.log(shoppingCart[0].product_quantity)

        let all_products = document.getElementsByClassName("product_quantity")
        for (let i = 0; i < shoppingCart.length; i++) {
            shoppingCart[i].product_quantity = all_products[i].innerHTML
            // console.log(all_products[i])
        }

        // console.log(shoppingCart)
        // return;

        // navigate('/myOrders')

        // const testdata = (await axios.post(GlobalVars.backend_server + "/order", [localStorage.getItem("username"), shoppingCart, localStorage.getItem("selectedLocationX"), localStorage.getItem("selectedLocationY"), shoppingCart2, orderLater, orderDate])).data
        const testdata = (await axios.post(GlobalVars.backend_server + "/order", [localStorage.getItem("userPhone"), shoppingCart, localStorage.getItem("selectedLocationX"), localStorage.getItem("selectedLocationY"), shoppingCart2, orderLater, orderDate.toUTCString()])).data

        // console.log("testdata")
        // console.log(testdata)

        // console.log('mda')

        localStorage.setItem("storedShoppingCart", JSON.stringify([]))
        // localStorage.removeItem("storedShoppingCart")
        localStorage.removeItem("storedShoppingCart2")

        navigate('/myOrders')

        // socket.emit("make_order", {message: "new order"})
        // socket.emit("send_message", {message: "hello"})

        // const testdata2 = (await axios.post(GlobalVars.backend_server + "/order", [localStorage.getItem("username"), testdata, JSON.parse(localStorage.getItem("storedShoppingCart"))])).data

        // console.log(localStorage.getItem("username"))
        // try {
        //     const testdata = (await axios.delete(GlobalVars.backend_server + "/getLocation/" + localStorage.getItem("username"))).data
        //     // console.log(localStorage.getItem("username") + ": " + testdata)
        // }

        // catch (err) {
        //     console.log(err)
        // }
        // await axios.post(GlobalVars.backend_server + "/order", JSON.parse(localStorage.getItem("storedShoppingCart")))
        // const testdata = (await axios.post("http://localhost:8800/order", localStorage.get("storedShoppingCart"))).data

        // console.log(testdata)
        // console.log("testdata")
        // if (testdata === "success") {
        //     localStorage.removeItem("storedShoppingCart")
        //     navigate("/")
        // }

        // else {
        //     if (testdata.sqlMessage.includes('Duplicate entry')) {
        //         console.log("Try another username")
        //     }
        // }
        // }

        // else {
        //     // console.log("createMap: " + createMap[0])
        //     setCreateMap([true])
        // }
    }

    if (JSON.parse(localStorage.getItem("storedShoppingCart")) == null) {
        
        // Fix it
        // navigate("/")

        localStorage.setItem("storedShoppingCart", JSON.stringify([]))
    }

    else {
        return (
            <div className="shCart">
                {/* {console.log(shoppingCart)} */}
                {/* <br></br>
                {t('shopping_cart')}
                <div>
                <button><Link to="/">{t('main')}</Link></button>
                </div> */}
                <h1>{t('shopping_cart')}</h1>
                
                <div className="table-div">
                    <table className="cartProducts">
                        <tbody>
                            <tr className="table-headers">
                                <td>{t('delete')}</td>
                                <td>{t('picture')}</td>
                                <td>{t('name')}</td>
                                <td className="table-headers-cost">{t('cost')}</td>
                                <td>{t('quantity')}</td>
                                <td>{t('price')}</td>
                                <td>{t('cover')}</td>
                                <td>{t('additional_cover')}</td>
                                <td>{t('stuffing')}</td>
                                <td>{t('pouring')}</td>
                                <td>{t('hat')}</td>
                            </tr>
                            {shoppingCart.map((product, index) => (
                                <tr className="cartProduct" key={index}>
                                    <td>
                                        <button className="shbDelete" onClick={()=>handleDelete(index)}>{t('delete')}</button>
                                    </td>
                                    <td className="cartProductPicture">
                                        {product.product_id == 0 ? <img src={require('../images/create2.png')}/> : <img src={require('../images/' + product.product_name + '.png')}/>}
                                    </td>
                                    <td className="cartProductName">
                                        {product.product_id == 0 ? product.product_name : t('names.' + product.product_name)}
                                    </td>
                                    {/* <td className="cartProductID">{t('id') + ": " + product.product_id}</td> */}
                                    <td className="cartProductCost">{product.product_cost.toLocaleString('en') + " " + t('sum')}</td>
                                    <td className="cartProductQuantity">
                                        <table className="shtQuantity">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <button className="shbLeft" onClick={(e)=>handleQuantity(index, -1, product.product_cost, e)}>-</button>
                                                        <span className="product_quantity">{product.product_quantity}</span>
                                                        <button className="shbRight" onClick={(e)=>handleQuantity(index, 1, product.product_cost, e)}>+</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td className="cartProductPrice">{(product.product_cost * product.product_quantity).toLocaleString('en') + " " + t('sum')}</td>
                                    {/* <td className="cartProductCover">
                                        {t('covers.' + product.product_cover)}
                                        {<img src={require('../images/' + product.product_cover + '.png')}/>}
                                    </td> */}
                                    <td className="cartProductCover">
                                        <img src={require('../images/' + product.product_cover + '.png')} />
                                        <br></br>
                                        {t('covers.' + product.product_cover)}
                                    </td>
                                    {/* <td className="cartProductAdditionalCover">
                                        {product.product_additional_cover ? product.product_additional_cover.split(";").map((additional_cover, i) => (
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <img src={require('../images/' + additional_cover + '.png')}/>
                                                            {t('additional_covers.' + additional_cover)}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            ))
                                        : ""}
                                    </td> */}
                                    <td className="cartProductAdditionalCover">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    {product.product_additional_cover ?
                                                    product.product_additional_cover.split(";").map((additional_cover, index) => (
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
                                    <td className="cartProductStuffing">
                                        {/* {product.product_stuffing ?
                                            product.product_stuffing.split(";").map((stuffing, i) => (i == product.product_stuffing.split(";").length - 1 ?
                                                stuffing.split(":").map((_stuffing, index) => index == 0 ? t('stuffings.' + _stuffing) : " (" + _stuffing + " " + t('grams') + ")").join('')
                                                : stuffing.split(":").map((_stuffing, index) => index == 0 ? t('stuffings.' + _stuffing)
                                            : " (" + _stuffing + " " + t('grams') + ")").join('') + ", ")).join('')
                                        : ""} */}
                                        <table>
                                            <tbody>
                                                <tr>
                                                    {product.product_stuffing ?
                                                        product.product_stuffing.split(";").map((stuffing, index2) => (
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
                                    {/* <td className="cartProductPouring">{product.product_pouring ? product.product_pouring.split(";").map((pouring, i) => (i == product.product_pouring.split(";").length - 1 ? t('pourings.' + pouring) : t('pourings.' + pouring) + ", ")).join('') : t('no')}</td> */}
                                    <td className="cartProductPouring">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    {product.product_pouring ?
                                                        product.product_pouring.split(";").map((pouring, index) => (
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
                                    {/* <td className="cartProductHat">{product.product_hat ? t('hats.' + product.product_hat) : t('no')}</td> */}
                                    <td className="cartProductHat">
                                        {product.product_hat ?
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <img src={require('../images/' + product.product_hat + '.png')} />
                                                        <br></br>
                                                        {t('hats.' + product.product_hat)}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        : t('no')
                                        }
                                    </td>
                                    {/* {product. + " - " + product. + " - " + product. + " - " + product. + " - " + product.} */}
                                    {/* <button className="subtract" onClick={()=>handleQuantity(index, false)}>-</button> */}
                                    
                                    {/* <br></br> */}
                                    {/* <button className="add" onClick={()=>handleQuantity(index, true)}>+</button> */}
                                    
                                    {/* <input className="input-quantity" type="text" onChange={(e) => {handleQuantityChanged(e, index)}} style={{textAlign: "center"}} placeholder={t('quantity')} name='quantity' quantity={product.product_quantity}/> */}
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="shbClearCartDiv">
                    <button className="shbClearCart" onClick={()=>handleClearCart()}>{t('clear')}</button>
                </div>
                <br></br>
                
                <div className="shNumSticks">{t('number_of_sticks')}</div>
                <div style={{textAlign: "center"}}>
                    <button className="ibLeft" onClick={(e)=>handleSticksQuantity(-1, e)}>-</button>
                    <input className="iQuantity2" onChange={handleSticksQuantity2} id="sticks-quantity-input" type="text" style={{textAlign: "center"}}></input>
                    <button className="ibRight" onClick={(e)=>handleSticksQuantity(1, e)}>+</button>
                </div>

                <br></br>
                <br></br>
                <div className="shNumSticks">{t('delivery_method')}</div>

                <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", textAlign: "center"}}>
                    <label className="lab1" style={{display: "inline-block"}}>
                        <input type="radio" className="delivery_method" name="delivery_method" onChange={(e) => handleDeliveryMethod("free", e)}/>
                        <div>
                            {t('free')}
                            <br></br>
                            {"(" + t('slow') + ")"}
                            <br></br>
                            <img style={{width: "50px"}} src={require('../images/delivery.png')} alt="" />
                        </div>
                    </label>

                    <label className="lab1" style={{display: "inline-block"}}>
                        <input type="radio" className="delivery_method" name="delivery_method" onChange={(e) => handleDeliveryMethod("paid", e)}/>
                        <div>
                            {t('paid')}
                            <br></br>
                            {"(" + t('yandex_taxi') + ")"}
                            <br></br>
                            <img style={{width: "50px"}} src={require('../images/yandex_taxi.png')} alt="" />
                        </div>
                    </label>
                </div>
                
                <br></br>
                <br></br>

                <div className="products-page-footer2">
                    <div className="total-cost">{t('price') + ": 0"}</div>
                </div>

                <div style={{textAlign: "center"}}>
                    {shoppingCart.length > 0 && !createMap[0] ? <button className="createMap" onClick={handleCreateMap}>{t('order')}</button> : ""}
                </div>

                {/* {console.log("na: " + createMap[0])} */}
                {shoppingCart.length > 0 && createMap[0] ? <div>
                    {/* {console.log(createMap[0])} */}
                    <MapShoppingCart/>
                    <br></br>
                    <h1>{t('order')}</h1>
                    
                    <div style={{textAlign: "center"}}>
                        <div>{t('enter_your_number_in_the_following_format')}</div>
                        <br></br>
                        <input className='iPhone' type="text" placeholder={t('phone')} onChange={handlePhone} defaultValue={localStorage.getItem("userPhone")} name='username'/>
                    </div>

                    <br></br>

                    <div className="shDateContainer">
                        <input className="shDateLeft" type="datetime-local" id="orderDateTime" min={(new Date(Date.now() - new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16)}/>
                        <button className="shDateRight" onClick={()=>handleOrderCart(true)}>{t('order_later')}</button>
                    </div>
                    <br></br>
                    
                    <div ref={bottomRef} style={{textAlign: "center"}}>
                        <button className="createMap3" onClick={()=>handleOrderCart(false)}>{t('order_now')}</button>
                    </div>
                </div>
                :
                ""}
                <ToastContainer/>
            </div>
        )
    }

    // else {
    //     console.log(shoppingCart.length)
    //     return (
    //         <div>
    //             <h1>Shopping Cart</h1>
    //             <button onClick={()=>handleClearCart()}>Clear</button>
    //         </div>
    //     )
    // }

    

    
    // localStorage.setItem("storedShoppingCart", JSON.stringify(shoppingCart))
    
}

export default ShoppingCart