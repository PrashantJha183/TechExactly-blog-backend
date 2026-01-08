import User from "../models/User.model.js";
import { generateAccessToken, generateRefreshToken } from "./token.service.js";

export const registerUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create(userData);

  const accessToken = generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  return { user, accessToken, refreshToken };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  return { user, accessToken, refreshToken };
};
