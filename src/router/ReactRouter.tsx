import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
// import WrapComps from "./NavigateRouter";
import Test from "../test";
import Test2 from '../test2'
import Home from '../home'
 export default function ReactRouter (props: any) {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path={"/test"} element={<WrapComps el={Test}/>}></Route>
                <Route path={"/Test2"} element={<WrapComps el={Test2}/>}></Route> */}
                <Route path={'/home'} element={<Home />}/>
                <Route path={"/test"} element={<Test/>} />
                <Route path={"/test2"} element={<Test2/>} />
            </Routes>
        </BrowserRouter>
    )
}

