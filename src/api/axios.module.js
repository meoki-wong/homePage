import React from 'react'
import axios from 'axios'
import {message} from 'antd'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// import axiosRetry from 'axios-retry'
axios.defaults.baseURL =  process.env.NODE_ENV == 'development'? 
                          'http://127.0.0.1:10020/api'
                          :'http://39.105.153.195/api'


axios.defaults.timeout =  15 * 1000; // 设置请求超时时间


// 设置超时请求
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
// axiosRetry(axios, {retries: 3})


// 请求拦截
let requestWhiteList = ['/login', '/register'] // 请求白名单
let responseWhiteList = [] // 响应白名单
axios.interceptors.request.use((config)=>{
    Nprogress.start() // 添加请求进度条
    if(requestWhiteList.includes(config.url)){
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
    // 需要添加token等   登录信息失效  跳转 /login
    
    Nprogress.done() // 结束请求进度条 
    return config
}, (err)=>{
    // 设置超时请求
    let config = err.config;
    if(!config || !config.retry) return Promise.reject(err);
    
    config.__retryCount = config.__retryCount || 0;
    
    if(config.__retryCount >= config.retry) {
        return Promise.reject(err);
    }
    
    config.__retryCount += 1;
    let backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    
    return backoff.then(function() {
        return axios(config);
    });
    console.log('=====>响应拦截失败', err.config)
    message.error(String(err)) // statusCode 不为200时   报相关异常信息
})


