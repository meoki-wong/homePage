import React from 'react';
import homeStyl from './home.module.scss'
import {Layout} from 'antd'
import 'antd/dist/antd.css'
import LeftNav from '../src/layout/leftNav'
import {Outlet} from 'react-router-dom'
import BreadCrumb from './utils/breadcrumb'
let {Header, Sider, Content} = Layout
function App(props: any) {
//   useEffect(()=>{
//   })

  return (
    <div className={homeStyl.App}>
      <Layout style={{height: '100%'}}>
      <Header style={{color: '#fff'}}>还没想好名字</Header>
      <Layout>
        <Sider collapsible={true}>
          <LeftNav/>
        </Sider>
        <Content>
          <div className={homeStyl['bread-crumb']}>
            <BreadCrumb />
          </div>
          <div className={homeStyl.view}>
          <Outlet/>
          </div>
        </Content>
      </Layout>
    </Layout>
    </div>
  );
}

export default App;
