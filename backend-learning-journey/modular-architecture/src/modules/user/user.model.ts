import { Schema, model } from "mongoose";
import type { TUser } from "./user.interface.js";
const userSchema = new Schema<TUser>(
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
  },
  {
    timestamps: true,
  },
);

export const User = model("User", userSchema);
