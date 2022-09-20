import React, { useEffect } from "react";
import ReactRouter from "./ReactRouter";
import { getWebViews } from '@/utils/buriedPoint/index'
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
  Location,
  NavigateFunction,
} from "react-router-dom";
import Login from "../view/login/login";
import Home from "../home";
import { socketIo } from "../view/chatRoom/utils/newSocket";
import Cookies from "js-cookie";
// 跳转登录页组件
let RedirectLogin = () => {
  return (
    <>
      <Routes>
        <Route path="/blog/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/blog/login" />} />
      </Routes>
    </>
  );
};
let RedirectHome = () => {
  return (
    <>
      <Routes>
        <Route path="/blog" element={<Home />} />
        <Route path="*" element={<Navigate to="/blog" />} />
      </Routes>
    </>
  );
};

let location: Location;
let navigate: NavigateFunction;
let token: string | null;

// 免token白名单
let whiteList = ["/blog/login", "/blog/register"];
export default function UseRoute(props: any) {
  location = useLocation();
  navigate = useNavigate();
  token = window.localStorage.getItem("token");
  
  useEffect(() => {
    getWebViews('getFullViews', {
      UserId: null, 
      pageRouter: location.pathname,
    })
    getWebViews('getUniqueViews', {
      UserId: null
    })
    ElementRoute(); 
    if (localStorage.getItem("token")) {
      joinRoom(); 
    }
  });
  /**
   * 刷新页面后登录页面
   */
  const joinRoom = () => {
    let userinfo = JSON.parse(localStorage.getItem("userInfo")!);
    console.log('-----登录内容', userinfo)
    socketIo.joinRoom({
      userName: userinfo.userName,
      userId: userinfo.id,
    });
  };

  return (
    <>
      <ElementRoute />
    </>
  );
}

/**
 *  路由重定向
 *  路由改变触发路由重新渲染  首先实现的功能是/ 重定向/home
 * @returns { ReactElement } 路由页面
 */
let ElementRoute = () => {
  if (!token && !whiteList.includes(location.pathname)) {
    return <RedirectLogin />;
  } else {
    if (location.pathname === "/") {
      navigate("/blog");
    }

    return <ReactRouter />;
  }
};



/**
 * 本组件作为全局的路由守卫
 * 鉴权   免密码登录等操作
 *
 *
 */
