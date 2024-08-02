import { MikroORM, RequestContext } from "@mikro-orm/core";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from "@config";
import { DI, dbConfig } from "@database";
import { UserEntity } from "@entities/users.entity";
import { IRoute } from "@interfaces/route.interface";
import { ErrorMiddleware } from "@middlewares/error.middleware";
import { logger, stream } from "@utils/logger";

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    try {
      DI.orm = await MikroORM.init(dbConfig);
      DI.em = DI.orm.em;
      DI.user = DI.em.getRepository(UserEntity);
    } catch (error) {
      logger.error(error);
    } finally {
      this.app.use((_1, _2, next) => RequestContext.create(DI.orm.em, next));
    }
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT!, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: IRoute[]) {
    routes.forEach(route => {
      this.app.use("/", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
