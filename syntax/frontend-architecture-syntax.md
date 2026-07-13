# 前端架构练习里的语法清单

这个文件只讲 `practice/frontend-architecture/` 里已经出现过的语法。

你的学习顺序应该是：

1. 先知道这段代码在业务里干什么。
2. 再知道这个语法是什么意思。
3. 最后回到原文件里重新读一遍。

## 1. HTML 入口相关

### `script src`

出现位置：

- [07-pwa/index.html](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/07-pwa/index.html)

例子：

```html
<script src="./app.js"></script>
```

大白话：

- 让浏览器加载一个 JavaScript 文件。
- HTML 负责页面结构，JS 负责让页面动起来。

### `script type="module"`

出现位置：

- [04-event-bus/index.html](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/04-event-bus/index.html)
- [06-web-worker/index.html](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/06-web-worker/index.html)

例子：

```html
<script type="module" src="./app/main.js"></script>
```

大白话：

- 告诉浏览器：这个 JS 文件可以使用 `import` 和 `export`。
- 真实项目里通常不会把所有逻辑都写在一个 HTML 里，而是拆成多个 JS 文件。

### `link rel="manifest"`

出现位置：

- [07-pwa/index.html](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/07-pwa/index.html)

例子：

```html
<link rel="manifest" href="./manifest.webmanifest">
```

大白话：

- 告诉浏览器：这个网页有一份“安装说明书”。
- 这属于 PWA 能力，和页面样式不是一回事。

## 2. DOM 查找和事件

### `document.querySelector`

出现位置：

- [04-event-bus/app/main.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/04-event-bus/app/main.js)
- [07-pwa/app.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/07-pwa/app.js)

例子：

```js
const sendBtn = document.querySelector('#sendBtn');
```

大白话：

- 去页面里找一个元素。
- `#sendBtn` 表示找 `id="sendBtn"` 的元素。
- 找到以后，JS 才能读取它、修改它、给它绑定点击事件。

### `addEventListener`

出现位置：

- [06-web-worker/app/main.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/06-web-worker/app/main.js)
- [07-pwa/app.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/07-pwa/app.js)

例子：

```js
sendBtn.addEventListener('click', () => {
  // 用户点击按钮后执行这里
});
```

大白话：

- 给一个元素挂监听。
- 用户点击、输入、网络变化时，就执行对应代码。

## 3. 模块语法

### `export`

出现位置：

- [04-event-bus/app/event-bus.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/04-event-bus/app/event-bus.js)
- [03-single-direction-call/app/domain.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/03-single-direction-call/app/domain.js)

例子：

```js
export function createEventBus() {
  // ...
}
```

大白话：

- 把这个函数暴露出去。
- 别的文件才能 `import` 它。

### `import`

出现位置：

- [04-event-bus/app/main.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/04-event-bus/app/main.js)
- [08-complete-practice/app/main.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/08-complete-practice/app/main.js)

例子：

```js
import { createEventBus } from './event-bus.js';
```

大白话：

- 从另一个文件拿一个函数过来用。
- 这就是你前面说的“代码里跳转”的来源：点击路径后，会去到被引用的文件。

## 4. 变量、函数和对象

### `const` 和 `let`

出现位置：

- [04-event-bus/app/main.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/04-event-bus/app/main.js)
- [06-web-worker/app/main.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/06-web-worker/app/main.js)

大白话：

- `const`：这个变量后面不打算重新换成别的值。
- `let`：这个变量后面可能会变。

例子：

```js
const bus = createEventBus();
let messageListenerEnabled = true;
```

### 函数

出现位置：

- [06-web-worker/app/stats-worker.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/06-web-worker/app/stats-worker.js)

例子：

```js
function countPrimes(limit) {
  return count;
}
```

大白话：

- 把一段逻辑打包成一个名字。
- 以后要用这段逻辑时，直接调用这个名字。

### 对象

出现位置：

- [04-event-bus/app/event-bus.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/04-event-bus/app/event-bus.js)
- [07-pwa/manifest.webmanifest](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/07-pwa/manifest.webmanifest)

例子：

```js
return { on, emit, off };
```

大白话：

- 对象就是一组有名字的数据或能力。
- 这里返回的是一个消息工具包，里面有 `on`、`emit`、`off` 三个能力。

## 5. 数组、循环和字符串处理

### `map`

出现位置：

- [05-indexeddb/app/main.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/05-indexeddb/app/main.js)

