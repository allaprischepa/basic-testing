import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 12, b: 17, action: Action.Add, expected: 29 },
  { a: 9, b: 72, action: Action.Add, expected: 81 },

  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 30, b: 2, action: Action.Subtract, expected: 28 },
  { a: 17, b: 10, action: Action.Subtract, expected: 7 },
  { a: 17, b: 20, action: Action.Subtract, expected: -3 },

  { a: 5, b: 2, action: Action.Multiply, expected: 10 },
  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 30, b: 2, action: Action.Multiply, expected: 60 },
  { a: 17, b: 10, action: Action.Multiply, expected: 170 },
  { a: 17, b: -4, action: Action.Multiply, expected: -68 },

  { a: 5, b: 2, action: Action.Divide, expected: 2.5 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 30, b: 2, action: Action.Divide, expected: 15 },
  { a: 17, b: 10, action: Action.Divide, expected: 1.7 },
  { a: 28, b: -4, action: Action.Divide, expected: -7 },

  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 6, b: 2, action: Action.Exponentiate, expected: 36 },
  { a: 30, b: 2, action: Action.Exponentiate, expected: 900 },
  { a: 7, b: 5, action: Action.Exponentiate, expected: 16807 },
  { a: 5, b: -1, action: Action.Exponentiate, expected: 0.2 },

  { a: 5, b: 2, action: '?', expected: null },
  { a: 6, b: 2, action: '%', expected: null },
  { a: 30, b: 2, action: '&', expected: null },
  { a: 7, b: 5, action: 7, expected: null },
  { a: 5, b: -1, action: null, expected: null },

  { a: 12, b: '164', action: Action.Add, expected: null },
  { a: 'Fusce', b: '98', action: Action.Add, expected: null },
  { a: null, b: 45, action: Action.Add, expected: null },
  { a: 4, b: { some: 'some' }, action: Action.Add, expected: null },
  { a: 9, b: [1, 2, 3], action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should perform $action on $a and $b and return $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
