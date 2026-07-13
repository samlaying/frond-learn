import { MAX_LENGTH } from './state.js';

export function validateDraft(content) {
  const trimmed = content.trim();
  if (!trimmed) {
    return { ok: false, message: '回复不能为空' };
  }
  if (trimmed.length > MAX_LENGTH) {
    return { ok: false, message: `回复不能超过 ${MAX_LENGTH} 字` };
  }
  return { ok: true };
}

export function buildDraftPayload(ticketId, content) {
  return {
    ticketId,
    content: content.trim(),
    updatedAt: new Date().toISOString(),
  };
}

