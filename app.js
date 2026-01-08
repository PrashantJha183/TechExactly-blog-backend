import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
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
import { notFound, errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

/* =========================
   Database Connection
========================= */
connectDB();

/* =========================
   Global Middlewares
========================= */

// Body parsing
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// Custom NoSQL sanitizer (Node v24 SAFE)
app.use(sanitizeMiddleware);

// Performance
app.use(compression());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

// Logging
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

/* =========================
   Rate Limiter (INLINE)
========================= */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

/* =========================
   Routes
========================= */

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server running & DB connected",
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

/* =========================
   Server Listen
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
