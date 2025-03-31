module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {},
  // testMatch: ['**/tests/*.test.ts'], // Only test files inside `tests/` folder
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  }
};

