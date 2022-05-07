import React, { Component, FC } from "react";
import { notification } from "antd";
import {Outlet, useNavigate} from 'react-router-dom'
import Socket from './chat'
import FriendList from './components/friendList'
import './chatRoom.scss'
interface InitSocket {
  initSocket: any;
  msgBox: Array<string | number>;
  inputVal: string | number;
  navigate?: Function
}
export default class ChatRooms extends Component {
  
  state: InitSocket = {
    initSocket: {},
    msgBox: [],
    inputVal: "",
  };
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
  
  render() {
    return (
      <div className="chat-contain">
        {/* {this.state.msgBox.map((item: string | number, index: number) => {
          return <div key={index}>{item}</div>;
        })}
        <input type="text" id="responseText" onChange={(e) => this.getVal(e)} />
        <button onClick={this.sendMsg}>发送</button> */}

        <div className="contants">
          <div className="search">

          </div>
          <FriendList />
        </div>
        <div className="chat-box">
          <Outlet />
        </div>

      </div>
    );
  }
}
