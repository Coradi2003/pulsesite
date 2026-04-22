import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // ── Security: Headers ────────────────────────────────────────────────────────
  app.disable("x-powered-by");

  // Basic security headers; CSP is handled by vercel.json for the frontend
  app.use(helmet({
    contentSecurityPolicy: false,
    xXssProtection: false, // Deprecated header
  }));

  app.use((_req, res, next) => {
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
    if (process.env.NODE_ENV === "production") {
      res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    }
    next();
  });

  // ── Security: Rate Limiting (API routes only) ────────────────────────────────
  // Scoped to /api/* so that static assets and SPA routes are never throttled.
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15-minute window
    max: 500,                  // 500 requests per IP per window
    message: { error: "Too many requests. Please try again in 15 minutes." },
    legacyHeaders: false,
    standardHeaders: true,     // Return RateLimit-* headers (RFC 6585 draft)
  });
  app.use("/api", apiLimiter);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
