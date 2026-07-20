import type {Response} from "express";

type TResponseData<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T
};

const sendResponse = <T> (response: Response, data: TResponseData<T>) => {
  return response.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
  });
}

export default sendResponse;