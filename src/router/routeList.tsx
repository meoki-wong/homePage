import React, { lazy, ReactElement, Suspense } from "react";
// import { RouteObject } from 'react-router-dom' // hook导入
import Loading from "../view/components/Loading";
import Home from "../home";
import ChatPage from "../view/chatRoom/components/chatPage";
const LiveCom = lazy(() => import("../view/Meeting/index"));
const ChartRoom = lazy(() => import("../view/chatRoom/ChatRoom"));
const Map = lazy(() => import("../view/Map/index"));
const Notification = lazy(() => import("../view/notification/page/notification"));

// 路由懒加载
const lazyComponent = (Element: ReactElement) => {
  return <Suspense fallback={<Loading />}>{Element}</Suspense>;
};
const routeList: any[] = [
  {
    name: "首批功能实现",
    path: "/dataAdmin",
    isShowNav: true,
    element: <Home />,
    children: [
      {
        name: "首页",
        path: "/dataAdmin/Map",
        index: true,
        element: lazyComponent(<Map />),
      },
      {
        name: "对接声网",
        path: "/dataAdmin/Meeting",
        element: lazyComponent(<LiveCom />),
      },
      {
        name: "即时通讯",
        path: "/dataAdmin/ChartRoom",
        element: lazyComponent(<ChartRoom />),
        children: [
          {
            name: "测试",
            path: "/dataAdmin/ChartRoom/friend",
            element: <ChatPage />,
          },
        ],
      },
    ],
  },
  {
    name: "测试待定",
    isShowNav: true,
  },
  { // 个人消息页
    name: '个人消息页',
    path: '/dataAdmin',
    isShowNav: false,
    element: lazyComponent(<Home />),
    children: [
      {
        name: '个人消息页',
        path: '/dataAdmin/notification',
        isShowNav: false,
        element: lazyComponent(<Notification />)
      }
    ]
  }
];

export default routeList;
