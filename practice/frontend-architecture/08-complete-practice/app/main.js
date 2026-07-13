import { createMessage } from './domain.js';
import { createEventBus } from './event-bus.js';
import { createMessageRepository } from './repository.js';

const ui = {
  content: document.querySelector('#content'), status: document.querySelector('#status'), stats: document.querySelector('#stats'),
  messages: document.querySelector('#messages'), logs: document.querySelector('#logs'),
  log(text) { const node = document.createElement('div'); node.className = 'log'; node.textContent = text; this.logs.prepend(node); },
};
const escapeHtml = (value) => { const node = document.createElement('div'); node.textContent = value; return node.innerHTML; };
const bus = createEventBus();
const repository = await createMessageRepository();
const worker = new Worker(new URL('./text-worker.js', import.meta.url), { type: 'module' });

async function renderMessages() {
  const records = (await repository.all()).sort((a, b) => b.id - a.id);
  ui.messages.innerHTML = records.length ? records.map((message) => `<div class="message"><div class="meta">#${message.id} · ${new Date(message.createdAt).toLocaleString()}</div><p>${escapeHtml(message.content)}</p><button class="secondary" data-delete="${message.id}">删除</button></div>`).join('') : '<p>数据库里还没有消息。</p>';
}

bus.on('message:saved', async (message) => { ui.log(`列表监听者：收到 message:saved #${message.id}`); await renderMessages(); });
bus.on('message:saved', (message) => { ui.log('统计监听者：把文本 postMessage 给 Worker'); worker.postMessage({ text: message.content }); });
worker.addEventListener('message', (event) => { ui.stats.textContent = `字符数：${event.data.characters}，按空格计算的词数：${event.data.words}`; });

document.querySelector('#save').addEventListener('click', async () => {
  try {
    const message = createMessage(ui.content.value);
    const id = await repository.save(message);
    ui.status.textContent = `Repository 保存成功，id 为 ${id}。`;
    bus.emit('message:saved', { ...message, id });
  } catch (error) { ui.status.textContent = `Domain 拒绝保存：${error.message}`; }
});
document.querySelector('#refresh').addEventListener('click', renderMessages);
ui.messages.addEventListener('click', async (event) => { const id = Number(event.target.dataset.delete); if (id) { await repository.remove(id); ui.log(`Repository：已删除 #${id}`); await renderMessages(); } });
if ('serviceWorker' in navigator) navigator.serviceWorker.register('./service-worker.js').then(() => ui.log('PWA：Service Worker 已注册'));
await renderMessages();
ui.log('应用初始化完成，各模块已经组装。');
