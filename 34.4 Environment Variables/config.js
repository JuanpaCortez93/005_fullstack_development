import { config } from "dotenv";

config();

export const SESSION_SECRET = process.env.SESSION_SECRET;
export const PG_USER = process.env.PG_USER || "postgres";
export const PG_HOST = process.env.PG_HOST || "localhost";
export const PG_DATABASE = process.env.PG_DATABASE || "secrets";
export const PG_PASSWORD = process.env.PG_PASSWORD || "111111";
export const PG_PORT = process.env.PG_PORT || "5432";