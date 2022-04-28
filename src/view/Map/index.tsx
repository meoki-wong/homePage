import React, { useState, useEffect, memo } from "react";
import Map from "../components/map/Map";
import axios from "axios";
import DrawerContain from "./component/Drawer";

function Index() {

  return (
    <div>
      <>
        <Map />
        <DrawerContain />
      </>
    </div>
  );
}

export default memo(Index);
