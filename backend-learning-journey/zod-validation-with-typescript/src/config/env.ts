import dotenv from "dotenv";
import path from "node:path";
dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export const env = {
  port: process.env.PORT,
  database_uri: process.env.DATABASE_URI,
};
