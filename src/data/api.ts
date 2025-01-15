import axios, { AxiosError } from 'axios';

export const fetchData = async (
  page: number,
  perPage: number,
  sort?: string,
) => {
  try {
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=javascript${
        sort ? `&sort=${sort}` : ''
      }&order=asc&page=${page}&per_page=${perPage}`,
    );
    return response.data.items;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(`Error ${error.code}:`, error.message);
      throw error;
    } else {
      console.error('Unexpected error:', error);
      throw error;
    }
  }
};
