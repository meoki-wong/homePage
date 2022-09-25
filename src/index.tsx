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

// 字体
// const url = `https://hippo-meoki.oss-cn-beijing.aliyuncs.com/homePage/homePage-font/HuXiaoBoSaoBaoTi-2.otf`;
// // Font-Spider 优化

// // 加载字体
// window.onload = () => {
//     console.log("onload");
//     setTimeout(() => {
//       const SaoBabe = new FontFace("SaoBabe", `url(${url})`);
//       // 添加到全局的 FontFaceSet 中
//       document.fonts.add(SaoBabe);
//       SaoBabe.load().then(() => {
//         // 当字体加载完之后，我们就可以通过替换 class 的方法替换掉默认的字体
//         const el = document.querySelector("#root") as HTMLElement;
//         console.log('----el', el);
//         el.style.fontFamily = "SaoBabe";
//       });
//     }, 0);
//   };



ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate persistor={persistor}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
