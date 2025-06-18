import ResumeAnalysis from "../models/ResumeAnalysis.js";

// Save Analysis
export const saveAnalysis = async (req, res) => {
  try {
    const { sections, summary } = req.body;

    if (!sections || !summary) {
      return res.status(400).json({ error: "Missing required fields: sections or summary" });
    }

    const saved = await ResumeAnalysis.create({ sections, summary });

    res.status(201).json({
      message: "Analysis saved successfully",
      data: saved,
    });
  } catch (err) {
    console.error("❌ Error saving analysis:", err.message || err);
    res.status(500).json({ error: "Failed to save analysis" });
  }
};

// Fetch Latest Analysis
export const fetchLatestAnalysis = async (req, res) => {
  try {
    const latest = await ResumeAnalysis.findOne().sort({ createdAt: -1 });

    if (!latest) {
      return res.status(404).json({ error: "No analysis found" });
    }

    res.status(200).json({
      message: "Latest analysis fetched successfully",
      data: latest,
    });
  } catch (err) {
    console.error("❌ Error fetching latest analysis:", err.message || err);
    res.status(500).json({ error: "Failed to fetch analysis" });
  }
};
