import { IFeedPost, IUser } from "@faceit/lib/redux/api/feed/types";

export const mockFeedPosts: IFeedPost[] = [
  {
    id: 1,
    title: "Post 1",
    body: "This is the body of post 1.",
    userId: 1,
  },
  {
    id: 2,
    title: "Post 2",
    body: "This is the body of post 2.",
    userId: 2,
  },
  {
    id: 3,
    title: "Post 3",
    body: "This is the body of post 3 with unknown user.",
    userId: 5,
  },
];

export const mockUsers: IUser[] = [
  {
    id: 1,
    username: "user1",
  },
  {
    id: 2,
    username: "user2",
  },
];
