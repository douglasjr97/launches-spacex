module.exports = {
    testPathIgnorePatterns: ["/node_modules", "/.next"],
    setupFilesAfterEnv: [
        "<rootDir>/src/test/setupTests.ts"
    ],
    transform:{
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>"
    },
    testEnvironment: 'jsdom',
    clearMocks: true
};