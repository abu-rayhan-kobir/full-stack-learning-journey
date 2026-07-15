import express from "express";
import productRouter from "../modules/product/product.router.js";
import type { Router } from "express";
const router: Router = express.Router();

router.use("/product", productRouter);

export default router;