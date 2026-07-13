const limitInput = document.querySelector('#limit');
const log = document.querySelector('#log');
const worker = new Worker(new URL('./stats-worker.js', import.meta.url), { type: 'module' });

function countPrimes(limit) {
  let count = 0;
  for (let value = 2; value <= limit; value += 1) {
    let prime = true;
    for (let divisor = 2; divisor * divisor <= value; divisor += 1) {
      if (value % divisor === 0) { prime = false; break; }
    }
    if (prime) count += 1;
  }
  return count;
}

document.querySelector('#main').addEventListener('click', () => {
  const limit = Number(limitInput.value);
  log.textContent = '主线程开始计算。注意观察圆点是否停住...';
  requestAnimationFrame(() => setTimeout(() => {
    const startedAt = performance.now();
    const count = countPrimes(limit);
    log.textContent = `主线程完成：${count} 个质数，用时 ${(performance.now() - startedAt).toFixed(0)} ms。计算期间页面动画被阻塞。`;
  }, 0));
});

document.querySelector('#worker').addEventListener('click', () => {
  log.textContent = '主线程只发送任务，Worker 正在计算。圆点应该继续移动。';
  worker.postMessage({ type: 'count-primes', limit: Number(limitInput.value) });
});

worker.addEventListener('message', (event) => {
  const { count, duration } = event.data;
  log.textContent = `Worker 完成：${count} 个质数，用时 ${duration.toFixed(0)} ms。重点不是更快，而是页面没有被计算卡住。`;
});
