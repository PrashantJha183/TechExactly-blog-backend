import express from "express";
import {
  register,
  login,
  refreshAccessToken,
  logout,
} from "../controllers/auth.controller.js";

import validate from "../middleware/validate.middleware.js";
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} from "../validation/auth.validation.js";

import {
  authRateLimiter,
  refreshTokenLimiter,
} from "../middleware/rateLimit.middleware.js";

const router = express.Router();

// Protected against brute force
router.post("/register", authRateLimiter, validate(registerSchema), register);

router.post("/login", authRateLimiter, validate(loginSchema), login);

// Refresh token limiter
router.post(
  "/refresh-token",
  refreshTokenLimiter,
  validate(refreshTokenSchema),
  refreshAccessToken
);

router.post("/logout", logout);

export default router;
