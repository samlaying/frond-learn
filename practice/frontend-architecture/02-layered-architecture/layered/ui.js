export function wireUI({ draftEl, metaEl, statusEl, resultBox, bizStateEl, lastActionEl }) {
  function setMeta(length, maxLength) {
    metaEl.textContent = `字数：${length} / ${maxLength}`;
    metaEl.className = `small ${length > maxLength ? 'error' : ''}`;
  }

  function setStatus(text, tone = 'neutral') {
    statusEl.textContent = text;
    statusEl.style.background = tone === 'good' ? 'rgba(69, 209, 159, 0.12)' : 'rgba(245, 177, 76, 0.12)';
    statusEl.style.color = tone === 'good' ? '#b6ffe8' : '#ffd79a';
  }

  function setResult(message, ok = true) {
    resultBox.innerHTML = `
      <div class="label">保存结果</div>
      <div class="${ok ? 'ok' : 'error'}">${message}</div>
    `;
  }

  function setBizState(message) {
    bizStateEl.textContent = message;
  }

  function setLastAction(message) {
    lastActionEl.textContent = message;
  }

  return { setMeta, setStatus, setResult, setBizState, setLastAction };
}

