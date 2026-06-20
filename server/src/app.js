import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import { securityMiddleware } from "./middlewares/security.middleware.js";
import envs from "./config/env.js";

const app = express();

if (envs.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

securityMiddleware(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
