import { defaultMessage } from './state.js';
import { validateMessage, buildMessagePayload } from './domain.js';
import { sendMessage } from './repository.js';
import { wireUI } from './ui.js';

const msgEl = document.querySelector('#msg');
const logEl = document.querySelector('#log');
const sendBtn = document.querySelector('#sendBtn');
const fillBtn = document.querySelector('#fillBtn');
const badBtn = document.querySelector('#badBtn');

const ui = wireUI({ msgEl, sendBtn, fillBtn, badBtn, logEl });

ui.renderInitialState(defaultMessage);

async function handleSendClick() {
  ui.addLog('UI：点击发送按钮');
  ui.addLog('UI：把输入值交给业务层');

  const checked = validateMessage(msgEl.value);
  if (!checked.ok) {
    ui.addLog(`业务层：校验失败 - ${checked.message}`);
    return;
  }

  const payload = buildMessagePayload(checked.value);
  ui.addLog('业务层：payload 组装完成');
  ui.addLog('业务层：把 payload 交给通讯层');

  try {
    const response = await sendMessage(payload);
    ui.showSuccess(response.messageId);
  } catch (error) {
    ui.showError(error.message);
  }
}

function handleFillClick() {
  msgEl.value = defaultMessage;
  ui.addLog('UI：填充示例消息');
}

function handleBadClick() {
  ui.addLog('坏设计示意：如果通讯层反过来去改 UI，结构就会乱');
  ui.addLog('坏设计示意：如果业务层直接操作按钮，也会让职责混在一起');
  ui.addLog('正确做法：上层调用下层，下层只返回结果，不碰上层页面');
}

ui.bindHandlers({
  onSend: handleSendClick,
  onFill: handleFillClick,
  onBad: handleBadClick,
});

