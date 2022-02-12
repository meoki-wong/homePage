import React from "react";

interface setCookie {
  name: String;
  value: any;
  time: number;
}

/**
 *
 * 登录  记住我功能
 * 暂时设计  存入cookie 7天后时效过期  base64加密
 *
 * @param {String} name 存入cookie的key
 * @param {any} value 存入cookie的value
 * @param {Number} time cookie存放时间
 */

export const setCookieFn = (setCookieObj: setCookie) => {
  let { name, value, time } = setCookieObj;
  var d = new Date();
  d.setTime(d.getTime() + time * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d;
  console.log('=====>value参数', value);
  return (document.cookie = `${name}='{"username": ${value.userName},"password": ${value.password}}'; ${expires}`);
//   return (document.cookie = name + "=" + JSON.stringify(value) + "; " + expires);
};



/* 
    后期引入js-cookie组件  cookies.set('name', 'value', {expires: 7})  // 分别表示名称  值   存储时间
    本方法弃用

*/