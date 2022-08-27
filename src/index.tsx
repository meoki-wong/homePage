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
import { Window } from "./global";
// import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor } from "./store/store/userInfoStore";
import { PersistGate } from 'redux-persist/es/integration/react'
function render(props: any) {
  const { container } = props;
  ReactDOM.render(
    <Provider store={store}>

        <BrowserRouter basename={(window as Window).__POWERED_BY_QIANKUN__ ? '/app-react' : '/'}>
          <App />
        </BrowserRouter>

    </Provider>,
    container ? container.querySelector('#root') : document.querySelector('#root'))
    
}
// 
if (!(window as Window).__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props: any) {
  console.log('[react16] props from main framework', props);
  render(props);
}
export async function unmount(props: any) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
 export async function update(props: any) {
  console.log('update props', props);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
