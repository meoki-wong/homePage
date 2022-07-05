import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./friendList.scss";
import { request } from "../../../api/request";
import { SelectItem } from "../interface/SelectItem";
import { socketIo } from "../utils/newSocket";
type FriendList = Array<object>;

function FriendList() {
  let navigate = useNavigate();
  let { socket } = socketIo;
  let [friendList, setFriendList] = useState<FriendList>();
  useEffect(() => {
    getFriendList();
  }, []);
  useEffect(() => {
    socket.on("addFriendSuccess", () => {
      getFriendList();
    });
    socket.on("userStatus", (item: any) => {
      console.log("---item", item);
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
                  src={require("../../assets/image/user_header.jpeg")}
                  alt=""
                />
              </div>
              <div className="item-desc">
                <div className="name">
                  {item.userName}
                  <span className="user-number">（{item.user_number}）</span>
                </div>
                <div className="desc">{"你夸撒大声地"}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FriendList;
