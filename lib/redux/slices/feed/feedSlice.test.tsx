import feedReducer, { setCurrentPage } from "./slice";
import { mockFeedPosts, mockUsers, feedApi } from "../../api/feed";
import { renderWithProviders } from "../../test-utils";
import { waitFor } from "@testing-library/react";

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.mockResponse(async (req) => {
    const endpoint = req.url.split("/").pop();
    switch (endpoint) {
      case "users":
        return JSON.stringify(mockUsers);
      case "posts?_page=1&_limit=20":
        return JSON.stringify(mockFeedPosts);
      default:
        return JSON.stringify({});
    }
  });
});

describe("feed slice", () => {
  const initialState = {
    posts: [],
    hasMorePosts: true,
    currentPage: 1,
  };

  it("should handle initial state", () => {
    expect(feedReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setCurrentPage", () => {
    const actual = feedReducer(initialState, setCurrentPage(2));
    expect(actual.currentPage).toEqual(2);
  });

  it("should trigger and handle getPosts listener action", async () => {
    const { store } = renderWithProviders(<div>test</div>);

    store.dispatch(feedApi.endpoints.getUsers.initiate());
    store.dispatch(feedApi.endpoints.getPosts.initiate(1));

    await waitFor(() => {
      expect(store.getState().feed).toStrictEqual({
        currentPage: 1,
        hasMorePosts: false,
        posts: [
          {
            body: "This is the body of post 1.",
            id: 1,
            title: "Post 1",
            userId: 1,
            username: "user1",
          },
          {
            body: "This is the body of post 2.",
            id: 2,
            title: "Post 2",
            userId: 2,
            username: "user2",
          },
          {
            body: "This is the body of post 3 with unknown user.",
            id: 3,
            title: "Post 3",
            userId: 5,
            username: "Unknown User",
          },
        ],
      });
    });
  });
});
