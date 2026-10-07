import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const here = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(here, "../../.env") });

export const config = {
  port: Number(process.env.PORT || 8000),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || "change-this-in-production",
  accessTtl: process.env.ACCESS_TOKEN_TTL || "15m",
  refreshTtl: process.env.REFRESH_TOKEN_TTL || "7d",
  corsOrigins: (process.env.CORS_ORIGINS || "http://localhost:5173")
    .split(",").map((value) => value.trim()).filter(Boolean),
};

if (!config.databaseUrl) {
  throw new Error("DATABASE_URL not found in project root .env");
}
