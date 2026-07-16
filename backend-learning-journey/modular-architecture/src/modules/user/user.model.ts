import { Schema, model } from "mongoose";
import type { IUser } from "./user.interface.js";
import type { IAuth } from "../auth/auth.interface.js";
const userSchema = new Schema<IUser | IAuth>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "author"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    }
  },
  {
    timestamps: true,
  },
);

export const User = model("User", userSchema);
