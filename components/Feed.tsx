"use client";
import React, { useCallback, useRef, useEffect, useState } from "react";
import { FeedPost } from "./FeedPost";
import { useAppDispatch, useAppSelector } from "@faceit/lib/redux/hooks";
import {
  useGetPostsQuery,
  useGetUsersQuery,
} from "@faceit/lib/redux/api/feed/feedApi";
import Link from "next/link";
import {
  setCurrentPage,
  setPostsAndUsers,
  selectFeedData,
} from "@faceit/lib/redux/slices/feed";
import socket from "@faceit/lib/socket";

export const Feed: React.FC = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const dispatch = useAppDispatch();

  const { currentPage, feedPosts, hasMorePosts } =
    useAppSelector(selectFeedData);

  const [highlightedPostId, setHighlightedPostId] = useState<number | null>(
    null
  );

  const { data: users, isSuccess: usersSuccess } = useGetUsersQuery();
  const {
    error,
    isLoading,
    isFetching,
    isSuccess: postsSuccess,
  } = useGetPostsQuery(currentPage, {
    skip: !users,
  });

  useEffect(() => {
    if (usersSuccess && postsSuccess) {
      const onConnect = () => {
        setIsConnected(true);
      };

      const onDisconnect = () => {
        setIsConnected(false);
      };

      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);

      socket.on("newPost", (newPost) => {
        dispatch(setPostsAndUsers({ posts: [newPost, ...feedPosts], users }));
        setHighlightedPostId(newPost.id);
        setTimeout(() => {
          setHighlightedPostId(null);
        }, 3000);
      });

      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.off("newPost");
        socket.disconnect();
      };
    }
  }, [dispatch, feedPosts, users, usersSuccess, postsSuccess]);

  // NOTE: this logic to maintain the scroll position shouldn't be necessary
  // <Link scroll={false} /> should be enough to prevent the scroll position from resetting
  // Perhaps this is a bug in Next.js or I'm missing something
  const handlePostClick = () => {
    sessionStorage.setItem("scrollPosition", window.scrollY.toString());
  };

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      sessionStorage.removeItem("scrollPosition");
    }
  }, []);

  const observer = useRef<IntersectionObserver>();
  const lastPostElementRef = useCallback(
    (node: HTMLLIElement) => {
      if (isLoading || isFetching || !hasMorePosts) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(setCurrentPage(currentPage + 1));
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isFetching, hasMorePosts, currentPage, dispatch]
  );

  if (isLoading || !users) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <ul>
      {feedPosts.map((post, index) => (
        <li
          key={post.id}
          ref={feedPosts.length === index + 1 ? lastPostElementRef : null}
        >
          <Link
            scroll={false}
            onClick={handlePostClick}
            href={`/${post.username}/post/${post.id}`}
          >
            <FeedPost
              username={post.username}
              body={post.body}
              isHighlighted={highlightedPostId === post.id}
            />
          </Link>
        </li>
      ))}
      {isFetching && <p>Loading more...</p>}
    </ul>
  );
};
