import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import * as adminController from "../controllers/admin.controller.js";

const router = express.Router();

/* =========================
   Dashboard
========================= */
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminController.getDashboardStats
);

/* =========================
   Users
========================= */
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminController.getAllUsers
);

router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminController.deleteUserByAdmin
);

/* =========================
   Posts
========================= */
router.delete(
  "/posts/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminController.deletePostByAdmin
);

/* =========================
   Comments (ADMIN)
========================= */
router.get(
  "/comments",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminController.getAllComments
);

router.delete(
  "/comments/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminController.deleteCommentByAdmin
);

export default router;
