import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const a = 14;
    const b = 5;
    const action = Action.Add;

    expect(simpleCalculator({ a, b, action })).toEqual(a + b);
  });

  test('should subtract two numbers', () => {
    const a = 18;
    const b = 7;
    const action = Action.Subtract;

    expect(simpleCalculator({ a, b, action })).toEqual(a - b);
  });

  test('should multiply two numbers', () => {
    const a = 6;
    const b = 12;
    const action = Action.Multiply;

    expect(simpleCalculator({ a, b, action })).toEqual(a * b);
  });

  test('should divide two numbers', () => {
    const a = 18;
    const b = 3;
    const action = Action.Divide;

    expect(simpleCalculator({ a, b, action })).toEqual(a / b);
  });

  test('should exponentiate two numbers', () => {
    const a = 4;
    const b = 8;
    const action = Action.Exponentiate;

    expect(simpleCalculator({ a, b, action })).toEqual(a ** b);
  });

  test('should return null for invalid action', () => {
    const a = 12;
    const b = 9;
    const invalidActions = ['?', '$', '&', '@', 7, 0, '|'];

    invalidActions.forEach((action) => {
      expect(simpleCalculator({ a, b, action })).toBeNull();
    });
  });

  test('should return null for invalid arguments', () => {
    const action = Action.Add;
    const invalidArguments = [
      { a: 12, b: '164' },
      { a: 'Fusce', b: 3 },
      { a: '115', b: '98' },
      { a: 'Fusce', b: 'Vestibulum' },
      { a: null, b: 45 },
      { a: 4, b: { some: 'some' } },
      { a: 9, b: [1, 2, 3] },
    ];

    invalidArguments.forEach((arg) => {
      expect(simpleCalculator({ a: arg.a, b: arg.b, action })).toBeNull();
    });
  });
});
