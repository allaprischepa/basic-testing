import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    const callback = jest.fn();
    const timeout = 4000;

    doStuffByTimeout(callback, timeout);

    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);

    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 4000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    const callback = jest.fn();
    const timeout = 4000;

    doStuffByInterval(callback, timeout);

    expect(setIntervalSpy).toHaveBeenCalledWith(callback, timeout);

    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 4000;

    doStuffByInterval(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(timeout * 2);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const pathSpyOn = jest.spyOn(path, 'join');

    const pathToFile = 'someFolder/someFile.txt';

    await readFileAsynchronously(pathToFile);

    expect(pathSpyOn).toHaveBeenCalled();
    expect(pathSpyOn).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const pathToFile = 'someFolder/someFile.txt';

    await expect(readFileAsynchronously(pathToFile)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = `Duis leo.

Mauris sollicitudin fermentum libero.

Etiam feugiat lorem non metus.`;

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(fileContent);

    const pathToFile = 'someFolder/someFile.txt';

    await expect(readFileAsynchronously(pathToFile)).resolves.toBe(fileContent);
  });
});
