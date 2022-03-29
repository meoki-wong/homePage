import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import {BrowserRouter, HashRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import './api/axios.module'
import store from './store/store'
import "lib-flexible" //转化px

console.log('---->store', store.getState());
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
    <App/>
  </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
