import React, { Component } from "react";

interface InitSocket {
    initSocket: any,
    msgBox: any,
    inputVal: string
}
export default class ChartRooms extends Component {
  state: InitSocket = {
    initSocket: {},
    msgBox: [],
    inputVal: "",
  };
  componentDidMount(){
      this.initChat()
  }
  initChat = () => {
    let _this = this;
    let socket;
    let msgList: any = _this.state.msgBox
    // if (!window.WebSocket) {
    // 	window.WebSocket = window.MozWebSocket;
    // }
    let ta = document.getElementById("responseText") as HTMLInputElement;
    if (window.WebSocket) {
      socket = new WebSocket("ws://localhost:10021");
      socket.onmessage = function (event) {
        var reader = new FileReader()
        reader.readAsText(event.data)
        reader.onload = function(e){
          msgList.push(reader.result)
        _this.setState({ msgBox: msgList });
        }
        
      };
      socket.onopen = function (event) {
        ta.value = "连接开启!";
      };
      socket.onclose = function (event) {
        ta.value = ta.value + "连接被关闭";
      };
    } else {
      alert("你的浏览器不支持 WebSocket！");
    }
    this.setState({ initSocket: socket });
  };

  getVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({inputVal: e.target.value})
}
  sendMsg = () =>{
    this.state.initSocket.send(this.state.inputVal);
}
  render() {
    return (
      <div>
        {this.state.msgBox.map((item: string, index: number) => {
          return <div key={index}>{item}</div>;
        })}
        <input type="text" id="responseText" onChange={(e) => this.getVal(e)} />
        <button onClick={this.sendMsg}>发送</button>
      </div>
    );
  }
}
