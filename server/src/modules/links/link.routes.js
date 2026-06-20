import express from "express";
import * as linkController from "./link.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const linkRouter = express.Router();



//------------- Protected routes --------------------//
//create a new link
linkRouter.post("/", authMiddleware, asyncHandler(linkController.createLink));
//edit a link
linkRouter.put("/:id", authMiddleware, asyncHandler(linkController.editLink));
//delete a link
linkRouter.delete("/:id", authMiddleware, asyncHandler(linkController.deleteLink));
//analysis of all link
linkRouter.get("/analysis", authMiddleware, asyncHandler(linkController.getLinkAnalysis));


//------------- Public routes --------------------//
//increment link clicks (preferred endpoint)
linkRouter.put("/:id/click", asyncHandler(linkController.incrementLinkClicks));
//get all links for a user
linkRouter.get("/:username", asyncHandler(linkController.getAllLinks));

export default linkRouter;
