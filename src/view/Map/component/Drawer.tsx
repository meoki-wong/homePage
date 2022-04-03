import React, { useEffect, useState } from "react";
import { Drawer, Button, Space, Divider, Select, Input } from "antd";
import initMap from "../../components/map/control/map";
import { Provider } from '../utils/useContext'
import "../assets/css/Drawer.scss";
import BusRoute from "./BusRoute";
import AreaPoint from "./AreaPoint";
const DrawerContain = () => {
  const [initMaps, setInitMaps] = useState<any>();

  useEffect(() => {
    setInitMaps(new initMap());
  }, []);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={showDrawer}>
          显示操作区
        </Button>
      </Space>
      <Drawer
        title="地图查询区域"
        placement={"right"}
        width={500}
        mask={false}
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <Button onClick={onClose}>关闭</Button>
          </Space>
        }
      >
        <Provider value={initMaps}>
          <Divider plain>城市公交线路查询</Divider>
          <BusRoute />
          <Divider plain>地点查询</Divider>
          <AreaPoint />
        </Provider>
        
      </Drawer>
    </>
  );
};

export default DrawerContain;
