import Joi from "joi";

/* =========================
   Register Validation
========================= */
export const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

/* =========================
   Login Validation
========================= */
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

/* =========================
   Refresh Token Validation
========================= */
export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
