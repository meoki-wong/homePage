import React, { lazy, ReactElement, Suspense } from "react";
// import { RouteObject } from 'react-router-dom' // hook导入
import Loading from "../view/components/Loading";
// import Home from "../home";
import ChatPage from "../view/chatRoom/page/chatPage";
import GroupChatPage from "../view/chatRoom/page/groupPage"
// import HomeIndex from "@/view/home/page";
const Home = lazy(() => import("../home"));
const HomeIndex = lazy(() => import("@/view/home/page"));
const LiveCom = lazy(() => import("../view/Meeting/index"));
const ChartRoom = lazy(() => import("../view/chatRoom/ChatRoom"));
const Map = lazy(() => import("../view/Map/index"));
const Notification = lazy(() => import("../view/notification/page/notification"));
// 编辑
const Edit = lazy(() => import('../view/editUserInfo/editPage'))
const EditUserInfo = lazy(()=> import('../view/editUserInfo/page/editUserInfo'))
const EditArticle = lazy(()=> import('../view/postArticle/page/index'))
const  ArticleDetail = lazy( ()=> import('../view/home/page/articleDetails'))

// 路由懒加载
const lazyComponent = (Element: ReactElement) => {
  return <Suspense fallback={<Loading />}>{Element}</Suspense>;
};
const routeList: any[] = [
  {
    name: "首批功能实现",
    path: "/",
    element: lazyComponent(<Home />),
    children: [
      {
        name: "首页",
        path: "/home",
        index: true,
        element: lazyComponent(<HomeIndex />),
      },
      {
        name: "地图",
        path: "/Map",
        element: lazyComponent(<Map />),
      },
      {
        name: "对接声网",
        path: "/Meeting",
        element: lazyComponent(<LiveCom />),
      },
      {
        name: "文章编辑",
        path: "/editorArticle",
        element: lazyComponent(<EditArticle />),
      },
      {
        name: '文章详情',
        path: '/articleDetail',
        element: lazyComponent(<ArticleDetail />)
    },
      {
        name: "即时通讯",
        path: "/ChartRoom",
        element: lazyComponent(<ChartRoom />),
        children: [
          {
            name: "聊天界面",
            path: "/ChartRoom/friend",
            element: <ChatPage />,
          },
          {
            name: "群组聊天界面",
            path: "/ChartRoom/group",
            element: <GroupChatPage />,
          },
        ],
      },
    ],
  },
  {
    name: "测试待定",
  },
  { // 个人消息页
    name: '个人消息页',
    path: '/',
    element: lazyComponent(<Home />),
    children: [
      {
        name: '个人消息页',
        path: '/notification',
        element: lazyComponent(<Notification />)
      }
    ]
  },
  { // 编辑用户相关信息
    name: '用户个人信息',
    path: '/',
    element: lazyComponent(<Home />),
    children: [
      {
        name: '个人信息',
        path: '/edit',
        element: lazyComponent(<Edit />),
        children: [
          {
            name: '编辑个人信息',
            path: '/edit/editUserInfo',
            element: lazyComponent(<EditUserInfo/>)
          }
        ]
      }
    ]
  }
];

export default routeList;
