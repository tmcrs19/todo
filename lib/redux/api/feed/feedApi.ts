import { IFeedPost, IUser } from "./types";
import { baseApi } from "../baseApi";

export const feedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<IFeedPost[], number>({
      query: (page = 1) => `posts?_page=${page}&_limit=20`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newPosts) => {
        currentCache.push(...newPosts);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ["FeedPosts"],
    }),
    getUsers: builder.query<IUser[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetPostsQuery, useGetUsersQuery } = feedApi;
