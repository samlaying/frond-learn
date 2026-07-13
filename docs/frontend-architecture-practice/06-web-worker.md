# 06 - Web Worker 练习

## 目标

亲眼看到繁重计算为什么会卡住页面，并学会把计算搬到 Worker 线程。

## 业务背景

消息中心积累了很多文本，现在要统计其中有多少个质数编号。这个计算没有网络请求，却会持续占用 CPU。若直接放在主线程，输入框和按钮都会暂时失去响应。

你可以先把它理解成一句很直白的话：

- 页面本来要负责点击、输入、动画
- 现在又塞进来一个很重的计算
- 计算一重，页面就会卡
- 所以要把这个重活挪到别的线程去做

## 你最容易混的点：异步不等于 Worker

把计算写进 `async function`，并不会自动换一条线程。只要那段 JavaScript 仍在主线程连续计算，页面还是会卡。

- 主线程：负责页面、点击、输入和大多数 JavaScript。
- Worker：另一条工作线程，适合独立的重计算。
- `postMessage`：双方发送数据。
- `message` 事件：双方接收结果。

你可以先记一句：

> `async` 让流程可以等待，Worker 才是真的把计算搬到另一条线程。

再翻成大白话就是：

- `async` 只是“这段代码可以等一下”
- Worker 才是“这段代码不在主线程里跑了”
- 只要还是在主线程里做大循环，页面照样会卡

## 练习任务

1. 在主线程统计指定范围内的质数，观察状态动画是否停顿。
2. 用相同参数交给 Worker 计算。
3. 主线程通过 `postMessage` 发任务。
4. Worker 算完后通过 `postMessage` 返回结果。
5. 对比耗时和页面响应，不只看谁的毫秒数更小。

## 怎么顺着代码看

1. [index.html](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/06-web-worker/index.html) 负责页面和持续跳动的主线程指示器。
2. [app/main.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/06-web-worker/app/main.js) 同时包含“错误示范”和 Worker 调用。
3. [app/stats-worker.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/06-web-worker/app/stats-worker.js) 只负责接收数字、计算、返回结果。

消息链路是：

`主线程 postMessage -> Worker message -> 计算 -> Worker postMessage -> 主线程 message -> 更新 UI`

你可以把这条链路想成：

- 主线程先把任务交出去
- Worker 收到后自己算
- 算完再把结果传回来
- 主线程只负责把结果展示到页面上

所以这里不是“函数直接调用函数”，而是“两个线程靠消息来回说话”。

### Worker 不是直接调用

主线程没有执行 `worker.countPrime()`，因为它拿不到 Worker 里的函数。双方只约定消息结构：

```js
{ type: 'count-primes', limit: 500000 }
```

这和 Event Bus 有一点像，都是发消息；区别是 Worker 的消息跨线程，而 Event Bus 通常发生在同一个页面线程里。

你也可以这么理解：

- Event Bus 是同一个房间里的传话
- Worker 是另外一个房间里的传话
- 两者都在“传消息”
- 但 Worker 多了一层“线程隔离”

所以 Worker 更像“独立小工位”，不是页面里随便调一个函数。

## 你可以动手改的地方

- 增大计算范围，观察卡顿差异。
- 给任务增加 `taskId`，避免多次计算结果混在一起。
- 增加“终止 Worker”按钮。
- 把质数统计换成大文本词频统计。

## 检查点

- 我是否能解释主线程卡住时为什么按钮也点不了
- 我是否知道 `async` 为什么不能解决纯计算卡顿
- 我是否能画出 Worker 的来回消息链路
- 我是否知道 Worker 不能直接操作 DOM

如果你还记不住，就只记一个判断：

- 只要这段东西很耗 CPU，又不需要直接改页面，就优先考虑 Worker

## 真实项目里怎么想

真实项目里，Worker 一般不是拿来处理所有逻辑的，而是处理下面这些东西：

- 很重的计算
- 大文本分析
- 数据压缩、解压
- 图片、文件、统计类任务

它不适合做这些：

- 直接改 DOM
- 直接处理按钮点击
- 管页面状态切换

因为 Worker 本身不能像普通页面代码那样直接碰界面，它更像“后台算完，把结果交回来”。

## 记录区

- 我的计算任务：统计指定范围内的质数数量
- 我拆出去的部分：纯计算函数和计时
- 主线程保留的部分：读取输入、发送任务、更新页面
- 下一步：给并发任务增加 `taskId`
