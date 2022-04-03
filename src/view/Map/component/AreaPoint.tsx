import React, { useState } from "react";
import { Input } from "antd";
import { Consumer } from "../utils/useContext";
import InitMaps from '../utils/InitMaps'


export default function AreaPoint() {
  const { Search } = Input;
  const [inputVal, setInputVal] = useState<string>();
  const searchPosition = (initMaps: InitMaps) => {
    initMaps.searchPOI(inputVal);
  };
  let inputBus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };
  return (
    <>
      <Consumer>
        {(initMaps) => (
          <>
            <Search
              id="input_id"
              onChange={(e) => inputBus(e)}
              placeholder="请输入查询地点"
              onSearch={()=>searchPosition(initMaps)}
              style={{ width: 200 }}
            />
          </>
        )}
      </Consumer>
    </>
  );
}
