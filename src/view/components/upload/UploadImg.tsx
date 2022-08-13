import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import React, { useState, memo, useEffect } from "react";

type PropInterface = {
  maxNum: number; // 上传最大值
  getImgUrl: Function; // 向父组件传入imgUrl字段
};
const UploadImg: React.FC<PropInterface> = (props?: any) => {
  const { getImgUrl } = props;
  useEffect(() => {
    setFileList([
      {
        uid: "-1",
        name: "image.png",
        type: "image/jpeg",
        url: props.coverImg,
      },
    ]);
  }, [props.coverImg]);
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      type: "image/jpeg",
      url: props.coverImg,
    },
  ]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    getImgUrl(...newFileList);
  };

  const onPreview = async (file: UploadFile) => {
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
        {fileList.length < props.maxNum && "点击上传"}
      </Upload>
    </ImgCrop>
  );
};

export default memo(UploadImg);
