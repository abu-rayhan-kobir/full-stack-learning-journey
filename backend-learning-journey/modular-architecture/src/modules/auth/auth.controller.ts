import type { NextFunction, Request, Response } from "express";
import type { IAuth } from "./auth.interface.js";
import { authService } from "./auth.service.js";
import sendResponse from "../../utils/sendResponse.js";

const loginController = async (request: Request, response: Response, next: NextFunction) => {
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

    sendResponse(response, {
      success: true,
      statusCode: 200,
      message: "User successfully loged in!",
      data: result,
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      next(error);
    }
  }
};

const refreshToken = async(request: Request, response: Response, next: NextFunction) => {
  const token = request.cookies.refreshToken as string;
  try {
    const result = await authService.refreshToken(token);
    response.cookie("accessToken", result, {
      httpOnly: false,
      sameSite: "none",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    sendResponse(response, {
      success: true,
      statusCode: 200,
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(error);
    }
  }
};

export const authController = {
  loginController,
  refreshToken,
};