import {  } from "react-router-dom";

import Login from '../view/login/login'
import Register from '../view/login/register'
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
    }
]



export default publicRoute