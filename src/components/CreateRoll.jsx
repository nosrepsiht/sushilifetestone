import axios from "axios";
import { useEffect, useState } from "react";
import GlobalVars from "../globalVariables/GlobalVars";
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
// import logo from '../images/nori.png'

const CreateRoll = () => {
    
    const navigate = useNavigate()
    const {t, i18n } = useTranslation()
    const locales = {
        en: {title: 'English'},
        ru: {title: 'Русский'}
    }
    
    const [components, setComponents] = useState([])
    const [dividedComponents, setDividedComponents] = useState([])
    const [coversComponents, setCoversComponents] = useState([])
    const [additionalCoversComponents, setAdditionalCoversComponents] = useState([])

    var createRoll = {
        cover: "",
        additional_cover: "",
        stuffing: "",
        hat: "",
        pouring: ""
    }

    let stuffing_quantity = 0

    let startPosX;
    // let mouseDragging = false
    // let CoversCarousel2;
    // let CoversCurrentIndex2 = 0;
    // let isDraggingMouse = false
    
    // let CoversAdditionalCarousel2;
    // let AdditionalCoversCurrentIndex2 = 0;
    // let AdditionalstartPosX;
    // let AdditionalisDraggingMouse = false

    useEffect(()=>{
        const fetchAllComponents = async ()=>{
            try{
                const res = await axios.get(GlobalVars.backend_server + "/components")
                // console.log(res.data.length)
                
                let testArr7 = []
                let divideByN = 6
                for (let k = 0; k < res.data.length; k++) {
                    // console.log(divideByN)
                    // One ---
                    let coverItemsLeft = res.data[k].length
                    let testArr3 = []

                    for (let i = 0; i < res.data[k].length / divideByN; i++) {
                        
                        let testArr4 = []

                        for (let j = 0; j < coverItemsLeft; j++) {
                            
                            testArr4.push(res.data[k][(i * divideByN) + j])

                            if (j == (divideByN - 1)) {
                                coverItemsLeft -= divideByN;
                                break
                            }   
                        }

                        testArr3.push(testArr4)
                    }

                    testArr7.push(testArr3)

                    // console.log(testArr3)
                    // setCoversComponents(testArr3)
                    // One ---
                }

                // console.log(testArr7)
                setDividedComponents(testArr7)

                // Two ---
                // let additionalCoverItemsLeft = res.data[1].length
                // let testArr5 = []

                // for (let i = 0; i < res.data[1].length / 8; i++) {
                    
                //     let testArr6 = []

                //     for (let j = 0; j < additionalCoverItemsLeft; j++) {
                        
                //         testArr6.push(res.data[1][(i * 8) + j])

                //         if (j == 7) {
                //             additionalCoverItemsLeft -= 8;
                //             break
                //         }   
                //     }

                //     testArr5.push(testArr6)
                // }

                // console.log(testArr5)
                // setAdditionalCoversComponents(testArr5)
                // Two ---

                // itemsLeft2 = res.data[0].length
                // console.log('itemsLeft2: ' + itemsLeft2)
                setComponents(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchAllComponents()

        document.getElementById('input-name').value = t('my_roll')
        document.getElementById('input-quantity').value = '1'
        
        // CoversCarousel2 = document.querySelector('.carousel-product_covers-content2');

        // CoversCarousel2.addEventListener('touchstart', CarouselCoversOnTouchStart2);
        // CoversCarousel2.addEventListener('touchmove', CarouselCoversOnTouchMove2);
        // CoversCarousel2.addEventListener('touchend', CarouselCoversOnTouchEnd2);

        // CoversCarousel2.addEventListener('mousedown', handleMouse);
        // CoversCarousel2.addEventListener('mousemove', handleMouse);
        // CoversCarousel2.addEventListener('mouseup', handleMouse);

        // Additional Cover

        // CoversAdditionalCarousel2 = document.querySelector('.carousel-product_additional_covers-content2');

        // CoversAdditionalCarousel2.addEventListener('touchstart', CarouselAdditionalCoversOnTouchStart2);
        // CoversAdditionalCarousel2.addEventListener('touchmove', CarouselAdditionalCoversOnTouchMove2);
        // CoversAdditionalCarousel2.addEventListener('touchend', CarouselAdditionalCoversOnTouchEnd2);

        // CoversAdditionalCarousel2.addEventListener('mousedown', handleAdditionalMouse);
        // CoversAdditionalCarousel2.addEventListener('mousemove', handleAdditionalMouse);
        // CoversAdditionalCarousel2.addEventListener('mouseup', handleAdditionalMouse);
    },[]);

    useEffect(()=>{
        
        // CoversUpdateDots2();

        // if (!CoversDotsAreCreated2) {
        //     if (document.querySelectorAll('.carousel-cover-item3').length != 0) {
        //         CoversCreateDots2();
        //     }
        // }
    },[components]);

    const handleChangeQuantity = (_quantity, e)=>{
        // createRoll.quantity = e.target.value;
        // console.log(createRoll)
        e.currentTarget.parentElement.children[1].value = parseInt(e.currentTarget.parentElement.children[1].value) + _quantity

        if (e.currentTarget.parentElement.children[1].value < 1) {
            e.currentTarget.parentElement.children[1].value = 1
        }
    }

    // const handleCheckCost = async ()=>{
    //     console.log(document.getElementsByClassName("stuffing")[0].value.split(';')[0])
    // }
    const handleAdd = async ()=>{
        try {

            if (document.getElementById("input-quantity").value <= 0) {
                toast(t('quantity_must_be_greater_than_0'))
                return
            }

            if (createRoll.cover == "") {
                // console.log("you need to choose cover")
                toast(t('please_choose_a_cover'))
                return
            }

            if (stuffing_quantity < 40) {
                // console.log("you need to have at least 40 grams")
                toast(t('please_collect_at_least_40_grams_of_stuffing'))
                return
            }

            
            // createRoll.name = document.getElementById('input-name').value
            // createRoll.quantity = document.getElementById('input-quantity').value
            // console.log(createRoll)

            let testCost = 0

            // console.log(testCost)

            var all_covers = document.getElementsByClassName("cover")
            for (let i = 0; i < all_covers.length; i++) {
                if (all_covers[i].checked) {
                    testCost += parseInt(all_covers[i].value)
                    break
                }
            }

            // console.log(testCost)
            
            var all_additional_covers = document.getElementsByClassName("additional_cover")
            for (let i = 0; i < all_additional_covers.length; i++) {
                if (all_additional_covers[i].checked) {
                    testCost += parseInt(all_additional_covers[i].value.split(';')[1])
                }
            }

            // console.log(testCost)

            var all_stuffings = document.getElementsByClassName("stuffing-cost")
            for (let i = 0; i < all_stuffings.length; i++) {
                testCost += parseInt(all_stuffings[i].innerHTML)
                // console.log(all_stuffings[i].innerHTML)
                // if (all_stuffings[i].checked) {
                    
                // }
            }

            // console.log(testCost)

            var all_hats = document.getElementsByClassName("hat")
            for (let i = 0; i < all_hats.length; i++) {
                if (all_hats[i].checked) {
                    testCost += parseInt(all_hats[i].value.split(';')[1])
                }
            }

            // console.log(testCost)

            var all_pourings = document.getElementsByClassName("pouring")
            for (let i = 0; i < all_pourings.length; i++) {
                if (all_pourings[i].checked) {
                    testCost += parseInt(all_pourings[i].value.split(';')[1])
                }
            }

            // console.log("Cost: " + testCost)

            var testObject = []
            var testObject2 = {
                product_id: 0,
                product_name: document.getElementById('input-name').value,
                product_quantity: document.getElementById('input-quantity').value,
                product_cost: testCost,
                product_cover: createRoll.cover,
                product_additional_cover: createRoll.additional_cover,
                product_stuffing: createRoll.stuffing,
                product_pouring: createRoll.pouring,
                product_hat: createRoll.hat
                }
            // ShoppingCart has 1 or more items
            if (JSON.parse(localStorage.getItem("storedShoppingCart")).length > 0) {
                testObject = JSON.parse(localStorage.getItem("storedShoppingCart"))
                testObject.push(testObject2)
            }

            // ShoppingCart is clear
            else {
                testObject = [testObject2]
            }

            localStorage.setItem("storedShoppingCart", JSON.stringify(testObject))
            navigate('/shoppingCart')

            // console.log(localStorage.getItem("storedShoppingCart").length)

        } catch (err) {
            console.log(err)
        }
    }

    const handleName = (e)=>{
        createRoll.name = e.target.value;
        // console.log(createRoll)
    }

    const handleQuantity = (e)=>{
        createRoll.quantity = e.target.value;
        // console.log(createRoll)
    }

    const handleCover = async (_cover)=>{
        createRoll.cover = _cover;
        // console.log(createRoll)
    }

    const handleAdditionalCover = async ()=>{
        createRoll.additional_cover = "";

        var all_additional_covers = document.getElementsByClassName("additional_cover")
        for (let i = 0; i < all_additional_covers.length; i++) {
            // console.log("what", all_additional_covers[i].value)
            if (all_additional_covers[i].checked) {
                if (createRoll.additional_cover == "") {
                    createRoll.additional_cover = all_additional_covers[i].value.split(';')[0];
                }
                else {
                    createRoll.additional_cover += ";" + all_additional_covers[i].value.split(';')[0];
                }
            }
        }

        // console.log(createRoll)
    }

    const handleStuffing = async ()=>{
        // createRoll.stuffing = "";
        
        // var all_stuffings = document.getElementsByClassName("stuffing")
        // for (let i = 0; i < all_stuffings.length; i++) {
        //     // console.log(all_stuffings[i].value + " is " + all_stuffings[i].checked)
        //     if (all_stuffings[i].checked) {
        //         if (createRoll.stuffing == "") {
        //             createRoll.stuffing = all_stuffings[i].value.split(';')[0];
        //         }
        //         else {
        //             createRoll.stuffing += ";" + all_stuffings[i].value.split(';')[0];
        //         }
        //     }
        // }

        // console.log(createRoll.stuffing)        
    }

    const handleStuffingQuantity = async ()=>{
        stuffing_quantity = 0
        createRoll.stuffing = "";

        var all_stuffing_quantity = document.getElementsByClassName("stuffing-quantity")
        for (let i = 0; i < all_stuffing_quantity.length; i++) {
            stuffing_quantity += parseInt(all_stuffing_quantity[i].innerHTML)

            if (parseInt(all_stuffing_quantity[i].innerHTML) > 0) {
                // console.log(all_stuffing_quantity[i].getAttribute("value") + ":" + all_stuffing_quantity[i].innerHTML)

                if (createRoll.stuffing == "") {
                    createRoll.stuffing = all_stuffing_quantity[i].getAttribute("value") + ":" + all_stuffing_quantity[i].innerHTML
                }
                else {
                    createRoll.stuffing += ";" + all_stuffing_quantity[i].getAttribute("value") + ":" + all_stuffing_quantity[i].innerHTML
                }
            }
        }
    }

    const handleChangeStuffing = async (e, add) => {
        // console.log(e.currentTarget.parentElement.children[2].getAttribute("value"))
        let quantity = parseInt(e.currentTarget.parentElement.children[5].innerHTML)
        let minGr = parseInt(e.currentTarget.parentElement.children[5].getAttribute("min_gr"))
        let stepGr = parseInt(e.currentTarget.parentElement.children[5].getAttribute("step_gr"))
        
        if (add) {

            if (quantity == 0) {
                if (stuffing_quantity + minGr > 60) {
                    console.log("limit")
                }

                else {
                    quantity += minGr
                }
            }

            else {
                if (stuffing_quantity + stepGr > 60) {
                    console.log("limit")
                }
    
                else {
                    quantity += stepGr
                }
            }
        }

        else {
            if (quantity - stepGr < minGr) {
                quantity = 0
            }

            else {
                quantity -= stepGr
            }

            if (quantity < 0) {
                quantity = 0
            }
        }

        e.currentTarget.parentElement.children[5].innerHTML = quantity
        e.currentTarget.parentElement.children[1].innerHTML = (quantity / 10) * parseInt(e.currentTarget.parentElement.children[5].getAttribute("cost"))
        handleStuffingQuantity()
    }

    const handleHats = async (e, _hat)=>{
        
        if (createRoll.hat == _hat) {
            createRoll.hat = "";
            e.currentTarget.checked = false
            console.log(e.currentTarget)
        }

        else {
            createRoll.hat = _hat;
        }

        // console.log(createRoll)
    }

    const handlePouring = async ()=>{
        createRoll.pouring = "";
        
        var all_pourings = document.getElementsByClassName("pouring")
        for (let i = 0; i < all_pourings.length; i++) {
            // console.log(all_stuffings[i].value + " is " + all_stuffings[i].checked)
            if (all_pourings[i].checked) {
                if (createRoll.pouring == "") {
                    createRoll.pouring = all_pourings[i].value.split(';')[0];
                }
                else {
                    createRoll.pouring += ";" + all_pourings[i].value.split(';')[0];
                }
            }
        }

        // console.log(createRoll.stuffing)
    }
    
    // const handleForm = async (_form)=>{
    //     createRoll.form = _form;
    //     // console.log(createRoll)
    // }

    // function stayToIndexCovers2(e) {
        
        
    // }

    function goToIndexCovers2(e, index) {
        
        e.setAttribute("value", index)
        e.style.transform = `translateX(${-index * e.offsetWidth}px)`;
        
        // if (fromDots) {
        //     e.setAttribute("value", index)
        //     e.style.transform = `translateX(${-index * e.offsetWidth}px)`;
        // }

        // else {
        //     e.currentTarget.setAttribute("value", index)
        //     e.currentTarget.style.transform = `translateX(${-index * e.currentTarget.offsetWidth}px)`;
        // }
        
        // if (index < 0 || index >= document.querySelectorAll('.carousel-cover-item3').length) return;
        // console.log(index)
        // if (e.currentTarget.classList[0] === "carousel-product_covers-content2") {
        //     e.currentTarget.setAttribute("value", index)
        // }
        
        // else if (e.currentTarget.classList[0] === "carousel-product_additional_covers-content2") {
        //     AdditionalCoversCurrentIndex2 = index
        // }

        
        CoversUpdateDots2(e);
    }

    // function goToNextCovers2(e, index) {
    //     goToIndexCovers2(e, ((index + 1) % document.querySelectorAll('.carousel-cover-item3').length));
    // }

    // function goToPrevCovers2(e, index) {
    //     goToIndexCovers2(e, ((index - 1) % document.querySelectorAll('.carousel-cover-item3').length));
    // }

    // Additional Covers
    // function goToIndexAdditionalCovers2(index) {
    //     if (index < 0 || index >= document.querySelectorAll('.carousel-additional-cover-item3').length) return;
    //     AdditionalCoversCurrentIndex2 = index;
    //     document.querySelector('.carousel-product_additional_covers-content2').style.transform = `translateX(${-AdditionalCoversCurrentIndex2 * document.querySelector('.carousel-product_additional_covers-content2').offsetWidth}px)`;
    //     // CoversUpdateDots2();
    // }

    // function goToNextAdditionalCovers2() {
    //     goToIndexAdditionalCovers2((AdditionalCoversCurrentIndex2 + 1) % document.querySelectorAll('.carousel-additional-cover-item3').length);
    // }

    // function goToPrevAdditionalCovers2() {
    //     goToIndexAdditionalCovers2((AdditionalCoversCurrentIndex2 - 1 + document.querySelectorAll('.carousel-additional-cover-item3').length) % document.querySelectorAll('.carousel-additional-cover-item3').length);
    // }

    

    // function CoversCreateDots2() {
    //     const dotsContainer = document.querySelector('.carousel-product_covers-dots2');
    //     for (let i = 0; i < document.querySelectorAll('.carousel-cover-item3').length; i++) {
    //         const dot = document.createElement('div');
    //         dot.classList.add('cover-carousel-dot');
    //         if (i === CoversCurrentIndex) {
    //             dot.classList.add('active');
    //         }

    //         dot.onclick = () => { goToIndexCovers(i) }

    //         // dot.addEventListener('click', () => {
    //         //     goToIndexCovers(0);
    //         // });

    //         dotsContainer.appendChild(dot);
    //     }
    // }

    function CoversUpdateDots2(e) {
        const dots = e.parentElement.parentElement.children[2].querySelectorAll('.cover-carousel-dot2');
        // console.log(e.currentTarget.parentElement.parentElement.children[1].querySelectorAll('.cover-carousel-dot2'))
        // console.log(document.querySelectorAll('.cover-carousel-dot2'))
        // console.log(e.currentTarget.getAttribute("value"))
        dots.forEach((dot, index) => {
            if (index === parseInt(e.getAttribute("value"))) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // new

    function CarouselCoversOnTouchStart2(e, isTouch) {
        // console.log("hello")
        // console.log(e.currentTarget.children.length)
        // console.log(e.currentTarget.getAttribute("value"))
        // console.log(e.currentTarget.parentElement.parentElement.children[1])
        e.currentTarget.classList.add('active')
        
        if (isTouch) {
            startPosX = e.touches[0].clientX;
        }

        else {
            // mouseDragging = true
            console.log("onmousedown")
            startPosX = e.clientX;
        }

        // console.log((-1 + document.querySelectorAll('.carousel-cover-item3').length) % document.querySelectorAll('.carousel-cover-item3').length)
        // console.log("Touch: " + e.touches[0].clientX)
        // console.log("CoversTotalItems: " + document.querySelectorAll('.carousel-cover-item').length)
        // nice_text = "nice2"
    }

    function CarouselCoversOnTouchMove2(e, isTouch) {

        if (!isTouch && e.buttons != 1) {
            return
        }

        let diff = 0
        
        if (isTouch) {
            diff = startPosX - e.touches[0].clientX;
        }

        else {
            console.log(e.buttons)
            diff = startPosX - e.clientX;
        }
        
        e.currentTarget.style.transform = `translateX(${-e.currentTarget.getAttribute("value") * e.currentTarget.offsetWidth - diff}px)`;
        
        // if (e.currentTarget.classList[0] === "carousel-product_covers-content2") {
        //     e.currentTarget.style.transform = `translateX(${-e.currentTarget.getAttribute("value") * e.currentTarget.offsetWidth - diff}px)`;
        // }

        // else if (e.currentTarget.classList[0] === "carousel-product_additional_covers-content2") {
        //     e.currentTarget.style.transform = `translateX(${-AdditionalCoversCurrentIndex2 * e.currentTarget.offsetWidth - diff}px)`;
        // }
    }

    function CarouselCoversOnTouchEnd2(e, isTouch) {
        e.currentTarget.classList.remove('active');

        let diff = 0

        if (isTouch) {
            diff = startPosX - e.changedTouches[0].clientX;
        }

        else {
            // mouseDragging = false
            console.log("onmouseup")
            diff = startPosX - e.clientX;
        }

        // console.log("nice_text: " + nice_text)

        if (diff > 20) {
            goToIndexCovers2(e.currentTarget, ((parseInt(e.currentTarget.getAttribute("value")) + 1) % e.currentTarget.children.length));
            // if (e.currentTarget.classList[0] === "carousel-product_covers-content2") {
                
            //     // console.log("current: " + e.currentTarget.getAttribute("value"))
            //     // console.log("goto: " + ((parseInt(e.currentTarget.getAttribute("value")) + 1) % e.currentTarget.children.length))
            //     goToIndexCovers2(e, ((parseInt(e.currentTarget.getAttribute("value")) + 1) % e.currentTarget.children.length));
                
            // }
    
            // else if (e.currentTarget.classList[0] === "carousel-product_additional_covers-content2") {
            //     goToIndexCovers2(e, ((parseInt(e.currentTarget.getAttribute("value")) + 1) % e.currentTarget.children.length));
            // }
        }
        
        else if (diff < -20) {
            goToIndexCovers2(e.currentTarget, ((e.currentTarget.getAttribute("value") - 1 + e.currentTarget.children.length) % e.currentTarget.children.length));
            // if (e.currentTarget.classList[0] === "carousel-product_covers-content2") {
            //     // console.log((CoversCurrentIndex2 - 1) % document.querySelectorAll('.carousel-cover-item3').length)
            //     goToIndexCovers2(e, ((e.currentTarget.getAttribute("value") - 1 + e.currentTarget.children.length) % e.currentTarget.children.length));
                
            // }
    
            // else if (e.currentTarget.classList[0] === "carousel-product_additional_covers-content2") {
            //     goToPrevAdditionalCovers2();
            // }
        } else {
            goToIndexCovers2(e.currentTarget, e.currentTarget.getAttribute("value"))
            // if (e.currentTarget.classList[0] === "carousel-product_covers-content2") {
            //     goToIndexCovers2(e, e.currentTarget.getAttribute("value"))
            // }
            
            // else if (e.currentTarget.classList[0] === "carousel-product_additional_covers-content2") {
            //     goToIndexCovers2(e, AdditionalCoversCurrentIndex2)
            // }

            // stayToIndexCovers2(e)

            // if (e.currentTarget.classList[0] === "carousel-product_covers-content2") {
            //     goToIndexCovers2(e, CoversCurrentIndex2);
            // }
    
            // else if (e.currentTarget.classList[0] === "carousel-product_additional_covers-content2") {
            //     goToIndexCovers2(e, AdditionalCoversCurrentIndex2);
            // }
        }

        // CoversUpdateDots2(e.currentTarget);
    }

    // const handleMouse = (e) => {
    //     if (e.type === "mousedown") {
    //         isDraggingMouse = true

    //         CoversCarousel2.classList.add('active')
    //         startPosX = e.clientX;
    //         // console.log("mousedown")
    //     }

    //     else if (e.type === "mousemove") {
    //         if (isDraggingMouse) {
    //             const diff = startPosX - e.clientX;
    //             CoversCarousel2.style.transform = `translateX(${-CoversCurrentIndex2 * CoversCarousel2.offsetWidth - diff}px)`;
    //         }
    //     }

    //     else if (e.type === "mouseup") {
    //         isDraggingMouse = false
    //         CoversCarousel2.classList.remove('active');
    //         const diff = startPosX - e.clientX;
    //         // console.log("nice_text: " + nice_text)
    
    //         if (diff > 20) {
    //             goToNextCovers2();
    //         } else if (diff < -20) {
    //             goToPrevCovers2();
    //         } else {
    //             goToIndexCovers2(CoversCurrentIndex2);
    //         }

    //         // console.log("mouseup")
    //     }

        
    // }

    // Addtional Cover

    // function CarouselAdditionalCoversOnTouchStart2(e) {
    //     CoversAdditionalCarousel2.classList.add('active')
    //     AdditionalstartPosX = e.touches[0].clientX;
    //     // console.log("Touch: " + e.touches[0].clientX)
    //     // console.log("CoversTotalItems: " + document.querySelectorAll('.carousel-cover-item').length)
    //     // nice_text = "nice2"
    // }

    // function CarouselAdditionalCoversOnTouchMove2(e) {
    //     const diff = AdditionalstartPosX - e.touches[0].clientX;
    //     CoversAdditionalCarousel2.style.transform = `translateX(${-AdditionalCoversCurrentIndex2 * CoversAdditionalCarousel2.offsetWidth - diff}px)`;
    // }

    // function CarouselAdditionalCoversOnTouchEnd2(e) {
    //     CoversAdditionalCarousel2.classList.remove('active');
    //     const diff = AdditionalstartPosX - e.changedTouches[0].clientX;
    //     // console.log("nice_text: " + nice_text)

    //     if (diff > 20) {
    //         goToNextAdditionalCovers2();
    //         // console.log("goToNextAdditionalCovers2")
    //     } else if (diff < -20) {
    //         goToPrevAdditionalCovers2();
    //         // console.log("goToPrevAdditionalCovers2")
    //     } else {
    //         goToIndexAdditionalCovers2(AdditionalCoversCurrentIndex2);
    //         // console.log("goToIndexAdditionalCovers2")
    //     }
    // }

    // const handleAdditionalMouse = (e) => {
    //     if (e.type === "mousedown") {
    //         isDraggingMouse = true

    //         CoversAdditionalCarousel2.classList.add('active')
    //         AdditionalstartPosX = e.clientX;
    //         // console.log("mousedown")
    //         // console.log("mousedown")
    //         // console.log("h123: " + AdditionalCoversCurrentIndex2)
    //     }

    //     else if (e.type === "mousemove") {
    //         if (isDraggingMouse) {
    //             const diff = AdditionalstartPosX - e.clientX;
    //             CoversAdditionalCarousel2.style.transform = `translateX(${-AdditionalCoversCurrentIndex2 * CoversAdditionalCarousel2.offsetWidth - diff}px)`;
    //             // console.log("mousemove")
    //             // console.log("h223: " + AdditionalCoversCurrentIndex2)
    //         }
    //     }

    //     else if (e.type === "mouseup") {
    //         // console.log("h43: " + AdditionalCoversCurrentIndex2)
    //         isDraggingMouse = false
    //         CoversAdditionalCarousel2.classList.remove('active');
    //         const diff = AdditionalstartPosX - e.clientX;
    //         // console.log("nice_text: " + nice_text)
    
    //         if (diff > 20) {
    //             goToNextAdditionalCovers2();
    //         } else if (diff < -20) {
    //             goToPrevAdditionalCovers2();
    //         } else {
    //             goToIndexAdditionalCovers2(AdditionalCoversCurrentIndex2);
                
    //         }

    //         // console.log("mouseup")
    //     }
    // }

    return (
        // <div className="create-roll" style={{width: "fit-content"}}>
        <div className="create-roll">

            <h1 style={{textAlign: "center"}}>{t('create_roll')}</h1>
            
            {/* <div className="carousel-product_covers">
                <div className="carousel-product_covers-content"></div>
            </div>
            <div className="carousel-product_covers-dots"></div> */}

            {/* <div className="c1">
                {dividedComponents[0] && dividedComponents[0].map((test, index) => (
                    <div className="c2" key={index}>
                        {"Lenght: " + test.length}
                        <br></br>
                        {"Cover: " + dividedComponents[0][index][0].cover}
                        {dividedComponents[0][index] && dividedComponents[0][index].map((product_cover2, index2) => (
                            <div className="c3" key={index2}>
                                {dividedComponents[0][index][index2].cover}
                            </div>
                        ))}
                    </div>
                ))}
            </div> */}

            {/* <div>
                {dividedComponents && dividedComponents[0].map((test, index) => (
                    <div className="carousel-additional-cover-item3" key={index}>
                        <div className="carousel-additional-cover-item4" key={index}>
                            {dividedComponents[0][index] && dividedComponents[0][index].map((product_additional_cover, index5) => (
                                <div className="carousel-additional-cover-item-one2" key={index5}>
                                    he
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div> */}

            {/* <div>
                {dividedComponents[0].length}
            </div> */}

            <h2 style={{textAlign: "center"}}>{t('cover')}</h2>

            <div className="carousel-product_cover_parent2" onDragStart={(e) => e.preventDefault()}>
                <div className="carousel-product_covers2">
                    <div className="carousel-product_covers-content2" onTouchStart={(e) => CarouselCoversOnTouchStart2(e, true)} onTouchMove={(e) => CarouselCoversOnTouchMove2(e, true)} onTouchEnd={(e) => (CarouselCoversOnTouchEnd2(e, true))} value={0}>
                        {dividedComponents[0] && dividedComponents[0].map((test, index) => (
                            <div className="carousel-cover-item3" key={index}>
                                <div className="carousel-cover-item4" key={index}>
                                    {dividedComponents[0][index].map((product_cover) => (
                                        <div className="carousel-cover-item-one2" key={product_cover.cover_id}>
                                            <label className="lab1">
                                                <input type="radio" className="cover" onClick={()=>handleCover(product_cover.cover)} name='product_cover' value={product_cover.cover_cost}/>
                                                <div>
                                                    <img style={{width: "50px"}} src={require('../images/' + product_cover.cover + '.png')} />
                                                    <br></br>
                                                    {t('covers.' + product_cover.cover)}
                                                    <br></br>
                                                    {"(" + product_cover.cover_cost.toLocaleString('en') + " " + t('sum') + ")"}
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <br></br>
                <div className="carousel-product_covers-dots2">
                    
                    {dividedComponents[0] && dividedComponents[0].map((test, index) => (
                        index == 0 ?
                        <div className="cover-carousel-dot2 active" onClick={(e) => (goToIndexCovers2(e.currentTarget.parentElement.parentElement.children[0].children[0], index, true))} key={index}></div>
                        :
                        <div className="cover-carousel-dot2" onClick={(e) => (goToIndexCovers2(e.currentTarget.parentElement.parentElement.children[0].children[0], index, true))} key={index}></div>
                    ))}
                </div>
            </div>

            <br></br>

            <h2 style={{textAlign: "center"}}>{t('additional_cover')}</h2>

            <div className="carousel-product_additional_cover_parent2" onDragStart={(e) => e.preventDefault()}>
                <div className="carousel-product_additional_covers2">
                    <div className="carousel-product_additional_covers-content2" onTouchStart={(e) => CarouselCoversOnTouchStart2(e, true)} onTouchMove={(e) => CarouselCoversOnTouchMove2(e, true)} onTouchEnd={(e) => (CarouselCoversOnTouchEnd2(e, true))} value={0}>
                        {dividedComponents[1] && dividedComponents[1].map((test, index) => (
                            <div className="carousel-additional-cover-item3" key={index}>
                                <div className="carousel-additional-cover-item4" key={index}>
                                    {dividedComponents[1][index].map((product_additional_cover) => (
                                        <div className="carousel-additional-cover-item-one2" key={product_additional_cover.additional_cover_id}>
                                            <label className="lab1">
                                                <input type="checkbox" className="additional_cover" onClick={()=>handleAdditionalCover()} name='product_additional_cover' value={product_additional_cover.additional_cover + ";" + product_additional_cover.additional_cover_cost}/>
                                                <div>
                                                    <img style={{width: "50px"}} src={require('../images/' + product_additional_cover.additional_cover + '.png')} />
                                                    <br></br>
                                                    {t('additional_covers.' + product_additional_cover.additional_cover)}
                                                    <br></br>
                                                    {"(" + product_additional_cover.additional_cover_cost.toLocaleString('en') + " " + t('sum') + ")"}
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <br></br>
                <div className="carousel-product_covers-dots2">
                    {dividedComponents[1] && dividedComponents[1].map((test, index) => (
                        index == 0 ?
                        <div className="cover-carousel-dot2 active" onClick={(e) => (goToIndexCovers2(e.currentTarget.parentElement.parentElement.children[0].children[0], index, true))} key={index}></div>
                        :
                        <div className="cover-carousel-dot2" onClick={(e) => (goToIndexCovers2(e.currentTarget.parentElement.parentElement.children[0].children[0], index, true))} key={index}></div>
                    ))}
                </div>
            </div>

            <br></br>

            <h2 style={{textAlign: "center"}}>{t('stuffing')}</h2>

            <div className="carousel-product_additional_cover_parent2" onDragStart={(e) => e.preventDefault()}>
                <div className="carousel-product_additional_covers2">
                    <div className="carousel-product_additional_covers-content2" onTouchStart={(e) => CarouselCoversOnTouchStart2(e, true)} onTouchMove={(e) => CarouselCoversOnTouchMove2(e, true)} onTouchEnd={(e) => (CarouselCoversOnTouchEnd2(e, true))} value={0}>
                        {dividedComponents[2] && dividedComponents[2].map((test, index) => (
                            <div className="carousel-additional-cover-item3" key={index}>
                                <div className="carousel-additional-cover-item4" key={index}>
                                    {dividedComponents[2][index].map((product_additional_cover) => (
                                        <div className="carousel-additional-cover-item-one2" key={product_additional_cover.stuffing_id}>
                                            <label className="lab1">
                                                {/* <input type="checkbox" className="stuffing" name='product_additional_cover' value={product_additional_cover.stuffing + ";" + product_additional_cover.stuffing_cost}/> */}
                                                <div className="crDesc">
                                                    <img style={{width: "50px"}} src={require('../images/' + product_additional_cover.stuffing + '.png')} />
                                                    <br></br>
                                                    {t('stuffings.' + product_additional_cover.stuffing)}
                                                    <br></br>
                                                    {"(" + product_additional_cover.stuffing_cost.toLocaleString('en') + " " + t('sum') + ")"}
                                                </div>
                                            </label>
                                            <span className="stuffing-cost" style={{marginRight: "5px"}}>0</span>
                                            <span style={{marginRight: "5px"}}>{t('sum')}</span>
                                            <br></br>
                                            <button className="sLeft" style={{width: "30px", height: "30px"}} onClick={(e) => (handleChangeStuffing(e, false))}>-</button>
                                            <span className="stuffing-quantity" style={{marginLeft: "5px", marginRight: "5px"}} min_gr={product_additional_cover.stuffing_min_gr} step_gr={product_additional_cover.stuffing_step_gr} value={product_additional_cover.stuffing} cost={product_additional_cover.stuffing_cost}>0</span>
                                            <span style={{marginRight: "5px"}}>gr</span>
                                            <button className="sRight" style={{width: "30px", height: "30px"}} onClick={(e) => (handleChangeStuffing(e, true))}>+</button>
                                            <br></br>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <br></br>
                <div className="carousel-product_covers-dots2">
                    {dividedComponents[2] && dividedComponents[2].map((test, index) => (
                        index == 0 ?
                        <div className="cover-carousel-dot2 active" onClick={(e) => (goToIndexCovers2(e.currentTarget.parentElement.parentElement.children[0].children[0], index, true))} key={index}></div>
                        :
                        <div className="cover-carousel-dot2" onClick={(e) => (goToIndexCovers2(e.currentTarget.parentElement.parentElement.children[0].children[0], index, true))} key={index}></div>
                    ))}
                </div>
            </div>

            <br></br>

            <h2 style={{textAlign: "center"}}>{t('hat')}</h2>

            <div className="carousel-product_additional_cover_parent2" onDragStart={(e) => e.preventDefault()}>
                <div className="carousel-product_additional_covers2">
                    <div className="carousel-product_additional_covers-content2" onTouchStart={(e) => CarouselCoversOnTouchStart2(e, true)} onTouchMove={(e) => CarouselCoversOnTouchMove2(e, true)} onTouchEnd={(e) => (CarouselCoversOnTouchEnd2(e, true))} value={0}>
                        {dividedComponents[3] && dividedComponents[3].map((test, index) => (
                            <div className="carousel-additional-cover-item3" key={index}>
                                <div className="carousel-additional-cover-item4" key={index}>
                                    {dividedComponents[3][index].map((product_additional_cover) => (
                                        <div className="carousel-additional-cover-item-one2" key={product_additional_cover.hat_id}>
                                            <label className="lab1">
                                                <input type="radio" className="hat" onClick={(e)=>handleHats(e, product_additional_cover.hat)} name='product_additional_cover' value={product_additional_cover.hat + ";" + product_additional_cover.hat_cost}/>
                                                <div>
                                                    <img style={{width: "50px"}} src={require('../images/' + product_additional_cover.hat + '.png')} />
                                                    <br></br>
                                                    {t('hats.' + product_additional_cover.hat)}
                                                    <br></br>
                                                    {"(" + product_additional_cover.hat_cost.toLocaleString('en') + " " + t('sum') + ")"}
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <br></br>
                <div className="carousel-product_covers-dots2">
                    {dividedComponents[3] && dividedComponents[3].map((test, index) => (
                        index == 0 ?
                        <div className="cover-carousel-dot2 active" onClick={(e) => (goToIndexCovers2(e.currentTarget.parentElement.parentElement.children[0].children[0], index, true))} key={index}></div>
                        :
                        <div className="cover-carousel-dot2" onClick={(e) => (goToIndexCovers2(e.currentTarget.parentElement.parentElement.children[0].children[0], index, true))} key={index}></div>
                    ))}
                </div>
            </div>

            <br></br>

            <h2 style={{textAlign: "center"}}>{t('pouring')}</h2>

            <div className="carousel-product_additional_cover_parent2" onDragStart={(e) => e.preventDefault()}>
                <div className="carousel-product_additional_covers2">
                    <div className="carousel-product_additional_covers-content2" onTouchStart={(e) => CarouselCoversOnTouchStart2(e, true)} onTouchMove={(e) => CarouselCoversOnTouchMove2(e, true)} onTouchEnd={(e) => (CarouselCoversOnTouchEnd2(e, true))} value={0}>
                        {dividedComponents[4] && dividedComponents[4].map((test, index) => (
                            <div className="carousel-additional-cover-item3" key={index}>
                                <div className="carousel-additional-cover-item4" key={index}>
                                    {dividedComponents[4][index].map((product_additional_cover) => (
                                        <div className="carousel-additional-cover-item-one2" key={product_additional_cover.pouring_id}>
                                            <label className="lab1">
                                                <input type="checkbox" className="pouring" onClick={()=>handlePouring()} name='product_additional_cover' value={product_additional_cover.pouring + ";" + product_additional_cover.pouring_cost}/>
                                                <div>
                                                    <img style={{width: "50px"}} src={require('../images/' + product_additional_cover.pouring + '.png')} />
                                                    <br></br>
                                                    {t('pourings.' + product_additional_cover.pouring)}
                                                    <br></br>
                                                    {"(" + product_additional_cover.pouring_cost.toLocaleString('en') + " " + t('sum') + ")"}
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <br></br>
                <div className="carousel-product_covers-dots2">
                    {dividedComponents[4] && dividedComponents[4].map((test, index) => (
                        index == 0 ?
                        <div className="cover-carousel-dot2 active" onClick={(e) => (goToIndexCovers2(e.currentTarget.parentElement.parentElement.children[0].children[0], index, true))} key={index}></div>
                        :
                        <div className="cover-carousel-dot2" onClick={(e) => (goToIndexCovers2(e.currentTarget.parentElement.parentElement.children[0].children[0], index, true))} key={index}></div>
                    ))}
                </div>
            </div>
            
            
            <div>
                

                {/* <br></br>

                <div style={{textAlign: "center"}}>
                    {t('cover')}
                </div>

                <div>
                    <div className="product_covers" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        {components[0] && components[0].map((product_cover) => (
                            <div style={{width: "250px", display: "inline-block", verticalAlign: "top", textAlign: "center"}} className="product_cover" key={product_cover.cover_id}>
                                <label className="lab1">
                                    <input type="radio" className="cover" onChange={()=>handleCover(product_cover.cover)} name='product_cover' value={product_cover.cover_cost}/>
                                    <div style={{verticalAlign: "top"}}>
                                        <img style={{width: "50px"}} src={require('../images/' + product_cover.cover + '.png')} />
                                        <br></br>
                                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "42px", }}>
                                            <div style={{textAlign: "center"}}>
                                                {t('covers.' + product_cover.cover)}
                                                <br></br>
                                                {"(" + product_cover.cover_cost.toLocaleString('en') + " " + t('sum') + ")"}
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <br></br>

                <div style={{textAlign: "center"}}>
                    {t('additional_cover')}
                </div>

                <div className="product_additional_covers" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {components[1] && components[1].map((product_additional_cover) => (
                        <div style={{width: "150px", display: "inline-block", verticalAlign: "top", textAlign: "center"}} className="product_additional_cover" key={product_additional_cover.additional_cover_id}>
                            <label className="lab1">
                                <input type="checkbox" className="additional_cover" onChange={()=>handleAdditionalCover(product_additional_cover.additional_cover)} name='product_additional_cover' value={product_additional_cover.additional_cover + ";" + product_additional_cover.additional_cover_cost}/>
                                <div style={{verticalAlign: "top"}}>
                                    <img style={{width: "50px"}} src={require('../images/' + product_additional_cover.additional_cover + '.png')} />
                                    <br></br>
                                    
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "42px", }}>
                                            <div style={{textAlign: "center"}}>
                                                {t('additional_covers.' + product_additional_cover.additional_cover)}
                                                <br></br>
                                                {"(" + product_additional_cover.additional_cover_cost.toLocaleString('en') + " " + t('sum') + ")"}
                                            </div>
                                        </div>
                                </div>
                            </label>
                        </div>
                    ))}
                </div>

                <br></br>

                <div style={{textAlign: "center"}}>
                    {t('stuffing')}
                </div>

                <div className="product_stuffings" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {components[2] && components[2].map((product_stuffing) => (
                        <div style={{width: "150px", display: "inline-block", verticalAlign: "top", textAlign: "center"}} className="product_stuffing" key={product_stuffing.stuffing_id}>
                            <label className="lab1">
                                <input type="checkbox" className="stuffing" onChange={()=>handleStuffing(product_stuffing.stuffing)} name='product_stuffing' value={product_stuffing.stuffing + ";" + product_stuffing.stuffing_cost}/>
                                <div style={{verticalAlign: "top"}}>
                                    <img style={{width: "50px"}} src={require('../images/' + product_stuffing.stuffing + '.png')} />
                                    <br></br>
                                    
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "42px", }}>
                                            <div style={{textAlign: "center"}}>
                                                {t('stuffings.' + product_stuffing.stuffing)}
                                                <br></br>
                                                {"(" + product_stuffing.stuffing_cost.toLocaleString('en') + " " + t('sum') + ")"}
                                            </div>
                                        </div>
                                </div>
                            </label>
                        </div>
                    ))}
                </div>

                <br></br>

                <div style={{textAlign: "center"}}>
                    {t('form')}
                </div>
                
                <div className="product_forms" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {components[3] && components[3].map((product_form) => (
                        <div style={{width: "150px", display: "inline-block", verticalAlign: "top", textAlign: "center"}} className="product_form" key={product_form.form_id}>
                            <label className="lab1">
                                <input type="radio" onChange={()=>handleForm(product_form.form)} name='product_form'/>
                                <div style={{verticalAlign: "top"}}>
                                    <img style={{width: "50px"}} src={require('../images/' + product_form.form + '.png')} />
                                    <br></br>
                                    
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "42px", }}>
                                        <div style={{textAlign: "center"}}>
                                            {t('forms.' + product_form.form)}
                                        </div>
                                    </div>
                                </div>
                            </label>
                        </div>
                    ))}
                </div> */}
                <h1 className="rollName">{t('name')}</h1>
                <div style={{textAlign: "center"}}>
                    <input className="iInput" type="text" id="input-name" style={{textAlign: "center"}} onChange={handleName} placeholder={t('name')} name='name'/>
                </div>
            </div>

            <h1 className="rollQuantity">{t('quantity')}</h1>
            <div style={{textAlign: "center"}}>
                <button className="ibLeft" onClick={(e)=>handleChangeQuantity(-1, e)}>-</button>
                <input className="iQuantity" type="text" id="input-quantity" style={{textAlign: "center"}} onChange={handleQuantity} placeholder={t('quantity')} name='quantity'/>
                <button className="ibRight" onClick={(e)=>handleChangeQuantity(1, e)}>+</button>
            </div>
            
            <br></br>
            <div style={{textAlign: "center"}}>
                <button className="ibAdd" onClick={()=>handleAdd()}>{t('add')}</button>
            </div>

            {/* <button onClick={()=>handleCheckCost()}>Check Cost</button> */}
            <ToastContainer/>
        </div>
    )
}

export default CreateRoll