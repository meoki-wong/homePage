import React, { useState } from "react";
import { Consumer } from "../utils/useContext";
import { Input, Radio } from "antd";
import InitMaps from "../utils/InitMaps";
import RouteStyl from '../assets/css/RouteAccount.module.scss'
export default function RouteAccount() {
  const { Search } = Input;
  const [inputVal, setInputVal] = useState<string>();

  const [value, setValue] = React.useState(1);

  const onChange = (e: any) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  let inputRoute = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };
  const searchPosition = (initMaps: InitMaps) => {
    console.log("------>查询数组", initMaps.searchRouteAcc(inputVal));
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
            <Search
              id="input_id"
              onChange={(e) => inputRoute(e)}
              placeholder="请输入查询地点"
              onSearch={() => searchPosition(initMaps)}
              style={{ width: 200 }}
            />
          </div>
        )}
      </Consumer>
    </>
  );
}
