import axios from 'axios'
import React from 'react'
axios.defaults.baseURL = 'http://127.0.0.1:10020'


// 请求拦截
axios.interceptors.request.use((config)=>{
    console.log('====请求拦截', config)
    return config
}, (err)=>{
    console.log('=====>请求拦截失败:', err)
})


// 响应拦截

axios.interceptors.response.use((config)=>{
    console.log('=====>响应拦截', config)
}, (err)=>{
    console.log('=====>响应拦截失败', err)
})