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
You are an expert ATS (Applicant Tracking System) resume screening assistant.

Your task is to:
- Analyze the provided resume content (raw extracted text),
- Score it across 8 ATS-relevant sections from 0 to 100,
- Return structured JSON data ONLY with scores, insights, and tips.

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
- "title": string — section name
- "score": number — from 0 to 100
- "strengths": array — 2–3 positive highlights
- "weaknesses": array — 2–3 issues or gaps
- "tips": array — 2–3 specific actionable suggestions

---

### After listing all 8 sections, return a "summary" object:
- "atsScore": number — average of all section scores (0–100)
- "atsFriendlySections": string — number of sections scoring ≥80 (e.g., "5/8")
- "avgSectionScore": number — average of all section scores
- "sectionsBelow80": array — section titles with score < 80
- "pros": array — 2–3 overall resume strengths
- "cons": array — 2–3 overall weaknesses or red flags
- "missing": array — 2–3 important resume elements that are missing or underdeveloped

---

### Resume Content:
{{docs}}

---

### Output format: JSON only. No markdown, explanation, or natural language — only return valid JSON in this exact structure:

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
    // ...repeat for the remaining 6 sections
  ],
  "summary": {
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
