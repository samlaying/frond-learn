# 07 - PWA 练习

## 目标

理解网页如何获得“可安装、可离线打开”的能力，并完成一个最小离线消息页。

## 业务背景

消息中心在地铁或弱网环境下也应该能打开。即使暂时没有网络，用户仍然要看到页面外壳和离线说明，而不是浏览器错误页。

## 你最容易混的点：PWA 不是一种页面样式

PWA 不是“把网页做得像 App”，而是一组浏览器能力：

- Web App Manifest：告诉系统应用名称、图标、启动方式。
- Service Worker：站在网页和网络之间，决定使用网络还是缓存。
- HTTPS 或本地开发环境：Service Worker 的安全运行条件。

你可以先记一句：

> Manifest 管“怎么安装”，Service Worker 管“断网时从哪里拿文件”。

## 练习任务

1. 在 HTML 中连接 `manifest.webmanifest`。
2. 在入口中注册 `service-worker.js`。
3. Service Worker 安装时缓存页面外壳。
4. 请求失败时从缓存返回资源。
5. 启动本地服务器，在线访问一次，再切换离线刷新。

## 怎么顺着代码看

1. [index.html](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/07-pwa/index.html) 连接 Manifest，并加载页面入口。
2. [app.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/07-pwa/app.js) 注册 Service Worker、显示网络和安装状态。
3. [service-worker.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/07-pwa/service-worker.js) 决定缓存哪些文件，以及请求失败时怎么办。
4. [manifest.webmanifest](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/07-pwa/manifest.webmanifest) 描述应用名称、颜色和启动地址。

### 注册成功不等于已经离线可用

第一次访问时 Service Worker 需要安装并缓存文件。为了稳定验证：

1. 用 `npm run start` 启动，不要直接双击 HTML。
2. 在线打开页面一次。
3. 刷新一次，让新的 Service Worker 接管页面。
4. 在开发者工具切到 Offline，再刷新。

## 你可以动手改的地方

- 修改缓存名称，观察旧缓存如何被清理。
- 新增一个页面，却不放入缓存列表，比较离线结果。
- 增加真正的 PNG 图标，让浏览器完整显示安装入口。
- 把第 5 章的本地草稿接进来，做到离线编辑。

## 检查点

- 我是否能分别说出 Manifest 和 Service Worker 的责任
- 我是否知道为什么不能用 `file://` 测试
- 我是否能解释“先在线访问一次”的原因
- 我是否能找到缓存列表和缓存读取的位置

## 记录区

- 我的 PWA 能力：显示网络状态、注册 Service Worker、缓存页面外壳
- 我缓存的内容：入口 HTML、脚本、Manifest
- 我的验证步骤：在线打开 -> 刷新接管 -> Offline -> 再刷新
- 下一步：加入应用图标和离线草稿
