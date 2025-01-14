import { makeAutoObservable } from 'mobx';
import { fetchData } from '../data/api';
import { IRepository } from '../model/store';
import { AxiosError } from 'axios';

class Store {
  items: IRepository[] = [];
  currentPage: number = 1;
  loading: boolean = false;
  error: string | null = null;
  itemsPerPage: number = 30;

  constructor() {
    makeAutoObservable(this);
  }

  toggleLoading() {
    this.loading = !this.loading;
  }

  setNewItems(newItems: IRepository[]) {
    this.items = [...this.items, ...newItems];
  }

  setError(message: string | null) {
    this.error = message;
  }

  async fetchItems() {
    this.toggleLoading();
    try {
      const newItems = await fetchData(this.currentPage, this.itemsPerPage);
      this.setNewItems(newItems);
      this.currentPage += 1;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'Failed to fetch data';
        this.setError(`Error: ${errorMessage}`);
      } else {
        this.setError('Unexpected error occurred');
      }
    } finally {
      this.toggleLoading();
    }
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

export default new Store();
