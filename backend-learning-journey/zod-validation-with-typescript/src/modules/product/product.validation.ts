import {z} from "zod/v3";
export const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    price: z.number().positive(),
    category: z.string().min(3),
    description: z.string(),
    stock: z.number().int().nonnegative(),
  }),
});
