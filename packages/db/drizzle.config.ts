import type { Config } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL");
}

export default {
  schema: "./src/schemas",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  casing: "snake_case",
  tablesFilter: ["ga_*"],
} satisfies Config;
