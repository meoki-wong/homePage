import React, { useState } from "react";
import { Select, Input } from "antd";
export default function AreaPoint(props: any) {
  const { Search } = Input;
  const [inputVal, setInputVal] = useState<string>();
  const searchPosition = () => {
    props.initMaps.searchPOI(inputVal);
  };
  let inputBus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };
  return (
    <>
      <Search
        id="input_id"
        onChange={(e) => inputBus(e)}
        placeholder="请输入查询地点"
        onSearch={searchPosition}
        style={{ width: 200 }}
      />
    </>
  );
}
