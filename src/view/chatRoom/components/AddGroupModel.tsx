import React, { useEffect, useImperativeHandle, useState } from "react";
import { Modal, Form, Input, Select, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UploadImg from "@/view/components/upload/UploadImg";
import { request } from "@/api/request";
import { FriendList } from "../type/friend";

type ImgType = {
  response: {
    data: string;
  };
};
const { TextArea } = Input;
const { Option } = Select;
const AddGroupModel = (props: any, ref: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState<ImgType>();
  const [friendList, setFriendList] = useState<Array<FriendList>>([]);
  let { id, userName } = JSON.parse(localStorage.getItem('userInfo')!)
  const [ form ] = Form.useForm<FormData>()
  useImperativeHandle(ref, () => {
    return {
      showModal() {
        setIsModalVisible(true);
      },
    };
  });

  useEffect(() => {
    getFriendList();
  }, []);
  const getImgUrl = (url: ImgType) => {
    setImgUrl(url);
  };
  const getFriendList = async () => {
    let res = await request.post("/getFirends", {
        userId: JSON.parse(localStorage.getItem("userInfo")!).id,
      });
    setFriendList(res.data.list);
  };
  let uploadParams = {
    maxNum: 1,
    getImgUrl: getImgUrl,
    coverImg: null,
  };
  const handleOk = async () => {
    let formData = await form.validateFields()
    console.log('-----formData', formData);
    // imgUrl
    request.post('/createGroup', {
        ...formData, 
        groupImage: imgUrl?.response?.data
      }).then(res=>{
        message.success('创建成功')
        setIsModalVisible(false);
      }) 
    
  };

  const handleCancel:()=> void = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const handleChange = (value: number[]) => {
    console.log('valuevaluevalue', value);
  };
  return (
    <>
      <Modal
        title="创建群组"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="创建"
        cancelText="取消"
      >
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="群组名"
            name="groupName"
            rules={[{ required: true, message: "请填写群组名称" }]}
          >
            <Input placeholder="请设置群名称"/>
          </Form.Item>
          <Form.Item label="群头像">
            <UploadImg {...uploadParams} />
          </Form.Item>
          <Form.Item label="群组公告" name="groupAnnouncement">
            <TextArea showCount maxLength={100} placeholder="请设置群公告"/>
          </Form.Item>
          <Form.Item label="群组成员" name="groupMember">
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="请选择群组成员"
              onChange={handleChange}
              optionLabelProp="label"
            >
              {friendList.map((item) => (
                <Option value={item.UserId} label={item.userName} key={item.UserId}>
                  <div className="demo-option-label-item">
                    <span role="img" aria-label="China">
                      <UserOutlined />
                    </span>
                    {item.userName}
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default React.forwardRef(AddGroupModel);
