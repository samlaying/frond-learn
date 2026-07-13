export async function sendMessage(payload) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  if (payload.content.includes('失败')) {
    throw new Error('服务器拒绝接收消息');
  }
  return { messageId: `MSG-${Math.floor(Math.random() * 9000) + 1000}` };
}

