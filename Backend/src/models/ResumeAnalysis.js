import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  score: { type: Number, required: true },
  strengths: [{ type: String }],
  weaknesses: [{ type: String }],
  tips: [{ type: String }],
});

const SummarySchema = new mongoose.Schema({
  atsScore: Number,
  atsFriendlySections: String,
  avgSectionScore: Number,
  sectionsBelow80: [String],
  pros: [String],
  cons: [String],
  missing: [String],
});

const ResumeAnalysisSchema = new mongoose.Schema(
  {
    resumeId: { type: String, required: true },
    summary: SummarySchema,
    sections: [SectionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("ResumeAnalysis", ResumeAnalysisSchema);
