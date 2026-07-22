import app from "./app.js";
import env from "./config/env.js";

const PORT: number = Number(env.port) || 5000;
const startServer = async (): Promise<void> => {
  try {
    app.listen(PORT, (): void => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Something went wrong: ${error.message}`);
    }
  }
};

await startServer();