# 05 - IndexedDB 练习

## 目标

理解浏览器为什么需要一个“小型数据库”，并亲手完成消息草稿的新增、读取和删除。

## 业务背景

继续使用消息中心。用户写了一半的长消息，刷新页面后还想继续编辑；草稿以后还可能有很多条，需要按时间查找和删除。

`localStorage` 能存一点简单文本，但它像一个只有键和值的小抽屉。IndexedDB 更像浏览器里的数据库：可以存很多结构化对象，也可以按字段查找。

## 你最容易混的点：它不是后端数据库

- IndexedDB 的数据只保存在当前浏览器和当前网站下。
- 它不会自动同步到其他电脑，也不会自动发给服务器。
- 它适合离线草稿、缓存列表、大量结构化数据。
- 登录密码、必须跨设备同步的数据，不能只依赖它。

你可以先记一句：

> `localStorage` 像便签，IndexedDB 像带编号和索引的本地资料柜。

## 练习任务

1. 打开数据库 `message-learning-db`。
2. 创建对象仓库 `drafts`，用自增数字作为主键。
3. 把输入框内容保存成 `{ id, content, createdAt }`。
4. 读取全部草稿并显示到页面。
5. 删除一条草稿，再刷新页面验证数据仍然存在。

## 怎么顺着代码看

1. 先看 [index.html](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/05-indexeddb/index.html)，找到页面入口。
2. 再看 [app/main.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/05-indexeddb/app/main.js)，看按钮触发了什么动作。
3. 最后看 [app/db.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/05-indexeddb/app/db.js)，看真正的数据库读写。

代码里的三个关键词：

- `open`：打开数据库；第一次打开时也负责建仓库。
- `transaction`：声明这次要读还是要写。
- `objectStore`：拿到某个对象仓库，再执行 `add`、`getAll`、`delete`。

### `request` 不是最终结果

IndexedDB 的操作是异步的。`store.getAll()` 返回的是请求对象，数据要等 `onsuccess` 才回来。本章把它包成 Promise，这样入口里就可以用 `await` 顺着读。

## 你可以动手改的地方

- 给草稿增加 `title` 字段。
- 增加“清空全部”按钮。
- 保存前禁止空内容。
- 把列表改成最新草稿排在最前面。

## 检查点

- 我是否能解释为什么草稿比主题颜色更适合 IndexedDB
- 我是否能说出数据库、对象仓库、记录三者的关系
- 我是否知道刷新页面后数据为什么还在
- 我是否能找到真正执行新增和删除的位置

## 记录区

- 我的对象仓库：`drafts`
- 每条记录包含：`id`、`content`、`createdAt`
- 我的读写链路：UI 点击 -> `main.js` -> `db.js` -> IndexedDB -> 返回结果 -> UI 更新
- 我遇到的问题：
- 下一步：给草稿增加编辑能力
