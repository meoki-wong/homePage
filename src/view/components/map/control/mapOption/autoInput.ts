

const autoInput = (AMap: any) =>{
        // 实例化Autocomplete
        var autoOptions = {
          // input 为绑定输入提示功能的input的DOM ID
          input: 'input_id'
        }
        new AMap.AutoComplete(autoOptions);
        // 无需再手动执行search方法，autoComplete会根据传入input对应的DOM动态触发search
}


export default autoInput