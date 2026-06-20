import { loginUserService, registerUserService } from "./auth.service.js";
import envs from "../../config/env.js";

const getCookieOptions = () => {
  const isProduction = envs.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  };
};

export const registerUser = async (req, res) => {
  let userData = req.body;

  let { newUser, token } = await registerUserService(userData);

  // set token in cookie with production-safe options
  res.cookie("token", token, getCookieOptions());

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  });
};

export const loginUser = async (req, res) => {
  let userData = req.body;

  let { user, token } = await loginUserService(
    userData.email,
    userData.password,
  );

  // set token in cookie with production-safe options
  res.cookie("token", token, getCookieOptions());

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};
