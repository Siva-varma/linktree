import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import apiError from "../utils/apiError.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) throw new apiError(401, "Token not found");

  let user = await jwt.verify(token, process.env.JWT_SECRET);
  if (!user) throw new apiError(401, "Unauthorized user");

  req.user = user;

  next();
});
