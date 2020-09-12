# wyCloud-music
<h3>技术栈：webpack+react+antd</h3>

<p>该项目原先只是webpack实操，现在一步步开始仿网易云音乐，最终完成完整的web项目</p>

*****

在线查看：<http://175.24.123.231:8081>

### 步骤（后端）
 https://binaryify.github.io/NeteaseCloudMusicApi/#/
 
### 步骤（前端）
 1. `git clone`后进入项目
 2. `npm i`
 3. 调试运行`npm run dev`
 4. 打包运行`npm run build`，会弹出bundle分析页，目前包大小947k左右
 
 >效果展示
 
<img src="https://ftp.bmp.ovh/imgs/2020/07/82b8c6cd496e4c0d.png" width="200px">
<img src="https://ftp.bmp.ovh/imgs/2020/07/d659595e7b8b39f8.png" width="200px">
<img src="https://ftp.bmp.ovh/imgs/2020/07/c0e4b23d63bcbcd6.png" width="200px">

*关于redux，做了大胆尝试，用useContext+useReducer的方式代替，发现还挺好用*
***
**代码全面hook化**
