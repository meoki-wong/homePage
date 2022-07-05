import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../login/register.scss";
import { request } from "../../../api/request";
import UploadImg from "../../components/upload/UploadImg";
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Cascader,
  Button,
  message,
} from "antd";
type FormData = {
  userName: string,
  password: string
}
type ImgType = {
  response: {
    data: string
  }
}
interface UserInfo {
  headerImg: string
}
export default function EditUserInfo() {
  const navigate = useNavigate();
  const { Option } = Select;
  const { TextArea } = Input
  const [ form ] = Form.useForm<FormData>()
  const [ imgUrl, setImgUrl ] = useState<ImgType>()
  const [ userInfo, setUserInfo] = useState<UserInfo>(Object)

  useEffect(()=>{
    getUserData()
  }, [])
  let getUserData = () => {
    request.post('/getUserInfo').then(res=>{
      form.setFieldsValue(res.data.data)
      setUserInfo(res.data.data)
    })
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const getImgUrl = (url: ImgType) => {
    setImgUrl(url)
  }

  let editInfo = async () => {
    let formData = await form.validateFields()
    request.post("/editUserInfo", {
      ...formData,
      headerImg: imgUrl?.response?.data
    }).then((res) => {
      if (res.data.success) {
        getUserData()
        message.success("修改成功");

      }
    });
  };
  let uploadParams = {
    maxNum: 1,
    getImgUrl: getImgUrl,
    coverImg: userInfo.headerImg
  }
  return (
    <div className={"register-container"}>
      <div className="form">
        <Form {...formItemLayout} form={form}>
          <Form.Item label="头像" name="headerImg">
            <UploadImg {...uploadParams}/>
          </Form.Item>
          <Form.Item 
          label="用户名"
          name="userName">
            <Input 
            placeholder="请输入用户名" 
            />
          </Form.Item>
          <Form.Item label="性别" name="sexy">
            <Select allowClear>
              <Option value="1">男</Option>
              <Option value="2">女</Option>
            </Select>
          </Form.Item>
          <Form.Item label="地址" name="address">
            <Input placeholder="请输入所在地区" />
          </Form.Item>
          <Form.Item label="联系方式" name="phoneNum">
            <Input placeholder="请输入联系方式" />
          </Form.Item>
          <Form.Item label="年龄" name="age">
            <Input placeholder="年龄先这么输吧" />
          </Form.Item>
          <Form.Item label="邮箱" name="email">
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item label="兴趣爱好" name="hobbies">
            <TextArea 
            placeholder="请输入兴趣爱好"  
            showCount 
            maxLength={30}
            autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
          <Form.Item label="个人简介" name="selfIntroduce">
            <TextArea 
            placeholder="请输入个人简介"  
            showCount 
            maxLength={50}
            autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
        </Form>
        <Button type="primary" onClick={editInfo}>
          确认修改
        </Button>
      </div>
    </div>
  );
}
