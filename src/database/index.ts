import { EntityManager, MikroORM } from '@mikro-orm/core';
import { NODE_ENV, POSTGRESQLCONNSTR_HOST, POSTGRESQLCONNSTR_PORT, POSTGRESQLCONNSTR_DB, POSTGRESQLCONNSTR_USER, POSTGRESQLCONNSTR_PASSWORD } from '@config';

export const dbOptions = {
  tsNode: process.env.NODE_DEV === 'true',
  user: POSTGRESQLCONNSTR_USER,
  password: POSTGRESQLCONNSTR_PASSWORD,
  dbName: POSTGRESQLCONNSTR_DB,
  host: POSTGRESQLCONNSTR_HOST,
  port: POSTGRESQLCONNSTR_PORT,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  type: 'postgresql',
  debug: NODE_ENV === 'development',
} as Parameters<typeof MikroORM.init>[0];;

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
};
