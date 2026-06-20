import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import compression from "compression";
import express from "express";
import env from "../config/env.js";
import logger from "../config/logger.js";

export function securityMiddleware(app) {
  // helmet to used for setting various HTTP headers for security
  app.use(helmet());

  // CORS to allow cross-origin requests from specified origins
  app.use(
    cors({
      origin: env.CORS_ORIGIN.split(",").map((origin) => origin.trim()),
      credentials: true,
    }),
  );
  // HPP to protect against HTTP Parameter Pollution attacks
  app.use(hpp());

  // compression to compress response bodies for better performance
  app.use(compression());

  //express.json helps for getting JSON request bodies
  //setting max file limit to 3mb
  app.use(express.json({ limit: "3mb" }));

  //express.urlencoded helps for getting URL-encoded request bodies
  app.use(express.urlencoded({ extended: true, limit: "3mb" }));
}
