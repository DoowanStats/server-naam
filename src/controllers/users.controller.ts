import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { UserDto, WriteUserParameter } from "@dtos/users.dto";
import { IController } from "@interfaces/controller.interface";
import { UserService } from "@services/users.service";

export class UserController implements IController {
  public user = Container.get(UserService);

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userBody: WriteUserParameter = req.body;
      const createUserData: UserDto = await this.user.insertRecord(userBody);

      res.status(201).json(createUserData);
    } catch (error) {
      next(error);
    }
  };

  public read = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: UserDto = await this.user.selectRecord(userId);

      res.status(200).json(findOneUserData);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userBody: WriteUserParameter = req.body;
      const updateUserData: UserDto = await this.user.updateRecord(userId, userBody);

      res.status(200).json(updateUserData);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData = await this.user.deleteRecord(userId);

      res.status(200).json(deleteUserData);
    } catch (error) {
      next(error);
    }
  };
}
