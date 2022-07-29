const { ipcMain } = require('electron')
const { setView: setViewMainWindow } = require('./windows/main')
const { increment } = require('./update/increment')
module.exports = function () {
    ipcMain.on('showView', (e, data) => {
        setViewMainWindow()
    })
    ipcMain.on('win-increment', (e, data) => {
        increment()
    })
}