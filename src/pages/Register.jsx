import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import GlobalVars from '../globalVariables/GlobalVars'
import { useTranslation } from 'react-i18next'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
    const {t, i18n } = useTranslation()
    const locales = {
        en: {title: 'English'},
        ru: {title: 'Русский'}
    }
    const [user, setUser] = useState({
        username:"",
        password:""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const login = ()=>{
        navigate('/login')
    }

    const handleClick = async e => {
        e.preventDefault()

        if (user.username.length == 9) {
            try {
                document.getElementById('register-b').style.visibility = "hidden"
                const testdata = (await axios.post(GlobalVars.backend_server + "/register", user)).data
                // console.log(testdata)
    
                if (testdata[1] === "success") {
                    localStorage.setItem("username", testdata[0])
                    localStorage.setItem("userPhone", testdata[0])
                    navigate("/")
                }

                else {
                    // console.log("Try another username")
                    toast(t('user_with_this_phone_number_is_already_registered'))
                    document.getElementById('register-b').style.visibility = "visible"
                }
    
                // else {
                //     if (testdata.sqlMessage.includes('Duplicate entry')) {
                //         console.log("Try another username")
                //     }
                // }
            }
    
            catch (err) {
                console.log(err)
            }
        }

        else {
            toast(t('number_must_contain_9_digits'))
        }
        
    }

        return (
            <div>
                {/* {t('register')}
                <div>
                    <button><Link to="/">{t('main')}</Link></button>
                    <button><Link to="/login">{t('login')}</Link></button>
                </div> */}
                <div style={{textAlign: "center"}}>
                    <h1>{t('register')}</h1>
                    <h2>{t('enter_your_number_in_the_following_format')}</h2>
                    <input className='iPhone' type="text" placeholder={t('phone')} onChange={handleChange} name='username'/>
                    <input className='iPassword' type="text" placeholder={t('password')} onChange={handleChange} name='password'/>
                    <button id='register-b' className='createMap' onClick={handleClick}>{t('register')}</button>

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                    <div>
                        <div>{t('already_registered')}</div>
                        <button className="createMap" onClick={login}>{t('login')}</button>
                    </div>
                </div>
                <ToastContainer/>
            </div>
        )
}

export default Register