import "./public-path";
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
import "./type/global.d.ts";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor } from "./store/store/userInfoStore";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import { ConfigProvider } from "antd";

// 全局引入hippo-ui  css样式
import 'ui-hippo-test/dist/hippoUI.css'
// import { PersistGate } from 'redux-persist/es/integration/react'

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

// 对接qinakun

function render(props: any = {}) {
	ReactDOM.render(
		<Provider store={store}>
			{/* <PersistGate persistor={persistor}> */}
			<BrowserRouter
				basename={window.__POWERED_BY_QIANKUN__ ? "/react/" : process.env.REACT_APP_BASEROUTE || '/blog'} // vite import.meta.env  暂时无法实现
			>
        {/* 中文切换 组件会在某些时候无法切换中英文 */}
				<ConfigProvider locale={zh_CN}>
					<App />
				</ConfigProvider>
			</BrowserRouter>
			{/* </PersistGate> */}
		</Provider>,
		props.container
			? props.container.querySelector("#blog-root")
			: document.getElementById("blog-root")
	);
}

if (!window.__POWERED_BY_QIANKUN__) {
	render();
}

export async function bootstrap() {
	console.log("react-app bootstraped");
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: any) {
	console.log("react-app mount");
	render(props);
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props: any) {
	console.log("react-app unmount");
	ReactDOM.unmountComponentAtNode(
		props.container
			? props.container.querySelector("#blog-root")
			: document.getElementById("blog-root")
	);
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props: any) {
	console.log("react-app update props", props);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
