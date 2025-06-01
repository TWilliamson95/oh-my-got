export default {
  rootDir: "./",
  moduleDirectories: ["node_modules"],
  testTimeout: 600000,
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testMatch: ["**/tests/*.test.ts"],
};
