import React, { useEffect, useState, useRef } from "react";
import {socketIo} from "../utils/newSocket";
import "./chatPage.scss";
import { Input, message } from "antd";
import { Location, useLocation } from "react-router-dom";
import { SelectItem, SendMsgInfo } from '../interface/SelectItem'
import userStore from "../../../store/store/userInfoStore";
export default function ChatPage(props: any) {
  // const inputRef:any = useRef()
  const { TextArea } = Input;
  const [content, setContent] = useState<string>("");
  // const [initSocket, setInitSocket] = useState<any>({});
  const location: Location = useLocation()
  const routeState = location.state as SelectItem
  const [headerImgs, serHeaderImg] = useState<string>("")
  const userInfo = JSON.parse((localStorage.getItem('userInfo')!))
  useEffect(()=>{
    socketIo.getSocketId(routeState.id)
    serHeaderImg(userInfo.allUser.headerImg)
  }, [])

  const inputVal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const sendMsg = () => {
    if (!content.trim()) { // 禁止输入空内容
      message.warning('禁止输入空白内容')
      return;
    }
    const sendMsgInfo = {
      userId: JSON.parse(localStorage.getItem('userInfo')!).id,
      friendId: routeState.id,
      sendMsg: content
    }
    socketIo.sendSingleMsg(sendMsgInfo);
    let selfHtml = document.createElement("div");
    selfHtml.setAttribute("class", "self-frame");
    selfHtml.innerHTML = `
          <p class="inner-msg">${content}</p>
          <img src="${headerImgs}" alt="" />`;
    document.getElementsByClassName("msg-area")[0].append(selfHtml);
    const areaHeight = document.querySelector('.msg-area') as HTMLElement
    areaHeight.scrollTo(0, areaHeight.scrollHeight);
    setContent("");
  };
  return (
    <div className="chat-page">
      <div className="friend-name">{routeState.userName}</div>
      <div className="msg-area">{/* 聊天区 */}</div>
      <div className="msg-opt">
        <div className="option-area">
          <div className="send-btn" onClick={sendMsg}>
            发送
          </div>
        </div>
        <TextArea
          id="input-box"
          placeholder="请输入内容"
          bordered={false}
          onChange={inputVal}
          onPressEnter={sendMsg}
          value={content}
        />
      </div>
    </div>
  );
}
