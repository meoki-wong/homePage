import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Layout} from 'antd'
import 'antd/dist/antd.css'

import LeftNav from '../src/layout/leftNav'

let {Header, Footer, Sider, Content} = Layout
function App() {
  let [isOpenNavStatus, setIsOpenNavStatus] = useState(true)
  let isOpenNav = (val: boolean)=>{
    setIsOpenNavStatus(val)
  }
  return (
    <div className="App" style={{height: '100vh'}}>
      <Layout style={{height: '100%'}}>
      <Header style={{color: '#fff'}}>还没想好名字</Header>
      <Layout>
        <Sider collapsible={true}>
          <LeftNav />
        </Sider>
        <Content>Content</Content>
      </Layout>
    </Layout>
    </div>
  );
}

export default App;
