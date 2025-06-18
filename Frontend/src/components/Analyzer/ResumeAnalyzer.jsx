"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setResumeAnalysis,
  clearResumeAnalysis,
} from "@/Store/Slice/Analyser/index";

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, File, X, Doughnut, RefreshCcw } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut as DoughnutChart } from "react-chartjs-2";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResumeAnalyzer() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const analysis = useSelector((state) => state.resumeAnalysis.data);
  const [sections, setSections] = useState([]);
  const [summary, setSummary] = useState(null);
  const previewRef = useRef(null);

  const handleUpload = async (file) => {
    if (!file || file.type !== "application/pdf") {
      toast.error("Please upload a valid PDF resume.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await axios.post(
        "https://craftmycv-vc78.onrender.com/api/chatmodels/analyze",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data) {
        dispatch(setResumeAnalysis(res.data));
        setFiles([]);
        toast.success("Resume analyzed successfully!");
      }
    } catch (error) {
      toast.error("Failed to analyze resume.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (analysis) {
      setSections(analysis.sections || []);
      setSummary(analysis.summary || null);
    }
  }, [analysis]);

  const handleClear = () => {
    dispatch(clearResumeAnalysis());
    setSections([]);
    setSummary(null);
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const res = await axios.get(
        `https://craftmycv-vc78.onrender.com/api/analysis/fetch-analysis?ts=${Date.now()}`
      );
      if (res.data) {
        dispatch(setResumeAnalysis(res.data));
      }
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDownloadPDF = async () => {
    const element = previewRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume-report.pdf");
  };

  const onFileReject = (file, message) => {
    toast.error(message, {
      description: `${file.name.slice(0, 20)}... has been rejected`,
    });
  };

  if (!summary) {
    return (
      <div className="w-full mx-auto space-y-4 p-6">
        <h1 className="text-2xl font-bold">Upload Resume for ATS Analysis</h1>
        <FileUpload
          maxFiles={1}
          multiple={false}
          maxSize={5 * 1024 * 1024}
          value={files}
          onValueChange={setFiles}
          onFileReject={onFileReject}
          className="bg-zinc-800 rounded-2xl p-6"
        >
          <FileUploadDropzone>
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="flex items-center justify-center rounded-full border p-2.5">
                <Upload className="size-6 text-white" />
              </div>
              <p className="font-medium text-sm">Drag & drop your PDF resume</p>
              <p className="text-white text-xs">Only PDF allowed (max 5MB)</p>
            </div>
            <FileUploadTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-fit text-black"
              >
                Browse files
              </Button>
            </FileUploadTrigger>
          </FileUploadDropzone>

          <FileUploadList>
            {files.map((file, index) => (
              <FileUploadItem key={index} value={file}>
                <File />
                <FileUploadItemMetadata />
                <FileUploadItemDelete asChild>
                  <Button variant="ghost" size="icon" className="size-7">
                    <X />
                  </Button>
                </FileUploadItemDelete>
              </FileUploadItem>
            ))}
          </FileUploadList>
        </FileUpload>

        <Button
          onClick={() => handleUpload(files[0]?.file || files[0])}
          disabled={files.length === 0 || uploading}
          className="w-full bg-green-600 text-white hover:bg-green-700"
        >
          {uploading ? "Analyzing..." : "Analyze Resume"}
        </Button>
      </div>
    );
  }

  const chartData = {
    labels: sections.map((s) => s.title),
    datasets: [
      {
        data: sections.map((s) => s.score),
        backgroundColor: sections.map((s) =>
          s.score > 80 ? "#4ade80" : s.score > 60 ? "#60a5fa" : "#f87171"
        ),
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="space-y-10 p-6" ref={previewRef}>
      {/* Header */}
      <section className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Resume ATS Report</h1>
        <div className="flex gap-2">
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            variant="outline"
            className="text-black"
          >
            <RefreshCcw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button
            onClick={handleClear}
            variant="destructive"
            className="flex items-center gap-2"
          >
            Clear
          </Button>
        </div>
      </section>

      {/* ATS Score */}
      <section>
        <h2 className="text-lg font-semibold mb-2">ATS Score</h2>
        <div className="flex items-center gap-4">
          <span
            className={`text-2xl font-bold ${
              summary.atsScore >= 80 ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {summary.atsScore}%
          </span>
          <Progress value={summary.atsScore} className="h-3 w-full" />
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          Average Section Score: <strong>{summary.avgSectionScore}%</strong> |
          ATS-Friendly Sections: <strong>{summary.atsFriendlySections}</strong>
        </div>
      </section>

      {/* Match Overview */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Match Overview</h2>
        <div className="h-64">
          <DoughnutChart
            data={chartData}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </section>

      {/* Section-Wise Breakdown */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Section Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="border p-4 rounded-xl shadow-sm space-y-2"
            >
              <h3 className="text-md font-semibold flex justify-between">
                {section.title}
                <span
                  className={`text-sm font-medium ${
                    section.score >= 80
                      ? "text-green-600"
                      : section.score >= 60
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {section.score}%
                </span>
              </h3>
              <div className="text-sm">
                <strong className="text-green-600">Strengths:</strong>
                <ul className="list-disc list-inside mb-2">
                  {section.strengths.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                <strong className="text-red-600">Weaknesses:</strong>
                <ul className="list-disc list-inside mb-2">
                  {section.weaknesses.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                <strong className="text-yellow-500">Tips:</strong>
                <ul className="list-disc list-inside">
                  {section.tips.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback Summary */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Feedback Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium text-green-600 mb-1">
              Overall Strengths
            </h3>
            <ul className="list-disc list-inside text-sm">
              {summary.pros?.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-red-600 mb-1">
              Overall Weaknesses
            </h3>
            <ul className="list-disc list-inside text-sm">
              {summary.cons?.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-yellow-500 mb-1">
              Missing Elements
            </h3>
            <ul className="list-disc list-inside text-sm">
              {summary.missing?.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sections Below 80 */}
        <div className="mt-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            Sections below 80%:
          </h3>
          <ul className="list-disc list-inside text-sm">
            {summary.sectionsBelow80?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* PDF Download */}
      <section>
        <Button onClick={handleDownloadPDF}>Download Report PDF</Button>
      </section>
    </div>
  );
}
