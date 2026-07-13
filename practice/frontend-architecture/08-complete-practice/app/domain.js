export function createMessage(content) {
  const normalized = content.trim();
  if (!normalized) throw new Error('消息不能为空');
  if (normalized.length > 500) throw new Error('消息不能超过 500 个字符');
  return { content: normalized, createdAt: new Date().toISOString() };
}
