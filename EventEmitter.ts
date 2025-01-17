class EventEmitter {
  private listeners: Map<string, Function[]> = new Map();

  on(eventName: string, listener: Function): void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    const listenersForEvent = this.listeners.get(eventName)!;
    listenersForEvent.push(listener);
  }

  emit(eventName: string, ...args: any[]): void {
    const listenersForEvent = this.listeners.get(eventName);
    if (!listenersForEvent || listenersForEvent.length === 0) {
      return;
    }

    for (const listener of listenersForEvent) {
      listener(...args);
    }
  }

  off(eventName: string, listener: Function): void {
    const listenersForEvent = this.listeners.get(eventName);
    if (!listenersForEvent) {
      return;
    }

    this.listeners.set(
      eventName,
      listenersForEvent.filter((l) => l !== listener),
    );

    if (this.listeners.get(eventName)!.length === 0) {
      this.listeners.delete(eventName);
    }
  }
}

const emitter = new EventEmitter();

// Подписка
const logData = (data) => console.log(data);
emitter.on('data', logData);

// Испускание события
emitter.emit('data', { message: 'Hello, world!' });

// Удаление конкретного обработчика
emitter.off('data', logData);
