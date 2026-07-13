import { MAX_MESSAGE_LENGTH } from './state.js';

export function validateMessage(text) {
  const value = text.trim();
  if (!value) {
    return { ok: false, message: '消息不能为空' };
  }
  if (value.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, message: `消息不能超过 ${MAX_MESSAGE_LENGTH} 字` };
  }
  return { ok: true, value };
}

export function buildMessagePayload(content) {
  return {
    content: content.trim(),
    sentAt: new Date().toISOString(),
  };
}

