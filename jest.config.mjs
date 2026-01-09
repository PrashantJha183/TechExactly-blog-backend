export default {
  testEnvironment: "node",

  // IMPORTANT for ES modules
  // extensionsToTreatAsEsm: [".js"],

  setupFilesAfterEnv: ["<rootDir>/test/setup.js"],

  testMatch: ["**/test/**/*.test.js"],

  testTimeout: 30000,

  // Ignore build folders
  testPathIgnorePatterns: ["/node_modules/"],
};
