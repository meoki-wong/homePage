import React, { Component, FC } from "react";
import { notification, Input, Tabs, Modal } from "antd";
import { UserOutlined, TeamOutlined, UserAddOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import Socket from "./chat";
import FriendList from "./components/friendList";
import SearchModal from "./components/SearchModal";
import './chatRoom.scss'
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
    name: "群聊列表",
    icon: <TeamOutlined />,
    component: "",
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
  showAddFriend = ()=>{
    this.myRef.current.showModal()
  }
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
            <UserAddOutlined className="add-btn" onClick={this.showAddFriend}/>
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
