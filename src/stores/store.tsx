import { makeAutoObservable } from 'mobx';
import { fetchData } from '../data/api';
import { IRepository, Sort } from '../model/store';
import { AxiosError } from 'axios';
import { ICardProps } from '../model/card';

class Store {
  items: IRepository[] = [];
  sort: Sort = 'stars';
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

  setSort(sort: Sort) {
    this.sort = sort;
    this.items = [];
    this.fetchItems();
  }

  async fetchItems() {
    this.toggleLoading();
    try {
      const newItems = await fetchData(
        this.currentPage,
        this.itemsPerPage,
        this.sort,
      );
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

  updateItem(
    id: IRepository['id'],
    updatedItem: Pick<ICardProps, 'name' | 'ownerName' | 'description'>,
  ) {
    const index = this.items.findIndex((item) => item.id === id);
    const item = this.items[index];
    if (index !== -1) {
      this.items[index] = {
        ...item,
        name: updatedItem.name,
        owner: {
          ...item.owner,
          login: updatedItem.ownerName
            ? updatedItem.ownerName
            : item.owner.login,
        },
        description: updatedItem.description,
      };
    }
  }
}

export default new Store();
