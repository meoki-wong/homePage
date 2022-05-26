import React from 'react'
import axios, {AxiosRequestConfig, AxiosResponse, AxiosInstance} from 'axios'
import {message} from 'antd'
//@ts-ignore
import Nprogress from 'nprogress' 
import 'nprogress/nprogress.css'
// import axiosRetry from 'axios-retry'
//@ts-ignore
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ?
'https://supermeoki/data_admin' :
'https://127.0.0.1:10020/data_admin'

let axiosInstance: AxiosInstance = axios.create({
    baseURL:  process.env.NODE_ENV === 'production' ?
                          'https://supermeoki/data_admin' :
                          'https://127.0.0.1:10020/data_admin',
    timeout:  15 * 1000, // 设置请求超时时间
    // 设置超时请求
    retryDelay: 1000,
    retry: 4,
})



// 请求拦截
let requestWhiteList = ['/login', '/register'] // 请求白名单
// let responseWhiteList = [] // 响应白名单
axiosInstance.interceptors.request.use((config: AxiosRequestConfig)=>{
    Nprogress.start() // 添加请求进度条
    if(requestWhiteList.includes(config.url as string)){
        return config
    }
    let token = window.localStorage.getItem('token')
    if(!config.headers){
        config.headers = {}
    } else {
        config.headers.authorization = token as string
    }
    
    return config
}, (err: any)=>{
    message.error(err)
    console.log('=====>请求拦截失败:', err)
})


// 响应拦截

axiosInstance.interceptors.response.use((config: AxiosResponse)=>{
    console.log('----触发', config)
    let {status, statusText, data} = config
    if(data.code !==200){
        message.error(data.message)
        return
    }
    // 需要添加token等   登录信息失效  跳转 /login
    
    Nprogress.done() // 结束请求进度条 
    return config
}, (err: any)=>{
    // 设置超时请求
    let config = err.config;
    if(!config || !config.retry) return Promise.reject(err);
    
    config.__retryCount = config.__retryCount || 0;
    
    if(config.__retryCount >= config.retry) {
        return Promise.reject(err);
    }
    
    config.__retryCount += 1;
    let backoff = new Promise<void>((resolve)=> {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    
    return backoff.then(function() {
        return axiosInstance(config);
    });
    // console.log('=====>响应拦截失败', err.config)
    // message.error(String(err)) // statusCode 不为200时   报相关异常信息
})


