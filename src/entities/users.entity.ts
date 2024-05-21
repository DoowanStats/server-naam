import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '@entities/base.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @Property({ type: "string" })
  email!: string;

  @Property({ type: "string" })
  password!: string;

  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
  }
}
