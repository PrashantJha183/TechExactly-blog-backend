const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== "object") return;

  for (const key in obj) {
    if (key.startsWith("$") || key.includes(".")) {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      sanitizeObject(obj[key]);
    }
  }
};

const sanitizeMiddleware = (req, res, next) => {
  sanitizeObject(req.body);
  sanitizeObject(req.params);
  // ❌ DO NOT touch req.query (read-only in Node v24)
  next();
};

export default sanitizeMiddleware;
