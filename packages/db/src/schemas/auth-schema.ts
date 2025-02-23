import { boolean, text, timestamp, varchar } from "drizzle-orm/mysql-core";

import { createTable } from "./shared";

export const user = createTable("user", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: varchar("image", { length: 256 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const session = createTable("session", {
  id: varchar("id", { length: 256 }).primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: varchar("token", { length: 256 }).notNull().unique(),
  ipAddress: varchar("ip_address", { length: 256 }),
  userAgent: varchar("user_agent", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const account = createTable("account", {
  id: varchar("id", { length: 256 }).primaryKey(),
  accountId: varchar("account_id", { length: 256 }).notNull(),
  providerId: varchar("provider_id", { length: 256 }).notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  accessToken: varchar("access_token", { length: 256 }),
  refreshToken: varchar("refresh_token", { length: 256 }),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: varchar("scope", { length: 256 }),
  password: varchar("password", { length: 256 }),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = createTable("verification", {
  id: varchar("id", { length: 256 }).primaryKey(),
  identifier: varchar("identifier", { length: 256 }).notNull(),
  value: varchar("value", { length: 256 }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
