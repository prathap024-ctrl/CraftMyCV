import fs from "fs";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { model } from "../Gemini/gemini.js";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import multer from "multer";
import ResumeAnalysis from "../models/ResumeAnalysis.js";


// LangChain Setup
const parser = new JsonOutputParser();
const llm = model;

let latestResumeAnalysis;

const upload = multer({ dest: "public/uploads/" });

export const analyzeResumeMiddleware = upload.single("resume");

export const analyzeResume = async (req, res) => {
  try {
    console.log("Uploaded file:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const loader = new PDFLoader(req.file.path);
    const docs = await loader.load();

    console.log("Loaded docs:", docs);

    // 2. Prepare prompt
    const prompt = ChatPromptTemplate.fromTemplate(`
You are an expert resume screening and ATS (Applicant Tracking System) analysis assistant.

Your task is to:
- Parse the provided resume content (raw text extracted from a PDF),
- Analyze it across 7 key ATS-relevant sections,
- Score and assess each section realistically,
- Return a structured JSON report for frontend display.

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

### Scoring Instructions:
For each section, provide:
- "title": Section name
- "score": Number from 0–100
- "strengths": 2–3 strengths
- "weaknesses": 2–3 weaknesses
- "tips": 2–3 practical improvement suggestions

Then summarize:
- "atsScore": Average score across all sections
- "atsFriendlySections": Count of sections scoring 80 or more (e.g., "5/7")
- "avgSectionScore": Average of all section scores
- "sectionsBelow80": List of section names with score < 80
- "pros": 2–3 general strengths
- "cons": 2–3 general weaknesses
- "missing": 2–3 missing but expected resume elements

---

### Resume Content:
{{docs}}

---

### Output only valid JSON. Example format:

{{
  "sections": [
    {{
      "title": "Format",
      "score": 85,
      "strengths": ["Good layout", "Consistent font usage"],
      "weaknesses": ["No page numbers", "Lacks accessibility tags"],
      "tips": ["Add page numbers", "Use tagged PDF format"],
    }}
    // Repeat for other sections
  ],
  "summary": {{
    "atsScore": 82,
    "atsFriendlySections": "5/7",
    "avgSectionScore": 82,
    "sectionsBelow80": ["...", "..."],
    "pros": ["...", "..."],
    "cons": ["...", "..."],
    "missing": ["...", "..."],
  }}
}}
`);

    // 3. Build the chain and run
    const chain = prompt.pipe(llm).pipe(parser);
    const result = await chain.invoke({});
    const newAnalysis = new ResumeAnalysis({
      resumeId: req.body.resumeId || new Date().toISOString(), // optional: pass a resumeId
      ...result
    });

    await newAnalysis.save(); // ✅ Store in MongoDB

    latestResumeAnalysis = result;

    // 4. Send response
    res.status(200).json(result);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    res.status(500).json({ error: "Failed to process resume." });
  } finally {
    // Optional: Clean up uploaded file
    if (req.file?.path) fs.unlinkSync(req.file.path);
  }
};

export const fetchAnalysis = async (req, res) => {
  if (!latestResumeAnalysis) {
    return res.status(500).json({ error: "failed to fetch data" }); // add return
  }

  return res.status(200).json(latestResumeAnalysis);
};
