import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
//导入手机样式文件
/* 改变REM换算比例 */
import 'lib-flexible';
import { ConfigProvider } from 'antd-mobile'
import zhCN from "antd-mobile/es/locales/zh-CN";
import './index.less'
import 'normalize.css'

//自动调节
(function () {
  function SetWidth() {
    //获取html
    const html = document.documentElement
    const root = document.querySelector('#root')
    //获取宽度
    const size = html.clientWidth
    if (size >= 750) {
      root.computedStyleMap.width = '75px'
      return
    }
  }
  SetWidth()
})()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>

);


