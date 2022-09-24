import React, { useEffect } from "react";
import Cookies from "js-cookie";
import "./home.less";
import "antd/dist/antd.css";
import { useNavigate, Outlet } from "react-router-dom";
import { socketIo } from "./view/chatRoom/utils/newSocket";
import { Layout, Tooltip } from "antd";
import { connect } from "react-redux";
import NavBar from "./layout/NavBar";
import BreadCrumb from "./utils/breadcrumb";
import { navRouter } from "./homeRouterNav";
import Archival from './layout/Archival'
let { Header, Sider, Content } = Layout;
// /blog/Meeting  声网
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
				<div className="view-option-area">
					{
						navRouter.map(item=>{
							return (<Tooltip placement="right" title={item.pathname}>
								<i 
								className={`iconfont ${item.icon}`}
								onClick={()=>navigate(item.path)}>
								</i>
							</Tooltip>)
						})
					}
            	</div>
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
