import type { AnyZodObject } from "zod/v3";
import type {Request, Response, NextFunction} from "express";

const validateRequest = (schema: AnyZodObject) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: request.body,
      params: request.params,
      query: request.query,
    });
    next();
  }
};

export default validateRequest;