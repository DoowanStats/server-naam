import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const {
  POSTGRESQLCONNSTR_USER,
  POSTGRESQLCONNSTR_PASSWORD,
  POSTGRESQLCONNSTR_HOST,
  POSTGRESQLCONNSTR_PORT,
  POSTGRESQLCONNSTR_DB,
} = process.env;
