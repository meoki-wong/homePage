import React, { useEffect, useState, useRef } from "react";
import { socketIo } from "../utils/newSocket";
import "./chatPage.scss";
import { Input, message } from "antd";
import { Location, useLocation } from "react-router-dom";
import { SelectItem, chatItem } from "../interface/SelectItem";
import { sendUserMessage, getUserMessage } from "@/view/utils/indexDBMethods";
import { htmlUserFn, htmlFn } from "../utils/optHtmlFn";
export default function ChatPage() {
  // const inputRef:any = useRef()
  const { TextArea } = Input;
  const [content, setContent] = useState<string>("");
  // const [initSocket, setInitSocket] = useState<any>({});
  const location: Location = useLocation();
  let routeState = location.state as SelectItem;

  const [headerImgs, serHeaderImg] = useState<string>("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
  useEffect(() => {
    routeState = location.state as SelectItem;
    socketIo.getSocketId(routeState.id);
    serHeaderImg(userInfo.allUser.headerImg);
    new Promise(resolve=>{
      resolve(getUserMessage())
    }).then((res)=>{
      (res as Array<chatItem>)?.map(element => {
        if(element.friendEnd){
          htmlFn({headerImg: ''}, element.friendEnd)
        } else {
          htmlUserFn(element.userEnd, headerImgs)
        }
      });
      console.log('----getUserMessage()', res);
    })
  }, [routeState.id]);

  const inputVal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const sendMsg = () => {
    if (!content.trim()) {
      // 禁止输入空内容
      message.warning("禁止输入空白内容");
      return;
    }
    const sendMsgInfo = {
      userId: JSON.parse(localStorage.getItem("userInfo")!).id,
      friendId: routeState.id,
      sendMsg: content,
    };
    socketIo.sendSingleMsg(sendMsgInfo);
    sendUserMessage("", content);
    htmlUserFn(content, headerImgs)
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
