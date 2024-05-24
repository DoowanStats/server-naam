import { wrap } from "@mikro-orm/core";
import { hash } from "bcrypt";
import { Service } from "typedi";
import { DI } from "@database";
import { UserDto, WriteUserParameter } from "@dtos/users.dto";
import { UserEntity } from "@entities/users.entity";
import { HttpException } from "@exceptions/httpException";
import { IService } from "@interfaces/service.interface";

@Service()
export class UserService implements IService {
  public async insertRecord(body: WriteUserParameter): Promise<UserDto> {
    // Check for email conflict
    const conflictUser = await DI.user.findOne({ email: body.email });
    if (conflictUser) throw new HttpException(409, `This email ${body.email} already exists`);

    // Hash password
    const hashedPassword = await hash(body.password, 10);

    // Insert into database
    const createUser: UserEntity = DI.user.create(new UserEntity(body.email, hashedPassword));
    await DI.em.persistAndFlush(createUser);

    return UserDto.transformEntity(createUser);
  }

  public async selectRecord(id: string): Promise<UserDto> {
    // Find user
    const selectUser = await DI.user.findOne(id);
    if (!selectUser) throw new HttpException(404, "User doesn't exist");

    return UserDto.transformEntity(selectUser);
  }

  public async updateRecord(id: string, body: WriteUserParameter): Promise<UserDto> {
    // Find user
    const updateUser = DI.user.getReference(id);
    if (!updateUser) throw new HttpException(404, "User doesn't exist");

    // Check for email conflict
    if (body.email) {
      const findUser = await DI.user.findOne({ email: body.email });
      if (findUser && findUser.id !== id)
        throw new HttpException(409, `This email ${body.email} already exists`);
    }

    // Check if user has a password
    if (!body.password) {
      throw new HttpException(400, `User did not set a password`);
    }

    // Update the database
    const hashedPassword = await hash(body.password, 10);
    wrap(updateUser).assign({
      ...body,
      password: hashedPassword,
    });

    return UserDto.transformEntity(updateUser);
  }

  public async deleteRecord(id: string): Promise<UserDto> {
    // Find user
    const deleteUser = DI.user.getReference(id);
    if (!deleteUser) throw new HttpException(404, "User doesn't exist");

    // Delete from database
    await DI.user.nativeDelete(id);

    return UserDto.transformEntity(deleteUser);
  }
}
