import Joi from "joi";

/* =========================
   Common Fields
========================= */
const email = Joi.string().email().lowercase().trim().required().messages({
  "string.email": "Please enter a valid email address",
  "any.required": "Email is required",
});

const password = Joi.string()
  .min(8)
  .max(30)
  .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])"))
  .required()
  .messages({
    "string.pattern.base":
      "Password must contain uppercase, lowercase, number, and special character",
    "string.min": "Password must be at least 8 characters long",
  });

/* =========================
   Register Validation
========================= */
export const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      "string.pattern.base": "Name must contain only letters",
    }),

  email,

  password,
});

/* =========================
   Login Validation
========================= */
export const loginSchema = Joi.object({
  email,
  password: Joi.string().required(),
});

/* =========================
   Refresh Token Validation
========================= */
export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().min(20).required().messages({
    "any.required": "Refresh token is required",
  }),
});
