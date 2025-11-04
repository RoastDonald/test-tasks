const baseConfig = require("jest-expo/jest-preset");

module.exports = {
  ...baseConfig,

  testEnvironment: "jsdom",

  setupFiles: ["<rootDir>/jest.setup.js"],
  setupFilesAfterEnv: [],

  transform: baseConfig.transform,
  testMatch: ["**/__tests__/**/*.test.(ts|tsx|js)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  collectCoverageFrom: [
    "hooks/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "app/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/__tests__/**",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",

    "^react-native$": "react-native-web",
    ...(baseConfig.moduleNameMapper || {}),
  },
};
