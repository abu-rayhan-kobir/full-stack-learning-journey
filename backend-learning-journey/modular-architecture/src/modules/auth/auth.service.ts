import bcrypt from "bcryptjs";
import { User } from "../user/user.model.js";
import jwt, { type SignOptions } from "jsonwebtoken";
import type { StringValue } from "ms";
import type { IAuth } from "./auth.interface.js";
import type { IUser } from "../user/user.interface.js";
import { env } from "../../config/env.js";


const authenticatedUser = async (payload: IAuth) => {
  const {email, password} = payload;
  const userInstance: IUser | null = await User.findOne({email});
  if (!userInstance) {
    throw new Error(`User not registered!`);
  }
  const isMatchedPassword = await bcrypt.compare(password, userInstance.password);
  if (!isMatchedPassword) {
    throw new Error(`Invalid password!`);
  }
  const jwtPayload = {
    username: userInstance.username,
    email: userInstance.email,
    role: userInstance.role,
    status: userInstance.status,
  }
  if (!env.access_token_secret) {
    throw new Error("Access token secret is not defined!");
  }
  if (!env.refresh_token_secret) {
    throw new Error("Refresh token secret is not defined!");
  }
  const options: SignOptions[] = [{
    expiresIn: env.access_token_expires as StringValue,
  },
  {
    expiresIn: env.refresh_token_expires as StringValue,
  }
];
  const accessToken =  jwt.sign(
    jwtPayload,
    env.access_token_secret,
    options[0]
  );
  const refreshToken = jwt.sign(
    jwtPayload,
    env.refresh_token_secret,
    options[1]
  );
  return {
    data: {
      ...jwtPayload
    },
    accessToken,
    refreshToken,
  }
}

export const authService = {
  authenticatedUser,
};