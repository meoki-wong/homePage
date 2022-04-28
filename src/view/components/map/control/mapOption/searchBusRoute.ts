import { message } from 'antd'
let AMap_export: any
let mapNew: any
/**
 * @param AMap 创建地图对象
 * @param mapNews 地图对象构造函数
 * @param busNum 公交线编号
 * @param area 搜索区域  不选择默认全国
  */
let searchMap = (AMap: any, mapNews: any, busNum: number, area: string) => {
    //实例化公交站点查询类
    mapNew = mapNews
    AMap_export = AMap
    // var station = new AMap.StationSearch({
    //   pageIndex: 1, //页码，默认值为1
    //   pageSize: 10, //单页显示结果条数，默认值为20，最大值为50
    //   city: '010' //限定查询城市，可以是城市名（中文/中文全拼）、城市编码，默认值为『全国』
    // });
    var station = new AMap.LineSearch({
        pageIndex: 1,
        city: area,
        pageSize: 1,
        extensions: 'all'
    })
    //执行关键字查询
    station.search(busNum, function (status: string, result: object) {
        //打印状态信息status和结果信息result
        //status：complete 表示查询成功，no_data 为查询无结果，error 代表查询错误。
         if(!Boolean(status === "complete")){
            message.warning('查询正常存在的公交线')
            return
         }
         lineSearch_Callback(result)
    });
}

let drawbusLine = (startPot: any, endPot: any, BusArr: any) => {
    //绘制起点，终点
    new AMap_export.Marker({
        map: mapNew,
        position: startPot, //基点位置
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
        zIndex: 10,
        anchor: 'bottom-center',
    });
    new AMap_export.Marker({
        map: mapNew,
        position: endPot, //基点位置
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
        zIndex: 10,
        anchor: 'bottom-center',
    });
    //绘制乘车的路线
    let busPolyline = new AMap_export.Polyline({
        map: mapNew,
        path: BusArr,
        strokeColor: "#09f",//线颜色
        strokeOpacity: 0.8,//线透明度
        isOutline: true,
        outlineColor: 'white',
        strokeWeight: 6//线宽
    });
    // 将 busPolyline 显示在地图中心并自动缩放地图到合适级别。
    // true表示需要动画过程，[60,200,60,60]表示上下左右避让像素
    mapNew.setFitView(busPolyline, true, [60, 200, 60, 60]);

}

let lineSearch_Callback = (data: any) => {
    var lineArr = data.lineInfo;
    var lineNum = data.lineInfo.length;
    if (lineNum == 0) {
    } else {
        for (var i = 0; i < lineNum; i++) {
            var pathArr = lineArr[i].path;
            var stops = lineArr[i].via_stops;
            var startPot = stops[0].location;
            var endPot = stops[stops.length - 1].location;
            if (i == 0) //作为示例，只绘制一条线路
                drawbusLine(startPot, endPot, pathArr);

        }
    }
}


export default searchMap