import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/__test__/*'],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 15,
      functions: 15,
      lines: 50,
    },
  },
  moduleNameMapper: {
    '^api/(.*)': '<rootDir>/src/api/$1',
    '^app': '<rootDir>/src/app',
    '^config': '<rootDir>/src/config',
    '^services/(.*)': '<rootDir>/src/services/$1',
    '^setupTests': '<rootDir>/src/setupTests',
    '^testHelpers/(.*)': '<rootDir>/src/testHelpers/$1',
    '^utilities/(.*)': '<rootDir>/src/utilities/$1',
  },
}

export default config
