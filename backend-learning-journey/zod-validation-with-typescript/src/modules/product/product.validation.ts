import type IProduct from "./product.interface.js";
import {z} from "zod";

export const createProductValidationSchema: z.ZodType<IProduct> = z.object({
  name: z.string().trim().nonempty({
    message: "Product name is required",
  }).min(3, {
    message: "Product name must be minimum 3 characters",
  }).max(100, {
    message: "Product name cannot exceed 100 characters"
  }),
  price: z
    .number().positive({
      message: "Price cannot be nagetive"
    }),
  category: z
    .string()
    .trim()
    .nonempty({
      message: "Category is required!",
    })
    .min(3, {
      message: "Category must be minimum 3 characters",
    })
    .max(100, {
      message: "Category cannot exceed 100 characters",
    }),
  description: z
    .string()
    .trim()
    .nonempty({
      message: "Description is required!",
    }),
  stock: z
    .number()
    .nonnegative({
      message: "Stocke cannot be negative",
    })
});