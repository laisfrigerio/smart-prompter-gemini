module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};