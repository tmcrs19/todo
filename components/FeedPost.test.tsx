import React from "react";
import { render, screen } from "@testing-library/react";
import { FeedPost, IFeedPostProps } from "./FeedPost";

const setup = ({ username, body, isHighlighted }: IFeedPostProps) => {
  render(
    <FeedPost username={username} body={body} isHighlighted={isHighlighted} />
  );
  const article = screen.getByRole("article");
  const avatar = screen.getByLabelText(`Avatar of ${username}`);
  const displayedBody = screen.getByText(
    body.length > 100 ? `${body.substring(0, 100)}...` : body
  );
  return { article, avatar, displayedBody };
};

describe("FeedPost Component", () => {
  test("renders FeedPost with highlighted background and short body", () => {
    const { article, avatar, displayedBody } = setup({
      username: "testuser",
      body: "This is a test post",
      isHighlighted: true,
    });

    expect(article).toHaveClass("bg-yellow-300");
    expect(avatar).toBeInTheDocument();
    expect(displayedBody).toBeInTheDocument();
  });

  test("renders FeedPost without highlighted background and long body", () => {
    const longBody =
      "This is a very long test post that exceeds 100 characters in length. It should be truncated to display only the first 100 characters.";
    const { article, avatar, displayedBody } = setup({
      username: "testuser",
      body: longBody,
      isHighlighted: false,
    });

    expect(article).toHaveClass("bg-white");
    expect(avatar).toBeInTheDocument();
    expect(displayedBody).toBeInTheDocument();
  });
});
