import axios from 'axios'
import React from 'react'
import {message} from 'antd'

axios.defaults.baseURL =  process.env.NODE_ENV == 'development'? 
                          'http://127.0.0.1:10020/api'
                          :'http:// 39.105.153.195/api'

// 请求拦截
let requestWhiteList = ['/login', '/register'] // 请求白名单
let responseWhiteList = [] // 响应白名单
axios.interceptors.request.use((config)=>{
    if(requestWhiteList.includes(config.url)){
        console.log('====请求拦截', config)
        return config
    }
    let token = window.localStorage.getItem('token')
    config.headers.authorization = token
    
    return config
}, (err)=>{
    message.error(err)
    console.log('=====>请求拦截失败:', err)
})


// 响应拦截

axios.interceptors.response.use((config)=>{
    let {status, statusText, data} = config
    if(data.code !==200){
        message.error(data.message)
        return
    }
    return config
}, (err)=>{
    console.log('=====>响应拦截失败', err)
    message.error(String(err)) // statusCode 不为200时   报相关异常信息
})