大白话：

- 把一组数据逐个变成另一组东西。
- 常见用法是把数据库记录变成 HTML 字符串。

### `join`

出现位置：

- [05-indexeddb/app/main.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/05-indexeddb/app/main.js)

大白话：

- 把数组里的多段字符串拼成一整段字符串。
- 页面列表渲染时很常见。

### 模板字符串

出现位置：

- [04-event-bus/app/modules.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/04-event-bus/app/modules.js)
- [05-indexeddb/app/main.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/05-indexeddb/app/main.js)

例子：

```js
`接收模块 A：收到消息 ${payload.id}`
```

大白话：

- 用反引号包住字符串。
- `${...}` 里面可以塞变量。

## 6. 异步语法

### `Promise`

出现位置：

- [05-indexeddb/app/db.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/05-indexeddb/app/db.js)
- [08-complete-practice/app/repository.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/08-complete-practice/app/repository.js)

大白话：

- 表示“现在还没结果，但以后会有结果”。
- 数据库打开、请求接口、等待定时器，都会用到它。

### `async` 和 `await`

出现位置：

- [05-indexeddb/app/main.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/05-indexeddb/app/main.js)
- [08-complete-practice/app/main.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/08-complete-practice/app/main.js)

例子：

```js
const repository = await createDraftRepository();
```

大白话：

- `async` 表示这个函数里可以等待异步结果。
- `await` 表示先等这一行完成，再继续往下走。
- 但 `async/await` 不会自动把重计算搬到 Worker。

## 7. Event Bus 相关语法

出现位置：

- [04-event-bus/app/event-bus.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/04-event-bus/app/event-bus.js)

### `Map`

大白话：

- 一个更适合做“键值表”的结构。
- 这里用消息名当 key，比如 `message:sent`。

### `Set`

大白话：

- 一组不重复的东西。
- 这里用来保存同一个消息下面的多个监听函数。

### 展开语法 `...`

例子：

```js
[...handlers].forEach((handler) => {
  handler(payload);
});
```

大白话：

- 把 `Set` 展开成数组。
- 这样就可以用 `forEach` 一个个执行监听函数。

## 8. Worker 相关语法

出现位置：

- [06-web-worker/app/main.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/06-web-worker/app/main.js)
- [06-web-worker/app/stats-worker.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/06-web-worker/app/stats-worker.js)

### `new Worker`

大白话：

- 创建一条新的工作线程。
- 主线程把重计算交给它，页面就不容易卡住。

### `postMessage`

大白话：

- 在线程之间发消息。
- 主线程可以发给 Worker，Worker 也可以发回主线程。

### `message` 事件

大白话：

- 收到对方发来的消息后，触发这里的代码。

## 9. IndexedDB 相关语法

出现位置：

- [05-indexeddb/app/db.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/05-indexeddb/app/db.js)

### `indexedDB.open`

大白话：

- 打开浏览器本地数据库。
- 第一次打开或版本升级时，可以创建对象仓库。

### `transaction`

大白话：

- 一次数据库操作的范围。
- 读数据用 `readonly`，写数据用 `readwrite`。

### `objectStore`

大白话：

- IndexedDB 里的“表”。
- 这套练习里用它保存草稿或消息。

## 10. PWA 相关语法

出现位置：

- [07-pwa/app.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/07-pwa/app.js)
- [07-pwa/service-worker.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/07-pwa/service-worker.js)

### `navigator.serviceWorker.register`

大白话：

- 注册 Service Worker。
- 注册成功后，浏览器才有机会让它接管页面请求。

### `caches.open`

大白话：

- 打开一个浏览器缓存仓库。
- PWA 会把页面外壳放进去，方便离线时读取。

### `event.respondWith`

大白话：

- Service Worker 拦截请求后，告诉浏览器这次请求应该返回什么。
- 可以返回网络结果，也可以返回缓存结果。

## 当前阶段的学习边界

现在先学这些，不要马上扩到完整语法书：

- HTML 入口和资源引入
- DOM 查找和事件
- `import` / `export`
- 变量、函数、对象
- 数组渲染常用方法
- `Promise`、`async`、`await`
- Event Bus 的 `Map` / `Set`
- Worker 的 `postMessage`
- IndexedDB 的基本读写
- PWA 的 Service Worker 和 Cache

这些学完后，再回头看 `practice/frontend-architecture/`，你会更容易判断每段代码在干什么。

