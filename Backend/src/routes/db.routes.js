import express from "express";
import {
  saveAnalysis,
  fetchLatestAnalysis,
} from "../controllers/analysis.controllers.js";

const router = express.Router();

router.post("/save-analysis", saveAnalysis);
router.get("/fetch-analysis", fetchLatestAnalysis);

export default router;
