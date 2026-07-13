# 08 - 综合实战：离线消息工作台

## 目标

不再单独练概念，而是把前面学到的结构串成一条真实业务链路。

## 业务背景

做一个“离线消息工作台”：用户写消息并保存，本地数据库保留历史；保存成功后广播事件；日志和统计模块各自响应；耗时统计交给 Worker；页面外壳可离线打开。

## 先看完整链路

`UI 收集输入 -> Domain 校验 -> Repository 存入 IndexedDB -> Event Bus 广播 -> 列表刷新 + Worker 统计 -> UI 展示`

每一段只做自己的事：

- UI：读取输入、显示结果。
- Domain：校验并创建消息对象。
- Repository：保存和读取消息。
- Event Bus：通知“消息已保存”。
- Worker：计算文本统计，不碰 DOM。
- Service Worker：缓存应用外壳，不参与业务数据处理。

## 你最容易混的点：串起来不等于全写在一起

综合实战不是把所有代码塞进 `main.js`。`main.js` 的职责是组装和安排顺序，具体规则仍放在对应模块。

你可以先记一句：

> 主文件像导演，知道谁先出场，但不替每个角色演戏。

## 练习任务

1. 输入消息并经过 Domain 校验。
2. 通过 Repository 保存到 IndexedDB。
3. 保存后发出 `message:saved`。
4. 列表模块和日志模块分别监听该事件。
5. 把消息文本交给 Worker 统计字符数和词数。
6. 注册 Service Worker，缓存应用外壳。
7. 刷新页面，确认消息仍能从 IndexedDB 恢复。

## 怎么顺着代码看

建议只沿着一次“保存消息”往下追：

1. [index.html](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/08-complete-practice/index.html) 启动 `main.js`。
2. [app/main.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/08-complete-practice/app/main.js) 组装 UI、Repository、Event Bus 和 Worker。
3. [app/domain.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/08-complete-practice/app/domain.js) 校验内容并创建消息。
4. [app/repository.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/08-complete-practice/app/repository.js) 写入 IndexedDB。
5. [app/event-bus.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/08-complete-practice/app/event-bus.js) 广播保存成功。
6. [app/text-worker.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/08-complete-practice/app/text-worker.js) 返回文本统计。

## 出错时怎么判断是哪一层

- 空消息也能保存：看 Domain。
- 刷新后消息消失：看 Repository / IndexedDB。
- 保存成功但日志没更新：看 Event Bus 的事件名和监听。
- 统计不返回：看 Worker 的消息结构。
- 离线时页面打不开：看 Service Worker 的缓存列表和作用域。

## 完成标准

- 页面可以新增并删除消息。
- 刷新后历史消息仍存在。
- 保存成功会触发至少两个监听者。
- Worker 能返回字符数和词数。
- 在线访问并被 Service Worker 接管后，离线仍可打开页面外壳。
- 各模块的职责能用一句话讲清楚。

## 记录区

- 项目名称：离线消息工作台
- 我的完整调用链：UI -> Domain -> Repository -> Event Bus -> 列表与 Worker -> UI
- 我完成了什么：分层、本地存储、事件通知、线程计算、离线缓存
- 最容易写乱的地方：`main.js` 的组装流程和异步先后顺序
- 如果再做一遍：先画数据流，再定义各模块输入和输出
- 下一步：增加消息编辑、搜索和缓存版本提示
