import React, { useEffect, useState } from "react";
import { Select, Input } from "antd";
import { request } from "../../../api/request";
import { Consumer } from "../utils/useContext";
import InitMaps from '../utils/InitMaps'
/**
 * @param name 省会
 * @param city 城市集合
 */
interface City {
  name: string;
  city: string;
}
interface SecondCity {
  [key: string]: Array<string>;
}

/**
 * @param 省会响应数据
 */
type ProviceArray = Array<string>;

let proviceList: Array<string> = [];
let cityObj: SecondCity = {};
export default function BusRoute() {
  const { Option } = Select;
  const { Search } = Input;
  const [inputVal, setInputVal] = useState<string>();

  // 需要联动选择后的单个数据
  const [cities, setCities] = useState<string>("");
  const [secondCity, setSecondCity] = useState<string>();

  // 省市组件需要的数据集合
  const [provice, setProvice] = useState<ProviceArray>([]);
  const [city, setCity] = useState<SecondCity>({});
  useEffect(() => {
    getAreaData();
  }, []);
  useEffect(() => {
    // 做数据监听 useState赋值同步
  }, [cities, secondCity]);
  let getAreaData = () => {
    request.get("/getArea").then((res) => {
      res.data.data.map((item: City) => {
        proviceList.push(item.name);
        cityObj[item.name] = JSON.parse(item.city);
      });
      setProvice(proviceList);
      setCity(cityObj);
      setCities(proviceList[0]);
      setSecondCity(cityObj[proviceList[0]][0]);
    });
  };
  let inputBus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };
  let search = (initMaps: InitMaps) => {
    initMaps.searchBus(inputVal, secondCity);
  };
  const handleProvinceChange = (value: string) => {
    setCities(value);
    setSecondCity(city[value][0]);
  };

  const onSecondCityChange = (value: string) => {
    setSecondCity(value);
  };
  return (
    <div className={"bus-func"}>
      <Consumer>
        {initMaps=>(
            <>
            <Select
          style={{ width: 120 }}
          value={cities}
          onChange={handleProvinceChange}
        >
          {provice.map((province) => (
            <Option key={province}>{province}</Option>
          ))}
        </Select>
        <Select
          style={{ width: 120 }}
          value={secondCity}
          onChange={onSecondCityChange}
        >
          {city[cities] &&
            city[cities].map((city) => <Option key={city}>{city}</Option>)}
        </Select>
        <Search
          onChange={(e) => inputBus(e)}
          placeholder="请输入公交线"
          onSearch={()=>search(initMaps)}
          style={{ width: 200 }}
        />
        </>
        )}
      </Consumer>
    </div>
  );
}
