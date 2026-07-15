import type TProduct from "./product.interface.js";
import { Product } from "./product.model.js";

const createProduct = async (payload: TProduct) => {
  const product = await Product.create(payload);
  return product;
}

export const productService = {
  createProduct,
};