import React, { useState } from "react";
import images from "../../assets/images";
import axios from "axios";

const Analyzer = () => {
  const [resumeText, setResumeText] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = async () => {
        const text = reader.result;
        setResumeText(text);
        setFileUploaded(true); // Hide input
        await analyzeResume(text);
      };
      reader.readAsText(file); // PDF-to-text approximation (can be improved)
    }
  };

  const analyzeResume = async (text) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://ai-resume-builder-analyzer.onrender.com/api/analyze-resume",
        {
          resumeText: text,
        }
      );
      setAnalysisResult(response.data.result);
    } catch (error) {
      setAnalysisResult("Error analyzing resume.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6">
      <div className="bg-white h-auto max-h-[90vh] w-full max-w-4xl rounded-lg shadow-lg p-4 sm:p-6 overflow-y-auto">
        <div className="flex flex-col items-center justify-center">
          <img
            src={images.analyze}
            alt="Analyzer Icon"
            className="mb-4 h-12 w-12 sm:h-14 sm:w-14"
          />
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-4">
            Resume Analyzer
          </h1>

          {!fileUploaded ? (
            <div className="w-full">
              <p className="text-center text-sm sm:text-base mb-4">
                Upload your resume to analyze its content, formatting, and job
                relevance.
              </p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="border border-gray-300 rounded p-2 w-full mb-4"
                onChange={handleFileUpload}
              />
            </div>
          ) : loading ? (
            <p className="text-center">Analyzing...</p>
          ) : (
            <pre className="whitespace-pre-wrap text-left bg-gray-100 p-4 rounded w-full max-w-3xl overflow-auto text-sm sm:text-base">
              {analysisResult}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyzer;
