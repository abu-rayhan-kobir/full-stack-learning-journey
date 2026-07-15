import type { TUser } from "./user.interface.js";
import { User } from "./user.model.js";
import bcrypt from "bcryptjs";


const createUser = async (payload: TUser) => {
  const { username, email, password, role } = payload;
  const userIsExist = await User.findOne({ email });
  if (userIsExist) {
    throw new Error("User already registered!");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    return createdUser;
  }
};

export const userService = {
  createUser,
};
