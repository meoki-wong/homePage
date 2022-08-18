import React, { useEffect, useState } from "react";
import { socketIo } from "../utils/newSocket";
import "./chatPage.scss";
import { Input, message } from "antd";
import { Location, useLocation } from "react-router-dom";
import { SelectGroupItem } from "../type/selectItem";
import { htmlUserFn, htmlFn } from "../utils/optHtmlFn";
export default function ChatPage() {
  const { TextArea } = Input;
  const [content, setContent] = useState<string>("");
  const location: Location = useLocation();
  let routeState = location.state as SelectGroupItem;

  const [headerImgs, setHeaderImg] = useState<string>("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
  const userId: number = JSON.parse(localStorage.getItem("userInfo")!).id
  useEffect(() => {
    routeState = location.state as SelectGroupItem;
    // socketIo.getSocketId(routeState.id);
    setHeaderImg(userInfo.allUser.headerImg);
    // 初始化获取用户存储的聊天记录 （仅限本地  离线消息待开发）
    // new Promise(resolve=>{
    //   resolve(getUserMessage({
    //     friendId: routeState.id,
    //     userId
    //   }))
    // }).then((res)=>{
    //   (document.querySelector('.msg-area')!).innerHTML = ""; // 初始化消息
    //   (res as Array<ChatItem>)?.map((element: ChatItem) => {
    //     // if(routeState.id == element.friendId){
    //       if(element.friendEnd){
    //         htmlFn({headerImg: routeState.headerImg}, element.friendEnd)
    //       } else {
    //         htmlUserFn(element.userEnd, userInfo.allUser.headerImg)
    //       }
    //     // }
    //   });
    // })
  }, [routeState.groupId]);

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
      groupId: routeState.groupId,
      sendMsg: content,
      headerImg: headerImgs,
      userName: userInfo.userName
    };
    socketIo.sendGroupMsg(sendMsgInfo);
    // sendUserMessage({
    //   userId: userId,
    //   friendId: routeState.id,
    //   sendMsg: ''
    // }, content);
    htmlUserFn(content, headerImgs)
    setContent("");
  };
  return (
    <div className="chat-page">
      <div className="friend-name">{routeState.groupName}</div>
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
