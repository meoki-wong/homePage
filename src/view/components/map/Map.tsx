import React, { useEffect, useState } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import mapStyl from "./map.module.scss";
import searchMap from './searchBusRoute'
function Test(props: any) {
    let mapNew: any  // 暴露出map
    let AMap_export: any // 暴露出AMap
    



  useEffect(() => {
    console.log('--->第一次触发', props.searchBusMap);
    AMapLoader.load({
      key: "ea6695b606c6904867d842c330339d40", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.LineSearch"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then(AMap => {
          mapNew = new AMap.Map("container")
          AMap_export = AMap
          searchMap(AMap_export, mapNew, props.searchBusMap)
      })
      .catch((e) => {
        console.log('初始化map失败：', e);
      });
      
  }, [props.searchBusMap]);

  return (
    <div>
      <div className={mapStyl.map_container} id={"container"}></div>
    </div>
  );
}

export default Test;




/**
 * INVALID_USER_SCODE 初始化出现报错原因    未在全局加载时   配置安全密钥  web端
 * 本项目安全秘钥配置在index.html中
 */