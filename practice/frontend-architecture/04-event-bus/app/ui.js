export function createUI({ messageInput, logEl, sendBtn, fillBtn, toggleBtn, typingBtn, clearTypingBtn }) {
  const unreadEl = document.createElement('div');
  unreadEl.className = 'note';
  unreadEl.style.marginTop = '12px';
  unreadEl.textContent = '未读数：0';
  logEl.parentElement.insertBefore(unreadEl, logEl);

  const typingEl = document.createElement('div');
  typingEl.className = 'note';
  typingEl.style.marginTop = '12px';
  typingEl.textContent = '正在输入：否';
  logEl.parentElement.insertBefore(typingEl, logEl);

  function appendLog(message) {
    const item = document.createElement('div');
    item.className = 'log-item';
    item.textContent = message;
    logEl.appendChild(item);
  }

  function appendMessageItem(message) {
    const item = document.createElement('div');
    item.className = 'log-item ok';
    item.textContent = message;
    logEl.appendChild(item);
  }

  function setUnreadCount(updater) {
    const current = Number(unreadEl.dataset.count || '0');
    const next = updater(current);
    unreadEl.dataset.count = String(next);
    unreadEl.textContent = `未读数：${next}`;
  }

  function setTypingState(isTyping, time = '') {
    typingEl.textContent = isTyping ? `正在输入：是${time ? `（${time}）` : ''}` : '正在输入：否';
  }

  function bindHandlers({ onSend, onFill, onToggle, onTyping, onClearTyping }) {
    sendBtn.addEventListener('click', onSend);
    fillBtn.addEventListener('click', onFill);
    toggleBtn.addEventListener('click', onToggle);
    typingBtn.addEventListener('click', onTyping);
    clearTypingBtn.addEventListener('click', onClearTyping);
  }

  return {
    appendLog,
    appendMessageItem,
    setUnreadCount,
    setTypingState,
    bindHandlers,
    setMessage(text) {
      messageInput.value = text;
    },
    getMessage() {
      return messageInput.value;
    },
  };
}
