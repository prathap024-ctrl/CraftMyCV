"use client";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from "../../Store/Slice/tabs/index";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import FileUploadComponent from "@/components/Analyzer/Upload";
import ResumeATSReport from "@/components/Analyzer/Analyzer";

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.tab.activeTab);

  return (
    <div className="min-h-screen bg-transparent text-white px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center md:text-left">
          <Link to={"/"} className="flex items-center gap-1">
            <ArrowLeft /> CraftMyCV
          </Link>
        </h1>

        <Tabs
          value={activeTab}
          onValueChange={(value) => dispatch(setActiveTab(value))}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-1 sm:grid-cols-1 text-sm bg-zinc-800 rounded-lg overflow-hidden">
            <TabsTrigger
              value="analyzer"
              className="w-full text-white data-[state=active]:bg-white data-[state=active]:text-black"
            >
              Resume Analyzer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyzer">
            <AnalyzerTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function AnalyzerTab() {
  return (
    <div>
      <div className="mt-4 p-6 bg-zinc-800 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Resume Analyzer</h2>
        <p className="text-sm text-gray-300">Analyze your resume using AI.</p>
      </div>
      <div className="mt-4">
        <FileUploadComponent />
        <ResumeATSReport />
      </div>
    </div>
  );
}
