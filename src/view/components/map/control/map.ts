/**
 * 初始化map地图  
 * initMap() 为初始化函数
 *  */
import AMapLoader from "@amap/amap-jsapi-loader";
import searchMap from "./mapOption/searchBusRoute";
export default class Map {
    AMapContain: any
    AMaper: any
    searchBus: any
    constructor() {
        this.initMap()
        this.searchBus = this.searchBusRoute
    }


    initMap() {
        AMapLoader.load({
            key: "ea6695b606c6904867d842c330339d40", // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: ["AMap.LineSearch"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        })
            .then(AMap => {
                this.AMaper = AMap
                this.AMapContain = new AMap.Map("container")
                //   searchMap(AMap, mapNew, 300 )
            })
            .catch((e) => {
                console.log('初始化map失败：', e);
            });
    }
    searchBusRoute(busNO: number, area: string){
        searchMap(this.AMaper, this.AMapContain, busNO, area)
    }
}



/**
 * INVALID_USER_SCODE 初始化出现报错原因    未在全局加载时   配置安全密钥  web端
 * 本项目安全秘钥配置在index.html中
 */