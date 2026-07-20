import type {Response} from "express";

const globalError = (
  error: unknown,
  response: Response,
) => {
  if (error instanceof Error) {
    return response.status(500).json({
      success: false,
      statusCode: 500,
      message: error.message || "Internal server error!",
    });
  }
};

export default globalError;