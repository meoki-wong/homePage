import React from 'react';
import { Suspense, ReactElement, lazy } from 'react'
import Loading from "../view/components/Loading";
import Login from '../view/login/login'
import Register from '../view/login/register'
const Edit = lazy(() => import('../view/editUserInfo/editPage'))
// 路由懒加载
const lazyComponent = (Element: ReactElement) => {
    return <Suspense fallback={<Loading />}>{Element}</Suspense>;
  };
const publicRoute = [
    {
        name: '登录',
        path: '/dataAdmin/login',
        element: <Login />
    },
    {
        name: '注册',
        path: '/dataAdmin/register',
        element: <Register />
    },
]



export default publicRoute