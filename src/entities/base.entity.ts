import { PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";

export abstract class BaseEntity {
  @PrimaryKey({ type: "uuid" })
  id: string = v4();

  @Property({ type: "bigint" })
  created_at: number = new Date().getTime();

  @Property({ type: "bigint", onUpdate: () => new Date().getTime() })
  updated_at: number = new Date().getTime();
}
