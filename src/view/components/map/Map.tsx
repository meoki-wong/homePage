import React, { useEffect, useState } from "react";
import mapStyl from "./map.module.scss";
function MapContain(props: any) {
  return (
    <div>
      <div className={mapStyl.map_container} id={"container"}></div>
    </div>
  );
}

export default MapContain;




