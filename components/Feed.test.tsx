import React from "react";
import { screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { Feed } from "./Feed";
import { renderWithProviders } from "@faceit/lib/redux/test-utils";
import { mockFeedPosts, mockUsers } from "@faceit/lib/redux/api/feed";
import userEvent from "@testing-library/user-event";

// Mock socket.io-client
jest.mock("socket.io-client", () => {
  const mockSocket = {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
  };
  return jest.fn(() => mockSocket);
});

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

describe("Feed Component", () => {
  test("renders Feed component with posts", async () => {
    renderWithProviders(<Feed />);

    const posts = await screen.findAllByRole("link");
    const firstPost = posts[0];
    const secondPost = posts[1];
    const thirdPost = posts[2];

    expect(firstPost).toHaveAttribute("href", "/user1/post/1");
    expect(secondPost).toHaveAttribute("href", "/user2/post/2");
    expect(thirdPost).toHaveAttribute("href", "/Unknown User/post/3");
  });
});
