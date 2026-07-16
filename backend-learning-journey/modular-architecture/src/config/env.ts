import dotenv from "dotenv";
import path from "node:path";
dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export const env = {
  port: process.env.PORT,
  database_uri: process.env.DATABASE_URI,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  access_token_expires: process.env.ACCESS_TOKEN_EXPIRES,
  refresh_token_expires: process.env.REFRESH_TOKEN_EXPIRES,
};