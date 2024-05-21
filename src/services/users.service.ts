import { wrap } from '@mikro-orm/core';
import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { DI } from '@database';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/httpException';

@Service()
export class UserService {
  public async findUserById(userId: string): Promise<UserEntity> {
    // Find user
    const findUser = await DI.em.findOne(UserEntity, userId);
    if (!findUser) throw new HttpException(404, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: UserEntity): Promise<UserEntity> {
    // Check for email conflict
    const findUser = await DI.em.findOne(UserEntity, { email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    // Hash password
    const hashedPassword = await hash(userData.password, 10);
    const createUserData: UserEntity = DI.em.create(UserEntity, { ...userData, password: hashedPassword });

    // Insert into database
    await DI.em.persistAndFlush(createUserData);

    return createUserData;
  }

  public async updateUser(userId: string, userData: UserEntity): Promise<UserEntity> {
    // Find user
    const updateUser = DI.em.getReference(UserEntity, userId);
    if (!updateUser) throw new HttpException(404, "User doesn't exist");

    // Check for email conflict
    if (userData.email) {
      const findUser = await DI.em.findOne(UserEntity, { email: userData.email });
      if (findUser && findUser.id !== userId) throw new HttpException(409, `This email ${userData.email} already exists`);
    }

    // Check if user has a password
    if (!userData.password) {
      throw new HttpException(400, `User did not set a password`);
    }

    // Update the database
    wrap(updateUser).assign({
      ...userData,
      password: await hash(userData.password, 10)
    });

    return updateUser;
  }

  public async deleteUser(userId: string): Promise<UserEntity> {
    // Find user
    const findUser = DI.em.getReference(UserEntity, userId);
    if (!findUser) throw new HttpException(404, "User doesn't exist");

    // Delete from database
    await DI.em.removeAndFlush(findUser);

    return findUser;
  }

  public async findAllUser(): Promise<UserEntity[]> {
    // Get all users
    const rows = await DI.em.findAll(UserEntity);

    return rows;
  }
}
