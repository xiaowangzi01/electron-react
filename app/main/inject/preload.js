const remote = require('@electron/remote');
const { ipcRenderer } = require('electron')

const Desktop = {};
window.Desktop = Desktop;
Desktop.remote = remote;
Desktop.ipcRenderer = ipcRenderer
