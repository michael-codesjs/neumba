import { pathsToModuleNameMapper, JestConfigWithTsJest } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  verbose: true,
  maxConcurrency: 10,
  testTimeout: 2000000,
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  transform: {
    '^.+\\.ts?$': ['ts-jest', {
      tsconfig: "tsconfig.json",
      isolatedModules: true
    }]
  },
  moduleDirectories: ['node_modules', "."]
};

export default jestConfig;