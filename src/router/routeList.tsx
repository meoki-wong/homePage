import React, { lazy, ReactElement, Suspense } from "react";
// import { RouteObject } from 'react-router-dom' // hook导入
import Loading from "../view/components/Loading";
import Home from "../home";
import ChatPage from "../view/chatRoom/page/chatPage";
import GroupChatPage from "../view/chatRoom/page/groupPage"
const LiveCom = lazy(() => import("../view/Meeting/index"));
const ChartRoom = lazy(() => import("../view/chatRoom/ChatRoom"));
const Map = lazy(() => import("../view/Map/index"));
const Notification = lazy(() => import("../view/notification/page/notification"));
// 编辑
const Edit = lazy(() => import('../view/editUserInfo/editPage'))
const EditUserInfo = lazy(()=> import('../view/editUserInfo/page/editUserInfo'))
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
            name: "聊天界面",
            path: "/dataAdmin/ChartRoom/friend",
            element: <ChatPage />,
          },
          {
            name: "群组聊天界面",
            path: "/dataAdmin/ChartRoom/group",
            element: <GroupChatPage />,
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
  },
  { // 编辑用户相关信息
    name: '用户个人信息',
    path: '/dataAdmin',
    isShowNav: false,
    element: lazyComponent(<Home />),
    children: [
      {
        name: '个人信息',
        path: '/dataAdmin/edit',
        isShowNav: false,
        element: lazyComponent(<Edit />),
        children: [
          {
            name: '编辑个人信息',
            path: '/dataAdmin/edit/editUserInfo',
            element: lazyComponent(<EditUserInfo/>)
          }
        ]
      }
    ]
  }
];

export default routeList;
