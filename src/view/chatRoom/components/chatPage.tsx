import React, { useEffect, useState } from "react";
import Socket from "../chat";
import "./chatPage.scss";
import { Input } from "antd";

type MsgList = Array<string | number>;
export default function ChatPage(props: any) {
  const { TextArea } = Input;
  const [content, setContent] = useState<string | number>();
  const [initSocket, setInitSocket] = useState<any>({});

  const inputVal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const sendMsg = () => {
    initSocket.sendMsg(content);
    let selfHtml = document.createElement('div')
    selfHtml.setAttribute('class', 'self-frame')
    selfHtml.innerHTML = `
          <p class="inner-msg">${content}</p>
          <img src="${require('../../assets/image/login_bg.png')}" alt="" />`
    document.getElementsByClassName('msg-area')[0].append(selfHtml)
  };
  useEffect(() => {
    setInitSocket(new Socket());
    
  }, []);
  return (
    <div className="chat-page">
      <div className="friend-name">{"阿斯顿撒"}</div>
      <div className="msg-area">
        {/* 聊天区 */}
      </div>
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
        />
      </div>
    </div>
  );
}
