module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
      '**/__tests__/**/*.test.ts',
      '**/?(*.)+(spec|test).ts',
    ],
    moduleFileExtensions: ['ts', 'js', 'json'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
      'src/**/*.controller.ts',
      'src/**/*.service.ts',
    ],
  };