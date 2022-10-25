import React, { useEffect, useState } from "react";
import { Menu, Dropdown, Modal, Badge } from "antd";
import "./NavBar.less";
import { useNavigate, useParams } from "react-router-dom";
import routeList from "../router/routeList";
import { socketIo } from "../view/chatRoom/utils/newSocket";
import { request } from "../api/request";
import userInfoStore from "@/store/store/userInfoStore";
import Flag from "../view/assets/image/hippo.png"
import {
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Store from "../store/store/index";
import EditPersonInfo from "../view/personInfo/page/editPersonInfo";
import { connect } from "react-redux";
let { SubMenu } = Menu;
type UserInfo = {
  userName: string;
  headerImg: string;
};
function LeftNav(props: any) {
  let navigate = useNavigate();
  let [logMsg, setLogMsg] = useState<string>("登录/注册");
  let [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>(Object);
  useEffect(() => {
    if (!window.localStorage.token) {
      setLogMsg("登录/注册");
    } else {
      setLogMsg("退出登录");
    }

    // 存储全局用户信息数据  存在  则不会重新请求展示
    if(!userInfo.userName){
      if (window.localStorage.getItem("token")) {
        // 登录情况下获取用户信息  刷新也会重新进行获取
        request.post("/getUserInfo").then((res) => {
          if (res.data.success) {
            setUserInfo(res.data.data);
            props.getUserInfoDispatch(res.data.data)
          }
        });
      }
    }
    socketIo.getApplyMsg();
    
  }, []);
  const isLogin = () => {
    if (window.localStorage.token) {
      setIsModalVisible(true);
    } else {
      props.getUserInfoDispatch({})
      navigate("/login");
    }
  };
  const handleConfirm = () => {
    socketIo.logout()
    localStorage.clear();
    setIsModalVisible(false);
  };
  const checkUserInfo = () => {
    navigate("/edit/editUserInfo");
  };
  const menu = (
    <Menu>
      {window.localStorage.token && (
        <Menu.Item key={'1'} onClick={checkUserInfo}>
          {userInfo.userName}
        </Menu.Item>
      )}
      <Menu.Item key={'2'} onClick={isLogin}>
        {logMsg}
      </Menu.Item>
    </Menu>
  );
  const uploadFile = (file: any) => {
    var formData = new FormData();
    Array.from(file).forEach((item: any) => {
      formData.append("file", item);
    });
    // 人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾是新时代的社会主要矛盾。
    request.post("/uploadFile", formData).then((res) => {
      // console.log('----上传文件参数', res);
    });
  };
  return (
    <div className="nav-bar">
      <div className="left-area">
        <div className="logo">
          <img src={Flag } alt="" />
          <div className="title">
            SuperMeoki
          </div>
        </div>

      </div>
      <div className="user-info">
        <Dropdown overlay={menu} placement="bottomLeft" arrow>
          <div className="user-header">
            <img src={userInfo.headerImg} />
          </div>
        </Dropdown>
      </div>

      <Modal
        title="提示"
        visible={isModalVisible}
        onOk={handleConfirm}
        onCancel={() => setIsModalVisible(false)}
        okText="确认"
        cancelText="取消"
      >
        <p>确定要离开吗？</p>
      </Modal>
    </div>
  );

  
}
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    getUserInfoDispatch: (item: any) => {
      dispatch({
        type: 'userInfo',
        value: item
      })
    }
  }
  }
  const mapStateToProps = (state: any, ownProps: any) => {
    return {}
    
  };
export default connect(mapStateToProps, mapDispatchToProps)(LeftNav)
