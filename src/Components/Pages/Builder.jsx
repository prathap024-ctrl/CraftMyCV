import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const Builder = () => {
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [contact, setContact] = useState("");
  const [generatedResume, setGeneratedResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [resumeGenerated, setResumeGenerated] = useState(false);

  const handleGenerateResume = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "https://ai-resume-builder-analyzer.onrender.com/api/generate-resume",
        {
          name,
          experience,
          education,
          skills,
          contact,
        }
      );
      setGeneratedResume(response.data.resume);
      setResumeGenerated(true); // Resume has been generated, so hide inputs
    } catch (error) {
      console.error("Error generating resume:", error);
      setGeneratedResume("Error generating resume.");
    }

    setLoading(false);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(generatedResume, 10, 10);
    doc.save("generated_resume.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6 sm:px-6">
      <div className="bg-white w-full max-w-xl mx-auto rounded-lg shadow-lg p-4 sm:p-6 mt-40 lg:mt-20 lg:mb-10">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-5">
            Resume Builder
          </h1>

          {!resumeGenerated ? (
            <div className="w-full max-h-[70vh] overflow-y-auto">
              <div className="mb-4">
                <label className="block font-semibold">Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full"
                  placeholder="Full Name"
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold">Experience:</label>
                <textarea
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full"
                  rows="4"
                  placeholder="Describe your work experience"
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold">Education:</label>
                <textarea
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full"
                  rows="4"
                  placeholder="List your education history"
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold">Skills:</label>
                <textarea
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full"
                  rows="4"
                  placeholder="Mention your skills"
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold">
                  Contact Information:
                </label>
                <textarea
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full"
                  rows="2"
                  placeholder="Provide contact information (email, phone)"
                />
              </div>

              <button
                onClick={handleGenerateResume}
                className="bg-blue-500 text-white p-3 rounded w-full text-sm sm:text-base"
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Resume"}
              </button>
            </div>
          ) : loading ? (
            <p className="text-center">Generating your resume...</p>
          ) : (
            <div className="w-full mt-5">
              <h2 className="text-lg sm:text-xl font-semibold mb-3">
                Generated Resume
              </h2>

              <div className="max-h-[400px] overflow-y-auto bg-gray-100 p-4 rounded w-full">
                <pre className="whitespace-pre-wrap text-left text-sm sm:text-base">
                  {generatedResume}
                </pre>
              </div>

              <button
                onClick={handleDownloadPDF}
                className="mt-5 bg-green-500 text-white p-3 rounded-full w-full text-sm sm:text-base"
              >
                Download Resume as PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Builder;
