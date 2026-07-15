import express from "express";
import type {Application, Response} from "express";
import { userRouter } from "./modules/user/user.route.js";
const app: Application = express();

app.use(express.json());
app.get("/", (response: Response) => {
  return response.send("Server running...");
});

app.use("/api/user", userRouter);

export default app;