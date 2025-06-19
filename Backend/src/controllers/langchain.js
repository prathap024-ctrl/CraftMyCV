import fs from "fs";
import multer from "multer";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import ResumeAnalysis from "../models/ResumeAnalysis.js";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// LangChain setup
const parser = new JsonOutputParser();
let latestResumeAnalysis;

// Gemini model setup
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 1.0,
});

// Multer upload config
const upload = multer({ dest: "public/uploads/" });
export const analyzeResumeMiddleware = upload.single("file");

// Resume analysis controller
export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Load and split the resume PDF
    const loader = new PDFLoader(req.file.path);
    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const splitDocs = await textSplitter.splitDocuments(docs);
    const fullText = docs.map((d) => d.pageContent).join("\n");

    // Build the LangChain prompt
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
      "tips": ["Add LinkedIn/GitHub links", "Use clearer section separation"]
    }},
    {{
      "title": "Experience",
      "score": 76,
      "strengths": ["Quantified results", "Relevant roles"],
      "weaknesses": ["Inconsistent date formatting", "Gaps in timeline"],
      "tips": ["Standardize date format", "Explain any job gaps"]
    }}
  ],
  "summary": {{
    "atsScore": 81,
    "atsFriendlySections": "5/8",
    "avgSectionScore": 81,
    "sectionsBelow80": ["Experience", "Certifications", "Additional Information"],
    "pros": ["Well-structured format", "Strong technical skills"],
    "cons": ["Missing certifications", "Lacks ATS keywords in summary"],
    "missing": ["Contact info section", "Portfolio link", "Soft skills block"]
    }}
    }}
`);

    // Run LangChain pipeline
    const chain = prompt.pipe(model).pipe(parser);
    const result = await chain.invoke({ docs: fullText });

    // Fallback log in case result is empty
    if (!result || !result.sections?.length) {
      const rawOutput = await model.invoke(prompt.format({ docs: fullText }));
      console.log("Raw Gemini Output:", rawOutput.content);
      return res
        .status(500)
        .json({ error: "Model failed to produce structured output." });
    }

    // Save to DB
    const newAnalysis = new ResumeAnalysis({
      resumeId: req.body.resumeId || new Date().toISOString(),
      ...result,
    });

    await newAnalysis.save();
    latestResumeAnalysis = result;

    res.status(200).json(result);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    res.status(500).json({ error: "Failed to process resume." });
  } finally {
    if (req.file?.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.warn("File cleanup failed:", err.message);
      });
    }
  }
};

// Fetch the latest result (useful for client preview)
export const fetchAnalysis = async (req, res) => {
  if (!latestResumeAnalysis) {
    return res.status(404).json({ error: "No analysis available yet." });
  }

  return res.status(200).json(latestResumeAnalysis);
};
