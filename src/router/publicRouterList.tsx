import { Suspense, ReactElement, lazy } from 'react'
import Loading from "../view/components/Loading";
import Login from '../view/login/login'
import Register from '../view/login/register'
import Error from '@/view/errorPage/page/error';
const Edit = lazy(() => import('../view/editUserInfo/editPage'))
// 路由懒加载
const lazyComponent = (Element: ReactElement) => {
    return <Suspense fallback={<Loading />}>{Element}</Suspense>;
  };
const publicRoute = [
    {
        name: '登录',
        path: '/blog/login',
        element: <Login />
    },
    {
        name: '注册',
        path: '/blog/register',
        element: <Register />
    },
    {
        name: '404',
        path: '*',
        element: <Error />
    },
    
]



export default publicRoute