import React, {lazy, ReactElement ,Suspense} from 'react'
// import { RouteObject } from 'react-router-dom' // hook导入
import Loading from '../view/components/Loading'
// import Test from "../test"
// import Test2 from '../test2'
import Home from '../home'
const LiveCom = lazy(()=>import('../view/components/liveRtc/liveCom'))
const ChartRoom = lazy(()=>import('../view/chatRoom/ChartRoom'))
const Map = lazy(()=>import('../view/Map/index'))
// const Test2 = lazy(()=>import('../view/test2'))

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
        path: '/',
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