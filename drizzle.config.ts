import type { Config } from "drizzle-kit";

export default {
  dialect: "sqlite",
  schema: "./app/drizzle/schema.server.ts",
  out: "./app/drizzle/migrations",
} satisfies Config;
