self.addEventListener('message', (event) => {
  const text = event.data.text;
  const words = text.trim() ? text.trim().split(/\s+/u).length : 0;
  self.postMessage({ characters: [...text].length, words });
});
