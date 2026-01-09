import User from "../models/User.model.js";
import { generateAccessToken, generateRefreshToken } from "./token.service.js";

/* =========================
   Register User
========================= */
export const registerUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 409; // Conflict
    throw error;
  }

  const user = await User.create(userData);

  const accessToken = generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  return { user, accessToken, refreshToken };
};

/* =========================
   Login User
========================= */
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401; // Unauthorized
    throw error;
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401; // Unauthorized
    throw error;
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  return { user, accessToken, refreshToken };
};
