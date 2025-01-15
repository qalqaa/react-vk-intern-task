import store from '../stores/store';

export const fetchData = async (
  page: number,
  perPage: number,
  sort?: string,
) => {
  const token = store.accessToken || localStorage.getItem('access_token');
  const url = `https://api.github.com/search/repositories?q=javascript${
    sort ? `&sort=${sort}` : ''
  }&order=asc&page=${page}&per_page=${perPage}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, { method: 'GET', headers });
    if (!response.ok) {
      const errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Unexpected error:', error);
    throw error;
  }
};

export const goToGithub = async () => {
  window.location.replace(
    `https://github.com/login/oauth/authorize?client_id=${
      import.meta.env.VITE_CLIENT_ID
    }`,
  );
};
