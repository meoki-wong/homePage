import React, {lazy, ReactElement ,Suspense} from 'react'
// import { RouteObject } from 'react-router-dom' // hook导入
import Loading from '../view/components/Loading'
// import Test from "../test"
// import Test2 from '../test2'
import Home from '../home'
import LiveCom from '../view/Meeting/index'
import ChartRoom from '../view/chatRoom/ChartRoom'
import Map from '../view/Map/index'
const Test2 = lazy(()=>import('../view/test2'))

// 路由懒加载
const lazyComponent = (Element: ReactElement)=>{
    return (
        <Suspense fallback={<Loading />}>
             {Element}
        </Suspense>
    )
}
const routeList: any[] = [
    
    {
        name: '首批功能实现',
        path: '/home',
        element: <Home />,
        children: [
            {
                name: '首页',
                path: '/home/Map',
                index: true,
                element: lazyComponent(<Map />),
            },
            {
                name: '对接声网',
                path: '/home/Meeting',
                element: lazyComponent(<LiveCom />)
            },
            {
                name: '即时通讯',
                path: '/home/ChartRoom',
                element: lazyComponent(<ChartRoom />)
            }
        ]
    },
    

]


export default routeList