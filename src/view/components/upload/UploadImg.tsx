import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import React, { useState, memo } from "react";

type PropInterface = {
  maxNum: number; // 上传最大值
  getImgUrl: Function // 向父组件传入imgUrl字段
};
const UploadImg: React.FC<PropInterface> = (props?: any) => {
  const { getImgUrl } = props
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    getImgUrl(...newFileList)
  };

  const onPreview = async (file: UploadFile) => {
    console.log('-------file', file)
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotate>
      <Upload
        action="http://127.0.0.1:10020/data_admin/uploadFile"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        maxCount={props.maxNum}
      >
        {fileList.length < props.maxNum && "+ Upload"}
      </Upload>
    </ImgCrop>
  );
};

export default memo(UploadImg);
