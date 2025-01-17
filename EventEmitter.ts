class EventEmitter {
  private listeners: Map<string, Function[]> = new Map();

  on(eventName: string, listener: Function): void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    this.listeners.get(eventName)?.push(listener);
  }

  emit(eventName: string, ...args: Array<Object>): void {
    const eventListeners = this.listeners.get(eventName);
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(...args));
    }
  }

  off(eventName: string, listener: Function): void {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (registeredListener) => registeredListener !== listener,
      );
    }
  }
}

const emitter = new EventEmitter();

// Подписка
const logData = (data) => console.log(data);
const logData2 = (data) => console.log(data.map((item) => item.message));
emitter.on('data', logData);
emitter.on('data', logData2);

// Испускание события
emitter.emit('data', [
  { message: 'Hello, world!' },
  { message: 'Hello, world1!' },
]);

// Удаление конкретного обработчика
emitter.off('data', logData);
