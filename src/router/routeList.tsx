import React from 'react'
import { RouteObject } from 'react-router-dom' // hook导入

import Test from "../test";
import Test2 from '../test2'
import Home from '../home'


const routeList: RouteObject[] = [
    
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: '/home/details',
                index: true,
                element: <Test />
            },
            {
                path: '/home/test2',
                element: <Test2 />,
            },
        ]
    },

]


export default routeList