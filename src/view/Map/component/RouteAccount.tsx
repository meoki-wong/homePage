import React, { useEffect, useState } from "react";
import { Consumer } from "../utils/useContext";
import { Input, Radio } from "antd";
import InitMaps from "../utils/InitMaps";
import RouteStyl from '../assets/css/RouteAccount.module.scss'
type InputList = Array<object>
interface OptionObject {
    [key: number]: string
}
export default function RouteAccount() {
  const { Search } = Input;
  const [inputStartVal, setInputStartVal] = useState<string>('');
  const [inputEndVal, setInputEndVal] = useState<string>('');
  const [inputList, setInputList] = useState<InputList>([]);
  const [value, setValue] = useState<number>(1);
  let optionObject: OptionObject = {
      1: 'Walking',
      2: "Driving",
      3: "Riding",
      4: "Transfer"
  }
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  useEffect(()=>{
  }, [inputList])

  let inputStartRoute = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputStartVal(e.target.value);
    
  };
  let inputEndRoute = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputEndVal(e.target.value)
  }
  const searchPosition = (initMaps: InitMaps) => {
    setInputList(()=> [ ...[{keyword: inputStartVal}, {keyword: inputEndVal}]])
    initMaps.searchRouteAcc(inputList, optionObject[value])
  };
  return (
    <>
      <Consumer>
        {(initMaps) => (
          <div className={RouteStyl['route-func']}>
            <Radio.Group className={RouteStyl.radio_list} onChange={onChange} value={value}>
              <Radio value={1}>步行</Radio>
              <Radio value={2}>驾车</Radio>
              <Radio value={3}>骑行</Radio>
              <Radio value={4}>公交</Radio>
            </Radio.Group>
            <div className={RouteStyl.search_box}>
            <Input
              id="input_ids"
              onChange={(e) => inputStartRoute(e)}
              placeholder="请输入查询地点"
              style={{ width: 200 }}
            />
            ——
            <Search
              id="input_ids"
              onChange={(e) => inputEndRoute(e)}
              placeholder="请输入查询地点"
              onSearch={() => searchPosition(initMaps)}
              style={{ width: 200 }}
            />
            </div>
          </div>
        )}
      </Consumer>
    </>
  );
}
