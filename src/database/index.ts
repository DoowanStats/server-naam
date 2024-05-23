import {
  EntityManager,
  EntityRepository,
  MikroORM,
  Options,
  PostgreSqlDriver,
} from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import {
  NODE_ENV,
  POSTGRESQLCONNSTR_HOST,
  POSTGRESQLCONNSTR_PORT,
  POSTGRESQLCONNSTR_DB,
  POSTGRESQLCONNSTR_USER,
  POSTGRESQLCONNSTR_PASSWORD,
} from "@config";
import { UserEntity } from "@entities/users.entity";

export const dbConfig: Options = {
  driver: PostgreSqlDriver,
  tsNode: process.env.NODE_DEV === "true",
  user: POSTGRESQLCONNSTR_USER,
  password: POSTGRESQLCONNSTR_PASSWORD,
  dbName: POSTGRESQLCONNSTR_DB,
  host: POSTGRESQLCONNSTR_HOST,
  port: parseInt(POSTGRESQLCONNSTR_PORT!, 10),
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  metadataProvider: TsMorphMetadataProvider,
  debug: NODE_ENV === "dev",
};

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  user: EntityRepository<UserEntity>;
};
