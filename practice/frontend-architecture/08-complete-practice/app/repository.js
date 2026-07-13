function asPromise(request) {
  return new Promise((resolve, reject) => { request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); });
}
export async function createMessageRepository() {
  const db = await new Promise((resolve, reject) => {
    const request = indexedDB.open('offline-message-workbench', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  const store = (mode) => db.transaction('messages', mode).objectStore('messages');
  return {
    save(message) { return asPromise(store('readwrite').add(message)); },
    all() { return asPromise(store('readonly').getAll()); },
    remove(id) { return asPromise(store('readwrite').delete(id)); },
  };
}
