/**
 * 初始化map地图  
 * initMap() 为初始化函数
 *  */
import AMapLoader from "@amap/amap-jsapi-loader";
import searchMap from "./mapOption/searchBusRoute";
import searchPOI from './mapOption/searchPOI'
import RouteAccount from './mapOption/RouteAccount'
import autoInput from './mapOption/autoInput'
// 加载地图所需要的控件
let mapPlugins = [
    "AMap.LineSearch", // 公交路线查询
    "AMap.AutoComplete", // 输入框联想  直接加载触发
    "AMap.Driving", // 路线查询   驾车情况
    "AMap.PlaceSearch",
    "AMap.Walking", // 步行路线规划
] 
export default class Map {
    AMapContain: any
    AMaper: any
    searchBus: Function
    searchPOI: Function
    searchRouteAcc: Function
    loadAutoInputs: Function
    constructor() {
        this.initMap()
        this.searchBus = this.searchBusRoute
        this.searchPOI = this.searchPosition
        this.searchRouteAcc = this.searchRouteAccount
        this.loadAutoInputs = this.loadAutoInput
    }

    initMap() {
        AMapLoader.load({
            key: "ea6695b606c6904867d842c330339d40", // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: mapPlugins, // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        })
            .then(AMap => {
                this.AMaper = AMap
                this.AMapContain = new AMap.Map("container", {
                    resizeEnable: true
                })
                
            })
            .catch((e) => {
                console.log('初始化map失败：', e);
            });
    }


    searchBusRoute(busNO: number, area: string){
        searchMap(this.AMaper, this.AMapContain, busNO, area)
    }
    searchPosition(keyword: string){
        searchPOI(this.AMaper, this.AMapContain, keyword)
    }
    searchRouteAccount(keywordList: Array<string>){
        RouteAccount(this.AMaper, this.AMapContain, keywordList)
    }
    loadAutoInput = ()=>{
        autoInput(this.AMaper, 'input_id')
        autoInput(this.AMaper, 'input_ids')
    }
}



/**
 * INVALID_USER_SCODE 初始化出现报错原因    未在全局加载时   配置安全密钥  web端
 * 本项目安全秘钥配置在index.html中
 * 
 * @method searchBusRoute 查询公交线路
 * @method searchPosition 查询单个地点
 */