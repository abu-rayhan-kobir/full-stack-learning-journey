import express from "express";
import { productController } from "./product.controller.js";
import type {Router} from "express";
import validateRequest from "../../middleware/validateRequest.js";
import { createProductValidationSchema } from "./product.validation.js";

const productRouter: Router = express.Router();

productRouter.post("/create-product", validateRequest(createProductValidationSchema), productController.createProductController);

export default productRouter;