import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import * as adminController from "../controllers/admin.controller.js";

const router = express.Router();

// Dashboard stats
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminController.getDashboardStats
);

// Manage users
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminController.getAllUsers
);

// Manage posts
router.delete(
  "/posts/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminController.deletePostByAdmin
);

export default router;
