import jwt from "jsonwebtoken";
import Token from "../models/Token.model.js";

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = async (user) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7); // 7 days

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  await Token.create({
    user: user._id,
    token: refreshToken,
    type: "REFRESH",
    expiresAt: expires,
  });

  return refreshToken;
};
