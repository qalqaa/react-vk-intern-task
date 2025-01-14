import { makeAutoObservable } from 'mobx';

class Store {
  count = 0;

  get multiplied() {
    return this.count * 2;
  }

  constructor() {
    makeAutoObservable(this);
  }

  increment = (value: number) => {
    this.count += value;
  };

  decrement = (value: number) => {
    this.count -= value;
  };
}

export default new Store();
