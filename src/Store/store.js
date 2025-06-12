import { configureStore } from "@reduxjs/toolkit";
import SidebarSlice from "./Slice/Sidebar";

export const store = configureStore({
  reducer: {
    sidebar: SidebarSlice,
  },
});
