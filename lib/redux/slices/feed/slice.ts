import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeedPost, IUser } from "@faceit/lib/redux/api/feed/types";
import { startAppListening } from "../../listenerMiddleware";
import { feedApi } from "../../api/feed/feedApi";

interface FeedState {
  posts: (IFeedPost & Pick<IUser, "username">)[];
  hasMorePosts: boolean;
  currentPage: number;
}

interface SetPostsAndUsersPayload {
  posts: IFeedPost[];
  users: IUser[];
}

const initialState: FeedState = {
  posts: [],
  hasMorePosts: true,
  currentPage: 1,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setPostsAndUsers(state, action: PayloadAction<SetPostsAndUsersPayload>) {
      const { posts, users } = action.payload;
      state.posts = posts.map((post) => {
        const user = users.find((user) => user.id === post.userId);
        return {
          ...post,
          username: user ? user.username : "Unknown User",
        };
      });
    },
    setHasMorePosts(state, action: PayloadAction<boolean>) {
      state.hasMorePosts = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setPostsAndUsers, setHasMorePosts, setCurrentPage } =
  feedSlice.actions;
export default feedSlice.reducer;

startAppListening({
  matcher: feedApi.endpoints.getPosts.matchFulfilled,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    const users = state.api.queries["getUsers(undefined)"]?.data as IUser[];

    listenerApi.dispatch(
      setPostsAndUsers({
        posts: [...state.feed.posts, ...action.payload],
        users,
      })
    );

    if (action.payload.length < 20) {
      listenerApi.dispatch(setHasMorePosts(false));
    }
  },
});
