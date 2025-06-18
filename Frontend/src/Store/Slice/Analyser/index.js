// store/slices/resumeAnalysisSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

export const resumeAnalysisSlice = createSlice({
  name: "resumeAnalysis",
  initialState,
  reducers: {
    setResumeAnalysis: (state, action) => {
      state.data = action.payload;
    },
    clearResumeAnalysis: (state) => {
      state.data = null;
    },
  },
});

export const { setResumeAnalysis, clearResumeAnalysis } = resumeAnalysisSlice.actions;
export default resumeAnalysisSlice.reducer;
