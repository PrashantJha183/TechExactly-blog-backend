import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";

import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import adminRoutes from "./routes/admin.routes.js";

// Middleware
import sanitizeMiddleware from "./middleware/sanitize.middleware.js";
import { apiRateLimiter } from "./middleware/rateLimit.middleware.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

/* =========================
   Database Connection
========================= */
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

/* =========================
   Global Middlewares
========================= */

// Body parsing
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// Sanitize request data
app.use(sanitizeMiddleware);

// Performance optimization
app.use(compression());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Logging (disable during tests)
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

/* =========================
   Global API Rate Limiter
========================= */
app.use("/api", apiRateLimiter);

/* =========================
   Routes
========================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server running",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/admin", adminRoutes);

/* =========================
   Error Handling
========================= */
app.use(notFound);
app.use(errorHandler);

export default app;
