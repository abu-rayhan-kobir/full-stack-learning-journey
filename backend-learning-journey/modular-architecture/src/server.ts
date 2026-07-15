import { env } from "./config/env.js";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = env.port || 5000;
const DATABASE_URI = env.database_uri;

const startServer = async () => {
  try {
    await connectDB(DATABASE_URI);
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Internal server error: ${error.message}`);
    }
  }
};

await startServer();