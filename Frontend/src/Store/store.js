import { configureStore } from "@reduxjs/toolkit";
import SidebarSlice from "./Slice/Sidebar";
import tabSlice from "./Slice/tabs";
import resumeAnalysisSlice from "./Slice/Analyser"

export const store = configureStore({
  reducer: {
    sidebar: SidebarSlice,
    tab: tabSlice,
    resumeAnalysis: resumeAnalysisSlice,
  },
});
