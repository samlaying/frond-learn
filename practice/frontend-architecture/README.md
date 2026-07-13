# 前端架构实战练习场

这是一个可以直接打开和预览的练习入口，对应 `docs/frontend-architecture-practice/` 的教程内容。

现在已经拆成八个独立文件夹：

- `01-spa-basics/`
- `02-layered-architecture/`
- `03-single-direction-call/`
- `04-event-bus/`
- `05-indexeddb/`
- `06-web-worker/`
- `07-pwa/`
- `08-complete-practice/`

## 启动方式

在这个目录里执行：

```bash
npm install
npm run start
```

然后在浏览器里打开命令行提示的地址。

如果你想直接打开某一章，也可以分别进入对应文件夹启动。

## 你可以怎么学

1. 先打开 `01-spa-basics/`，看局部更新效果。
2. 再打开 `02-layered-architecture/`，理解分层职责。
3. 最后打开 `03-single-direction-call/`，练单向调用。
4. 接着打开 `04-event-bus/`，理解消息通知和多监听者。
5. 用 `05-indexeddb/` 保存本地草稿，再刷新验证持久化。
6. 用 `06-web-worker/` 对比主线程卡顿和跨线程计算。
7. 用 `07-pwa/` 在线加载一次，再切到离线刷新。
8. 最后用 `08-complete-practice/` 顺着一次保存追完整调用链。
9. 每次只改一小块代码，改完立刻刷新浏览器观察结果。

## 学习时固定问自己

- 这段代码属于哪一层？
- 它是在直接调用，还是发送消息？
- 数据最终存在哪里？刷新后还在吗？
- 重计算是在主线程还是 Worker？
- 断网后资源来自网络还是缓存？
