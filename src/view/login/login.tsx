import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../api/axios.module'
import "./login.scss"
// import axios from "axios";

// import { setCookieFn } from '../../utils/setCookie'
// import {Base64} from 'js-base64'
// import md5 from 'js-md5'
import Cookies from "js-cookie";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { json } from "stream/consumers";
function Login() {
  let navigate = useNavigate();

  const onFinish = (values: any) => {};

  useEffect(() => {
    if (window.localStorage.getItem("remember_pwd")) {
      let userInfo = JSON.parse(`${Cookies.get("kk2")}`);
      axiosInstance.post("/login", { ...userInfo }).then((res) => {
        if (res.data.code === 200) {
          navigate("/dataAdmin");
        }
      });
    }
  }, []);

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log("Failed:", errorInfo);
  // };
  let [rules, setRules] = useState([
    {
      required: true,
      message: "Please input the content!",
    },
  ]);
  let [userName, setUserName] = useState('');
  let [password, setPassWord] = useState('');
  let [checkBox, setCheckBox] = useState(true);

  let getUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  let getPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassWord(e.target.value);
  };

  let login = () => {
    axiosInstance.post("/login", { userName, password, checkBox }).then((res: any) => {
      if (res.data.code === 200) {
        if (checkBox) {
          // setCookieFn({name: 'kk2', value: {
          //   userName: 'admin',
          //   password: '12345'
          // }, time: 7})  // 测试记住我功能  存入cookie
          Cookies.set(
            "kk2",
            JSON.stringify({
              userName: userName,
              password: password,
            }),
            { expires: 7 }
          );
          window.localStorage.setItem("remember_pwd", "1"); // localstroage存储记住我登录状态 进入后判断是否有该状态进行跳转
        }
        let token = res.data.data.token;
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("userInfo", JSON.stringify(res.data.data.userInfo));
        message.success("登录成功");
        navigate("/dataAdmin");
      }
    });
  };
  let onCheckRember = (e: CheckboxChangeEvent) => {
    setCheckBox(e.target.checked);
  };
  return (
    <div className="login-container">
      <div className="header">
        <div className="logo"><img src={require("../assets/image/Flag.png")} /></div>
        <div className="title">SuperMeoki</div>
      </div>
      <div className="form-area">
        <Form
          name="basic"
          style={{ width: "100%" }}
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
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="用户名" name="username" rules={rules}>
            <Input onChange={(e) => getUser(e)} />
          </Form.Item>

          <Form.Item label="密码" name="password" rules={rules}>
            <Input.Password onChange={(e) => getPassword(e)} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Checkbox
              onChange={(e) => onCheckRember(e)}
              checked={checkBox}
              style={{ color: "#fff" }}
            >
              记住我
            </Checkbox>
            <span className={"forget"}>忘记密码？</span>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              onClick={login}
              style={{ marginRight: "30px" }}
            >
              登录
            </Button>
            <Button type="primary" onClick={() => navigate("/register")}>
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
      {/* <div className="game-box">
        手机游戏盒子
      </div> */}
    </div>
  );
}

export default Login;

/**
 *
 * 生成特殊cookie  将cookie对应账号密码传入服务端
 *
 * 前端存储登录账号密码信息  cookie  并加密
 *
 * 前端解密  创建登录
 */
