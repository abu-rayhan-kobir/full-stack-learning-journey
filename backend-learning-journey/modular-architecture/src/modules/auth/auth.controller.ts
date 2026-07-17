import type { Request, Response } from "express";
import type { IAuth } from "./auth.interface.js";
import { authService } from "./auth.service.js";

const loginController = async (request: Request, response: Response) => {
  const payload: IAuth = request.body;
  try {
    const result = await authService.authenticatedUser(payload);
     response.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })

    response.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return response.status(200).json({
      success: true, 
      message: "User successfully loged in!",
      data: result.data,
    });

  } catch (error) {
    if (error instanceof Error) {
      response.status(500).json({
        success: false,
        message: "Invalid username or password!",
        errorMessage: `Something went wrong: ${error.message}`,
      });
    }
  }
};

export const authController = {
  loginController,
};