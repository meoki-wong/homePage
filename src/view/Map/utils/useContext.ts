import React, { createContext } from "react";

interface contextType {
    searchPOI: Function
    searchBus: Function
}
const maps: contextType = {
    searchPOI: Function,
    searchBus: Function
}



const { Provider, Consumer}  = createContext<contextType>(maps)


export {
    Provider, 
    Consumer
}