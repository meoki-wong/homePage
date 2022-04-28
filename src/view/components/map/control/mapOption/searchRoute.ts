import { message } from "antd"

const searchRoute = (AMap: any)=>{
    AMap.plugin('AMap.Driving', function() {
        var driving = new AMap.Driving({
          // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
          policy: AMap.DrivingPolicy.LEAST_TIME
        })
        
        var startLngLat = [116.379028, 39.865042]
        var endLngLat = [116.427281, 39.903719]
        
        driving.search(startLngLat, endLngLat, function (status: string, result: object) {
          // 未出错时，result即是对应的路线规划方案
          if(!Boolean(status === 'complate')){
            message.warning('未查询到路线信息')
            return
          }
        })
      })
}


export default searchRoute