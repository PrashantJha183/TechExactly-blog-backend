import * as authService from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import Token from "../models/Token.model.js";
import User from "../models/User.model.js";

/* =========================
   Register
========================= */
export const register = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authService.registerUser(
      req.body
    );

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   Login
========================= */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await authService.loginUser(
      email,
      password
    );

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   Refresh Token (FIXED)
========================= */
export const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken: incomingRefreshToken } = req.body;

    if (!incomingRefreshToken) {
      return res.status(400).json({ message: "Refresh token required" });
    }

    // Verify refresh token
    const payload = jwt.verify(
      incomingRefreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    // Check token exists in DB
    const tokenDoc = await Token.findOne({ token: incomingRefreshToken });
    if (!tokenDoc) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Check user still exists
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
};

/* =========================
   Logout
========================= */
export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      await Token.deleteOne({ token: refreshToken });
    }

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
