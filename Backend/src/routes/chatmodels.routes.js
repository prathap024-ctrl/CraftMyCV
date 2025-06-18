import Router from "express";
import {
  analyzeResume,
  analyzeResumeMiddleware,
} from "../controllers/langchain.js";

const router = Router();
router.route("/analyze").post(analyzeResume);

export default router;
