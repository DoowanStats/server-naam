import { Router } from "express";
import { UserController } from "@controllers/users.controller";
import { WriteUserParameter } from "@dtos/users.dto";
import { IRoute } from "@interfaces/route.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";

export class UserRoute implements IRoute {
  public path = "/users";
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, ValidationMiddleware(WriteUserParameter), this.user.create);
    this.router.get(`${this.path}/:id`, this.user.read);
    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(WriteUserParameter, true),
      this.user.update,
    );
    this.router.delete(`${this.path}/:id`, this.user.delete);
  }
}
