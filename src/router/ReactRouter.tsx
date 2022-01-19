import React from "react";
import { useRoutes } from "react-router-dom";
// import WrapComps from "./NavigateRouter";
import routeList from "./routeList";
import publicRouterList from './publicRouterList'


export default function ReactRouter(props: any) {
  return useRoutes(routeList.concat(publicRouterList));

  // return (
  //     <BrowserRouter>

  //         <Routes>
  //             {/* <Route path={"/test"} element={<WrapComps el={Test}/>}></Route>
  //             <Route path={"/Test2"} element={<WrapComps el={Test2}/>}></Route> */}
  //             <Route path={'/home'} element={<Home />}/>
  //             <Route path={"/test"} element={<Test/>} />
  //             <Route path={"/test2"} element={<Test2/>} />
  //         </Routes>
  //     </BrowserRouter>
  // )
}
