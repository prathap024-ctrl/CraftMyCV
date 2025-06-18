// store/slices/tabSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialTab =
  typeof window !== "undefined"
    ? localStorage.getItem("activeTab") || "builder"
    : "builder";

const tabSlice = createSlice({
  name: "tab",
  initialState: {
    activeTab: initialTab,
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("activeTab", action.payload);
      }
    },
  },
});

export const { setActiveTab } = tabSlice.actions;
export default tabSlice.reducer;
