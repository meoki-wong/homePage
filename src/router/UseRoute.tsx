import React, { useEffect } from 'react'
import ReactRouter from './ReactRouter'
import {Routes, Route, useLocation, Navigate, useNavigate} from 'react-router-dom'
import Login from '../view/login/login'
import Home from '../home'
import Cookies from 'js-cookie'
import axios from 'axios'
// 跳转登录页组件
let RedirectLogin = ()=>{
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </>
    )
}
let RedirectHome = ()=>{
    return (
        <>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </>
    )
}


export default function UseRoute(props:any) {
    let location = useLocation()
    let navigate = useNavigate()
    let token = window.localStorage.getItem('token')
    // 免token白名单
    let whiteList = ["/login", "/register"]
    useEffect(()=>{
        ElementRoute() // 路由改变触发路由重新渲染  首先实现的功能是/ 重定向/home
    })
    let ElementRoute = ()=>{
        if(!token && !whiteList.includes(location.pathname)){
            return <RedirectLogin /> 
        } 
        else {
            if(location.pathname === '/'){
                navigate("/home")
            }
            return <ReactRouter />
        }
    }
    return (
        <>
            <ElementRoute/>
        </>
    )
}



/**
 * 本组件作为全局的路由守卫
 * 鉴权   免密码登录等操作
 * 
 * 
*/
