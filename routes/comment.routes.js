import express from "express";
import * as commentController from "../controllers/comment.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* =========================
   PUBLIC ROUTES
========================= */
router.get("/post/:postId", commentController.getCommentsByPost);

/* =========================
   PROTECTED ROUTES (STATIC FIRST)
========================= */
router.get("/my-comments", authMiddleware, commentController.getMyComments);
router.post("/", authMiddleware, commentController.createComment);

/* =========================
   DYNAMIC ROUTES (LAST)
========================= */
router.put("/:id", authMiddleware, commentController.updateComment);
router.delete("/:id", authMiddleware, commentController.deleteComment);

export default router;
