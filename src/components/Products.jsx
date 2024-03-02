import axios from "axios";
import { useEffect, useState } from "react";
import GlobalVars from "../globalVariables/GlobalVars";
// import { Dictionary, Locales } from "../globalVariables/TranslationVars";
// import Gvariables from "../globalVariables/Gvariables";
// import * as types from "../globalVariables/Gvariables"
// import Gvariables from "../globalVariables/Gvariables";
// import Gvariables from "../globalVariables/Gvariables";
// import Gvariables from "../globalVariables/Gvariables";
// import Gvariables from '../globalVariables/Gvariables'

// import { Suspense } from 'react'
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const Products = () => {
    
    const navigate = useNavigate()
    const {t, i18n } = useTranslation()
    const locales = {
        en: {title: 'English'},
        ru: {title: 'Русский'}
    }

    // const notify = () => {
    //     toast("wow, it's so easy!")
    // }

    // console.log(Dictionary('products'))
    const [products, setProducts] = useState([])
    // const {t, i18n } = useTranslation()
    // const locales = {
    //     en: {title: 'English'},
    //     ru: {title: 'Русский'}
    // }
    // console.log(Dictionary('products'))
    

    // console.log(t('main.products'))

    useEffect(()=>{
        const fetchAllProducts = async ()=>{
            try{
                
                // console.log(t('main.header'))
                // localStorage.removeItem("storedShoppingCart")
                // if (JSON.parse(localStorage.getItem("storedShoppingCart")) == null) {
        
                //     // Fix it
                //     // navigate("/")
                    
                //     console.log("mda")
                //     // localStorage.setItem("storedShoppingCart", JSON.stringify([]))
                // }

                // console.log("heh")
                if (JSON.parse(localStorage.getItem("storedShoppingCart")) == null) {
                    localStorage.setItem("storedShoppingCart", JSON.stringify([]))
                }

                // console.log("hello")
                // console.log("1: " + GlobalVars.test_str);
                // GlobalVars.test_str = "lol123"
                // console.log("2: " + GlobalVars.test_str);
                
                // console.log("Site: " + GlobalVars.backend_server + "/products")
                const res = await axios.get(GlobalVars.backend_server + "/products")
                setProducts(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchAllProducts()
        // localStorage.removeItem("storedShoppingCart")
        // localStorage.setItem("storedShoppingCart", JSON.stringify([]))
        // console.log(JSON.parse(localStorage.getItem("storedShoppingCart")))
    },[]);

    
    const handleAdd = async ()=>{
        
        let productsToAdd = []
        var all_products = document.getElementsByClassName("product")
        for (let i = 0; i < all_products.length; i++) {

            if (all_products[i].children[7].innerHTML == 0) {
                continue
            }

            let id = all_products[i].children[7].getAttribute("productid")
            // let quantity = all_products[i].children[6].innerHTML
            // console.log(id + ": " + quantity)
            // testCost += parseInt(all_products[i].innerHTML)
            // console.log(all_stuffings[i].innerHTML)
            // if (all_stuffings[i].checked) {
                
            // }

            let product = []
            for (let j = 0; j < products.length; j++) {
                // console.log(products[j].product_id == id)
                if (products[j].product_id == id) {
                    product = products[j]
                    break
                }
            }

            // productsToAdd.push(product)

            
            var testObject2 = {
                product_id: id,
                product_name: product.product_name,
                product_quantity: parseInt(all_products[i].children[7].innerHTML),
                product_cost: product.product_cost,
                product_cover: product.product_cover,
                product_additional_cover: product.product_additional_cover,
                product_stuffing: product.product_stuffing,
                product_pouring: product.product_pouring,
                product_hat: product.product_hat
                }
            
            productsToAdd.push(testObject2)
        }

        // console.log(productsToAdd)

        // console.log(products[0])

        // return;
        
        try {
            // await axios.delete("http://localhost:8800/add/"+id)
            
            var testObject = []
            // ShoppingCart has 1 or more items
            if (JSON.parse(localStorage.getItem("storedShoppingCart")) != null && JSON.parse(localStorage.getItem("storedShoppingCart")).length > 0) {
                testObject = JSON.parse(localStorage.getItem("storedShoppingCart"))
                // console.log(testObject)

                // ShoppingCart has 1 item
                // else {
                //     testObject = [JSON.parse(localStorage.getItem("storedShoppingCart"))]
                // }
                
                for (let k = 0; k < productsToAdd.length; k++) {
                    // Increase quantity

                    let productExists = false;
                    // console.log('testObject.length: ' + testObject.length)
                    for (let i = 0; i < testObject.length; i++) {
                        if (testObject[i].product_id == productsToAdd[k].product_id) {
                            testObject[i].product_quantity = parseInt(testObject[i].product_quantity) + productsToAdd[k].product_quantity
                            productExists = true;
                            break;
                        }
                    }

                    // Add new type of product
                    if (!productExists) {
                        testObject.push(productsToAdd[k])
                    }
                }
                
                // console.log(JSON.parse(localStorage.getItem("storedShoppingCart")))
            }

            // ShoppingCart is clear
            else {
                testObject = productsToAdd
            }

            // console.log(testObject)
            localStorage.setItem("storedShoppingCart", JSON.stringify(testObject))
            // console.log('storedShoppingCart', localStorage.getItem("storedShoppingCart"))
            // window.location.reload()

            // console.log(localStorage.getItem("storedShoppingCart").length)

            if (productsToAdd.length > 0) {
                navigate('/shoppingCart')
            }

            else {
                // notify()
                toast(t('at_least_one_product_must_be_added'))
                console.log("mda")
            }

        } catch (err) {
            console.log(err)
        }
    }

    const handleChangeCart = async (e, add) => {
        // let quantity = parseInt(e.currentTarget.parentElement.children[5].innerHTML)
        // console.log(e.currentTarget.parentElement.children[3].innerHTML)
        let quantity = e.currentTarget.parentElement.children[7].innerHTML

        if (add) {
            quantity++
        }

        else {
            quantity--

            if (quantity < 0) {
                quantity = 0
            }
        }

        e.currentTarget.parentElement.children[7].innerHTML = quantity
        e.currentTarget.parentElement.children[4].innerHTML = (quantity * parseInt(e.currentTarget.parentElement.children[7].getAttribute("cost"))).toLocaleString('en')
        handleTotalCost()
    }

    const handleTotalCost = async () => {
        let totalCost = 0

        let all_products = document.getElementsByClassName("product")

        

        for (let i = 0; i < all_products.length; i++) {
            
            if (all_products[i].children[7].innerHTML != 0) {
                totalCost += parseInt(all_products[i].children[4].innerHTML.replaceAll(',', ''))
            }
        }

        document.getElementsByClassName("total-cost")[0].innerHTML = t('price') + ": " + totalCost.toLocaleString('en') + " " + t('sum')
    }

    return (
        <div className="products-page">
            {/* <ul>
                {Object.keys(locales).map((locale) => (
                    <li key={locale}><button type="submit" onClick={() => i18n.changeLanguage(locale)}>
                        {locales[locale].title}
                        </button></li>
                ))}
            </ul> */}
            
            <h1>{t('catalog')}</h1>
            <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)"}} className="products">
                {products.map((product) => (
                    <div style={{textAlign: "center"}} className="product" key={product.product_id}>
                        {t("names." + product.product_name)}
                        <div className="imgContainer">
                            <img className="imgProduct" src={require('../images/' + product.product_name + '.png')} />
                        </div>
                        <br></br>
                        <span>{(product.product_cost).toLocaleString('en')}</span>
                        <br></br>
                        <span>0</span>
                        <br></br>
                        <button className="bLeft" style={{width: "30px", height: "30px"}} onClick={(e) => (handleChangeCart(e, false))}>-</button>
                        <span productid={product.product_id} cost={product.product_cost}>0</span>
                        <button className="bRight" style={{width: "30px", height: "30px"}} onClick={(e) => (handleChangeCart(e, true))}>+</button>
                        <br></br>
                        <div className="pDesc">
                            <div>{t('covers.' + product.product_cover)}</div>
                            {product.product_stuffing ? <div>{product.product_stuffing.split(";").map((product_stuffing) => (t("stuffings." + product_stuffing))).join(", ")}</div> : ""}
                            {product.product_additional_cover ? <div>{product.product_additional_cover.split(";").map((additional_cover) => (t("additional_covers." + additional_cover))).join(", ")}</div> : ""}
                            {product.product_pouring ? <div>{product.product_pouring.split(";").map((product_pouring) => (t("pourings." + product_pouring))).join(", ")}</div> : ""}
                            {product.product_hat ? <div>{t("hats." + product.product_hat)}</div> : ""}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="products-page-footer">
                <div className="total-cost">
                    {t('price') + ": 0"}
                </div>
                <button className="add" onClick={()=>handleAdd()}>{t('add')}</button>
            </div>
            
            <div className="footer-space"></div>
            <ToastContainer/>
        </div>
    )
}

export default Products