import Router from "express";
import { analyzeResume } from "../controllers/langchain.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.route("/analyze").post(upload.single("resume"), analyzeResume);



export default router;