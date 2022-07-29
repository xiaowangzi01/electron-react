const { autoUpdater } = require('electron-updater');
const { ipcMain } = require('electron')
/* 自动更新 */
module.exports = function(sendMainWindow) {
    const feedUrl = 'http://localhost:8888/update'
    // 配置安装包远端服务器
    autoUpdater.setFeedURL(feedUrl);

    // 下面是自动更新的整个生命周期所发生的事件
    autoUpdater.on('error', function (message) {
        sendMainWindow('error', message)
    });
    autoUpdater.on('checking-for-update', function (message) {
        sendMainWindow('checking-for-update', message)
    });
    autoUpdater.on('update-available', function (message) {
        sendMainWindow('update-available', message)
    });
    autoUpdater.on('update-not-available', function (message) {
        sendMainWindow('update-not-available', message)
    });

    // 更新下载进度事件
    autoUpdater.on('download-progress', function (progressObj) {
        sendMainWindow('downloadProgress', progressObj)
    });
    //监听下载完成事件
    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl) {
        //退出并安装更新包
        ipcMain.on('isUpdateNow', (e, arg) => {
            autoUpdater.quitAndInstall();
        });
        sendMainWindow('isUpdateNow')
    })
    //接收渲染进程消息，开始检查更新
    ipcMain.on("checkForUpdate", (e, arg) => {
        //执行自动更新检查
        autoUpdater.checkForUpdates();
    })
}