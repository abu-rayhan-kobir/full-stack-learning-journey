import type {Request, Response} from "express";
import { userService } from "./user.service.js";
const createUserController = async (request: Request, response: Response) => {
  const payload = request.body;
  try {
    const result = await userService.createUser(payload);
    return response.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).json({
        success: false,
        message: `Internal server error: ${error.message}`,
      });
    }
  }
};

export const userController = {
  createUserController,
};