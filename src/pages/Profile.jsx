import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MapComponent from '../components/MapComponent'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import GlobalVars from '../globalVariables/GlobalVars'


const Profile = () => {

    const navigate = useNavigate()
    const [account, setAccount] = useState([])

    const {t, i18n } = useTranslation()
    const locales = {
        en: {title: 'English'},
        ru: {title: 'Русский'}
    }

    useEffect(()=>{
        const fetchAccountData = async ()=>{
            try{
                const res = await axios.post(GlobalVars.backend_server + "/getAccount", [localStorage.getItem("username")])
                setAccount(res.data)

                // console.log(res.data[0].user_type)
            }

            catch(err){
                console.log(err)
            }
        }

        if (localStorage.getItem("username") != null) {
            fetchAccountData()
        }

        // else {
        //     console.log(localStorage.getItem("username"))
        //     // console.log(localStorage.getItem("username"))
        // }
            
    },[]);

    const login = ()=>{
        navigate('/login')
    }

    const register = ()=>{
        navigate('/register')
    }

    const logout = ()=>{
        navigate('/logout')
    }

    if (localStorage.getItem("username") == null) {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>{t('profile')}</h1>

                <button className="login" onClick={login}>{t('login')}</button>
                <button className="register" onClick={register}>{t('register')}</button>
            </div>
        )
    }

    // if (account) {
    //     return (
    //         <div>
    //             <button><Link to="/login">{t('login')}</Link></button>
    //             <button><Link to="/register">{t('register')}</Link></button>
    //         </div>
    //     )
    // }

    if (account.length != 0 && account[0].user_type == "admin") {
        return (
            <div>
                {t('profile')}
                <div>
                    <button className="logout" onClick={logout}>{t('logout')}</button>
                </div>

                <div>
                    <button><Link to="/monitor">{t('monitor')}</Link></button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: "center"}}>{t('profile')}</h1>

            <div>
                <div style={{textAlign: "center"}}>{t('phone') + ": +998" + localStorage.getItem("username")}</div>
            </div>

            <br></br>

            <div style={{textAlign: "center"}}>
                <button className="logout" onClick={logout}>{t('logout')}</button>
            </div>

        </div>
    )
}

export default Profile