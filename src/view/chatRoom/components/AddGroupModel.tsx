import { Button, Modal } from 'antd';
import React, { useImperativeHandle, useState } from 'react';

const AddGroupModel = (props: any, ref: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useImperativeHandle(ref, ()=>{
    return {
        showModal (){
            setIsModalVisible(true);
          }
    }
  })
//   const showModal = () => {
//     setIsModalVisible(true);
//   };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default React.forwardRef(AddGroupModel);