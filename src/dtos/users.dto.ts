import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";

// ================
// READ
// ================

export class UserDto {
  public id: string;
  public createdAt: number;
  public updatedAt: number;
  public email: string;
  public password: string;

  constructor(
    id: string,
    createdAt: number,
    updatedAt: number,
    email: string,
    password: string
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.email = email;
    this.password = password;
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

  constructor(
    email: string,
    password: string
  ) {
    this.email = email;
    this.password = password;
  }
}
