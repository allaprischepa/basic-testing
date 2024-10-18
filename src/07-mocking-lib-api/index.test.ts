import axios, { AxiosInstance } from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  let axiosCreateSpyOn: jest.SpyInstance;
  let mockAxiosInstance: jest.Mocked<AxiosInstance>;
  const userData = { id: 1, name: 'John Doe' };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.unmock('axios');
  });

  beforeEach(() => {
    mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: userData }),
    } as unknown as jest.Mocked<AxiosInstance>;

    axiosCreateSpyOn = jest
      .spyOn(axios, 'create')
      .mockReturnValue(mockAxiosInstance);
  });

  afterEach(() => {
    axiosCreateSpyOn.mockRestore();
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('');

    expect(axiosCreateSpyOn).toHaveBeenCalled();
    expect(axiosCreateSpyOn).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = 'todos';

    await throttledGetDataFromApi(relativePath);

    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const responseData = await throttledGetDataFromApi('users');

    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(responseData).toEqual(userData);
  });
});
