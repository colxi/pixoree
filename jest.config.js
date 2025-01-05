// import '@testing-library/jest-dom'

// const config = {
//   testEnvironment: 'jsdom',
//   // transform: { '.(ts|tsx)': 'ts-jest' },
//   transform: {},

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.ts?$': 'ts-jest',
  },
  // rootDir: 'src',

  rootDir: 'src',

  moduleNameMapper: {
    //   // '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
  modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'],
}
