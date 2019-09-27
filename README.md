# webpack-demo
<h1>webpack+react+antd</h1>

<p>这个项目目的只有一个————研究webpack！</p>

### 步骤
 1. git clone后进入项目
 2. npm i
 3. 调试运行npm run dev
 4. 打包运行npm run build，会弹出bundle分析页

### 仍需改进的地方
  + webpack只用了比较基础的配置，目前而言，我觉得调试热更新好像有点卡，还有现在是单入口文件，调试的时候控制台总是打印main.js过大
  + 打包出来的体积比较大，依赖包vendors压缩过后也有1.2M左右，其中700多k是antd的icons包（这玩意全部给打进来了，我都没有用到icons）+ moment（应该是antd集成的moment.js的包
