import React, { Component, FC } from "react";
import { notification, Input, Tabs, Modal, Dropdown, Menu } from "antd";
import { UserOutlined, TeamOutlined, UserAddOutlined, PlusCircleOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import Socket from "./chat";
import FriendList from "./page/friendList";
import GroupList from "./page/groupList";
import SearchModal from "./page/SearchModal";
import './chatRoom.less'
interface InitSocket {
  initSocket: any;
  msgBox: Array<string | number>;
  inputVal: string | number;
  navigate?: Function;
}

const { TabPane } = Tabs;
// tabs
const tabsList = [
  {
    name: "好友列表",
    icon: <UserOutlined />,
    component: <FriendList />,
  },
  { 
    name: "群聊列表(开发中)",
    icon: <TeamOutlined />,
    component: <GroupList />,
  },
  {
    name: "测试内容",
    icon: <UserOutlined />,
    component: "",
  },
];


export default class ChatRooms extends Component {
  
  state: InitSocket = {
    initSocket: {},
    msgBox: [],
    inputVal: ""
  };
  myRef: any = React.createRef()
  // componentDidMount() {
  //   this.setState({initSocket: new Socket(this)})
  //   console.log('----');
  // }
  openNotification = (msg: string) => {
    notification.open({
      message: "提示",
      description: msg,
    });
  };
  showAddFriend = (type: number)=>{
    this.myRef.current.showModal(type)
    console.log('----创建', this.myRef)
  }
  menu =()=> (
    <Menu>
      {
        <Menu.Item key={1} onClick={()=>this.showAddFriend(1)}>
          <UserAddOutlined />添加好友
        </Menu.Item>
      }
      <Menu.Item key={2} onClick={()=>this.showAddFriend(2)}>
          <UsergroupAddOutlined />添加群组
        </Menu.Item>
    </Menu>
  );
  render() {
    return (
      <div className="chat-contain">
        <div className="contants">
          <div className="search">
            <Input
              size="large"
              placeholder="搜索用户"
              prefix={<UserOutlined />}
            />
            {/* <PlusCircleOutlined /> */}
            <Dropdown overlay={this.menu} placement="bottomLeft" arrow>
          {/* <span className="user-name">张三</span> */}
          <PlusCircleOutlined className="add-btn"/>
        </Dropdown>
            
            <div className="friend-tabs">
              <Tabs size="small" defaultActiveKey="0">
                {tabsList.map((item, index) => (
                  <TabPane
                    tab={
                      <span>
                        {item.icon}
                        {item.name}
                      </span>
                    }
                    key={index}
                  >
                    {item.component}
                  </TabPane>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
        <div className="chat-box">
          <Outlet />
        </div>
        
        <SearchModal ref={this.myRef}/>
        
      </div>
    );
  }
}
