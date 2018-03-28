# knowledge_analyse 知识自动分析工具

## 技术栈 & 环境

- node版本: `v6.9.0`
- 技术栈: `egg + sqlite/ORM(sequelize)`

## 运行
### 开发者构建上传给别人使用
由于是前后端分离的小项目,所以开发时进行的是分离式开发.但是发布到环境上统一将前端内容打包进后端的目录中进行渲染.相当于对外是一个文件包
1. 将`server`文件夹与`client`文件夹放在同一级目录
1. 在`client`中执行命令
    1. `npm install`
    2. `npm run build`
### 未安装依赖的包
1. 在`server`下执行命令`npm install`.
1. 将`node_modules`下的`sqlite3-online`更名为`sqlite3`
1. `npm run dev`本地运行  `npm run start` 正式环境运行
1. 正式环境下使用pm2管理

### 已安装依赖的包
1. 直接运行`npm run start`

如果遇到需要修改端口的情况,在`config.js`进行相应修改.(这里由于`ctx.request.origin`抓取到的是有域名的情况,所以只能暂时将端口独立出来方便其他地方引用)

## 记录一下待调优
1. 处理数据可以更多地利用array 的高级函数进行
2. 修改功能导致的一些不可重复命名的内容重复了，这个需要检查判定


## 文件目录

```
├── app(工程主目录)
|    ├─ controller(控制器目录,用于处理http请求,数据并返回相应内容)
|    ├─ model (存储数据库的表结构)
|    ├─ public (静态文件目录)
|    |  ├─ dist (前端vue构建产生的文件夹)
|    |  ├─ favicon.ico (页面icon)
|    |  ├- bot (bot配置管理文件导入导出功能相关)
|    |  |   ├─ upload 上传的文件
|    |  |   └- download 下载需要生成的文件
|    |  └- wiki.md wiki文档读取的文件，不可删除
|    |
|    ├─ schedule(定时任务)
|    |  └─ 
|    |
|    ├─ service (controller的辅助处理目录)
|    ├─ index.html
|    └─ router.js (路由文件)
|
├── config(工程配置目录)
|    ├─ config.default.js (默认配置文件)
|    ├─ config.local.js (本地开发配置)
|    ├─ config.prod.js (正式环境配置)
|    └─ plugin.js (插件配置)
|
├─ node_modules (npm安装依赖的文件目录)
├─ logs(日志文件, 使用`egg-script`时的日志目录)
├─ pm2Logs(日志文件,使用pm2启动的日志目录)
├─ run
├─ test(自动化测试目录)
├─ package.json (npm配置文件)
├─ postman.json (接口数据文件,导入postman用)
├─ app.js (启动自定义)
├─ config.js (端口配置文件)
├─ database.sqlite(数据库表文件)
└─ index.js(pm2启动文件)
```
