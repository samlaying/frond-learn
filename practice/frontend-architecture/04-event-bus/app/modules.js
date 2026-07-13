export function createSender(bus) {
  return {
    sendMessage(text) {
      const value = text.trim();
      bus.emit('message:sent', {
        id: crypto.randomUUID(),
        text: value,
        time: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
      });
    },

    startTyping(text) {
      bus.emit('typing:start', {
        text: text.trim(),
        time: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
      });
    },
  };
}

export function createReceiver(bus, ui) {
  const onMessageSent = (payload) => {
    ui.appendLog(`接收模块 A：收到消息 ${payload.id}`);
    ui.appendMessageItem(`消息列表：${payload.time} - ${payload.text}`);
    ui.setUnreadCount((count) => count + 1);
  };

  const onMessageAudit = (payload) => {
    ui.appendLog(`接收模块 B：审计记录 ${payload.id}，长度 ${payload.text.length}`);
  };

  const onTypingStart = (payload) => {
    ui.setTypingState(true, payload.time);
    ui.appendLog(`接收模块 C：收到正在输入，时间 ${payload.time}`);
  };

  const onTypingClear = () => {
    ui.setTypingState(false);
    ui.appendLog('接收模块 C：清空正在输入状态');
  };

  const stopAudit = bus.on('message:sent', onMessageAudit);
  const stopTyping = bus.on('typing:start', onTypingStart);
  const stopTypingClear = bus.on('typing:clear', onTypingClear);

  let messageStop = bus.on('message:sent', onMessageSent);

  return {
    toggleMessageListener(enabled) {
      if (enabled && !messageStop) {
        messageStop = bus.on('message:sent', onMessageSent);
        ui.appendLog('接收模块 A：重新订阅 message:sent');
        return;
      }

      if (!enabled && messageStop) {
        messageStop();
        messageStop = null;
        ui.appendLog('接收模块 A：取消订阅 message:sent');
      }
    },

    clearTyping() {
      bus.emit('typing:clear');
    },

    destroy() {
      stopAudit();
      stopTyping();
      stopTypingClear();
      if (messageStop) {
        messageStop();
        messageStop = null;
      }
    },
  };
}
