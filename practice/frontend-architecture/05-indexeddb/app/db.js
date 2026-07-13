const DB_NAME = 'message-learning-db';
const STORE_NAME = 'drafts';

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME)) {
        request.result.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function createDraftRepository() {
  const db = await openDatabase();
  const store = (mode) => db.transaction(STORE_NAME, mode).objectStore(STORE_NAME);
  return {
    add(content) { return requestToPromise(store('readwrite').add({ content, createdAt: new Date().toISOString() })); },
    getAll() { return requestToPromise(store('readonly').getAll()); },
    remove(id) { return requestToPromise(store('readwrite').delete(id)); },
  };
}
