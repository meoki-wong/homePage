import React, { useEffect } from "react";
import Cookies from "js-cookie";
import "./home.scss";
// import "antd/dist/antd.css";
import { useNavigate, Outlet } from "react-router-dom";
import { socketIo } from "./view/chatRoom/utils/newSocket";
import { Layout } from "antd";
import { connect } from "react-redux";
import NavBar from "./layout/NavBar";
import BreadCrumb from "./utils/breadcrumb";
import Archival from './layout/Archival'
let { Header, Sider, Content } = Layout;

function App(props: any) {
  let navigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <div className="App">
      <Layout>
        {/* <Header> */}
        <NavBar />
        {/* </Header> */}
        <Layout>
          {/* <Sider collapsible={true}>
          
        </Sider> */}
          <Content>
            <div className="setting-space"></div>
            <div className="bread-crumb">
              <BreadCrumb />
            </div>
            <div className="view">
              <Outlet />
            </div>
            <div className="archival">
              {/* 协议 */}
              {/* <Archival /> */}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
const mapStateToProps = (state: any, ownProps: any) => {
  console.log("---statestate", state, ownProps);
  return {
    prop: state,
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    dispatchTest: () => {
      dispatch({
        type: "action_type_1",
        value: 20,
      });
    },
  };
};

export default connect(mapDispatchToProps, mapStateToProps)(App);
