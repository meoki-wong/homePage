import React, { useState, useEffect, memo } from "react";
import Map from "../components/map/Map";
import DrawerContain from "./component/Drawer";
import './assets/css/map.less'
function Index() {
  useEffect(()=>{
    console.log('----出阿发')
  }, [])
  return (
    <div>
      <>
        <div className="map-contain">
          <Map />
          <DrawerContain />
        </div>
      </>
    </div>
  );
}

export default memo(Index);

