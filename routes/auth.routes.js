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

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

// ✅ FIX: use refreshAccessToken
router.post("/refresh-token", validate(refreshTokenSchema), refreshAccessToken);

router.post("/logout", logout);

export default router;
