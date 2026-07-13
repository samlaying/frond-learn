import { createDraftRepository } from './db.js';

const content = document.querySelector('#content');
const drafts = document.querySelector('#drafts');
const log = document.querySelector('#log');
const saveButton = document.querySelector('#save');
const reloadButton = document.querySelector('#reload');

function writeLog(message) { log.textContent = message; }
function escapeHtml(value) { const node = document.createElement('div'); node.textContent = value; return node.innerHTML; }

try {
  const repository = await createDraftRepository();

  async function renderDrafts() {
    const records = (await repository.getAll()).sort((a, b) => b.id - a.id);
    drafts.innerHTML = records.length ? records.map((draft) => `
      <div class="draft"><strong>#${draft.id}</strong><p>${escapeHtml(draft.content)}</p><small>${new Date(draft.createdAt).toLocaleString()}</small><div class="row"><button class="secondary" data-delete="${draft.id}">删除</button></div></div>`).join('') : '<p>还没有草稿。</p>';
    writeLog(`读取完成：对象仓库里有 ${records.length} 条草稿。`);
  }

  saveButton.addEventListener('click', async () => {
    const value = content.value.trim();
    if (!value) return writeLog('业务判断：空内容不保存。');
    const id = await repository.add(value);
    writeLog(`写入成功：IndexedDB 生成了 id ${id}。`);
    await renderDrafts();
  });
  reloadButton.addEventListener('click', renderDrafts);
  drafts.addEventListener('click', async (event) => {
    const id = Number(event.target.dataset.delete);
    if (!id) return;
    await repository.remove(id);
    await renderDrafts();
  });
  await renderDrafts();
} catch (error) {
  writeLog(`数据库打开失败：${error.message}`);
}
