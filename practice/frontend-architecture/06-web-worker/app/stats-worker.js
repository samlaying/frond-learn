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

self.addEventListener('message', (event) => {
  if (event.data.type !== 'count-primes') return;
  const startedAt = performance.now();
  const count = countPrimes(event.data.limit);
  self.postMessage({ type: 'primes:counted', count, duration: performance.now() - startedAt });
});
