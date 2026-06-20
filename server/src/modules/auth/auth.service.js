import userModel from "../../models/user.model.js";

export const registerUserService = async (userData) => {
  //check all required fields are present
  if (!userData.username || !userData.email || !userData.password) {
    throw new Error("All fields are required");
  }

  //check if user already exists
  const existingUser = await userModel.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  //create new user
  const newUser = await userModel.create(userData);

  //create jwt token
  let token = newUser.generateAuthToken();
  return { newUser, token };
};

export const loginUserService = async (email, password) => {
    //check if user exists
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        throw new Error("Invalid email or password");
    }

    //compare password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    //create jwt token
    let token = user.generateAuthToken();
    return { user, token };
}