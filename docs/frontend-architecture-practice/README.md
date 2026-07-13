# 前端架构实战

这个目录对应 [`frontend-architecture.md`](../frontend-architecture.md) 的教程内容，用来把“看懂”变成“做出来”。

如果你想直接看一个能运行、能预览的实战入口，请先打开 [根目录的练习场](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/)，那里已经拆成从 `01-spa-basics/` 到 `08-complete-practice/` 的八个独立章节。

## 使用方式

1. 先按顺序读教程，再看对应的实战文件。
2. 每一章都先写最小实现，再补充优化。
3. 每完成一步，就在本章末尾记录：
   - 我实现了什么
   - 我还不理解什么
   - 下一步准备怎么改

## 实战顺序

1. [`01-spa-basics.md`](./01-spa-basics.md)
2. [`02-layered-architecture.md`](./02-layered-architecture.md)
3. [`03-single-direction-call.md`](./03-single-direction-call.md)
4. [`04-event-bus.md`](./04-event-bus.md)
5. [`05-indexeddb.md`](./05-indexeddb.md)
6. [`06-web-worker.md`](./06-web-worker.md)
7. [`07-pwa.md`](./07-pwa.md)
8. [`08-complete-practice.md`](./08-complete-practice.md)

## 建议节奏

- 第 1 天：先做第 1、2 章，建立整体结构感
- 第 2 天：做第 3、4 章，练单向调用和消息总线
- 第 3 天：做第 5、6 章，练存储和异步计算
- 第 4 天：做第 7、8 章，把功能串成一个完整小项目

## 练习目标

- 能讲清楚 UI 层、业务实体层、DB/通讯层各自负责什么
- 能自己写出一个最小的 Event Bus 示例
- 能理解什么时候该用 IndexedDB、Web Worker 和 PWA
- 能把教程里的概念，真正落到一个可运行的小项目里
