const fromPairs = pairs => pairs.reduce((res, [key, value]) => ({
    ...res,
    [key]: value
}), {})

function moduleNameMapperFromTSPaths(tsconfig) {
    return fromPairs(
        Object.entries(tsconfig.compilerOptions.paths).map(([k, [v]]) => [
            `^${k.replace(/\*/, "(.*)")}`,
            `<rootDir>/${v.replace(/\*/, "$1")}`,
        ]),
    )
}
const tsconfig = require("./tsconfig.json")
const moduleNameMapper = moduleNameMapperFromTSPaths(tsconfig)

module.exports = {
    preset: 'jest-puppeteer',
    testEnvironment: 'jest-environment-puppeteer',
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/dist/',
        '<rootDir>/test/fixtures',
    ],
    coveragePathIgnorePatterns: [
        '<rootDir>/test/',
    ],
    setupFilesAfterEnv: [
      '<rootDir>/jest.setup.ts'
    ],
    reporters: [ 'default' ],
    transform: {
      '^.+\\.(t|j)s$': '@swc/jest',
    },
    verbose: false,
    moduleNameMapper
};
