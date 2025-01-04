export default {
  testEnvironment: 'jsdom',
  transform: { '.(ts|tsx)': 'ts-jest' },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
}
