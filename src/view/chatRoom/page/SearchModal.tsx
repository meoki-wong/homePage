import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Input, message } from "antd";
import { UserOutlined, UsergroupAddOutlined, CheckCircleFilled } from "@ant-design/icons";
import { request } from '@/api/request'
import "./SearchModal.less";
import UserHeader from '../../assets/image/user_header.jpeg'
interface FriendItem {
  userName: string,
  UserId: number,
  selfIntroduce: string
}
function SearchModal(props: any, ref: any) {
  const { Search } = Input;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [searchVal, setSearchVal] = useState<number | string>()
  const [searchFriend, setSearchFriend] = useState<FriendItem>()
  const [searchType, setSearchType] = useState<number>(1) // 搜索类型 1 好友 2 群组
  useImperativeHandle(ref, () => {
    // 暴露子组件方法供父组件调用
    return {
      showModal(type: number) {
        setSearchType(type)
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
    request.post('/searchFriend', {
      searchUserNum: searchVal,
      searchType
    }).then(res=>{
      if(res && res.data.success){
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
        title={searchType === 1? "搜索好友" : "搜索群组"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
      >
        <Search
          onSearch={onSearch}
          enterButton
          size="large"
          placeholder={searchType === 1? "搜索好友" : "搜索群组"}
          allowClear
          prefix={<UserOutlined />}
          value={searchVal}
          onChange={getInputVal}
        />
        {searchFriend && <ul>
          <li className="modal-item">
            <div className="item-header">
              <img
                src={UserHeader}
                alt=""
              />
            </div>
            <div className="item-desc">
              <div className="name">{searchFriend.userName}</div>
              <div className="desc">{searchFriend.selfIntroduce}</div>
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
