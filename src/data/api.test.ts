import { fetchData } from './api';

jest.mock('../stores/store', () => ({
  accessToken: null,
}));

describe('fetchData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('test_fetchData_with_valid_parameters', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ items: [{ id: 1, name: 'repo1' }] }),
    };
    globalThis.fetch = jest.fn().mockResolvedValue(mockResponse);

    const data = await fetchData(1, 10, 'stars');
    expect(data).toEqual([{ id: 1, name: 'repo1' }]);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.github.com/search/repositories'),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('test_fetchData_without_store_accessToken', async () => {
    localStorage.setItem('access_token', 'mock_token');
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ items: [{ id: 1, name: 'repo1' }] }),
    };
    globalThis.fetch = jest.fn().mockResolvedValue(mockResponse);

    await fetchData(1, 10);
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer mock_token',
        }),
      }),
    );
  });

  it('test_fetchData_with_http_error', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: 'Not Found',
    };
    globalThis.fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(fetchData(1, 10)).rejects.toThrow('HTTP Error 404: Not Found');
  });
});
