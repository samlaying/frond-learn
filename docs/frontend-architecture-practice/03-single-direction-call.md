# 03 - 单向调用练习

## 目标

练习“从上往下调用”的架构约束。

## 业务背景

这章用一个更具体的场景来练：**输入消息并发送**。

- 用户先在输入框里写消息
- UI 层负责收集输入、响应点击
- 业务层负责校验消息、组装 payload
- 通讯层负责把消息发给后端
- 最后由 UI 层展示成功或失败状态

这个流程很适合练单向调用，因为它天然是一个从上到下的链路：

`UI -> 业务实体 -> 通讯层 -> 结果返回给 UI`

## 练习任务

1. 选一个业务流程，比如“输入消息并发送”。
2. 画出调用链：UI -> 业务实体 -> 通讯层。
3. 故意尝试写一段反向调用的代码，然后删掉它。
4. 修改设计，让上层只依赖下层，不反过来依赖。

## 这几句话到底是什么意思

### 1. 选一个业务流程，比如“输入消息并发送”

意思是：

- 不要一上来就想整个系统
- 先挑一个很具体的小功能练习

比如：

- 输入消息并发送
- 保存草稿
- 点击收藏
- 提交表单

这样你才知道每一层到底要干什么。

### 2. 画出调用链：UI -> 业务实体 -> 通讯层

意思是：

- 用户先在页面上操作，这是 UI 层
- UI 把数据交给业务层
- 业务层判断规则
- 如果需要保存，再交给通讯层去请求接口

你可以理解成一条“流水线”：

- 用户点按钮
- UI 收集输入
- 业务层判断
- 通讯层发请求
- 返回结果后 UI 展示

这个顺序很重要，因为它告诉你：

- 谁先做，谁后做
- 谁只负责哪一段

### 3. 故意尝试写一段反向调用的代码，然后删掉它

这句话的意思是：

- 你可以先“犯个错”，看看哪里不对
- 比如你故意写成：
  - 通讯层直接去改页面
  - 业务层直接操作按钮
  - UI 直接判断所有复杂规则
- 然后你会发现：
  - 代码会乱
  - 职责会混
  - 后面很难维护

这个动作的目的不是保留坏代码，而是让你亲眼看到错误结构长什么样，然后把它删掉。

### 4. 修改设计，让上层只依赖下层，不反过来依赖

这句是分层架构的核心原则。

意思是：

- UI 可以调用业务层
- 业务层可以调用通讯层
- 但是反过来不行

比如：

- UI 可以知道“发送按钮点了之后调用业务层”
- 业务层可以知道“保存时要调接口”
- 但通讯层不应该知道“页面上哪个按钮被点了”
- 业务层也不应该直接去改按钮颜色、弹窗文案

为什么？

- 一旦反过来依赖，层和层就会缠死
- 后面改一个地方，会连锁炸开

## 怎么顺着代码看

你前面问的其实是“代码里的跳转”怎么读，不是页面跳转。  
在这个练习里，你可以按下面顺序看：

1. 先看 [index.html](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/03-single-direction-call/index.html)
2. 找到这句：

```html
<script type="module" src="./app/main.js"></script>
```

3. 再去看 [app/main.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/03-single-direction-call/app/main.js)
4. 然后顺着 `main.js` 里的 `import` 去看：
   - [app/ui.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/03-single-direction-call/app/ui.js)
   - [app/domain.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/03-single-direction-call/app/domain.js)
   - [app/repository.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/03-single-direction-call/app/repository.js)
   - [app/state.js](/Users/sam/03-Code/frond-learn/practice/frontend-architecture/03-single-direction-call/app/state.js)

你可以把这理解成：

- `index.html` 负责启动程序
- `main.js` 负责组装各层
- `ui.js` 负责页面交互
- `domain.js` 负责业务规则
- `repository.js` 负责请求和存取
- `state.js` 负责共享数据

### 怎么判断它属于哪一层

- 看到 `querySelector`、`addEventListener`、改文本、改按钮状态，一般就是 UI
- 看到校验、判断、组装 payload，一般就是业务层
- 看到请求、发送、存取、模拟网络，一般就是通讯层

### `import` 不是调用

这个地方很容易混。

- `import` 的意思是“把别的文件里的东西拿进来”
- 真正的“调用”，是你后面把那个函数执行掉

比如：

```js
import { validateMessage } from './domain.js';

const result = validateMessage('你好');
```

这里：

- `import` 只是把 `validateMessage` 拿到当前文件里
- `validateMessage('你好')` 才是真正调用它

你可以这样记：

- `import` = 先把工具拿进来
- 调用 = 真正开始干活

### 你可以先记一句最短的话

> 入口负责启动，主文件负责组装，其他文件各做各的事。

## 检查点

- 我是否能说明为什么反向调用会让结构变乱
- 我是否能把一个流程压缩成清晰的单向链路
- 我是否能说清楚每一层只负责哪一段

## 记录区

- 我的调用链：
- 我删掉了哪些坏设计：
- 下一步：
