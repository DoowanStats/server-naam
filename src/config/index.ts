import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "dev"}` });

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const { NODE_ENV, NODE_DEV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DB,
} = process.env;
