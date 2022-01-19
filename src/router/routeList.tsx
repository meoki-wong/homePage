import React, {lazy, ReactElement ,Suspense} from 'react'
import { RouteObject } from 'react-router-dom' // hook导入
import Loading from '../view/components/Loading'
// import Test from "../test"
// import Test2 from '../test2'
import Home from '../home'

const Login = lazy(()=>import('../view/login/login'))
const Test = lazy(()=>import('../test'))
const Test2 = lazy(()=>import('../test2'))


const lazyComponent = (Element: ReactElement)=>{
    return (
        <Suspense fallback={<Loading />}>
             {Element}
        </Suspense>
    )
}
const routeList: RouteObject[] = [
    
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: '/home/details',
                index: true,
                element: lazyComponent(<Test />)
            },
            {
                path: '/home/test2',
                element: lazyComponent(<Test2 />),
            },
        ]
    },
    {
        path: '/login',
        element: lazyComponent(<Login />)
    }

]


export default routeList