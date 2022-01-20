import React, {useState, useEffect} from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import loginStyl from './login.module.scss'
import axios from 'axios';
export default function Login() {
  const onFinish = (values :any) => {
    console.log('Success:', values);
  };

  useEffect(()=>{
      axios.get('/test').then(res=>{
          console.log('====>res参数', res);
      })
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
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={rules}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
        </div>
    </div>
    
  );
};

