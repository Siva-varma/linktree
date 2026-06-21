import cookieParser from "cookie-parser";
import express from "express";
import { securityMiddleware } from "./middlewares/security.middleware.js";
import envs from "./config/env.js";
import authRouter from "./modules/auth/auth.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import linkRouter from "./modules/links/link.routes.js";
import morgan from "morgan";

const app = express();

if (envs.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

if (envs.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

securityMiddleware(app);

app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"));

app.get("/health", (req, res) => {
  res.send("Server is running fine");
});

app.use("/api/auth", authRouter);
app.use("/api/links", linkRouter);

app.get("/*name", (req, res) => {
  res.sendFile("public/index.html", { root: process.cwd() });
});

app.use(errorMiddleware);

export default app;
