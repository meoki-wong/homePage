import React, { useEffect, useState } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import mapStyl from "./map.module.scss";

function Test() {
  let searchMap = (AMap:any)=>{
    AMap.plugin(["AMap.StationSearch"], function() {
        //实例化公交站点查询类
        var station = new AMap.StationSearch({
          pageIndex: 1, //页码，默认值为1
          pageSize: 10, //单页显示结果条数，默认值为20，最大值为50
          city: '010' //限定查询城市，可以是城市名（中文/中文全拼）、城市编码，默认值为『全国』
        });
        console.log('----->station', station);
        //执行关键字查询
        station.search('西直门', function(status:any, result:any) {
          //打印状态信息status和结果信息result
          //status：complete 表示查询成功，no_data 为查询无结果，error 代表查询错误。
          console.log('------->',status, result);
        });
      });
  }




  useEffect(() => {
       
    AMapLoader.load({
      key: "ea6695b606c6904867d842c330339d40", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
          new AMap.Map("container")
          searchMap(AMap)
      })
      .catch((e) => {
        console.log(e);
      });
      
  }, []);
  return (
    <div>
      <div className={mapStyl.map_container} id={"container"}></div>
    </div>
  );
}

export default Test;
