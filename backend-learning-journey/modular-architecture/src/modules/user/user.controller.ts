import type {Request, Response} from "express";
import { userService } from "./user.service.js";
import sendResponse from "../../utils/sendResponse.js";
import globalError from "../../middlewares/globalError.js";
const createUserController = async (request: Request, response: Response) => {
  const payload = request.body;
  try {
    const result = await userService.createUser(payload);
    sendResponse(response, {
      success: true,
      statusCode: 201,
      message: "User registered successfully!",
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      globalError(error, response);
    }
  }
};

export const userController = {
  createUserController,
};