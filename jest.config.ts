export default {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    resetMocks: true,
    testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
    transformIgnorePatterns: ["/node_modules/"],
    preset: "ts-jest",
    testEnvironment: "node",
};
