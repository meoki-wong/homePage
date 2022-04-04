

const autoInput = (AMaper: any, id: string)=>{
    // 开启自动搜索提示
    new AMaper.AutoComplete({
        input: id // input 为绑定输入提示功能的input的DOM ID
      });
}


export default autoInput