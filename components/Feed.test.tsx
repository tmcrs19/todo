import React from "react";
import { screen } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { Feed } from "./Feed";
import { renderWithProviders } from "@faceit/lib/redux/test-utils";
import { mockFeedPosts, mockUsers } from "@faceit/lib/redux/api/feed";

jest.mock("socket.io-client", () => {
  return jest.fn(() => ({
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
  }));
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

    expect(
      await screen.findByText("This is the body of post 1.")
    ).toBeInTheDocument();
    expect(screen.getByText("This is the body of post 2.")).toBeInTheDocument();
    expect(
      screen.getByText("This is the body of post 3 with unknown user.")
    ).toBeInTheDocument();
  });
});
