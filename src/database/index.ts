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
  NODE_DEV,
  DB_HOST,
  DB_PORT,
  DB_DB,
  DB_USER,
  DB_PASSWORD,
} from "@config";
import { UserEntity } from "@entities/users.entity";

export const dbConfig: Options = {
  driver: PostgreSqlDriver,
  tsNode: NODE_DEV === "true",
  user: DB_USER,
  password: DB_PASSWORD,
  dbName: DB_DB,
  host: DB_HOST,
  port: parseInt(DB_PORT!, 10),
  entities: ["dist/src/entities/*.entity.js"],
  entitiesTs: ["src/entities/*.entity.ts"],
  metadataProvider: TsMorphMetadataProvider,
  debug: NODE_ENV === "development",
};

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  user: EntityRepository<UserEntity>;
};
