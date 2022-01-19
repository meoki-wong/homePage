
import React, {useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {Breadcrumb} from 'antd'
// function itemRender(route: any, params: any, routes: any, paths: any) {
//     const last = routes.indexOf(route) === routes.length - 1;
//     return last ? (
//       <span>{route.breadcrumbName}</span>
//     ) : (
//       <Link to={paths.join('/')}>{route.path}</Link>
//     );
//   }



export default function BreadCrumb(props: any){
  // return (
  //   <Breadcrumb itemRender={itemRender} routes={routeList}/>
  // )
  let {pathname} = useLocation()
  useEffect(()=>{
    let routePathArr = pathname.split('/')
    routePathArr.shift()
  },[pathname])

  return (
    <Breadcrumb>
       {pathname.split('/').map((item, index)=> {
       return <Breadcrumb.Item key={item}>
         <Link to={pathname.split('/').slice(2,index+1).join('/')}>{item}</Link>
       </Breadcrumb.Item>
      })}
    </Breadcrumb>
  )
}