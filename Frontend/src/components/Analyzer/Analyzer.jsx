"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  BarChart2,
  AlertCircle,
  ThumbsUp,
  XOctagon,
  Lightbulb,
  RefreshCcw,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setResumeAnalysis,
  clearResumeAnalysis,
} from "@/Store/Slice/Analyser/index";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResumeATSReport() {
  const [sections, setSections] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const analysisFromStore = useSelector((state) => state.resumeAnalysis.data);
  const dispatch = useDispatch();

  const fetchAnalysis = async () => {
    try {
      setRefreshing(true);
      const res = await axios.get(
        `https://craftmycv-1.onrender.com/api/analysis/fetch-analysis`
      );

      if (res.data?.sections) {
        setSections(res.data.sections);
      }
      if (res.data?.summary) {
        setSummary(res.data.summary);
      }

      dispatch(setResumeAnalysis(res.data));
    } catch (err) {
      console.error("Failed to fetch analysis data:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    if (!analysisFromStore) {
      fetchAnalysis();
    } else {
      setSections(analysisFromStore.sections || []);
      setSummary(analysisFromStore.summary || null);
      setLoading(false);
    }
  }, [analysisFromStore]);

  const handleClear = () => {
    setSections([]);
    setSummary(null);
    dispatch(clearResumeAnalysis()); // <-- Clear Redux too
  };

  if (loading) return <div className="p-6">Loading report...</div>;

  const overallScore = summary?.atsScore ?? 0;

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
      value: summary?.atsFriendlySections || "0/0",
    },
    {
      icon: <BarChart2 className="text-blue-600" />,
      label: "Avg Section Score",
      value: summary?.avgSectionScore ? `${summary.avgSectionScore}%` : "—",
    },
    {
      icon: <AlertCircle className="text-red-600" />,
      label: "Sections below 80%",
      value: summary?.sectionsBelow80?.length ?? 0,
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* === Header & Refresh === */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Resume ATS Report</h1>
        <div className="flex gap-2">
          <Button
            onClick={fetchAnalysis}
            disabled={refreshing}
            variant="outline"
            className="gap-2 text-black"
          >
            <RefreshCcw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh Report
          </Button>

          <Button onClick={handleClear} variant="destructive" className="gap-2">
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

      {/* === ATS Score Overview === */}
      <Card className="grid md:grid-cols-2 gap-6 p-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Overall ATS Score:{" "}
            <span
              className={
                overallScore >= 80 ? "text-green-600" : "text-yellow-600"
              }
            >
              {overallScore}%
            </span>
          </h2>
          <Progress value={overallScore} className="h-4" />
        </div>
        <div className="h-64">
          <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </Card>

      {/* === Section Snapshots === */}
      {sections.length > 0 ? (
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
      ) : (
        <p className="text-muted-foreground text-sm px-4">
          No section scores available yet.
        </p>
      )}

      {/* === Pros, Cons, Suggestions === */}
      {summary && (
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
      )}
    </div>
  );
}
