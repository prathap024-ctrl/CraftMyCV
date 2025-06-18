"use client";

import React, { useEffect, useState } from "react";
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

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  File,
  X,
  CheckCircle2,
  BarChart2,
  AlertCircle,
  ThumbsUp,
  XOctagon,
  Lightbulb,
  RefreshCcw,
} from "lucide-react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { toast } from "sonner";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResumeAnalyzer() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const analysis = useSelector((state) => state.resumeAnalysis.data);
  const [sections, setSections] = useState([]);
  const [summary, setSummary] = useState(null);

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

  // === If analysis is available ===

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

  const metrics = [
    {
      icon: <CheckCircle2 className="text-green-600" />,
      label: "ATS‑Friendly Sections",
      value: summary.atsFriendlySections || "0/0",
    },
    {
      icon: <BarChart2 className="text-blue-600" />,
      label: "Avg Section Score",
      value: `${summary.avgSectionScore ?? 0}%`,
    },
    {
      icon: <AlertCircle className="text-red-600" />,
      label: "Sections below 80%",
      value: summary.sectionsBelow80?.length ?? 0,
    },
  ];

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
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
          <Button onClick={handleClear} variant="destructive">
            <XOctagon className="w-4 h-4" />
            Clear Report
          </Button>
        </div>
      </div>

      {/* === Metrics === */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <Card key={i} className="flex items-center gap-4 p-4">
            <div className="bg-muted p-3 rounded-full">{m.icon}</div>
            <div>
              <p className="text-sm text-muted-foreground">{m.label}</p>
              <p className="text-xl font-bold">{m.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* === Score & Doughnut === */}
      <Card className="grid md:grid-cols-2 gap-6 p-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Overall ATS Score:{" "}
            <span
              className={
                summary.atsScore >= 80 ? "text-green-600" : "text-yellow-600"
              }
            >
              {summary.atsScore}%
            </span>
          </h2>
          <Progress value={summary.atsScore} className="h-4" />
        </div>
        <div className="h-64">
          <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </Card>

      {/* === Section Snapshots === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((s, i) => (
          <Card key={i}>
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-base">{s.title}</CardTitle>
              <Badge
                variant={
                  s.score >= 80
                    ? "default"
                    : s.score >= 70
                      ? "secondary"
                      : "destructive"
                }
              >
                {s.score}%
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <Progress value={s.score} />
              <p className="text-sm text-muted-foreground">
                {s.score >= 80
                  ? "Excellent"
                  : s.score >= 70
                    ? "Fair — needs work"
                    : "Poor — revise this section"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* === Strengths / Weaknesses / Suggestions === */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex items-center gap-2">
            <ThumbsUp className="text-green-500" />
            <CardTitle>Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-sm">
              {summary.pros?.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <XOctagon className="text-red-500" />
            <CardTitle>Weaknesses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-sm">
              {summary.cons?.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <Lightbulb className="text-yellow-500" />
            <CardTitle>Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-sm">
              {summary.missing?.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
