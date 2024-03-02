import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import Cookies from 'universal-cookie'


const Logout = () => {

const navigate = useNavigate()

// const cookies = new Cookies()

useEffect(()=>{
    const logout = async ()=>{
        try{
            localStorage.removeItem('username')
            navigate("/profile")
        }
        catch(err){
            console.log(err)
        }
    }
    logout()
},[]);

    return (
        <div>
            Logout
        </div>
    )
}

export default Logout