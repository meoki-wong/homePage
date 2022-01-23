import React from 'react'

interface setCookie {
    name: String,
    value: any,
    time: number
}

/**
 * 
 * 登录  记住我功能
 * 暂时设计  存入cookie 7天后时效过期  base64加密
 * 
 * @param name 存入cookie的key
 * @param value 存入cookie的value
 * @param time cookie存放时间
 */


export const setCookieFn = (setCookieObj: setCookie)=>{
    let {name, value, time} = setCookieObj
    var d = new Date();
    d.setTime(d.getTime()+ time*24*60*60*1000 );
    var expires = "expires="+d
    return document.cookie = name + "=" + value + "; " + expires;
}
