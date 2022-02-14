import React, {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import UseRoute from './router/UseRoute'
function App(store: any) {
  let {pathname} = useLocation()
  useEffect(()=>{
    console.log('----->pathname', pathname);
  }, [pathname])
  return (
    <>
      <UseRoute />
    </>
  )
}

export default App
