import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import GlobalVars from '../globalVariables/GlobalVars'
import { useTranslation } from 'react-i18next'
// import Cookies from 'universal-cookie'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'


const Login = () => {
    const {t, i18n } = useTranslation()
    const locales = {
        en: {title: 'English'},
        ru: {title: 'Русский'},
        uz: {title: 'O\'zbek'}
    }
    const [user, setUser] = useState({
        username:"",
        password:""
    })

    const navigate = useNavigate()

    // const cookies = new Cookies()

    const handleChange = (e) => {
        setUser((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const register = ()=>{
        navigate('/register')
    }

    const handleClick = async e => {
        e.preventDefault()
        try {
            document.getElementById('login-b').style.visibility = "hidden"
            const res = (await axios.post(GlobalVars.backend_server+"/login", user)).data
            // Login success
            if (res.length > 0) {
                // cookies.set('username', res[0].username)
                localStorage.setItem("username", res[0].username)
                localStorage.setItem("userPhone", res[0].username)
                navigate("/")
            }

            // Login fail
            else {
                // console.log("login fail")
                toast(t('try_entering_other_information'))
                document.getElementById('login-b').style.visibility = "visible"
            }
        }

        catch (err) {
            console.log(err)
        }
    }
        return (
            <div>
                {/* {t('login')}
                <div>
                    <button><Link to="/">{t('main')}</Link></button>
                    <button><Link to="/register">{t('register')}</Link></button>
                </div> */}
                <div style={{textAlign: "center"}}>
                    <h1>{t('login')}</h1>
                    <h2>{t('enter_your_number_in_the_following_format')}</h2>
                    <input className='iPhone' type="text" placeholder={t('phone')} onChange={handleChange} name='username'/>
                    <input className='iPassword' type="text" placeholder={t('password')} onChange={handleChange} name='password'/>
                    <button id='login-b' className='createMap' onClick={handleClick}>{t('login')}</button>

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                    <div>
                        <div>{t('not_registered')}</div>
                        <button className="createMap" onClick={register}>{t('register')}</button>
                    </div>
                </div>
                <ToastContainer/>
            </div>
        )
}

export default Login