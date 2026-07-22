import express from "express";
import type { Application, Request, Response } from "express";
import upload from "./middlewares/uploadUpload.middleware.js";

const app: Application = express();

app.use(express.json());
app.get("/", (response: Response) => {
  response.send("Server running...");
});

app.post("/form", upload.single("image"), (request: Request, response: Response) => {
  return response.status(201).json({
    success: true,
    message: "File successfully uploaded!",
    data: {
      ...request.file
    }
  });
})

export default app;