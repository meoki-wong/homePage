interface tipsObject {
    id: number,
}

/**
 * @param info 查询是否成功的信息
 * @param tips 查询到的地址信息数组集合
 */
interface results {
    info: string,
    tips: Array<tipsObject>
}
let resultList: Array<object>
const searchPOI = (AMap: any, AMapContain: any, keyword: string) => {
    // return 12/
    const autoComplete = new AMap.AutoComplete({
        city: '全国'
    })

    var placeSearch = new AMap.PlaceSearch({
        city: 'beijing', // 兴趣点城市
        citylimit: true,  //是否强制限制在设置的城市内搜索
        pageSize: 10, // 单页显示结果条数
        children: 0, //不展示子节点数据
        pageIndex: 1, //页码
        extensions: 'base' //返回基本地址信息
    });
    autoComplete.search(keyword, function (status: string, result: results) {
        // 搜索成功时，result即是对应的匹配数据
        console.log(result);
        
        //详情查询
        placeSearch.getDetails(result.tips[0].id, function (status: string, result: results) {
            if (status === 'complete' && result.info === 'OK') {
                placeSearch_CallBack(result);
            }
        });
    })




    const infoWindow = new AMap.InfoWindow({
        autoMove: true,
        offset: { x: 0, y: -30 }
    });
    //回调函数
    const placeSearch_CallBack = (data: any) => {
        var poiArr = data.poiList.pois;
        //添加marker
        var marker = new AMap.Marker({
            map: AMapContain,
            position: poiArr[0].location
        });
        AMapContain.setCenter(marker.getPosition());
        infoWindow.setContent(createContent(poiArr[0]));
        infoWindow.open(AMapContain, marker.getPosition());
    }
    const createContent = (poi: any) => {  //信息窗体内容
        var s = [];
        s.push("<b>名称：" + poi.name + "</b>");
        s.push("地址：" + poi.address);
        s.push("电话：" + poi.tel);
        s.push("类型：" + poi.type);
        return s.join("<br>");
    }
}

export default searchPOI