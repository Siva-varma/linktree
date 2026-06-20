import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import envs from "./src/config/env.js";
import logger from "./src/config/logger.js";

function startServer() {
  connectDB().then(() => {
    const PORT = envs.PORT || 3000;

    app.listen(PORT, () => {
      logger.info({ port: PORT }, "Server is running");
    });
  });
}

startServer();
