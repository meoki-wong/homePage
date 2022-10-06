// react-app/config-overrides.js
const path = require("path");
const APP_NAME = require("./package.json").name;
const { addLessLoader } = require('customize-cra')
module.exports = {
  webpack: (config) => {
    console.log('--config', config)
    // 微应用的包名，这里与主应用中注册的微应用名称一致
    config.output.library = APP_NAME;
    // 将你的 library 暴露为所有的模块定义下都可运行的方式
    config.output.libraryTarget = "umd";
    // 按需加载相关，设置为 webpackJsonp_VueMicroApp 即可
    config.output.chunkLoadingGlobal = `webpackJsonp_${APP_NAME}`;
    config.output.globalObject = 'window';
    config.addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      // Optionally adjust URLs to be relative. When false, URLs are already relative to the entry less file.
      relativeUrls: false,
      modifyVars: { '@primary-color': '#A80000' },
      // cssModules: {
      //   // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
      //   localIdentName: "[path][name]__[local]--[hash:base64:5]",
      // }
    } 
  })
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
 
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      // 关闭主机检查，使微应用可以被 fetch
      // config.disableHostCheck = true;
      config.allowedHosts = "all";
      // 配置跨域请求头，解决开发环境的跨域问题
      config.headers = {
        "Access-Control-Allow-Origin": "*",
      };
      // 配置 history 模式
      config.historyApiFallback = true;
 
      return config;
    };
  },
};