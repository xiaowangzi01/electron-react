const AdmZip = require('adm-zip')
const fse = require('fs-extra')
const sudo = require('sudo-prompt')
const path = require('path')
const { app } = require('electron')
const { downloadFile } = require('../utils/downloadFile')

async function increment() {
    const resourcesPath = app.getAppPath()
    if (!fse.pathExistsSync(path.join(app.getPath('userData'), './update.exe'))) {
        await downloadFile({
            url: 'http://localhost:8888/update/update.exe',
            targetPath: app.getPath('userData')
        }).catch((err) => {
            console.log(err)
            log.info(err)
        })
    }
    // 提权的方案，这里简写了，正式项目请自行选择位置放update.exe
    const downloads = app.getPath('downloads')
    downloadFile({ url: 'http://localhost:8888/update/app.zip', targetPath: downloads })
        .then((filePath) => {
            const zip = new AdmZip(filePath)
            try {
                // 同步解压缩
                zip.extractAllTo(downloads, true)
                fse.removeSync(filePath)
                sudoPrompt(
                    `"${path.join(
                        app.getPath('userData'),
                        './update.exe'
                    )}" "${resourcesPath}" "${downloads}" "electron-react.exe" "${app.getPath('exe')}"`)
            } catch (error) {
                console.error(`extractAllToERROR: ${error}`);
            }
        })
        .catch((err) => {
            console.log(err)
        })
}
function sudoPrompt(shell) {
    var options = {
        name: 'Electron',
    }
    // return new Promise((resolve, reject) => {
    sudo.exec(shell, options, function (error, stdout, stderr) {
        if (error) {
            // reject(error)
            console.log('error:' + error)
            return
        }
        // resolve(stdout)
        console.log('stdout: ' + stdout)
    })
    // })
}
exports.increment = increment