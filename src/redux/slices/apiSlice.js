import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Load base backend URL from .env
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,  // all backend routes start with /api
    credentials: "include",
  }),
  tagTypes: ["User", "Task"],
  endpoints: () => ({}),
});
