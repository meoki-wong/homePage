import { useNavigate, useParams } from "react-router-dom";

const WrapComps = (props: any)=> {
  let navigate = useNavigate();
  let params = useParams();
  let Element = props.el
  return <Element params={params} navigate={navigate} {...props} />
}