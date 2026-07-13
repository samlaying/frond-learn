import { createEventBus } from './event-bus.js';
import { createSender, createReceiver } from './modules.js';
import { createUI } from './ui.js';

const messageInput = document.querySelector('#messageInput');
const logEl = document.querySelector('#log');
const sendBtn = document.querySelector('#sendBtn');
const fillBtn = document.querySelector('#fillBtn');
const toggleBtn = document.querySelector('#toggleBtn');
const typingBtn = document.querySelector('#typingBtn');
const clearTypingBtn = document.querySelector('#clearTypingBtn');

const ui = createUI({ messageInput, logEl, sendBtn, fillBtn, toggleBtn, typingBtn, clearTypingBtn });
const bus = createEventBus();
const sender = createSender(bus);
const receiver = createReceiver(bus, ui);

let messageListenerEnabled = true;

ui.appendLog('Event Bus 初始化完成。');

ui.bindHandlers({
  onSend() {
    const value = ui.getMessage();
    ui.appendLog('发送模块：准备 emit message:sent');
    sender.sendMessage(value);
  },
  onFill() {
    ui.setMessage('你好，这是一条用于测试多个监听者的消息。');
    ui.appendLog('UI：已填充示例消息');
  },
  onToggle() {
    messageListenerEnabled = !messageListenerEnabled;
    receiver.toggleMessageListener(messageListenerEnabled);
  },
  onTyping() {
    ui.appendLog('发送模块：准备 emit typing:start');
    sender.startTyping(ui.getMessage());
  },
  onClearTyping() {
    ui.appendLog('发送模块：准备 emit typing:clear');
    receiver.clearTyping();
  },
});
