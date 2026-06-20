import cookieParser from "cookie-parser";
import express from "express";
import { securityMiddleware } from "./middlewares/security.middleware.js";
import envs from "./config/env.js";
import authRouter from "./modules/auth/auth.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import linkRouter from "./modules/links/link.routes.js";

const app = express();

if (envs.NODE_ENV === "development") {
  import morgan from "morgan";
  app.use(morgan("dev"));
}

securityMiddleware(app);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api/auth', authRouter);
app.use('/api/links', linkRouter);


app.use(errorMiddleware);



export default app;
