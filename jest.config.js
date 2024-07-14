const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  reporters: [ "default", "jest-junit" ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src' }),
  testMatch: ['**/*.test.ts']
};

process.env = Object.assign(process.env, {
  TEST: true,
  PORT: 3001,
  LOG_FORMAT: 'dev',
  LOG_DIR: '../../logs',
  ORIGIN: "*",
  CREDENTIALS: true,
  DB_HOST: 'localhost',
  DB_USER: 'postgres',
  DB_PORT: 5432,
  DB_DB: 'dev',
  DB_PASSWORD: 'password'
});