import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { WriteUserParameter } from '@dtos/users.dto';
import IRoute from '@interfaces/route.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class UserRoute implements IRoute {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.user.getUsers);
    this.router.get(`${this.path}/:id`, this.user.getUserById);
    this.router.post(`${this.path}`, ValidationMiddleware(WriteUserParameter), this.user.createUser);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(WriteUserParameter, true), this.user.updateUser);
    this.router.delete(`${this.path}/:id`, this.user.deleteUser);
  }
}
