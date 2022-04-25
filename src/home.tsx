import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import './home.module.scss'
import {Layout} from 'antd'
import 'antd/dist/antd.css'
import LeftNav from '../src/layout/leftNav'
import {Outlet} from 'react-router-dom'
import BreadCrumb from './utils/breadcrumb'
import Cookies from 'js-cookie'
import {connect} from 'react-redux'
let {Header, Sider, Content} = Layout
function App(props: any) {
  let navigate = useNavigate()
  let logout = ()=>{
    localStorage.clear()
    navigate('/login')
  }
  return (
    <div className="App">
      <Layout style={{height: '100vh'}}>
      <Header>
        <div className="header-area">
        <p style={{color: '#fff'}}>还没想好名字</p>
        <div className='logout-btn' onClick={logout}>退出</div> 
        </div>
      </Header>
      <Layout>
        <Sider collapsible={true}>
          <LeftNav/>
        </Sider>
        <Content>
          <div className='bread-crumb'>
            <BreadCrumb />
          </div>
          <div className="view">
          <Outlet/>
          </div>
        </Content>
      </Layout>
    </Layout>
    </div>
  );
}
const mapStateToProps = (state: any, ownProps: any) => {
  return {
    prop: state
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    dispatchTest: () => {
      dispatch({
        type: 'action_type_1'
      })
    }
  }
}

export default connect(
  mapDispatchToProps,
  mapStateToProps
)(App);
