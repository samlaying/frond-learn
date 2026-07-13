import { ticket, defaultDraft, MAX_LENGTH } from './state.js';
import { validateDraft, buildDraftPayload } from './domain.js';
import { saveReplyDraft } from './repository.js';
import { wireUI } from './ui.js';

const draftEl = document.querySelector('#draft');
const metaEl = document.querySelector('#meta');
const statusEl = document.querySelector('#status');
const resultBox = document.querySelector('#resultBox');
const bizStateEl = document.querySelector('#bizState');
const lastActionEl = document.querySelector('#lastAction');
const saveBtn = document.querySelector('#saveBtn');
const templateBtn = document.querySelector('#templateBtn');
const simulateSlowBtn = document.querySelector('#simulateSlowBtn');
const clearBtn = document.querySelector('#clearBtn');

const ui = wireUI({ draftEl, metaEl, statusEl, resultBox, bizStateEl, lastActionEl });

let draft = defaultDraft;
let latency = 700;

function renderDraft() {
  draftEl.value = draft;
  ui.setMeta(draft.trim().length, MAX_LENGTH);
  ui.setBizState(`当前工单 ${ticket.id} 正在处理，草稿由业务层校验后再提交。`);
}

function syncDraft(value) {
  draft = value;
  ui.setMeta(draft.trim().length, MAX_LENGTH);
  ui.setBizState('草稿已变更，等待保存。');
}

draftEl.addEventListener('input', (event) => {
  syncDraft(event.target.value);
});

templateBtn.addEventListener('click', () => {
  syncDraft('您好，已联系快递公司核实签收记录，预计 30 分钟内反馈最新进展。');
  renderDraft();
  ui.setLastAction('已插入模板回复');
  ui.setStatus('模板已填充', 'good');
});

simulateSlowBtn.addEventListener('click', () => {
  latency = latency === 700 ? 1800 : 700;
  ui.setLastAction(latency > 700 ? '已切到慢网模拟' : '已切回正常网络');
  ui.setStatus(latency > 700 ? '模拟慢网' : '正常网络', latency > 700 ? 'neutral' : 'good');
});

clearBtn.addEventListener('click', () => {
  syncDraft('');
  renderDraft();
  ui.setLastAction('草稿已清空');
  ui.setStatus('草稿清空', 'neutral');
  ui.setResult('还没有保存。', true);
});

saveBtn.addEventListener('click', async () => {
  const checked = validateDraft(draft);
  if (!checked.ok) {
    ui.setStatus('保存失败', 'neutral');
    ui.setResult(checked.message, false);
    ui.setLastAction('业务校验未通过');
    return;
  }

  const payload = buildDraftPayload(ticket.id, draft);
  ui.setStatus('保存中...', 'neutral');
  ui.setResult('正在向后端提交...', true);
  ui.setLastAction('业务校验通过，准备调用通讯层');

  try {
    const response = await saveReplyDraft(payload, latency);
    ui.setStatus('保存成功', 'good');
    ui.setResult(`草稿已保存，版本 ${response.revision}，时间 ${response.savedAt}`, true);
    ui.setLastAction('通讯层返回成功');
  } catch (error) {
    ui.setStatus('保存失败', 'neutral');
    ui.setResult(error.message, false);
    ui.setLastAction('通讯层返回错误');
  }
});

renderDraft();
ui.setResult('还没有保存。', true);

