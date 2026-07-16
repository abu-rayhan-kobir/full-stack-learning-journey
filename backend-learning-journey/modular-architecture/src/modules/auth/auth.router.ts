import express from "express";
import type {Router} from "express";
import { authController } from "./auth.controller.js";
const router: Router = express.Router();

router.post("/login", authController.loginController);

export const authRouter: Router = router;