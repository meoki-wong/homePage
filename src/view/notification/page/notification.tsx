import React, { useEffect, useState } from "react";
import "./notification.less";
import { request } from "@/api/request";
import { message } from "antd";
import Flag from "../../assets/image/hippo.png"
type Message = Array<MessageItem>;
interface MessageItem {
  userName: string;
  msgType: number;
  fromUserId: number;
}
export default function Notification() {
  const [messages, setMessages] = useState<Message>([]);
  useEffect(() => {
    getData()
  }, []);
  const getData = () => {
    request.post("/privateMessage").then((res) => {
      setMessages(res.data.data.msgItem);
    });
  }
  // 同意
  const handleConfirm = (item: MessageItem) => {
    console.log('------', item);
    request
      .post("/agreeFriendApply", {
        friendId: item.fromUserId,
      })
      .then((res) => {
        if (res.data.success) {
          getData()
          message.success("添加成功");
        }
      });
  };
  // 拒绝
  const handleCancel = () => {};
  const NotifierComponent = (item: MessageItem, index: number) => {
    if (item.msgType === 1) {
      return <div className="notifier-item" key={index}>
        <img
          className="header"
          src={Flag}
          alt=""
        />
        <div className="message-content">
          {item.userName}请求添加你为好友，是否同意？
        </div>

        <div className="opt-area">
          <div className="agree-btn" onClick={() => handleConfirm(item)}>
            同意
          </div>
          <div className="refuse-btn" onClick={handleCancel}>
            拒绝
          </div>
        </div>
      </div>;
    } else if(item.msgType === 2){
      return <div className="notifier-item" key={index}>
        <img
          className="header"
          src={Flag}
          alt=""
        />
        <div className="message-content">
          已经成功将{item.userName}添加为你的好友，开始聊天吧~
        </div>
        </div>
    }
  };
  return (
    <div className="notifier-container">
      {messages?.map((item: MessageItem, index) => NotifierComponent(item, index)
      )}
      {!messages.length && (
        <div className="notifier-item">
          <div className="message-content text-center">暂无消息~</div>
        </div>
      )}
    </div>
  );
}
