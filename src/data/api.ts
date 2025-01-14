export const fetchData = async (page: number) => {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=${page}`,
  );
  const data = await response.json();
  return data.items;
};
