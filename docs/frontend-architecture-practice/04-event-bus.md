# 04 - Event Bus 练习

## 目标

理解下层如何通过消息通知上层，而不是直接调用上层。

## 业务背景

你可以把它想成一个真实页面里的消息中心、评论区、工单系统，或者聊天输入框。
用户在一个地方点按钮，不一定只影响一个模块，可能要同时做几件事：

- 记录日志
- 更新未读数
- 刷新列表
- 触发埋点

如果这些模块互相直接调用，代码会越来越乱。Event Bus 就是把“谁通知谁”改成“谁订阅什么消息”。

## 练习任务

1. 写一个最小 Event Bus。
2. 支持 `on`、`emit`、`off` 三个能力。
3. 让一个模块发送消息，另一个模块接收消息。
4. 再写一个消息类型，测试多个监听者同时响应。

## 先用大白话理解

- `on`：先挂一个监听器，意思是“这个消息来了记得叫我”。
- `emit`：发出一条消息，意思是“现在广播一下”。
- `off`：取消监听，意思是“我不想再收这个消息了”。
- 发送方不需要知道接收方是谁。
- 接收方也不需要知道是谁发的。

## 代码里的判断方法

你可以用一句话判断一段代码是不是 Event Bus 思路：

- 如果它是在“发消息”，通常会看到 `emit`
- 如果它是在“接消息”，通常会看到 `on`
- 如果它是在“撤掉监听”，通常会看到 `off`

真正重要的不是函数名，而是消息流向：

- 一个模块只负责发
- 一个模块只负责收
- 多个模块可以同时收

## 练习目录

建议你直接看这里：

- [`practice/frontend-architecture/04-event-bus/index.html`](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/04-event-bus/index.html)
- [`practice/frontend-architecture/04-event-bus/app/event-bus.js`](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/04-event-bus/app/event-bus.js)
- [`practice/frontend-architecture/04-event-bus/app/modules.js`](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/04-event-bus/app/modules.js)
- [`practice/frontend-architecture/04-event-bus/app/ui.js`](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/04-event-bus/app/ui.js)
- [`practice/frontend-architecture/04-event-bus/app/main.js`](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/04-event-bus/app/main.js)

## 怎么看这个实现

先看 `index.html`，它只负责加载入口：

```html
<script type="module" src="./app/main.js"></script>
```

然后看 `app/main.js`：

- 它先创建 `bus`
- 再创建 `sender`
- 再创建 `receiver`
- 最后把按钮事件接起来

`app/event-bus.js` 是最小实现，只做三件事：

- `on(type, handler)`：订阅消息
- `emit(type, payload)`：广播消息
- `off(type, handler)`：取消订阅

`app/modules.js` 里放的是两个业务模块：

- `createSender`：负责发消息
- `createReceiver`：负责接消息

`app/ui.js` 里放的是页面更新：

- 写日志
- 改未读数
- 改正在输入状态

## `core` 和 `shared` 为什么会重叠

你前面问过 `event-bus` 为什么有时会放在 `core`，有时会放在 `shared`。  
这里可以直接记成一句话：

- `core` 更像项目必须依赖的底座
- `shared` 更像大家都能拿来用的公共东西

它们都会“被复用”，所以看起来会重叠。  
区别不在“能不能复用”，而在“它更像底座，还是更像公共资源”。

你可以这样想：

- 如果一个东西是项目运行的基础机制，更像 `core`
- 如果一个东西是很多地方共用的零件，更像 `shared`

所以 `event-bus` 两边都说得通，关键是你们项目要统一口径，不要一会儿放这里，一会儿放那里。

## 业务规则到底是什么

业务规则不是必须很复杂。  
最小的业务规则，就是一句“能不能继续往下走”。

比如这章里的消息发送：

- 输入不能为空
- 消息长度不能超限
- 用户状态要允许发送
- 通过了才进入下一步

这就是业务规则。

所以你可以把业务规则理解成：

- 决定“能不能做”
- 决定“做完以后去哪里”
- 决定“遇到什么情况要拦住”

它不是在说“代码怎么写”，而是在说“业务上怎么判定”。

## 数据相关到底管什么

数据相关不只是“存储”和“读写”，还包括：

- 请求数据
- 读取缓存
- 保存内容
- 转换数据结构
- 清洗接口返回值
- 合并数据后再交给别的层

你可以记成一句更完整的话：

- 数据层关心“数据从哪里来”
- 数据层关心“数据怎么变”
- 数据层关心“数据怎么存下去”

比如这章里：

- `sendMessage` 负责发出消息
- `createReceiver` 负责接收消息后更新页面

这里面如果只是“广播消息”，它更像基础能力。  
如果是“把消息结果保存起来、读出来、整理成列表”，那就更像数据相关。

## `utils`、业务、数据怎么区分

你现在不用一上来分得特别细，先抓住最主要的判断：

- 纯格式化、纯计算、纯转换，通常更像 `utils`
- 决定能不能继续、该不该拦截，通常更像业务
- 请求、读取、保存、清洗、合并，通常更像数据

这三个经常会挨在一起，所以你不要只看函数名字，要看它主要在干什么。

## 这四步是什么意思

1. 写一个最小 Event Bus。
2. 支持 `on`、`emit`、`off` 三个能力。
3. 让一个模块发送消息，另一个模块接收消息。
4. 再写一个消息类型，测试多个监听者同时响应。

翻成大白话就是：

- 先造一个“广播喇叭”
- 再让大家可以“订阅频道”
- 接着验证“一个人说，别人能听见”
- 最后验证“同一条消息，可以被多人同时收到”

## 检查点

- 我是否能说清楚“消息”在模块之间如何流动
- 我是否能解释为什么这比直接调用更稳
- 我是否能看出发送方和接收方没有互相硬依赖

## 记录区

- 我的消息类型：
- 我的监听者：
- 我取消订阅的方法：
- 下一步：
