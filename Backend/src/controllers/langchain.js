import fs from "fs";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { model } from "../Gemini/gemini.js";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import multer from "multer";
import ResumeAnalysis from "../models/ResumeAnalysis.js";

// LangChain setup
const parser = new JsonOutputParser();
const llm = model;

let latestResumeAnalysis;

const upload = multer({ dest: "public/uploads/" });
export const analyzeResumeMiddleware = upload.single("file");

// Resume analysis controller
export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const loader = new PDFLoader(req.file.path);
    const docs = await loader.load();
    const fullText = docs.map((d) => d.pageContent).join("\n"); // ✅ pass actual resume text

    const prompt = ChatPromptTemplate.fromTemplate(`
You are an expert resume screening and ATS (Applicant Tracking System) analysis assistant.

Your task is to:
- Parse the provided resume content (raw text extracted from a PDF),
- Analyze it across 8 key ATS-relevant sections,
- Score and assess each section realistically from 0–100,
- Return a structured JSON report used for UI rendering, Redux state, and PDF export.

---

### Resume Sections:
- Format
- Keywords
- Experience
- Skills
- Education
- Projects
- Additional Information
- Certifications

---

### For each section, return an object with:
- "title": string (section name),
- "score": number (0–100),
- "strengths": array of 2–3 positive observations,
- "weaknesses": array of 2–3 weak points or gaps,
- "tips": array of 2–3 specific actionable improvement suggestions

---

### After the sections, provide a "summary" object with:
- "atsScore": number (0–100) – average of all section scores
- "atsFriendlySections": string – count of sections scoring 80 or more, like (e.g., "5/7")
- "avgSectionScore": number – average of all section scores
- "sectionsBelow80": array of section titles scoring < 80
- "pros": array of 2–3 overall strengths across resume
- "cons": array of 2–3 overall weaknesses
- "missing": array of 2–3 key resume components that are absent or weak

---

### Resume Content:
{{docs}}

---

### Output Format (JSON Only):

{{
  "sections": [
    {{
      "title": "Format",
      "score": 85,
      "strengths": ["Clean layout", "Consistent headings"],
      "weaknesses": ["No contact links", "No section dividers"],
      "tips": ["Add LinkedIn/GitHub links", "Use clearer section separation"],
    }},
    {{
      "title": "Experience",
      "score": 76,
      "strengths": ["Quantified results", "Relevant roles"],
      "weaknesses": ["Inconsistent date formatting", "Gaps in timeline"],
      "tips": ["Standardize date format", "Explain any job gaps"],
    }}
    // ... repeat for all 8 sections
  ],
  "summary": {{
    "atsScore": 81,
    "atsFriendlySections": "5/8",
    "avgSectionScore": 81,
    "sectionsBelow80": ["Experience", "Certifications", "Additional Information"],
    "pros": ["Well-structured format", "Strong technical skills"],
    "cons": ["Missing certifications", "Lacks ATS keywords in summary"],
    "missing": ["Contact info section", "Portfolio link", "Soft skills block"],
    }}
    }}

`);

    // Run LangChain pipeline
    const chain = prompt.pipe(llm).pipe(parser);
    const result = await chain.invoke({ docs: fullText }); // ✅ fixed: actually pass resume data

    // Save result in DB
    const newAnalysis = new ResumeAnalysis({
      resumeId: req.body.resumeId || new Date().toISOString(),
      ...result,
    });

    await newAnalysis.save(); // ✅ MongoDB
    latestResumeAnalysis = result;

    // Respond to client
    res.status(200).json(result);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    res.status(500).json({ error: "Failed to process resume." });
  } finally {
    // Optional: Clean up uploaded file
    if (req.file?.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.warn("File cleanup failed:", err.message);
      });
    }
  }
};

// Fetch latest analysis (for dashboard preview or reload)
export const fetchAnalysis = async (req, res) => {
  if (!latestResumeAnalysis) {
    return res.status(404).json({ error: "No analysis available yet." });
  }

  return res.status(200).json(latestResumeAnalysis);
};
