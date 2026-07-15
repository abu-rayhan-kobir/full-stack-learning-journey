import type {Request, Response} from "express";
import { productService } from "./product.service.js";
import type TProduct from "./product.interface.js";

const createProductController = async (request: Request, response: Response) => {
  const payload: TProduct = request.body;
  try {
    const result = await productService.createProduct(payload);
    return response.status(201).json({
      success: true,
      message: `Product created successfully!`,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      return response.status(500).json({
        success: false,
        message: `Product not created!`,
        errorMessage: `Internal server error: ${error.message}`
      });
    }
  }
};

export const productController = {
  createProductController,
};