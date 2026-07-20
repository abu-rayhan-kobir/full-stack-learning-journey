import bcrypt from "bcryptjs";
import { User } from "../user/user.model.js";
import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import type { IAuth } from "./auth.interface.js";
import type { IUser } from "../user/user.interface.js";
import { env } from "../../config/env.js";
import generateToken from "../../utils/generatToken.js";

// User authentication
const authenticatedUser = async (payload: IAuth) => {
  const { email, password } = payload;
  const userInstance: IUser | null = await User.findOne({ email });
  if (!userInstance) {
    throw new Error(`User not registered!`);
  }
  const isMatchedPassword = await bcrypt.compare(
    password,
    userInstance.password,
  );
  if (!isMatchedPassword) {
    throw new Error(`Invalid password!`);
  }
  const jwtPayload = {
    username: userInstance.username,
    email: userInstance.email,
    role: userInstance.role,
    status: userInstance.status,
  };

  if (!env.access_token_secret) {
    throw new Error("Access token secret is not defined!");
  }
  if (!env.refresh_token_secret) {
    throw new Error("Refresh token secret is not defined!");
  }
  if (!env.access_token_expires) {
    throw new Error("Access token expires is not defined!");
  }
  if (!env.refresh_token_expires) {
    throw new Error("Refresh token expires is not defined!");
  }

  const accessToken = generateToken(jwtPayload, env.access_token_secret, env.access_token_expires as SignOptions);
  const refreshToken = generateToken(jwtPayload, env.refresh_token_secret, env.refresh_token_expires as SignOptions);

  return {
    data: {
      ...jwtPayload,
    },
    accessToken,
    refreshToken,
  };
};


// Crating access token through refresh token
const refreshToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error("Invalid refresh token!");
  }
  try {
    if(!env.refresh_token_secret) {
      throw new Error("Refresh token secret is not defined!");
    }

    // Verity refresh token
    const verifyToken = jwt.verify(
      refreshToken,
      env.refresh_token_secret as string,
    ) as JwtPayload;

    const userEmail = verifyToken.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new Error("User not found!");
    }

    // Creating payload for access token
    const jwtPayload = {
      username: user?.username,
      email: user?.email,
      role: user?.role,
      status: user?.status,
    } as JwtPayload;
    if (!env.access_token_secret) {
      throw new Error("Access token secret is not defined!");
    }

    // Creating access token
    const accessToken = generateToken(jwtPayload, env.access_token_secret, env.access_token_expires as SignOptions )
    return accessToken;
  } catch (error) {
    throw new Error("Invalid token!");
  }
};

export const authService = {
  authenticatedUser,
  refreshToken,
};
