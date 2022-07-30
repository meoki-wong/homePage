import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Input, message } from "antd";
import { UserOutlined, UsergroupAddOutlined, CheckCircleFilled } from "@ant-design/icons";
import { request } from '@/api/request'
import "./SearchModal.scss";
interface FriendItem {
  userName: string,
  UserId: number
}
function SearchModal(props: any, ref: any) {
  const { Search } = Input;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [searchVal, setSearchVal] = useState<number | string>()
  const [searchFriend, setSearchFriend] = useState<FriendItem>()
  useImperativeHandle(ref, () => {
    // 暴露子组件方法供父组件调用
    return {
      showModal() {
        setIsModalVisible(true);
      },
    };
  });
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setSearchVal(undefined)
  };
  const getInputVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value)
  }
  const onSearch = () => {
    console.log('-------searchVal', searchVal)
    request.post('/searchFriend', {
      searchUserNum: searchVal
    }).then(res=>{
      if(res && res.data.success){
        console.log('====13123', res.data.data)
        setSearchFriend(res.data.data || null)
      } 
    })
  }
  const sendApply = (itemId: number ) => {
    request.post('/appleFriend', {
      friendId: itemId
    }).then(res=>{
      if(res && res.data.success){
        message.success(res.data.message)
      }
    })
  }
  return (  
      <Modal
        title="搜索好友"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
      >
        <Search
          onSearch={onSearch}
          enterButton
          size="large"
          placeholder="搜索用户"
          allowClear
          prefix={<UserOutlined />}
          value={searchVal}
          onChange={getInputVal}
        />
        {searchFriend && <ul>
          <li className="modal-item">
            <div className="item-header">
              <img
                src={require("../../assets/image/user_header.jpeg")}
                alt=""
              />
            </div>
            <div className="item-desc">
              <div className="name">{searchFriend.userName}</div>
              <div className="desc">{"你夸撒大声地"}</div>
              <div className="add-btn" onClick={()=>sendApply(searchFriend.UserId)}>
                <UsergroupAddOutlined className="add-icon"/>
                {/* <CheckCircleFilled className="add-icon add-ok"/> */}
              </div>
            </div>
            
          </li>
        </ul>}
        {!searchFriend && (
          <ul>
          <li className="modal-item">
            <p className="no-tips">暂无内容</p>
          </li>
        </ul>
        )}
      </Modal>
  );
}

export default forwardRef(SearchModal);
