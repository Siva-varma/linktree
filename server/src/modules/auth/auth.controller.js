import { loginUserService, registerUserService } from "./auth.service.js";

export const registerUser = async (req, res) => {
  let userData = req.body;

  let { newUser, token } = await registerUserService(userData);

  //set token in cookie
  res.cookie("token", token);

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

  //set token in cookie
  res.cookie("token", token);

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
     user:{
        id: user._id,
        username: user.username,
        email: user.email,
     },
  });
};
