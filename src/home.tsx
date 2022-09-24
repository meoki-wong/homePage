import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { connect } from "react-redux";
import NavBar from "./layout/NavBar";
import NavRouter from "./view/components/NavRouter";
import BreadCrumb from "./utils/breadcrumb";
import "./home.less";
import "antd/dist/antd.css";
let { Content } = Layout;
// /blog/Meeting  声网
function App(props: any) {
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
				<NavRouter />
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
