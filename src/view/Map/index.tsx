import React, { useState, useEffect } from 'react'
import Map from '../components/map/Map'
import initMap from '../components/map/control/map'
export default function Index() {

  let [inputVal, setInputVal] = useState('')
  let [initMaps, setInitMaps] = useState<any>()
  useEffect(()=>{
    setInitMaps(new initMap()) 
  }, [])
  
  let inputBus = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setInputVal(e.target.value)
  }
  let search = ()=>{
    initMaps.searchBus(inputVal)
  }
  return (
    <div>
        <>
        <input type="text" onChange={e=>inputBus(e)}/>
        <button onClick={search}>查询</button>
        <Map/>
        </>
    </div>
  )
}
