import { useNavigate, useParams } from "react-router-dom";

// 封装withrouter（）  正在测试   本方法暂时没用
const WrapComps = (props: any)=> {
  let navigate = useNavigate();
  let params = useParams();
  let Element = props.el
  return <Element params={params} navigate={navigate} {...props} />
}



export default WrapComps