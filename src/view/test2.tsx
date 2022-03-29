
import React, { useState, useEffect } from 'react'
import Map from './components/map/Map'
import {connect} from 'react-redux'
import ChatRoom from './chatRoom/ChartRoom'
function Test2(props: any) {
    let [searchVal, setSearchVal] = useState('')
    let searchValFn = (e: any)=>{
        setSearchVal(e.target.value)
    }
    let btn = ()=>{
        // setSearchVal('500')
        props.dispatchTest()
    }
    useEffect(()=>{
        console.log('------>props', props);
    }, [])
    return (
        <>
            <p>{props.prop.value}</p>
            <input type="text" onChange={searchValFn} value={searchVal} />
            <ChatRoom />
            <button onClick={btn}>点击</button>
            <Map 
            searchBusMap={searchVal}/>
        </>
    )
}



const mapStateToProps = (state: any, ownProps: any) => {
    return {
      prop: state
    }
  }
  
  const mapDispatchToProps = (dispatch: any, ownProps: any) => {
      console.log('----->ownProps', ownProps);
    return {
      dispatchTest: () => {
        dispatch({
          type: 'action_type_1',
          value: 2
        })
      }
    }
  }


export default connect (
    mapStateToProps,
    mapDispatchToProps,
)(Test2)