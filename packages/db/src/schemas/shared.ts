import { createId } from "@paralleldrive/cuid2";
import { char, mysqlTableCreator } from "drizzle-orm/mysql-core";

export const createTable = mysqlTableCreator((name) => `ga_${name}`);

export const cuid2 = <T extends string>(name: T) =>
  char(name, {
    length: 24,
  });

export const cuid2PrimaryKey = cuid2("id")
  .primaryKey()
  .$defaultFn(() => createId());

export const clerkId = <T extends string>(name: T) =>
  char(name, {
    length: 32,
  });
export const clerkOrgId = <T extends string>(name: T) =>
  char(name, {
    length: 31,
  });

export const clerkPrimaryKey = clerkId("id").primaryKey();
export const clerkOrgPrimaryKey = clerkOrgId("id").primaryKey();
