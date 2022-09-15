

/**
 * 初始化地图
 * 
 * @param { Function } searchBus -查询公交线路
 * @param { Function }  searchPOI -查询指定地点
 * @param { Function } searchRouteAcc -查询指定地点路线规划
 * 
 */

export interface InitMaps {
    searchBus: Function
    searchPOI: Function
    searchRouteAcc: Function
}



