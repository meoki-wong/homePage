import React, { createContext } from "react";
import { InitMaps } from '../type/InitMaps'

const maps: InitMaps = {
    searchPOI: Function,
    searchBus: Function,
    searchRouteAcc: Function
}



const { Provider, Consumer } = createContext<InitMaps>(maps)


export {
    Provider,
    Consumer
}