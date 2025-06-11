import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slice/authSlice";
import SidebarSlice from "./Slice/Sidebar";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    sidebar: SidebarSlice,
  },
});
