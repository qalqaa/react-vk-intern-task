import { makeAutoObservable } from 'mobx';
import { fetchData } from '../data/api';
import { IRepository } from '../model/store';

class Store {
  items: IRepository[] = [];
  currentPage: number = 1;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
  //TODO: Сделать что-то по типу lazyload-а

  async fetchItems() {
    this.loading = true;
    const newItems = await fetchData(this.currentPage);
    this.items = [...this.items, ...newItems];
    this.currentPage += 1;
    this.loading = false;
  }

  removeItem(id: IRepository['id']) {
    this.items = this.items.filter((item) => item.id !== id);
  }

  updateItem(id: IRepository['id'], updatedItem: IRepository) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.items[index] = updatedItem;
    }
  }
}

export default Store;
