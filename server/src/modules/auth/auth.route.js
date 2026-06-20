import express from "express";
import * as authController from "./auth.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";

const authRouter = express.Router();

authRouter.post("/register", asyncHandler(authController.registerUser));

authRouter.post("/login", asyncHandler(authController.loginUser));

export default authRouter;