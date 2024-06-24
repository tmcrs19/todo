import { BASE_URL } from "@faceit/lib/getData";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  tagTypes: ["FeedPosts", "Users"],
  endpoints: () => ({}),
});
