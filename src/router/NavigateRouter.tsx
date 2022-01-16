import React from 'react'
import { useNavigate, useParams } from "react-router-dom";

// const WrapComps = (props: any)=> {
 
// }

// export default WrapComps

export default function WrapComps (props: any){
    let navigate = useNavigate();
    let params = useParams();
    let Element = props.el
    console.log('=====>propsmmmm', props)
    return <Element params={params} navigate={navigate} {...props} />
}