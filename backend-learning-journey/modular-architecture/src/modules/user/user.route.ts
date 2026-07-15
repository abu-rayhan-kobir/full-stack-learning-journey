import {Router} from "express";
import { userController } from "./user.controller.js";
const router: Router = Router();

router.post("/register", userController.createUserController);

export const userRouter: Router = router;