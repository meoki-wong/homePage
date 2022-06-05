import React, { useEffect, useState } from "react";
import { Menu, Dropdown, Modal, Badge } from "antd";
import "./NavBar.scss";
import { useNavigate, useParams } from "react-router-dom";
import routeList from "../router/routeList";
import { socketIo } from '../view/chatRoom/utils/newSocket'
import { request } from "../api/request";
import {
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Store from '../store/store/index'
let { SubMenu } = Menu;
export default function LeftNav(props: Object) {
  let navigate = useNavigate();
  let [logMsg, setLogMsg] = useState<string>("登录/注册");
  let [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [reminder, setReminder] = useState<number>(0)
  useEffect(() => {
    //
    if (!window.localStorage.token) {
      setLogMsg("登录/注册");
    } else {
      setLogMsg("退出登录");
    }

    request.post('/privateMessage').then(res=>{
      console.log('-----res消息提示', res);
      setReminder(res.data.data.msgItem.length)
    })
    socketIo.getApplyMsg()
    Store.subscribe(()=>{
      console.log('获取值的内容', Store.getState());
      setReminder(Store.getState().value)
    })
  });
  const isLogin = () => {
    if (window.localStorage.token) {
      setIsModalVisible(true);
    } else {
      navigate("/dataAdmin/login");
    }
  };
  const handleConfirm = () => {
    localStorage.clear();
    setIsModalVisible(false);
  };

  const menu = (
    <Menu>
      {window.localStorage.token && <Menu.Item>{JSON.parse(localStorage.getItem('userInfo')!).userName}</Menu.Item>}
      <Menu.Item onClick={isLogin}>{logMsg}</Menu.Item>
    </Menu>
  );
  return (
    <div className="nav-bar">
      <div className="left-area">
        <div className="logo">
          <img src={require("../view/assets/image/Flag.png")} alt="" />
          <div className="title">SuperMeoki</div>
        </div>
        <Menu
          defaultSelectedKeys={[window.location.pathname]}
          defaultOpenKeys={[routeList[0].path]}
          mode="horizontal"
          inlineCollapsed={false}
        >
          {routeList.map((item, index) => {
            if (item.children) {
              return (
                <SubMenu key={index} icon={<MailOutlined />} title={item.name}>
                  {item.children.map((ite: any, idx: number) => (
                    <Menu.Item key={idx} onClick={() => navigate(ite.path)}>
                      {ite.name}
                    </Menu.Item>
                  ))}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item
                  key={index}
                  icon={<PieChartOutlined />}
                  onClick={() => navigate(item.path)}
                >
                  {item.name}
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </div>
      <div className="user-info">
        <div className="notify">
          <Badge count={reminder}>
            <i className="iconfont icon-notify"></i>
          </Badge>
        </div>

        <Dropdown overlay={menu} placement="bottomLeft" arrow>
          {/* <span className="user-name">张三</span> */}
          <div className="user-header">
            <img src={require("../view/assets/image/user_header.jpeg")} />
          </div>
        </Dropdown>
      </div>

      <Modal
        title="提示"
        visible={isModalVisible}
        onOk={handleConfirm}
        onCancel={() => setIsModalVisible(false)}
        okText="确认"
        cancelText="取消"
      >
        <p>确定要离开吗？</p>
      </Modal>
      {/* <Menu
              defaultSelectedKeys={[window.location.pathname]}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="dark"
              inlineCollapsed={false}
            >
              <Menu.Item key="1" icon={<PieChartOutlined />} onClick={()=>navigate('/home/test2')}>
                Option 1
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />} onClick={()=>navigate('/home/details')}>
                Option 2
              </Menu.Item>
              <Menu.Item key="3" icon={<ContainerOutlined />}>
                Option 3
              </Menu.Item>
              <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="11">Option 11</Menu.Item>
                  <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
              </SubMenu>
            </Menu> */}
    </div>
  );
}
