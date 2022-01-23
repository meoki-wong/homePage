import React from 'react'

interface setCookie {
    name: String,
    value: any,
    time: number
}


export const setCookieFn = (setCookieObj: setCookie)=>{
    let {name, value, time} = setCookieObj
    var d = new Date();
    d.setTime(d.getTime()+ time*24*60*60*1000 );
    var expires = "expires="+d
    return document.cookie = name + "=" + value + "; " + expires;
}
