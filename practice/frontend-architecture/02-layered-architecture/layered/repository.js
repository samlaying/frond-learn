export async function saveReplyDraft(payload, latency = 700) {
  await new Promise((resolve) => setTimeout(resolve, latency));
  if (payload.content.includes('失败')) {
    throw new Error('后端保存失败，请稍后重试');
  }
  return {
    ok: true,
    savedAt: new Date().toLocaleTimeString('zh-CN'),
    revision: Math.floor(Math.random() * 9000) + 1000,
  };
}

