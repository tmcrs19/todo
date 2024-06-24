import React from "react";

interface IFeedPostProps {
  username: string;
  body: string;
  isHighlighted: boolean;
}

export const FeedPost: React.FC<IFeedPostProps> = ({
  username,
  body,
  isHighlighted,
}) => {
  return (
    <article
      className={`${
        isHighlighted ? "bg-yellow-300" : "bg-white"
      } border border-gray-300 p-4 rounded-lg mb-4 grid grid-cols-[50px_1fr] gap-2 items-center`}
    >
      <div
        aria-label={`Avatar of ${username}`}
        role="img"
        className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-2xl text-white"
      >
        {username[0]}
      </div>
      <p className="m-0 font-bold">{username}</p>
      <div className="col-span-2 text-left">
        <p>{body.length > 100 ? `${body.substring(0, 100)}...` : body}</p>
      </div>
    </article>
  );
};
