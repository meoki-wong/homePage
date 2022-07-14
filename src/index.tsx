import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./api/axios.module";
import store from "./store/store";
import "lib-flexible"; //转化px
// import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor } from "./store/store/userInfoStore";
import { PersistGate } from 'redux-persist/es/integration/react'
console.log("---->store", store.getState());
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
