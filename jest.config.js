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
  POSTGRESQLCONNSTR_HOST: 'localhost',
  POSTGRESQLCONNSTR_USER: 'postgres',
  POSTGRESQLCONNSTR_PORT: 5432,
  POSTGRESQLCONNSTR_DB: 'dev',
  POSTGRESQLCONNSTR_PASSWORD: 'password'
});