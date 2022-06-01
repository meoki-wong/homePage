import React, { useEffect, useState, useRef } from "react";
import Socket from "../chat";
import "./chatPage.scss";
import { Input } from "antd";

export default function ChatPage(props: any) {
  // const inputRef:any = useRef()
  const { TextArea } = Input;
  const [content, setContent] = useState<string>('');
  const [initSocket, setInitSocket] = useState<any>({});

  const inputVal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const sendMsg = () => {
    if(!content.trim()){
      return
    }
    initSocket.sendMsg(content);
    let selfHtml = document.createElement("div");
    selfHtml.setAttribute("class", "self-frame");
    selfHtml.innerHTML = `
          <p class="inner-msg">${content}</p>
          <img src="${require("../../assets/image/login_bg.png")}" alt="" />`;
    document.getElementsByClassName("msg-area")[0].append(selfHtml);
    setContent('')
  };
  useEffect(() => {
    setInitSocket(new Socket());
  }, []);
  return (
    <div className="chat-page">
      <div className="friend-name">{"阿斯顿撒"}</div>
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
