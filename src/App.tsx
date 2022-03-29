import React, {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import UseRoute from './router/UseRoute'
function App(store: any) {
  let {pathname} = useLocation()
  useEffect(()=>{
  }, [pathname])
  return (
    <div style={{width:"100%", height: '100%'}}>
      <UseRoute />
    </div>
  )
}

export default App
