import React, {useState, useEffect} from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import loginStyl from './login.module.scss'
import axios from 'axios';
import { AnyARecord } from 'dns';
export default function Login() {
  const onFinish = (values :any) => {
    console.log('Success:', values);
  };

  useEffect(()=>{
      console.log('--->', checkBox);
  })

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  let [rules, serRules] = useState([
    {
      required: true, 
      message: 'Please input the content!',
    },
  ])
  let [userName, setUserName] = useState(null)
  let [password, setPassWord] = useState(null)
  let [checkBox, setCheckBox] = useState(true)

  let getUser = (e: any)=>{
    setUserName(e.target.value)
  }
  let getPassword = (e: any)=>{
      setPassWord(e.target.value)
  }
  
  let login = ()=>{
    axios.post('/login', {userName, password,checkBox}).then(res=>{
    })
  }
  let onCheckRember=(e:any)=>{
    setCheckBox(e.target.checked)
  }
  return (
    <div className={loginStyl.container}>
        <div className={loginStyl.formArea}>
        <Form
      name="basic"
      style={{width: '100%'}}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 18,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={rules}
      >
        <Input onChange={(e)=>getUser(e)}/>
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={rules}
      >
        <Input.Password onChange={(e)=>getPassword(e)}/>
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox  
        onChange={(e)=>onCheckRember(e)}
        checked={checkBox}>记住我</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={login}>
          登录
        </Button>
      </Form.Item>
    </Form>
        </div>
    </div>
    
  );
};

