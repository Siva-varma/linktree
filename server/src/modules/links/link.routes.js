import express from "express";
import * as linkController from "./link.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const linkRouter = express.Router();

linkRouter.post("/", authMiddleware, asyncHandler(linkController.createLink));

linkRouter.get("/:username", asyncHandler(linkController.getAllLinks));

linkRouter.put("/:id", authMiddleware, asyncHandler(linkController.editLink));

linkRouter.delete("/:id", authMiddleware, asyncHandler(linkController.deleteLink));

export default linkRouter;
