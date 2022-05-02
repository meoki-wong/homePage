import React, { Component } from "react";
import { notification } from "antd";
import io from 'socket.io-client'
import Socket from './chart'
interface InitSocket {
  initSocket: any;
  msgBox: Array<string | number>;
  inputVal: string | number;
}
export default class ChartRooms extends Component {
  state: InitSocket = {
    initSocket: {},
    msgBox: [],
    inputVal: "",
  };
  componentDidMount() {
    this.setState({initSocket: new Socket(this)})
  }
  openNotification = (msg: string) => {
    notification.open({
      message: "提示",
      description: msg,
    });
  };
  getVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputVal: e.target.value });
  };
  sendMsg = () => {
    let {initSocket, inputVal} = this.state
    initSocket.sendMsg(inputVal)
  };
  render() {
    return (
      <div>
        {this.state.msgBox.map((item: string | number, index: number) => {
          return <div key={index}>{item}</div>;
        })}
        <input type="text" id="responseText" onChange={(e) => this.getVal(e)} />
        <button onClick={this.sendMsg}>发送</button>
      </div>
    );
  }
}
