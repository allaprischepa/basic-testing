import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    const initialBalance = 2000;
    const account = getBankAccount(initialBalance);

    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(2000);
    const withdrawAmount = 5000;

    try {
      account.withdraw(withdrawAmount);
    } catch (error) {
      expect(error).toBeInstanceOf(InsufficientFundsError);
    }
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(2000);
    const toAccount = getBankAccount(2000);
    const transferAmount = 5000;

    try {
      account.transfer(transferAmount, toAccount);
    } catch (error) {
      expect(error).toBeInstanceOf(InsufficientFundsError);
    }
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(2000);
    const transferAmount = 5000;

    try {
      account.transfer(transferAmount, account);
    } catch (error) {
      expect(error).toBeInstanceOf(TransferFailedError);
    }
  });

  test('should deposit money', () => {
    const initialBalance = 2000;
    const account = getBankAccount(initialBalance);
    const depositAmount = 5000;
    const total = initialBalance + depositAmount;

    expect(account.deposit(depositAmount).getBalance()).toBe(total);
  });

  test('should withdraw money', () => {
    const initialBalance = 2000;
    const account = getBankAccount(initialBalance);
    const withdrawAmount = 1500;
    const total = initialBalance - withdrawAmount;

    expect(account.withdraw(withdrawAmount).getBalance()).toBe(total);
  });

  test('should transfer money', () => {
    const initialBalance = 2000;
    const account = getBankAccount(initialBalance);
    const toAccount = getBankAccount(initialBalance);
    const transferAmount = 1500;

    account.transfer(transferAmount, toAccount);

    expect(account.getBalance()).toBe(initialBalance - transferAmount);
    expect(toAccount.getBalance()).toBe(initialBalance + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(1);

    const account = getBankAccount(2000);
    const result = await account.fetchBalance();

    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(2000);
    const newBalance = 300;

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(newBalance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(2000);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toBeInstanceOf(
      SynchronizationFailedError,
    );
  });
});
