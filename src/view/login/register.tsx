import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.scss";
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Cascader,
  Button,
  message
} from "antd";
import axios from 'axios'
export default function Register() {
  const navigate = useNavigate()
  const { Option } = Select;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  let [name, setName] = useState<string>('')
  let [password, setPassword] = useState<string>()

  let changeNameVal = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setName(e.target.value)
  }
  let changePwdVal = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(e.target.value)
  }

  let register = ()=>{
    let params = {
      userName: name,
      password: password
    }
    axios.post('/register', params).then(res=>{
      if(res.data.success){
        message.success('注册成功')
        navigate('/dataAdmin/login')
      }
    })
  }
  return (
    <div className={"register-container"}>
      <div className="form">
      <Form {...formItemLayout}>
        {/* <Form.Item label="Success" hasFeedback validateStatus="success">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Warning" hasFeedback validateStatus="warning">
          <TimePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Error" hasFeedback validateStatus="error">
          <Select allowClear>
            <Option value="1">Option 1</Option>
            <Option value="2">Option 2</Option>
            <Option value="3">Option 3</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Validating"
          hasFeedback
          validateStatus="validating"
          help="The information is being validated..."
        >
          <Cascader options={[{ value: "xx", label: "xx" }]} allowClear />
        </Form.Item>

        <Form.Item label="inline" style={{ marginBottom: 0 }}>
          <Form.Item
            validateStatus="error"
            help="Please select right date"
            style={{ display: "inline-block", width: "calc(50% - 12px)" }}
          >
            <DatePicker />
          </Form.Item>
          <span
            style={{
              display: "inline-block",
              width: "24px",
              lineHeight: "32px",
              textAlign: "center",
            }}
          >
            -
          </span>
          <Form.Item
            style={{ display: "inline-block", width: "calc(50% - 12px)" }}
          >
            <DatePicker />
          </Form.Item>
        </Form.Item> */}
        <Form.Item label="用户名">
          <Input placeholder="请输入用户名" onChange={changeNameVal}/>
        </Form.Item>
        <Form.Item label="密码" hasFeedback validateStatus="warning">
          <Input.Password placeholder="请输入密码" onChange={changePwdVal}/>
        </Form.Item>
        
      </Form>
      <Button type="primary" onClick={register}>
              注册
            </Button>
      </div>
    </div>
  );
}
