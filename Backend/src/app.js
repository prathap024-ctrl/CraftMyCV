import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(express.static("files"));
app.use(cookieParser());

// Import routes
import chatModelsRoutes from "./routes/chatmodels.routes.js";
import analysisRoutes from "./routes/db.routes.js";

app.use("/api/chatmodels", chatModelsRoutes);

app.use("/api/analysis", analysisRoutes);

export { app };
