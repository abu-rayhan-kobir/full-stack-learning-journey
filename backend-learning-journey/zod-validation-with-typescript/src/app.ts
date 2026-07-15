import express from "express";
import type {Application, Response} from "express";
import router from "./router/index.router.js";
const app: Application = express();

app.use(express.json());
app.get("/", (response: Response) => {
  return response.send(`Server running...`);
});

app.use("/api/v1", router);

export default app;