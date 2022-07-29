const {app, BrowserWindow, BrowserView} = require('electron')
const remote = require('@electron/remote/main')
const path = require('path')

let win
let willQuitApp = false
function create () {
    remote.initialize();
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../','inject', 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
        show: false,
    })

    win.on('close', (e) => {
        if (willQuitApp) {
            win = null;
        } else {
            e.preventDefault();
            win.hide();
        }
    })

    win.on('ready-to-show', () => {
        win.show()
    })

    if (app.isPackaged) {
        win.loadFile(path.resolve(__dirname, '../../renderer/pages/main/index.html'))
    } else {
        win.loadURL('http://localhost:3000')
    }
    remote.enable(win.webContents)
    win.webContents.openDevTools()
}

function send(channel, ...args) {
    win.webContents.send(channel, ...args)
}
function show() {
    if (win.isMinimized()) win.restore()
    win.show()
}
function setView() {
    var BorwserView = BrowserView
    var view = new BorwserView({
        webPreferences: {
            preload: path.join(__dirname,'../', 'inject', 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    win.setBrowserView(view)
    // 设置跟随主窗口大小变化
    view.setAutoResize({width:true,height:true})
    // 嵌入窗口大小和位置
    view.setBounds({ x: 0, y: 120, width: 800, height: 480 })
    view.webContents.loadURL('http://www.baidu.com/')
    // view.webContents.openDevTools()
    remote.enable(view.webContents)
    setTimeout(() => {
        // 隐藏窗口
        win.removeBrowserView(view)
    }, 10000);
    setTimeout(() => {
        // 显示窗口
        win.addBrowserView(view)
    }, 20000);
}
function close() {
    willQuitApp = true
    win.close()
}

module.exports = {create, send, show, close, setView}
