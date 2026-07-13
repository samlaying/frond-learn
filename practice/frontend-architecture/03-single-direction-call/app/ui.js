export function createLogger(logEl) {
  return function addLog(text) {
    const item = document.createElement('div');
    item.className = 'log-item';
    item.textContent = text;
    logEl.prepend(item);
  };
}

export function wireUI({ msgEl, sendBtn, fillBtn, badBtn, logEl }) {
  const addLog = createLogger(logEl);

  function renderInitialState(defaultMessage) {
    msgEl.value = defaultMessage;
    addLog('UI：页面初始化完成');
  }

  function bindHandlers({ onSend, onFill, onBad }) {
    sendBtn.addEventListener('click', onSend);
    fillBtn.addEventListener('click', onFill);
    badBtn.addEventListener('click', onBad);
  }

  function showSuccess(messageId) {
    addLog(`UI：展示成功，消息已发送 ${messageId}`);
  }

  function showError(message) {
    addLog(`UI：展示失败，原因 ${message}`);
  }

  return {
    addLog,
    bindHandlers,
    renderInitialState,
    showSuccess,
    showError,
  };
}

