import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { Badge } from 'antd'
import AddGroupModel from '../components/AddGroupModel'
import './groupList.scss'
import { request } from '@/api/request'
function GroupList(props: any) {
  let navigate = useNavigate();
    const [groupList, setGroupList] = useState([])
    const addGroupRef = useRef<any>()
    useEffect(()=>{
      getUserGroup()
    }, [])
    const getUserGroup = async ()=>{
      let res = await request.post('/getGroups')
      if(res.data.success){
        setGroupList(res.data.data)
      }
    }
    const chatGroup = (item: any) => {
      navigate(`/dataAdmin/ChartRoom/group`, {
        state: {
          groupId: item.groupId,
          groupName: item.groupName,
          headerImg: item.groupImage
        },
      });
    }
    const addGroup = () => {
      addGroupRef.current.showModal()
    }
  return (
    <div className="group-list-contain">
      <div className="opt-area">
        <p onClick={()=>addGroup()}>点击创建群组</p>
      </div>
      <ul className='group-box'>
        {groupList?.map((item: any) => {
          return (
            <li
              key={item.id}
              className="contant-item"
              onClick={() => chatGroup(item)}
            >
              {/* <Badge count={props.getCount[item.UserId]?.msgCount || 0}> */}
                <div className="item-header">
                  <img
                    src={item.groupImage}
                    alt=""
                  />
                </div>
              {/* </Badge> */}
              
              <div className="item-desc">
                <div className="name">
                  {item.groupName}
                  <span className="user-number">（{item.groupNumber}）</span>
                </div>
                <div className="desc">{item.groupAnnouncement || '暂无群组公告~'}</div>
              </div>
            </li>
          );
        })}
      </ul>
      <AddGroupModel ref={addGroupRef} getUserGroup={getUserGroup}/>
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