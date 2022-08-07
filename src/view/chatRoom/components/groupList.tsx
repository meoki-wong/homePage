import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Badge } from 'antd'
import './groupList.scss'
function GroupList(props: any) {
    const [friendList, setFriendList] = useState([
        {
            id: 1,
            headerImg: '',
            userName: '121212',
            user_number: '123456',
            userOnlineStatus: {
                userStatus: false
            }
        }
    ])

    const chatGroup = (item: any) => {
        console.log('----群聊内容', item)
    }
  return (
    <div className="group-list-contain">
      <ul>
        {friendList?.map((item: any) => {
          return (
            <li
              key={item.id}
              className="contant-item"
              onClick={() => chatGroup(item)}
            >
              {/* <Badge count={props.getCount[item.UserId]?.msgCount || 0}> */}
                <div className="item-header">
                  <img
                    src={item.headerImg}
                    alt=""
                  />
                </div>
              {/* </Badge> */}
              
              <div className="item-desc">
                <div className="name">
                  {item.userName}
                  <span className="user-number">（{item.user_number}）</span>
                </div>
                <div className="desc">{item.selfIntroduce || '群公告~'}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        dispatch1: () => {
            dispatch()
        }
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        prop: state.prop
    }
}

export default connect(
    mapDispatchToProps,
    mapStateToProps

)(GroupList)