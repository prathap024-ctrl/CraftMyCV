import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({
  path: "./.env",
});

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.post("/api/analyze-resume", async (req, res) => {
  const { resumeText } = req.body;

  if (!resumeText) {
    return res.status(400).json({ result: "No resume text provided." });
  }

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: `Please analyze the following resume and return a structured response with:
- Strengths
- Weaknesses
- Suggestions for improvement

Use bullet points and line breaks. Keep formatting clean and easy to read.

Resume:\n\n${resumeText}`,
              },
            ],
          },
        ],
      },
      {
        params: { key: process.env.GEMINI_API_KEY },
      }
    );

    const candidates = response?.data?.candidates;
    const aiMessage =
      candidates?.[0]?.content?.parts?.[0]?.text ||
      "No detailed feedback returned.";

    res.json({ result: aiMessage });
  } catch (err) {
    console.error("Gemini API Error:", err?.response?.data || err.message);
    res
      .status(500)
      .json({ result: "Failed to analyze resume. Please try again." });
  }
});

app.post("/api/generate-resume", async (req, res) => {
  const { name, experience, education, skills, contact } = req.body;

  if (!name || !experience || !education || !skills || !contact) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const prompt = `
    Create a professional resume for the following person:
    
    Name: ${name}
    Experience: ${experience}
    Education: ${education}
    Skills: ${skills}
    Contact: ${contact}
    
    Structure the resume in sections:
    1. Header with Name, Contact
    2. Summary
    3. Experience (with Job Titles, Companies, Dates)
    4. Education (with Degrees and Institutions)
    5. Skills Section
    
    Return the resume as text with clear headings and bullet points.
  `;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        params: { key: process.env.GEMINI_API_KEY },
      }
    );

    const aiResponse = response.data.candidates[0].content.parts[0].text;
    res.json({ resume: aiResponse });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ message: "Error generating resume." });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`AI Resume Analyzer server running on port ${PORT}`);
});
