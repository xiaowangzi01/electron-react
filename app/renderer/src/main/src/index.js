import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// 检查更新
setTimeout(() => {
  // 全量更新
  window.Desktop.ipcRenderer.send('checkForUpdate')
}, 10000);
// setTimeout(() => {
//   // 增量更新
//   window.Desktop.ipcRenderer.send('win-increment')
// }, 10000);
setTimeout(() => {
  // 展示BrowserView
  window.Desktop.ipcRenderer.send('showView')
}, 20000);
window.Desktop.ipcRenderer.on('isUpdateNow', (event, data) => {
  if (window.confirm("发现新版本，是否立即安装？")) {
    window.Desktop.ipcRenderer.send('isUpdateNow');
  } else {
      console.log('Cancel');
  }
})
window.Desktop.ipcRenderer.on('error', (event, data) => {
  console.log('检查更新失败')
})
window.Desktop.ipcRenderer.on('checking-for-update', (event, data) => {
  console.log('正在检查更新...')
})
window.Desktop.ipcRenderer.on('update-available', (event, data) => {
  console.log('检查到新版本，正在下载...')
})
window.Desktop.ipcRenderer.on('update-not-available', (event, data) => {
  console.log('现在使用的就是最新版，不用更新')
})
window.Desktop.ipcRenderer.on('downloadProgress', (event, data) => {
  console.log(`下载进度：${data}`)
})
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
