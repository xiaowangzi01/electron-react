### 描述
增量升级所需命令（仅windows下c盘安装需要获取管理员权限）

### bat 命令
%1和%2为运行脚本传入的参数，比如update.bat aaa bbb，那么%1为aaa，%2为bbb，上面我们执行exe时传入的，
也就是%1为resourcesPath（也就是我们的app.asar所在目录），%2为下载更新的update.asar所在目录，%3为软件的进程名称(可在任务管理器中查看)，%4为软件的启动exe。

这里的逻辑是Electron应用，暂停1秒钟，然后删除app.asar，将update.asar移动到app.asar目录下，重命名为app.asar，启动Electron应用

下载Bat To Exe Converter这个软件，将update.bat转换为update.exe