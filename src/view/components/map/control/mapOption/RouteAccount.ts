
import { message } from "antd";

const RouteAccount = (AMap: any, AMapContain: any, keywordList:Array<object>, type: string) => {


    // 当前示例的目标是展示如何根据规划结果绘制路线，因此walkOption为空对象
    let Walking = {
        map: AMapContain,
    }
    let Driving = {
        policy: AMap.DrivingPolicy.LEAST_TIME, // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy
        ferry: 1, // 是否可以使用轮渡
        province: '京', // 车牌省份的汉字缩写  
    }
    let Riding = {
        policy: 1  
    }
    let Transfer = {
        nightflag: true, // 是否计算夜班车
        policy: AMap.TransferPolicy.LEAST_TIME, // 其它policy取值请参照 https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferPolicy
    }
    // 创建导航
    const walking = new AMap[type](type)
    console.log('--->查询', keywordList)
    //根据起终点坐标规划步行路线
    walking.search(keywordList, function(status: string, result: any) {
        console.log('--->results', result, keywordList)
        if (status === 'complete') {
            if (result.routes && result.routes.length) {
                drawRoute(result.routes[0])
                message.success('绘制步行路线完成')
            }
        } else {
            message.error('步行路线数据查询失败' + result)
        } 
    });

    const drawRoute = (route: any)=> {
        var path = parseRouteToPath(route)

        var startMarker = new AMap.Marker({
            position: path[0],
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
            map: AMapContain,
            anchor: 'bottom-center',
        })

        var endMarker = new AMap.Marker({
            position: path[path.length - 1],
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
            map: AMapContain,
            anchor: 'bottom-center',
        })

        var routeLine = new AMap.Polyline({
            path: path,
            isOutline: true,
            outlineColor: '#ffeeee',
            borderWeight: 2,
            strokeWeight: 5,
            strokeColor: '#0091ff',
            strokeOpacity: 0.9,
            lineJoin: 'round'
        })

        AMapContain.add(routeLine);

        // 调整视野达到最佳显示区域
        AMapContain.setFitView([ startMarker, endMarker, routeLine ])
    }

    // 解析WalkRoute对象，构造成AMap.Polyline的path参数需要的格式
    // WalkRoute对象的结构文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkRoute
    const parseRouteToPath = (route: any)=> {
        var path = []
        let routeType = route.steps? 'steps' : 'rides'
        console.log('---->参数触发', route)
        for (var i = 0, l = route[routeType].length; i < l; i++) {
            var step = route[routeType][i]

            for (var j = 0, n = step.path.length; j < n; j++) {
              path.push(step.path[j])
            }
        }

        return path
    }
}

export default RouteAccount