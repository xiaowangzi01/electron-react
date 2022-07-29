const { app } = require('electron')
const {create: createMainWindow, show: showMainWindow, close: closeMainWindow, send:sendMainWindow} = require('./windows/main')
const fullUpdate = require('./update/fullUpdate')
const handleIPC = require('./ipc')

app.on('ready', () => {
    createMainWindow()
    require('./trayAndMenu')
    fullUpdate(sendMainWindow)
    handleIPC()
})
app.on('activate', () => {
    showMainWindow()
})

app.on('before-quit', () => {
    closeMainWindow()
})