import React, { useEffect, useState } from "react";
import { Drawer, Button, Space } from "antd";
import { Select } from "antd";
import axios from "axios";
import initMap from "../../components/map/control/map";

/**
 * @param name 省会
 * @param city 城市集合
 */
interface city {
  name: string;
  city: string;
}
interface secondCity {
  [key: string]: Array<string>;
}
/**
 * @param 省会响应数据
 */
type proviceArray = Array<string>;

let proviceList: Array<string> = [];
let cityObj: secondCity = {};
const DrawerContain = () => {
  let { Option } = Select;
  let [initMaps, setInitMaps] = useState<any>();
  let [inputVal, setInputVal] = useState<string>();

  // 需要联动选择后的单个数据
  const [cities, setCities] = useState<string>("");
  const [secondCity, setSecondCity] = useState<string>();

  // 省市组件需要的数据集合
  const [provice, setProvice] = useState<proviceArray>([]);
  const [city, setCity] = useState<secondCity>({});

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  useEffect(() => {
    getAreaData();
    setInitMaps(new initMap());
  }, []);
  useEffect(() => {
    // 做数据监听 useState赋值同步
  }, [cities, secondCity]);

  let getAreaData = () => {
    axios.get("/getArea").then((res) => {
      res.data.data.map((item: city) => {
        proviceList.push(item.name);
        cityObj[item.name] = JSON.parse(item.city);
      });
      setProvice(proviceList);
      setCity(cityObj);
      setCities(proviceList[0]);
      setSecondCity(city[proviceList[0]][0]);
    });
  };
  let inputBus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };
  let search = () => {
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
    <>
      <Space>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </Space>
      <Drawer
        title="Drawer with extra actions"
        placement={"right"}
        width={500}
        mask={false}
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <Space>
          <input type="text" onChange={(e) => inputBus(e)} />
          <input id="input_id" type="text" />
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
          <button onClick={search}>查询</button>
        </Space>
      </Drawer>
    </>
  );
};

export default DrawerContain;
