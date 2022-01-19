import React, { useEffect } from 'react';
import { Menu } from 'antd';
import {useNavigate} from 'react-router-dom'
import {
    AppstoreOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
  } from '@ant-design/icons';
let { SubMenu } = Menu;
export default function LeftNav (props: Object) {
  let navigate = useNavigate()
  // let [collapsed, setCollapsed] = useState(false)
    // state = {
    //     collapsed: false,
    //   };
    useEffect(()=>{
      console.log('=====>propskkk', window.location)
    })
    //  let toggleCollapsed = () => {
    //   setCollapsed(!collapsed)
    //   }
    

        return (
            <div style={{ width: '100%' }}>
            {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            </Button> */}
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="dark"
              inlineCollapsed={false}
            >
              <Menu.Item key="1" icon={<PieChartOutlined />} onClick={()=>navigate('/home/test2')}>
                Option 1
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />} onClick={()=>navigate('/home/details')}>
                Option 2
              </Menu.Item>
              <Menu.Item key="3" icon={<ContainerOutlined />}>
                Option 3
              </Menu.Item>
              <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="11">Option 11</Menu.Item>
                  <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
              </SubMenu>
            </Menu>
          </div>
        );

}


