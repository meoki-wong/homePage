import React, { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import "./friendList.scss";
import { request } from "@/api/request";
import { SelectItem } from "../interface/SelectItem";
import { socketIo } from "../utils/newSocket";
type FriendList = Array<object>;

function FriendList() {
  let navigate = useNavigate();
  let { socket } = socketIo;
  let [friendList, setFriendList] = useState<FriendList>([]);
  useEffect(() => {
    getFriendList();
  }, []);
  useEffect(() => {
    socket.on("addFriendSuccess", () => {
      getFriendList();
    });
    // 是否在线
    socket.on("userStatus", (item: any) => {
      console.log("---item", item);
    });
    // socketIo.quitItem(list)
    socket.on("quitItem", (quitItem: any) => {
      if(quitItem && friendList.length){
        let statusDom = document.querySelector(`.user-status-${quitItem}`) as HTMLElement
        statusDom.style.backgroundColor = 'green'
      }
      // document.getElementsByClassName(`user-status-${quitItem}`)[0].style.backgroundColor = 'green'
      
    });
  });
  const getFriendList = () => {
    request
      .post("/getFirends", {
        userId: JSON.parse(localStorage.getItem("userInfo")!).id,
      })
      .then((res) => {
        setFriendList(res.data.list);
      });
  };
  const chatFriends = (item: SelectItem) => {
    navigate(`/dataAdmin/ChartRoom/friend`, {
      state: {
        id: item.id,
        userName: item.userName,
      },
    });
  };
  return (
    <div className="friend-list">
      <ul>
        {friendList?.map((item: any) => {
          return (
            <li
              key={item.id}
              className="contant-item"
              onClick={() => chatFriends(item)}
            >
              <div className="item-header">
                <img
                  src={item.headerImg}
                  alt=""
                />
              </div>
              <div className="item-desc">
                <div className="name">
                  {item.userName}
                  <span className="user-number">（{item.user_number}）</span>
                  <span className={`user-status-box `}>
                    <i className={`user-status-${item.UserId}`}></i>{'离线'}
                  </span>
                </div>
                <div className="desc">{item.selfIntroduce || '他很懒，啥都没写~'}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default memo(FriendList);
