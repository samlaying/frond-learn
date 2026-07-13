export function createEventBus() {
  const listeners = new Map();

  function on(type, handler) {
    if (!listeners.has(type)) {
      listeners.set(type, new Set());
    }
    listeners.get(type).add(handler);

    return () => off(type, handler);
  }

  function emit(type, payload) {
    const handlers = listeners.get(type);
    if (!handlers || handlers.size === 0) {
      return;
    }

    [...handlers].forEach((handler) => {
      handler(payload);
    });
  }

  function off(type, handler) {
    const handlers = listeners.get(type);
    if (!handlers) {
      return;
    }

    handlers.delete(handler);
    if (handlers.size === 0) {
      listeners.delete(type);
    }
  }

  return { on, emit, off };
}
