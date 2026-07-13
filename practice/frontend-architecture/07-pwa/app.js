const network = document.querySelector('#network');
const workerStatus = document.querySelector('#worker');
const installButton = document.querySelector('#install');
let installPrompt;

function updateNetwork() {
  network.textContent = navigator.onLine ? '在线：资源优先走网络' : '离线：页面正在使用缓存';
}
window.addEventListener('online', updateNetwork);
window.addEventListener('offline', updateNetwork);
updateNetwork();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => { workerStatus.textContent = 'Service Worker 注册成功。刷新后它会接管页面。'; })
    .catch((error) => { workerStatus.textContent = `注册失败：${error.message}`; });
} else {
  workerStatus.textContent = '当前浏览器不支持 Service Worker。';
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.hidden = false;
});
installButton.addEventListener('click', async () => {
  await installPrompt.prompt();
  installPrompt = undefined;
  installButton.hidden = true;
});
