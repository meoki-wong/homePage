import React, { useState, useEffect, memo } from 'react'
import Map from '../components/map/Map'
import initMap from '../components/map/control/map'
import axios from "axios";
import { Select } from 'antd'

/**
 * @param name 省会
 * @param city 城市集合
 */
interface city {
  name: string,
  city: string
}
interface secondCity {
  [key: string]: Array<string>
}
/**
 * @param 省会响应数据
 */
type proviceArray = Array<string> 


let proviceList: Array<string> = []
let cityObj: secondCity = {}

function Index() {
  let { Option } = Select
  let [inputVal, setInputVal] = useState<string> ()
  let [initMaps, setInitMaps] = useState <any> ()

  // 需要联动选择后的单个数据
  const [cities, setCities] = useState<string>('');
  const [secondCity, setSecondCity] = useState<string>();
  
  // 省市组件需要的数据集合
  const [provice, setProvice] = useState<proviceArray>([])
  const [city, setCity] = useState<secondCity>({})

  useEffect(()=>{
    setInitMaps(new initMap()) 
    getAreaData()
  }, [])
  useEffect(()=>{
    // 做数据监听 useState赋值同步
  }, [cities, secondCity])

  let getAreaData = () => {
    axios.get('/getArea').then((res)=>{
      res.data.data.map((item: city) => {
          proviceList.push(item.name)
          cityObj[item.name] = JSON.parse(item.city)
      })
      setProvice(proviceList)
      setCity(cityObj)
      setCities(proviceList[0])
      setSecondCity(city[proviceList[0]][0])
    })
  }
  let inputBus = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setInputVal(e.target.value)
  }
  let search = ()=>{
    initMaps.searchBus(inputVal, secondCity)
  }
  const handleProvinceChange = (value: string) => {
    setCities(value);
    setSecondCity(city[value][0]);
  };
  
  const onSecondCityChange = (value: string) => {
    setSecondCity(value);
  };
  return (
    <div>
        <>
        <input type="text" onChange={e=>inputBus(e)}/>
        <input id="input_id" type="text"/>
        <Select  style={{ width: 120 }} value={cities} onChange={handleProvinceChange}>
        { provice.map(province => (
          <Option key={province}>{province}</Option>
        ))}
      </Select>
      <Select style={{ width: 120 }} value={secondCity} onChange={onSecondCityChange}>
        {city[cities] && city[cities].map(city => (
          <Option key={city}>{city}</Option>
        ))}
      </Select>
        <button onClick={search}>查询</button>
        <Map/>
        </>
    </div>
  )
}

export default memo(Index)