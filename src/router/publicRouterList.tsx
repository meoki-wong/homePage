import {  } from "react-router-dom";

import Login from '../view/login/login'
import Register from '../view/login/register'
const publicRoute = [
    {
        name: '登录',
        path: '/login',
        element: <Login />
    },
    {
        name: '注册',
        path: '/register',
        element: <Register />
    }
]



export default publicRoute