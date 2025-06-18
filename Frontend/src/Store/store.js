import { configureStore } from "@reduxjs/toolkit";
import SidebarSlice from "./Slice/Sidebar";
import tabSlice from "./Slice/tabs";

export const store = configureStore({
  reducer: {
    sidebar: SidebarSlice,
    tab: tabSlice,
  },
});
