import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";
import { UserEntity } from "@entities/users.entity";

// ================
// READ
// ================

export class UserDto {
  public id: string;
  public createdTimestamp: number;
  public updatedTimestamp: number;
  public email: string;
  public password: string;

  constructor(id: string, createdAt: number, updatedAt: number, email: string, password: string) {
    this.id = id;
    this.createdTimestamp = createdAt;
    this.updatedTimestamp = updatedAt;
    this.email = email;
    this.password = password;
  }

  static transformEntity(data: UserEntity) {
    return new UserDto(data.id, data.created_at, data.updated_at, data.email, data.password);
  }
}

// ================
// WRITE
// ================

export class WriteUserParameter {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
