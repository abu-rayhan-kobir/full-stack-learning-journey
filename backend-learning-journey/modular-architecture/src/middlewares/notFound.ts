import type {Request, Response} from "express";

const notFound = (request: Request, response: Response) => {
  return response.status(404).json({
    message: "Route not found!",
    path: request.originalUrl,
    data: new Date(),
  });
}

export default notFound;